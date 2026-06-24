import { notFound } from "next/navigation";
import Link from "next/link";
import { cookies } from "next/headers";
import RenderingBadge from "@/components/rendering/RenderingBadge";
import TimestampDisplay from "@/components/rendering/TimestampDisplay";
import CodeBlock from "@/components/rendering/CodeBlock";
import InfoCard from "@/components/rendering/InfoCard";
import { getUserProfile } from "@/lib/mock-data";

// ❌ Không có generateStaticParams → mỗi id sẽ render on-demand (SSR)

const codeExample = `// [id]/page.tsx — SSR Dynamic Path

// ❌ KHÔNG dùng generateStaticParams()
// → Mỗi request với bất kỳ id nào đều render on-demand

export default async function UserPage({ params }) {
  const { id } = await params;

  // Dùng cookies() → Next.js tự chuyển sang SSR
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme');

  const user = await fetchUser(id);
  if (!user) notFound();

  return <UserProfile user={user} />;
}

// 🔑 Key: Không có generateStaticParams
//    + dùng cookies() = luôn SSR`;

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SSRUserPage({ params }: Props) {
  const { id } = await params;
  const user = getUserProfile(id);

  if (!user) {
    notFound();
  }

  const renderTime = new Date().toISOString();

  // Dùng cookies() để force SSR
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link
          href="../ssr"
          className="hover:text-amber-400 transition-colors"
        >
          SSR
        </Link>
        <span>/</span>
        <span className="text-gray-300">User {id}</span>
      </div>

      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <RenderingBadge type="SSR" />
          <span className="text-xs px-2 py-1 rounded-md bg-amber-500/10 text-amber-400 font-mono">
            Dynamic Path: [id] — No generateStaticParams
          </span>
        </div>
      </div>

      {/* User Profile Card */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
        <div className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 px-6 py-8 text-center">
          <div className="text-6xl mb-4">{user.avatar}</div>
          <h1 className="text-2xl font-black text-white">{user.name}</h1>
          <p className="text-amber-400 text-sm">{user.role}</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-xl bg-white/5">
              <div className="text-xl font-bold text-white">
                {user.stats.posts}
              </div>
              <div className="text-xs text-gray-500">Posts</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5">
              <div className="text-xl font-bold text-white">
                {user.stats.followers.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">Followers</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5">
              <div className="text-xl font-bold text-white">
                {user.stats.following}
              </div>
              <div className="text-xs text-gray-500">Following</div>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            <p>{user.bio}</p>
          </div>
          <div className="text-xs text-gray-500 space-y-1">
            <p>📧 {user.email}</p>
            <p>📅 Tham gia: {user.joinDate}</p>
          </div>
        </div>
      </div>

      {/* Timestamp */}
      <TimestampDisplay
        label="Server rendered at (mỗi request)"
        timestamp={renderTime}
        accentColor="#F59E0B"
      />
      <p className="text-xs text-gray-500 -mt-4">
        ⚡ Mỗi lần truy cập /ssr/{id}, server render HTML mới. Timestamp luôn khác!
      </p>

      {/* Cookies info */}
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-2">
        <h3 className="text-sm font-bold text-amber-400">
          🍪 Cookies (chứng minh SSR)
        </h3>
        <p className="text-xs text-gray-400">
          Dùng <code className="text-amber-400">cookies()</code> → Next.js{" "}
          <strong>bắt buộc</strong> render dynamic (SSR).
        </p>
        <p className="text-xs text-gray-500">
          Cookies hiện tại: {allCookies.length > 0 ? allCookies.map((c) => c.name).join(", ") : "(không có cookie)"}
        </p>
      </div>

      {/* Key Concepts */}
      <div className="grid gap-4 sm:grid-cols-2">
        <InfoCard
          title="Không có generateStaticParams"
          icon="❌"
          accentColor="#F59E0B"
        >
          <p>
            Khác với SSG, trang SSR{" "}
            <strong>không dùng generateStaticParams()</strong>. Nghĩa là{" "}
            <strong>bất kỳ id nào</strong> cũng sẽ được render on-demand.
          </p>
        </InfoCard>
        <InfoCard
          title="Tự động detect SSR"
          icon="🔍"
          accentColor="#F59E0B"
        >
          <p>
            Next.js tự phát hiện bạn dùng <code className="text-amber-400">cookies()</code>,{" "}
            <code className="text-amber-400">headers()</code> hoặc{" "}
            <code className="text-amber-400">searchParams</code> và chuyển sang SSR.
          </p>
        </InfoCard>
      </div>

      {/* Code */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-white">💻 Code minh họa</h2>
        <CodeBlock
          code={codeExample}
          filename="app/ssr/[id]/page.tsx"
        />
      </div>

      {/* Back */}
      <Link
        href="../ssr"
        className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors"
      >
        ← Quay lại SSR
      </Link>
    </div>
  );
}
