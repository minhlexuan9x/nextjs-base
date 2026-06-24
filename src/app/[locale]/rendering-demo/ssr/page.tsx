import Link from "next/link";
import { headers } from "next/headers";
import RenderingBadge from "@/components/rendering/RenderingBadge";
import TimestampDisplay from "@/components/rendering/TimestampDisplay";
import CodeBlock from "@/components/rendering/CodeBlock";
import InfoCard from "@/components/rendering/InfoCard";
import { getRealtimeWeather, userProfiles } from "@/lib/mock-data";

// ✅ Force dynamic rendering — mỗi request sẽ render HTML mới
export const dynamic = "force-dynamic";

const codeExample = `// page.tsx — SSR Static Path

// ✅ Cách 1: Dùng export config
export const dynamic = 'force-dynamic';

// ✅ Cách 2: Dùng dynamic functions (tự động SSR)
import { headers, cookies } from 'next/headers';

export default async function SSRPage() {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent');

  // Mỗi request → server render HTML mới
  const weather = await fetchWeather(); // Realtime data
  return <WeatherDashboard data={weather} />;
}

// ⚡ Mỗi lần reload → timestamp MỚI
// vì server render lại HTML cho mỗi request`;

export default async function SSRListPage() {
  const renderTime = new Date().toISOString();
  const weather = getRealtimeWeather();

  // Đọc headers để chứng minh đây là SSR
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "Unknown";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <RenderingBadge type="SSR" showDescription />
        <h1 className="text-3xl font-black tracking-tight text-white">
          Server-Side Rendering
        </h1>
        <p className="text-gray-400">
          Trang này được render{" "}
          <span className="text-amber-400 font-semibold">
            mới mỗi lần request
          </span>
          . Reload trang để thấy timestamp thay đổi!
        </p>
      </div>

      {/* Timestamp */}
      <TimestampDisplay
        label="Rendered at (Every request)"
        timestamp={renderTime}
        accentColor="#F59E0B"
      />
      <p className="text-xs text-gray-500 -mt-4">
        ⚡ Reload trang — timestamp này <strong>thay đổi mỗi lần</strong> vì
        server render HTML mới cho mỗi request!
      </p>

      {/* Request Info */}
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-2">
        <h3 className="text-sm font-bold text-amber-400">
          🔍 Request Headers (chứng minh SSR)
        </h3>
        <div className="text-xs font-mono text-gray-400 break-all">
          <p>
            <span className="text-amber-400">User-Agent:</span>{" "}
            {userAgent.substring(0, 120)}...
          </p>
        </div>
        <p className="text-[11px] text-gray-500">
          Việc dùng <code className="text-amber-400">headers()</code> khiến
          Next.js tự động chuyển sang dynamic rendering (SSR)
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <InfoCard title="Khi nào dùng SSR?" icon="🎯" accentColor="#F59E0B">
          <ul className="space-y-1.5 list-none">
            <li>✅ Dashboard cá nhân hóa</li>
            <li>✅ Dữ liệu realtime (thời tiết, stock)</li>
            <li>✅ Nội dung phụ thuộc vào user/cookies</li>
            <li>✅ Search results</li>
          </ul>
        </InfoCard>
        <InfoCard
          title="Tự động SSR khi dùng"
          icon="⚙️"
          accentColor="#F59E0B"
        >
          <ul className="space-y-1.5 list-none font-mono text-xs">
            <li>
              <code className="text-amber-400">cookies()</code> — đọc cookies
            </li>
            <li>
              <code className="text-amber-400">headers()</code> — đọc request headers
            </li>
            <li>
              <code className="text-amber-400">searchParams</code> — query params
            </li>
            <li>
              <code className="text-amber-400">{`dynamic = 'force-dynamic'`}</code>
            </li>
          </ul>
        </InfoCard>
      </div>

      {/* Weather Dashboard */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">
          🌤️ Thời tiết realtime{" "}
          <span className="text-sm font-normal text-gray-500">
            (Static path: /ssr — dữ liệu thay đổi mỗi request)
          </span>
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {weather.map((w) => (
            <div
              key={w.city}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:border-amber-500/20 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{w.emoji}</span>
                <span className="text-2xl font-black text-white">
                  {w.temperature}°C
                </span>
              </div>
              <h3 className="font-bold text-white">{w.city}</h3>
              <p className="text-sm text-gray-400">{w.condition}</p>
              <div className="flex gap-3 mt-3 text-xs text-gray-500">
                <span>💧 {w.humidity}%</span>
                <span>💨 {w.wind}</span>
                <span>☀️ UV {w.uvIndex}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500">
          💡 Reload trang — nhiệt độ và độ ẩm sẽ <strong>thay đổi</strong> vì data
          được fetch lại mỗi request!
        </p>
      </div>

      {/* User Profiles */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">
          👥 User Profiles{" "}
          <span className="text-sm font-normal text-gray-500">
            (Dynamic path: /ssr/[id])
          </span>
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {userProfiles.map((user) => (
            <Link
              key={user.id}
              href={`ssr/${user.id}`}
              className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:border-amber-500/20 hover:bg-white/[0.04] transition-all"
            >
              <div className="text-4xl mb-3">{user.avatar}</div>
              <h3 className="font-bold text-white group-hover:text-amber-400 transition-colors">
                {user.name}
              </h3>
              <p className="text-xs text-amber-400/80">{user.role}</p>
              <p className="text-xs text-gray-500 mt-2 line-clamp-2">{user.bio}</p>
              <div className="flex gap-3 mt-3 text-xs text-gray-500">
                <span>{user.stats.posts} posts</span>
                <span>{user.stats.followers} followers</span>
              </div>
            </Link>
          ))}
        </div>
        <p className="text-xs text-gray-500">
          👆 Click vào user để xem demo{" "}
          <strong>SSR với dynamic path [id]</strong> — không dùng
          generateStaticParams
        </p>
      </div>

      {/* Code Example */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-white">💻 Code minh họa</h2>
        <CodeBlock code={codeExample} filename="app/ssr/page.tsx" />
      </div>
    </div>
  );
}
