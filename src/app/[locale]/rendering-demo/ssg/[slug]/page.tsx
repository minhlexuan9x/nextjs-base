import { notFound } from "next/navigation";
import Link from "next/link";
import RenderingBadge from "@/components/rendering/RenderingBadge";
import TimestampDisplay from "@/components/rendering/TimestampDisplay";
import CodeBlock from "@/components/rendering/CodeBlock";
import InfoCard from "@/components/rendering/InfoCard";
import { blogPosts, getBlogPost } from "@/lib/mock-data";

// ✅ Pre-render tất cả slug tại build time
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// ❌ Trả 404 cho slug không có trong danh sách
export const dynamicParams = false;

const codeExample = `// [slug]/page.tsx — SSG Dynamic Path

// ✅ Pre-render tất cả slug tại build time
export async function generateStaticParams() {
  // Có thể fetch từ CMS, database, API...
  const posts = await fetchPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// ❌ Trả 404 cho slug không có trong list
export const dynamicParams = false;

// Mỗi slug → 1 file HTML riêng tại build time
export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  return <PostDetail post={post} />;
}`;

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function SSGPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const renderTime = new Date().toISOString();

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link
          href="../ssg"
          className="hover:text-emerald-400 transition-colors"
        >
          SSG
        </Link>
        <span>/</span>
        <span className="text-gray-300">{slug}</span>
      </div>

      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <RenderingBadge type="SSG" />
          <span className="text-xs px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 font-mono">
            Dynamic Path: [slug]
          </span>
        </div>
        <div className="flex items-start gap-4">
          <span className="text-5xl">{post.coverEmoji}</span>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white">
              {post.title}
            </h1>
            <p className="text-gray-400 mt-2">{post.excerpt}</p>
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4">
        <TimestampDisplay
          label="Pre-rendered at (Build time)"
          timestamp={renderTime}
          accentColor="#10B981"
        />
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <span>👤 {post.author}</span>
          <span>📅 {post.date}</span>
          <span>⏱️ {post.readTime}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="prose prose-invert max-w-none rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <div className="text-gray-300 leading-relaxed whitespace-pre-line">
          {post.content}
        </div>
      </div>

      {/* Key Concepts */}
      <div className="grid gap-4 sm:grid-cols-2">
        <InfoCard
          title="generateStaticParams()"
          icon="🔧"
          accentColor="#10B981"
        >
          <p>
            Hàm này chạy tại <strong>build time</strong>, trả về danh sách tất
            cả các slug cần pre-render. Mỗi slug sẽ tạo ra{" "}
            <strong>1 file HTML riêng</strong>.
          </p>
          <p className="mt-2">
            Tương đương <code className="text-emerald-400">getStaticPaths</code>{" "}
            trong Pages Router.
          </p>
        </InfoCard>
        <InfoCard title="dynamicParams = false" icon="🚫" accentColor="#ef4444">
          <p>
            Khi set <code className="text-red-400">dynamicParams = false</code>,
            bất kỳ slug nào <strong>không có</strong> trong{" "}
            <code className="text-emerald-400">generateStaticParams()</code> sẽ
            trả về <strong>404</strong>.
          </p>
          <p className="mt-2">
            Nếu <code className="text-emerald-400">true</code> (mặc định),
            Next.js sẽ render on-demand cho slug mới.
          </p>
        </InfoCard>
      </div>

      {/* Code */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-white">💻 Code minh họa</h2>
        <CodeBlock code={codeExample} filename="app/ssg/[slug]/page.tsx" />
      </div>

      {/* Back link */}
      <Link
        href="../ssg"
        className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
      >
        ← Quay lại danh sách
      </Link>
    </div>
  );
}
