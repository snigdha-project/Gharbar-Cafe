"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createHmac, timingSafeEqual } from "node:crypto";
import { supabase, CMS_BUCKET } from "@/lib/supabase";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "Nemo@2023";
const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ?? "fallback-dev-secret-change-me";
const SESSION_COOKIE = "gb_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours

function sign(value: string): string {
  return createHmac("sha256", SESSION_SECRET).update(value).digest("hex");
}

function makeToken(): string {
  const issued = Date.now().toString();
  const sig = sign(issued);
  return `${issued}.${sig}`;
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  const [issued, sig] = token.split(".");
  if (!issued || !sig) return false;
  const expected = sign(issued);
  if (
    sig.length !== expected.length ||
    !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
  ) {
    return false;
  }
  const issuedMs = Number(issued);
  if (!Number.isFinite(issuedMs)) return false;
  if (Date.now() - issuedMs > SESSION_MAX_AGE * 1000) return false;
  return true;
}

export async function loginAction(
  _prev: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const password = String(formData.get("password") ?? "");
  if (password !== ADMIN_PASSWORD) {
    return { error: "Incorrect password." };
  }
  const store = await cookies();
  store.set(SESSION_COOKIE, makeToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  redirect("/admin/blog-uploader");
}

export async function logoutAction(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/admin/blog-uploader");
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

function parseSchema(raw: string): Record<string, unknown> | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const parsed = JSON.parse(trimmed);
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error("Schema must be a JSON object.");
  }
  return parsed as Record<string, unknown>;
}

export type CreatePostState = {
  ok?: boolean;
  error?: string;
  slug?: string;
};

export async function createPostAction(
  _prev: CreatePostState | undefined,
  formData: FormData
): Promise<CreatePostState> {
  if (!(await isAuthenticated())) {
    return { error: "Session expired. Please log in again." };
  }

  const title = String(formData.get("title") ?? "").trim();
  if (!title) return { error: "Title is required." };

  const slugInput = String(formData.get("slug") ?? "").trim();
  const slug = slugify(slugInput || title);
  if (!slug) return { error: "Could not derive a valid slug from title." };

  const meta_title = String(formData.get("meta_title") ?? "").trim() || null;
  const meta_description =
    String(formData.get("meta_description") ?? "").trim() || null;
  const short_description =
    String(formData.get("short_description") ?? "").trim() || null;
  const content = String(formData.get("content") ?? "").trim() || null;
  const schemaRaw = String(formData.get("schema") ?? "");

  let schema: Record<string, unknown> | null = null;
  try {
    schema = parseSchema(schemaRaw);
  } catch (err) {
    return {
      error: `Schema must be valid JSON: ${
        err instanceof Error ? err.message : "parse error"
      }`,
    };
  }

  // Optional featured image upload
  const file = formData.get("featured_image") as File | null;
  let featured_image_url: string | null =
    String(formData.get("featured_image_url") ?? "").trim() || null;

  if (file && typeof file.size === "number" && file.size > 0) {
    const ext = file.name.includes(".")
      ? file.name.slice(file.name.lastIndexOf(".") + 1).toLowerCase()
      : "jpg";
    const path = `${slug}-${Date.now()}.${ext}`;

    const { error: uploadErr } = await supabase.storage
      .from(CMS_BUCKET)
      .upload(path, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type || undefined,
      });

    if (uploadErr) {
      return { error: `Image upload failed: ${uploadErr.message}` };
    }

    const { data: pub } = supabase.storage.from(CMS_BUCKET).getPublicUrl(path);
    featured_image_url = pub.publicUrl;
  }

  const { error: insertErr } = await supabase.from("posts").insert({
    title,
    slug,
    meta_title,
    meta_description,
    short_description,
    content,
    schema,
    featured_image_url,
  });

  if (insertErr) {
    return { error: `Could not save post: ${insertErr.message}` };
  }

  revalidatePath("/blogs");
  revalidatePath(`/blogs/${slug}`);
  return { ok: true, slug };
}
