import Link from "next/link";
import RenderingBadge from "@/components/rendering/RenderingBadge";
import TimestampDisplay from "@/components/rendering/TimestampDisplay";
import CodeBlock from "@/components/rendering/CodeBlock";
import InfoCard from "@/components/rendering/InfoCard";
import { blogPosts } from "@/lib/mock-data";

// ✅ Force static rendering - Đảm bảo page này luôn được render tại build time
export const dynamic = "force-static";

const codeExample = `// page.tsx — SSG Static Path
// ✅ Không có dynamic functions → Next.js tự render static

export const dynamic = 'force-static';

export default function SSGPage() {
  // Data được fetch 1 lần tại build time
  const posts = getBlogPosts();
  return <PostList posts={posts} />;
}

// HTML được generate sẵn → serve từ CDN
// Reload bao nhiêu lần cũng cùng timestamp`;

export default function SSGListPage() {
  const renderTime = new Date().toISOString();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <RenderingBadge type="SSG" showDescription />
        <h1 className="text-3xl font-black tracking-tight text-white">
          Static Site Generation
        </h1>
        <p className="text-gray-400">
          Trang này được render{" "}
          <span className="text-emerald-400 font-semibold">tại build time</span>.
          HTML được tạo sẵn và serve trực tiếp — nhanh nhất có thể.
        </p>
      </div>

      {/* Timestamp */}
      <TimestampDisplay
        label="Rendered at (Build time)"
        timestamp={renderTime}
        accentColor="#10B981"
      />
      <p className="text-xs text-gray-500 -mt-4">
        💡 Reload trang nhiều lần — timestamp này <strong>không đổi</strong> vì
        page đã được generate sẵn (trong dev mode nó sẽ đổi do HMR).
      </p>

      {/* Info Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <InfoCard title="Khi nào dùng SSG?" icon="🎯" accentColor="#10B981">
          <ul className="space-y-1.5 list-none">
            <li>✅ Blog posts, documentation</li>
            <li>✅ Marketing & landing pages</li>
            <li>✅ Nội dung ít thay đổi</li>
            <li>✅ Biết trước tất cả URL lúc build</li>
          </ul>
        </InfoCard>
        <InfoCard title="Cách hoạt động" icon="⚙️" accentColor="#10B981">
          <ul className="space-y-1.5 list-none">
            <li>
              📦 <code className="text-emerald-400">next build</code> → HTML
              được generate
            </li>
            <li>🚀 Deploy lên CDN (Vercel Edge, CloudFront...)</li>
            <li>👤 User request → CDN trả HTML ngay lập tức</li>
            <li>⚡ TTFB cực thấp, không cần server</li>
          </ul>
        </InfoCard>
      </div>

      {/* Blog Post List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">
          📝 Blog Posts{" "}
          <span className="text-sm font-normal text-gray-500">
            (Static path: /ssg)
          </span>
        </h2>
        <div className="grid gap-4">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`ssg/${post.slug}`}
              className="group flex gap-4 p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-emerald-500/20 transition-all duration-200"
            >
              <div className="text-4xl flex-shrink-0">{post.coverEmoji}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                  <span>👤 {post.author}</span>
                  <span>📅 {post.date}</span>
                  <span>⏱️ {post.readTime}</span>
                </div>
                <div className="flex gap-1.5 mt-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-gray-600 group-hover:text-emerald-400 self-center transition-colors">
                →
              </span>
            </Link>
          ))}
        </div>
        <p className="text-xs text-gray-500">
          👆 Click vào bài viết để xem demo{" "}
          <strong>SSG với dynamic path [slug]</strong> +{" "}
          <code className="text-emerald-400">generateStaticParams()</code>
        </p>
      </div>

      {/* Code Example */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-white">💻 Code minh họa</h2>
        <CodeBlock code={codeExample} filename="app/ssg/page.tsx" />
      </div>
    </div>
  );
}
