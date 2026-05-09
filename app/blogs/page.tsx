import Link from "next/link";
import Image from "next/image";
import { supabase, type Post } from "@/lib/supabase";

export const metadata = {
  title: "Stories & Journal | Ghar Bar Cafe",
  description:
    "Notes from the kitchen and the hills — recipes, seasonal menus and stories from Ghar Bar Cafe.",
};

export const revalidate = 60;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogsPage() {
  const { data, error } = await supabase
    .from("posts")
    .select(
      "id, title, slug, short_description, featured_image_url, created_at"
    )
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-[#fffaf5] pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-4xl text-[#1a1a1a] mb-4">
            Stories & Journal
          </h1>
          <p className="text-red-600">
            Could not load posts: {error.message}
          </p>
        </div>
      </main>
    );
  }

  const posts = (data ?? []) as Pick<
    Post,
    "id" | "title" | "slug" | "short_description" | "featured_image_url" | "created_at"
  >[];

  const [hero, ...rest] = posts;

  return (
    <main className="min-h-screen bg-[#fffaf5] pt-32 pb-24 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-[#a87420] uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold mb-3">
            The Journal
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-[#1a1a1a] leading-tight">
            Stories from the{" "}
            <span className="italic text-[#e6a34d]">kitchen & the hills</span>
          </h1>
          <p className="text-gray-500 text-sm md:text-base mt-5 max-w-2xl mx-auto">
            Slow-read essays, seasonal menus and quiet notes from the bar.
            Updated whenever the kitchen has something to say.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">
              No posts yet. Add the first one from the admin uploader.
            </p>
          </div>
        ) : (
          <>
            {/* featured */}
            {hero && (
              <Link
                href={`/blogs/${hero.slug}`}
                className="group grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-20 md:mb-24"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
                  {hero.featured_image_url ? (
                    <Image
                      src={hero.featured_image_url}
                      alt={hero.title}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#e6a34d]/30 to-[#1a1a1a]/30" />
                  )}
                </div>
                <div>
                  <p className="text-[#a87420] uppercase tracking-[0.3em] text-[10px] font-bold mb-3">
                    Latest · {formatDate(hero.created_at)}
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl text-[#1a1a1a] leading-tight group-hover:text-[#a87420] transition-colors">
                    {hero.title}
                  </h2>
                  {hero.short_description && (
                    <p className="text-gray-600 mt-5 leading-relaxed">
                      {hero.short_description}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-2 mt-6 text-xs uppercase tracking-[0.25em] font-bold text-[#1a1a1a] border-b border-[#e6a34d] pb-1 group-hover:text-[#a87420] transition-colors">
                    Read the story →
                  </span>
                </div>
              </Link>
            )}

            {/* grid */}
            {rest.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {rest.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blogs/${post.slug}`}
                    className="group flex flex-col"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 mb-5">
                      {post.featured_image_url ? (
                        <Image
                          src={post.featured_image_url}
                          alt={post.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#e6a34d]/25 to-[#1a1a1a]/25" />
                      )}
                    </div>
                    <p className="text-[#a87420] uppercase tracking-[0.25em] text-[10px] font-bold mb-2">
                      {formatDate(post.created_at)}
                    </p>
                    <h3 className="font-serif text-xl md:text-2xl text-[#1a1a1a] leading-snug group-hover:text-[#a87420] transition-colors">
                      {post.title}
                    </h3>
                    {post.short_description && (
                      <p className="text-gray-600 mt-3 text-sm leading-relaxed line-clamp-3">
                        {post.short_description}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
