import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { supabase, type Post } from "@/lib/supabase";

export const revalidate = 60;

type RouteParams = { slug: string };

async function getPost(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error || !data) return null;
  return data as Post;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.meta_title || post.title,
    description:
      post.meta_description ||
      post.short_description ||
      "A post from Ghar Bar Cafe.",
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.short_description || "",
      images: post.featured_image_url ? [post.featured_image_url] : [],
      type: "article",
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <main className="bg-[#fffaf5] min-h-screen overflow-x-hidden">
      {/* JSON-LD */}
      {post.schema && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(post.schema) }}
        />
      )}

      {/* hero */}
      <section className="relative pt-28 md:pt-36 pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-bold text-[#a87420] hover:text-[#1a1a1a] transition-colors mb-6"
          >
            ← Back to journal
          </Link>

          <p className="text-[#a87420] uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold mb-4">
            {formatDate(post.created_at)}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-[#1a1a1a] leading-[1.05]">
            {post.title}
          </h1>
          {post.short_description && (
            <p className="text-gray-600 text-lg md:text-xl mt-6 leading-relaxed max-w-3xl">
              {post.short_description}
            </p>
          )}
        </div>

        {post.featured_image_url && (
          <div className="max-w-5xl mx-auto px-4 md:px-8 mt-10 md:mt-14">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)]">
              <Image
                src={post.featured_image_url}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                priority
                className="object-cover"
              />
            </div>
          </div>
        )}
      </section>

      {/* body */}
      <article className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-16">
        {post.content ? (
          <div
            className="blog-content text-gray-800 leading-[1.85] text-[17px]"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        ) : (
          <p className="text-gray-500 italic">This post has no body yet.</p>
        )}

        <div className="mt-16 pt-8 border-t border-[#e6a34d]/20 flex items-center justify-between text-xs uppercase tracking-[0.25em] font-bold">
          <Link
            href="/blogs"
            className="text-[#a87420] hover:text-[#1a1a1a] transition-colors"
          >
            ← All stories
          </Link>
          <span className="text-gray-400">Ghar Bar Cafe · Journal</span>
        </div>
      </article>
    </main>
  );
}
