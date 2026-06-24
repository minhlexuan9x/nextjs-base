import Link from "next/link";

const strategies = [
  {
    type: "SSG",
    title: "Static Site Generation",
    emoji: "📦",
    color: "#10B981",
    href: "ssg",
    description:
      "HTML được tạo sẵn tại build time. Nhanh nhất vì serve trực tiếp từ CDN.",
    whenToUse: [
      "Blog posts, documentation",
      "Marketing pages, landing pages",
      "Nội dung ít thay đổi",
      "Biết trước tất cả URL",
    ],
    pros: ["Tốc độ nhanh nhất", "SEO tuyệt vời", "Tiết kiệm server"],
    cons: ["Phải rebuild để cập nhật", "Không phù hợp dữ liệu realtime"],
    pathTypes: ["Static path: /ssg", "Dynamic path: /ssg/[slug]"],
  },
  {
    type: "SSR",
    title: "Server-Side Rendering",
    emoji: "⚡",
    color: "#F59E0B",
    href: "ssr",
    description:
      "HTML được render mới mỗi request trên server. Dữ liệu luôn fresh.",
    whenToUse: [
      "Dashboard cá nhân",
      "Dữ liệu realtime (thời tiết, stock)",
      "Nội dung cá nhân hóa theo user",
      "Search results",
    ],
    pros: ["Dữ liệu luôn mới nhất", "SEO tốt", "Cá nhân hóa được"],
    cons: ["Chậm hơn SSG", "Tốn tài nguyên server", "TTFB cao hơn"],
    pathTypes: ["Static path: /ssr", "Dynamic path: /ssr/[id]"],
  },
  {
    type: "ISR",
    title: "Incremental Static Regeneration",
    emoji: "🔄",
    color: "#6366F1",
    href: "isr",
    description:
      "Kết hợp SSG + tự động revalidate sau một khoảng thời gian. Best of both worlds.",
    whenToUse: [
      "E-commerce product pages",
      "Tin tức, bài báo",
      "Nội dung thay đổi định kỳ",
      "Khi cần static performance + data freshness",
    ],
    pros: [
      "Nhanh như SSG",
      "Tự động cập nhật",
      "Không cần rebuild toàn bộ",
    ],
    cons: [
      "Dữ liệu có thể stale trong khoảng revalidate",
      "Phức tạp hơn SSG",
    ],
    pathTypes: ["Static path: /isr", "Dynamic path: /isr/[slug]"],
  },
  {
    type: "CSR",
    title: "Client-Side Rendering",
    emoji: "🖥️",
    color: "#EC4899",
    href: "client",
    description:
      'Render hoàn toàn trên browser bằng JavaScript. Dùng "use client" directive.',
    whenToUse: [
      "Interactive dashboards, admin panels",
      "Ứng dụng không cần SEO",
      "Real-time data (chat, notifications)",
      "Heavy user interactions",
    ],
    pros: [
      "Tương tác mượt mà",
      "Giảm tải server",
      "UX giống native app",
    ],
    cons: [
      "SEO kém (ban đầu HTML rỗng)",
      "FCP chậm",
      "Phụ thuộc JavaScript",
    ],
    pathTypes: ["Static path: /client"],
  },
];

