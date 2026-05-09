"use client";

import React, { useActionState, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenNib,
  faImage,
  faRightFromBracket,
  faCloudArrowUp,
  faCheck,
  faCircleExclamation,
  faLink,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import { createPostAction, logoutAction, type CreatePostState } from "./actions";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export default function UploadForm() {
  const [state, formAction, pending] = useActionState<
    CreatePostState | undefined,
    FormData
  >(createPostAction, undefined);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManual, setSlugManual] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const onTitleChange = (v: string) => {
    setTitle(v);
    if (!slugManual) setSlug(slugify(v));
  };

  const onImagePick = (file: File | undefined) => {
    if (!file) {
      setImagePreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImagePreview(typeof reader.result === "string" ? reader.result : null);
    reader.readAsDataURL(file);
  };

  // After a successful submit, clear the form
  useEffect(() => {
    if (state?.ok) {
      formRef.current?.reset();
      setTitle("");
      setSlug("");
      setSlugManual(false);
      setImagePreview(null);
    }
  }, [state?.ok]);

  return (
    <div className="bg-[#fffaf5] min-h-screen pt-28 pb-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
        >
          <div>
            <p className="text-[#a87420] uppercase tracking-[0.4em] text-[10px] font-bold mb-2">
              Admin · Content Studio
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-[#1a1a1a] leading-tight">
              Publish a new blog post
            </h1>
            <p className="text-gray-500 text-sm mt-2 max-w-xl">
              Featured images are uploaded to the <code>cms-images</code> bucket; the
              record is inserted into the <code>posts</code> table.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/admin/bookings"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-colors text-xs uppercase tracking-[0.2em] font-bold"
            >
              Bookings
            </a>
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] transition-colors text-xs uppercase tracking-[0.2em] font-bold"
              >
                <FontAwesomeIcon icon={faRightFromBracket} className="text-[10px]" />
                Sign out
              </button>
            </form>
          </div>
        </motion.div>

        {/* result banners */}
        {state?.ok && state.slug && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 rounded-xl bg-emerald-50 border border-emerald-200 px-5 py-4 flex items-start gap-3"
          >
            <FontAwesomeIcon
              icon={faCheck}
              className="text-emerald-600 mt-0.5"
            />
            <div className="text-sm text-emerald-900">
              <p className="font-semibold">Post published.</p>
              <p>
                Live at{" "}
                <a
                  href={`/blogs/${state.slug}`}
                  className="underline font-mono"
                  target="_blank"
                  rel="noreferrer"
                >
                  /blogs/{state.slug}
                </a>
              </p>
            </div>
          </motion.div>
        )}

        {state?.error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 rounded-xl bg-red-50 border border-red-200 px-5 py-4 flex items-start gap-3"
          >
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="text-red-600 mt-0.5"
            />
            <p className="text-sm text-red-900">{state.error}</p>
          </motion.div>
        )}

        <form
          ref={formRef}
          action={formAction}
          className="space-y-8 bg-white border border-gray-200 rounded-2xl p-6 md:p-10 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.25)]"
        >
          {/* Section: core */}
          <FormSection icon={faPenNib} title="The Story">
            <Field
              label="Title"
              required
              hint="Shows as the H1 on the blog page."
            >
              <input
                name="title"
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                required
                placeholder="A monsoon morning at Ghar Bar"
                className={inputClass}
              />
            </Field>

            <Field
              label="Slug"
              hint="Auto-generated from the title. Edit if you need a custom URL."
            >
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm font-mono">/blogs/</span>
                <input
                  name="slug"
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    setSlugManual(true);
                  }}
                  placeholder="a-monsoon-morning"
                  className={inputClass + " font-mono"}
                />
              </div>
            </Field>

            <Field
              label="Short description"
              hint="Used on the blog listing card."
            >
              <textarea
                name="short_description"
                rows={2}
                placeholder="A 1–2 line summary that pulls a reader in."
                className={textareaClass}
              />
            </Field>
          </FormSection>

          {/* Section: image */}
          <FormSection icon={faImage} title="Featured Image">
            <Field
              label="Upload image"
              hint="Uploads to the cms-images storage bucket. PNG / JPG / WebP."
            >
              <label className="block border-2 border-dashed border-gray-300 hover:border-[#e6a34d] rounded-xl p-6 text-center cursor-pointer transition-colors bg-[#fffaf5]/50">
                <input
                  type="file"
                  name="featured_image"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onImagePick(e.target.files?.[0])}
                />
                {imagePreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-56 mx-auto rounded-lg shadow"
                  />
                ) : (
                  <div className="py-6 text-gray-500">
                    <FontAwesomeIcon
                      icon={faCloudArrowUp}
                      className="text-3xl mb-3 text-[#e6a34d]"
                    />
                    <p className="text-sm font-semibold text-gray-700">
                      Click to choose an image
                    </p>
                    <p className="text-xs mt-1">or drop it on this area</p>
                  </div>
                )}
              </label>
            </Field>

            <Field
              label="…or paste a public URL"
              hint="Use this if the image already lives somewhere else (e.g. an existing CDN)."
              icon={faLink}
            >
              <input
                name="featured_image_url"
                type="url"
                placeholder="https://example.com/photo.jpg"
                className={inputClass}
              />
            </Field>
          </FormSection>

          {/* Section: content */}
          <FormSection icon={faPenNib} title="Body">
            <Field
              label="Content"
              hint="HTML is rendered as-is. Wrap paragraphs in <p>, headings in <h2>/<h3>, etc."
            >
              <textarea
                name="content"
                rows={14}
                placeholder={
                  '<p>The morning fog rolls down the Dhauladhars…</p>\n<h2>Our slowest cup of chai</h2>\n<p>…</p>'
                }
                className={textareaClass + " font-mono text-[13px]"}
              />
            </Field>
          </FormSection>

          {/* Section: SEO */}
          <FormSection icon={faCode} title="SEO & Schema">
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Meta title" hint="Recommended ≤ 60 characters.">
                <input
                  name="meta_title"
                  placeholder="A monsoon morning at Ghar Bar Cafe"
                  className={inputClass}
                />
              </Field>
              <Field
                label="Meta description"
                hint="Recommended ≤ 160 characters."
              >
                <input
                  name="meta_description"
                  placeholder="Why our quietest hours are also our best…"
                  className={inputClass}
                />
              </Field>
            </div>

            <Field
              label="JSON-LD schema (optional)"
              hint="Valid JSON object. Will be embedded as <script type='application/ld+json'> on the post page."
            >
              <textarea
                name="schema"
                rows={6}
                placeholder='{\n  "@context": "https://schema.org",\n  "@type": "BlogPosting",\n  "headline": "..."\n}'
                className={textareaClass + " font-mono text-[13px]"}
              />
            </Field>
          </FormSection>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="reset"
              onClick={() => {
                setTitle("");
                setSlug("");
                setSlugManual(false);
                setImagePreview(null);
              }}
              className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors text-xs uppercase tracking-[0.2em] font-bold"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1a1a1a] text-white hover:bg-[#e6a34d] hover:text-[#1a1a1a] transition-colors text-xs uppercase tracking-[0.2em] font-bold disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <FontAwesomeIcon icon={faCloudArrowUp} className="text-[10px]" />
              {pending ? "Publishing…" : "Publish post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputClass =
  "w-full bg-white border border-gray-300 focus:border-[#e6a34d] focus:ring-2 focus:ring-[#e6a34d]/25 rounded-lg px-4 py-2.5 text-sm outline-none transition-colors";

const textareaClass =
  "w-full bg-white border border-gray-300 focus:border-[#e6a34d] focus:ring-2 focus:ring-[#e6a34d]/25 rounded-lg px-4 py-3 text-sm outline-none transition-colors leading-relaxed";

function FormSection({
  icon,
  title,
  children,
}: {
  icon: typeof faPenNib;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-5">
      <div className="flex items-center gap-3">
        <span className="w-9 h-9 rounded-full bg-[#e6a34d]/10 border border-[#e6a34d]/40 flex items-center justify-center">
          <FontAwesomeIcon icon={icon} className="text-[#a87420] text-sm" />
        </span>
        <h2 className="font-serif text-xl text-[#1a1a1a]">{title}</h2>
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function Field({
  label,
  hint,
  required,
  icon,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  icon?: typeof faPenNib;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-bold text-gray-700 mb-1.5">
        {icon && <FontAwesomeIcon icon={icon} className="text-[#a87420] text-[10px]" />}
        {label}
        {required && <span className="text-red-500 normal-case">*</span>}
      </span>
      {children}
      {hint && <span className="block mt-1.5 text-xs text-gray-500">{hint}</span>}
    </label>
  );
}
