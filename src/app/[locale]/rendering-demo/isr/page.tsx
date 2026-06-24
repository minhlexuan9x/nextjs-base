import Link from "next/link";
import RenderingBadge from "@/components/rendering/RenderingBadge";
import TimestampDisplay from "@/components/rendering/TimestampDisplay";
import CodeBlock from "@/components/rendering/CodeBlock";
import InfoCard from "@/components/rendering/InfoCard";
import { products, formatVND } from "@/lib/mock-data";

// ✅ ISR: Revalidate mỗi 30 giây
export const revalidate = 30;

const codeExample = `// page.tsx — ISR Static Path

// ✅ Revalidate mỗi 30 giây
export const revalidate = 30;

export default function ISRPage() {
  // Lần đầu: render và cache như SSG
  // Sau 30s: request tiếp theo trigger background regeneration
  // Request kế tiếp nhận HTML mới
  const products = getProducts();
  return <ProductList products={products} />;
}

// Cơ chế stale-while-revalidate:
// 1. User A truy cập → nhận cached HTML (nhanh!)
// 2. Sau 30s, User B truy cập → vẫn nhận cached HTML
//    nhưng trigger regeneration ở background
// 3. User C truy cập → nhận HTML mới!`;

export default function ISRListPage() {
  const renderTime = new Date().toISOString();

  // Simulate thêm random price variation để thấy ISR
  const productsWithVariation = products.map((p) => ({
    ...p,
    currentPrice:
      p.price + Math.round((Math.random() * 200000 - 100000) / 1000) * 1000,
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <RenderingBadge type="ISR" showDescription />
        <h1 className="text-3xl font-black tracking-tight text-white">
          Incremental Static Regeneration
        </h1>
        <p className="text-gray-400">
          Trang này là{" "}
          <span className="text-indigo-400 font-semibold">static</span> nhưng tự
          động{" "}
          <span className="text-indigo-400 font-semibold">
            revalidate mỗi 30 giây
          </span>
          . Best of both worlds!
        </p>
      </div>

      {/* Timestamp */}
      <div className="flex flex-wrap items-center gap-4">
        <TimestampDisplay
          label="Cached at (revalidate = 30s)"
          timestamp={renderTime}
          accentColor="#6366F1"
        />
        <div className="px-3 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
          <span className="text-xs text-indigo-400 font-mono">
            revalidate = 30
          </span>
        </div>
      </div>
      <p className="text-xs text-gray-500 -mt-4">
        🔄 Timestamp giữ nguyên trong 30 giây, sau đó sẽ thay đổi khi page được
        regenerate ở background. Trong dev mode sẽ thay đổi mỗi lần reload.
      </p>

      {/* Info Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <InfoCard title="Khi nào dùng ISR?" icon="🎯" accentColor="#6366F1">
          <ul className="space-y-1.5 list-none">
            <li>✅ E-commerce product pages</li>
            <li>✅ Tin tức, bài báo (cập nhật vài phút)</li>
            <li>✅ Nội dung thay đổi định kỳ</li>
            <li>✅ Cần static performance + data freshness</li>
          </ul>
        </InfoCard>
        <InfoCard
          title="Stale-While-Revalidate"
          icon="🔄"
          accentColor="#6366F1"
        >
          <ol className="space-y-1.5 list-none">
            <li>
              1️⃣ Request đầu → serve cached HTML{" "}
              <span className="text-emerald-400">(nhanh!)</span>
            </li>
            <li>
              2️⃣ Sau {30}s → trigger regeneration{" "}
              <span className="text-indigo-400">(background)</span>
            </li>
            <li>
              3️⃣ Request tiếp → serve HTML mới{" "}
              <span className="text-emerald-400">(cập nhật!)</span>
            </li>
          </ol>
        </InfoCard>
      </div>

      {/* Product List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">
          🛍️ Sản phẩm{" "}
          <span className="text-sm font-normal text-gray-500">
            (Static path: /isr — giá tự cập nhật mỗi 30s)
          </span>
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {productsWithVariation.map((product) => (
            <Link
              key={product.slug}
              href={`isr/${product.slug}`}
              className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:border-indigo-500/20 hover:bg-white/[0.04] transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-4xl">{product.emoji}</span>
                {!product.inStock && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                    Hết hàng
                  </span>
                )}
              </div>
              <h3 className="font-bold text-white group-hover:text-indigo-400 transition-colors">
                {product.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{product.category}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-lg font-bold text-indigo-400">
                  {formatVND(product.currentPrice)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-500 line-through">
                    {formatVND(product.originalPrice)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <span>⭐ {product.rating}</span>
                <span>({product.reviewCount} đánh giá)</span>
              </div>
            </Link>
          ))}
        </div>
        <p className="text-xs text-gray-500">
          👆 Click vào sản phẩm để xem demo{" "}
          <strong>ISR với dynamic path [slug]</strong> +{" "}
          <code className="text-indigo-400">dynamicParams = true</code>
        </p>
      </div>

      {/* Code Example */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-white">💻 Code minh họa</h2>
        <CodeBlock code={codeExample} filename="app/isr/page.tsx" />
      </div>
    </div>
  );
}