export default function RenderingDemoPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          Next.js 15 App Router
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          Rendering Strategies
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Khám phá và so sánh tất cả các chiến lược rendering trong Next.js 15.
          Mỗi trang demo đều có{" "}
          <span className="text-white font-semibold">code minh họa</span>,{" "}
          <span className="text-white font-semibold">timestamp</span> để bạn thấy sự khác biệt,
          và giải thích{" "}
          <span className="text-white font-semibold">khi nào nên dùng</span>.
        </p>
      </div>

      {/* Strategy Cards */}
      <div className="grid gap-6 sm:grid-cols-2">
        {strategies.map((s, i) => (
          <Link
            key={s.type}
            href={`rendering-demo/${s.href}`}
            className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04] hover:shadow-2xl hover:-translate-y-1"
            style={
              {
                animationDelay: `${i * 100}ms`,
                "--card-color": s.color,
              } as React.CSSProperties
            }
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
              }}
            />

            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${s.color}15` }}
                >
                  {s.emoji}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white group-hover:text-white/90">
                    {s.title}
                  </h2>
                  <span
                    className="text-xs font-bold tracking-wider"
                    style={{ color: s.color }}
                  >
                    {s.type}
                  </span>
                </div>
              </div>
              <span className="text-gray-600 group-hover:text-gray-400 transition-colors text-lg">
                →
              </span>
            </div>

            <p className="text-sm text-gray-400 mb-4">{s.description}</p>

            {/* When to use */}
            <div className="mb-4">
              <h4 className="text-[10px] uppercase tracking-wider text-gray-500 mb-2 font-semibold">
                Khi nào dùng
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {s.whenToUse.slice(0, 3).map((use) => (
                  <span
                    key={use}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-gray-400"
                  >
                    {use}
                  </span>
                ))}
              </div>
            </div>

            {/* Pros/Cons mini */}
            <div className="flex gap-4 text-[11px]">
              <div className="flex-1">
                <span className="text-emerald-500">✓</span>{" "}
                <span className="text-gray-500">{s.pros[0]}</span>
              </div>
              <div className="flex-1">
                <span className="text-red-400">✕</span>{" "}
                <span className="text-gray-500">{s.cons[0]}</span>
              </div>
            </div>

            {/* Path types */}
            <div className="mt-4 pt-4 border-t border-white/5 flex gap-2">
              {s.pathTypes.map((p) => (
                <span
                  key={p}
                  className="text-[10px] font-mono px-2 py-1 rounded-md bg-white/5 text-gray-500"
                >
                  {p}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="text-xl font-bold">📊 Bảng so sánh chi tiết</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-3 text-gray-400 font-semibold">
                  Tiêu chí
                </th>
                <th className="text-center px-4 py-3 font-semibold" style={{ color: "#10B981" }}>
                  SSG
                </th>
                <th className="text-center px-4 py-3 font-semibold" style={{ color: "#F59E0B" }}>
                  SSR
                </th>
                <th className="text-center px-4 py-3 font-semibold" style={{ color: "#6366F1" }}>
                  ISR
                </th>
                <th className="text-center px-4 py-3 font-semibold" style={{ color: "#EC4899" }}>
                  CSR
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              {[
                ["Thời điểm render", "Build time", "Request time", "Build + Revalidate", "Browser"],
                ["Tốc độ (TTFB)", "⚡ Nhanh nhất", "🐢 Chậm", "⚡ Nhanh", "⚡ Nhanh*"],
                ["SEO", "✅ Tuyệt vời", "✅ Tốt", "✅ Tuyệt vời", "❌ Kém"],
                ["Data freshness", "🔴 Stale", "🟢 Realtime", "🟡 Near-realtime", "🟢 Realtime"],
                ["Server load", "🟢 Thấp", "🔴 Cao", "🟢 Thấp", "🟢 Không"],
                ["Dynamic content", "❌ Không", "✅ Có", "✅ Có", "✅ Có"],
                ["Cá nhân hóa", "❌ Không", "✅ Có", "❌ Không", "✅ Có"],
              ].map((row) => (
                <tr key={row[0]} className="border-b border-white/5 hover:bg-white/[0.02]">
                  {row.map((cell, idx) => (
                    <td
                      key={idx}
                      className={`px-6 py-3 ${idx === 0 ? "text-left text-gray-300 font-medium" : "text-center"}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 bg-white/[0.02] text-xs text-gray-500">
          * CSR có TTFB nhanh nhưng FCP chậm vì phải đợi JavaScript load và fetch data
        </div>
      </div>

      {/* How Next.js 15 decides */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 space-y-4">
        <h2 className="text-xl font-bold">🧠 Next.js 15 quyết định rendering như thế nào?</h2>
        <div className="text-sm text-gray-400 space-y-3">
          <p>
            Trong App Router, Next.js 15 <span className="text-white font-medium">tự động chọn</span>{" "}
            chiến lược rendering dựa trên cách bạn viết code:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                trigger: "Không có dynamic function",
                result: "→ Static (SSG)",
                desc: "Mặc định nếu không dùng cookies(), headers(), searchParams",
                color: "#10B981",
              },
              {
                trigger: "Dùng cookies() / headers()",
                result: "→ Dynamic (SSR)",
                desc: "Next.js tự detect và chuyển sang dynamic rendering",
                color: "#F59E0B",
              },
              {
                trigger: 'export const revalidate = N',
                result: "→ ISR",
                desc: "Static nhưng tự revalidate sau N giây",
                color: "#6366F1",
              },
              {
                trigger: '"use client" + useEffect',
                result: "→ CSR",
                desc: "Render shell trên server, data fetch ở client",
                color: "#EC4899",
              },
            ].map((item) => (
              <div
                key={item.trigger}
                className="p-4 rounded-xl border border-white/5 bg-white/[0.02]"
              >
                <code
                  className="text-xs font-mono font-semibold"
                  style={{ color: item.color }}
                >
                  {item.trigger}
                </code>
                <p className="text-white font-semibold text-sm mt-1">{item.result}</p>
                <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
