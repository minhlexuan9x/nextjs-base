import { notFound } from "next/navigation";
import Link from "next/link";
import RenderingBadge from "@/components/rendering/RenderingBadge";
import TimestampDisplay from "@/components/rendering/TimestampDisplay";
import CodeBlock from "@/components/rendering/CodeBlock";
import InfoCard from "@/components/rendering/InfoCard";
import { products, getProduct, formatVND } from "@/lib/mock-data";

// ✅ Revalidate mỗi 60 giây
export const revalidate = 60;

// ✅ Pre-render một số slug tại build time
export async function generateStaticParams() {
  // Chỉ pre-render 2 sản phẩm đầu tiên
  return products.slice(0, 2).map((product) => ({
    slug: product.slug,
  }));
}

// ✅ Cho phép render on-demand slug mới (không có trong generateStaticParams)
export const dynamicParams = true;

const codeExample = `// [slug]/page.tsx — ISR Dynamic Path

// ✅ Revalidate mỗi 60 giây
export const revalidate = 60;

// ✅ Chỉ pre-render một số slug "hot"
export async function generateStaticParams() {
  const hotProducts = await fetchHotProducts();
  return hotProducts.map((p) => ({ slug: p.slug }));
}

// ✅ Cho phép slug mới (chưa pre-render) render on-demand
export const dynamicParams = true;
// Lần đầu: SSR → cache kết quả
// Lần sau: serve từ cache (như SSG)
// Sau 60s: revalidate ở background

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await fetchProduct(slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}`;

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ISRProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const renderTime = new Date().toISOString();
  const isPreRendered = products.slice(0, 2).some((p) => p.slug === slug);

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="../isr" className="hover:text-indigo-400 transition-colors">
          ISR
        </Link>
        <span>/</span>
        <span className="text-gray-300">{slug}</span>
      </div>

      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <RenderingBadge type="ISR" />
          <span className="text-xs px-2 py-1 rounded-md bg-indigo-500/10 text-indigo-400 font-mono">
            Dynamic Path: [slug] + revalidate = 60
          </span>
          {isPreRendered ? (
            <span className="text-xs px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400">
              ✅ Pre-rendered at build
            </span>
          ) : (
            <span className="text-xs px-2 py-1 rounded-md bg-amber-500/10 text-amber-400">
              ⚡ On-demand rendered
            </span>
          )}
        </div>
      </div>

      {/* Product Card */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 px-6 py-10 text-center">
          <span className="text-7xl">{product.emoji}</span>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
              {product.category}
            </span>
            <h1 className="text-2xl font-black text-white mt-1">
              {product.name}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-black text-indigo-400">
              {formatVND(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">
                {formatVND(product.originalPrice)}
              </span>
            )}
            {product.originalPrice && (
              <span className="text-xs px-2 py-1 rounded-full bg-red-500/10 text-red-400">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}
                %
              </span>
            )}
          </div>

          <p className="text-gray-400">{product.description}</p>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">⭐</span>
              <span className="text-white font-semibold">{product.rating}</span>
              <span className="text-gray-500">
                ({product.reviewCount} đánh giá)
              </span>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                product.inStock
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              {product.inStock ? "✅ Còn hàng" : "❌ Hết hàng"}
            </span>
          </div>
        </div>
      </div>

      {/* Timestamp */}
      <div className="flex flex-wrap items-center gap-4">
        <TimestampDisplay
          label="Cached at (revalidate = 60s)"
          timestamp={renderTime}
          accentColor="#6366F1"
        />
      </div>

      {/* Pre-render explanation */}
      <div
        className={`rounded-xl border p-4 space-y-2 ${
          isPreRendered
            ? "border-emerald-500/20 bg-emerald-500/5"
            : "border-amber-500/20 bg-amber-500/5"
        }`}
      >
        <h3
          className={`text-sm font-bold ${
            isPreRendered ? "text-emerald-400" : "text-amber-400"
          }`}
        >
          {isPreRendered
            ? "📦 Slug này đã được pre-render tại build time"
            : "⚡ Slug này được render on-demand (lần đầu)"}
        </h3>
        <p className="text-xs text-gray-400">
          {isPreRendered
            ? `"${slug}" nằm trong danh sách generateStaticParams() → HTML đã được tạo sẵn lúc build. Sau 60s sẽ revalidate ở background.`
            : `"${slug}" KHÔNG nằm trong generateStaticParams(), nhưng dynamicParams = true → lần đầu render on-demand (SSR), sau đó cache lại. Sau 60s sẽ revalidate.`}
        </p>
      </div>

      {/* Key Concepts */}
      <div className="grid gap-4 sm:grid-cols-2">
        <InfoCard title="dynamicParams = true" icon="✅" accentColor="#6366F1">
          <p>
            Cho phép render <strong>slug mới</strong> mà không có trong
            generateStaticParams(). Lần đầu sẽ SSR, sau đó cache lại giống SSG.
          </p>
          <p className="mt-2 text-indigo-400">
            Hoàn hảo cho e-commerce: pre-render sản phẩm &quot;hot&quot;, còn
            lại render on-demand.
          </p>
        </InfoCard>
        <InfoCard title="revalidate = 60" icon="⏱️" accentColor="#6366F1">
          <p>
            Sau <strong>60 giây</strong>, request tiếp theo sẽ trigger
            regeneration ở background. User nhận cached version, request sau
            nhận bản mới.
          </p>
          <p className="mt-2">
            Có thể set ở page level hoặc trong{" "}
            <code className="text-indigo-400">fetch()</code> options.
          </p>
        </InfoCard>
      </div>

      {/* Code */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-white">💻 Code minh họa</h2>
        <CodeBlock code={codeExample} filename="app/isr/[slug]/page.tsx" />
      </div>

      {/* Back */}
      <Link
        href="../isr"
        className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
      >
        ← Quay lại sản phẩm
      </Link>
    </div>
  );
}
