"use client";

import { useState, useEffect, useCallback } from "react";
import RenderingBadge from "@/components/rendering/RenderingBadge";
import CodeBlock from "@/components/rendering/CodeBlock";
import InfoCard from "@/components/rendering/InfoCard";

// ✅ "use client" → Component này render trên BROWSER
// Shell HTML được gửi từ server, nhưng data fetch ở client

const codeExample = `// page.tsx — CSR (Client-Side Rendering)
"use client";

import { useState, useEffect } from 'react';

export default function CSRPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data trên CLIENT (browser)
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <Skeleton />;
  return <Dashboard data={data} />;
}

// 🔑 Key differences:
// - HTML ban đầu KHÔNG có data (chỉ skeleton/loading)
// - SEO crawlers thấy HTML rỗng
// - JavaScript phải load xong mới fetch data
// - Nhưng tương tác mượt mà như native app`;

interface CryptoPrice {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  emoji: string;
}

function generateCryptoPrices(): CryptoPrice[] {
  return [
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: 67000 + Math.round(Math.random() * 2000 - 1000),
      change24h: +(Math.random() * 6 - 3).toFixed(2),
      emoji: "₿",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: 3500 + Math.round(Math.random() * 200 - 100),
      change24h: +(Math.random() * 8 - 4).toFixed(2),
      emoji: "Ξ",
    },
    {
      name: "Solana",
      symbol: "SOL",
      price: 145 + Math.round(Math.random() * 20 - 10),
      change24h: +(Math.random() * 10 - 5).toFixed(2),
      emoji: "◎",
    },
    {
      name: "Cardano",
      symbol: "ADA",
      price: +(0.45 + Math.random() * 0.1 - 0.05).toFixed(4),
      change24h: +(Math.random() * 12 - 6).toFixed(2),
      emoji: "₳",
    },
  ];
}

export default function CSRPage() {
  const [prices, setPrices] = useState<CryptoPrice[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [fetchCount, setFetchCount] = useState(0);

  // Simulate fetching data from API (client-side)
  const fetchPrices = useCallback(() => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setPrices(generateCryptoPrices());
      setLoading(false);
      setFetchCount((c) => c + 1);
    }, 800);
  }, []);

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleString("vi-VN", {
          timeZone: "Asia/Ho_Chi_Minh",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          fractionalSecondDigits: 1,
        })
      );
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <RenderingBadge type="CSR" showDescription />
        <h1 className="text-3xl font-black tracking-tight text-white">
          Client-Side Rendering
        </h1>
        <p className="text-gray-400">
          Trang này render hoàn toàn trên{" "}
          <span className="text-pink-400 font-semibold">browser</span>. Server
          chỉ gửi HTML shell rỗng + JavaScript bundle.
        </p>
      </div>

      {/* Live Clock */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl border border-pink-500/20 bg-pink-500/5">
          <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
          <div>
            <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-0.5">
              Live Clock (Client)
            </div>
            <div className="text-sm font-mono font-semibold text-white">
              {currentTime || "Loading..."}
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-500">
          ⏰ Đồng hồ chạy realtime trên browser — không thể làm điều này với SSG/SSR!
        </div>
      </div>

      {/* Interactive Counter */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
        <h3 className="text-sm font-bold text-pink-400 mb-4">
          🎮 Interactive Counter (Client-Side State)
        </h3>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCounter((c) => c - 1)}
            className="w-10 h-10 rounded-lg bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 transition-colors text-lg font-bold"
          >
            −
          </button>
          <span className="text-4xl font-black text-white min-w-[80px] text-center">
            {counter}
          </span>
          <button
            onClick={() => setCounter((c) => c + 1)}
            className="w-10 h-10 rounded-lg bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 transition-colors text-lg font-bold"
          >
            +
          </button>
          <button
            onClick={() => setCounter(0)}
            className="px-3 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors text-xs"
          >
            Reset
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          useState + onClick — chỉ hoạt động ở client. Server không biết giá trị
          counter.
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <InfoCard title="Khi nào dùng CSR?" icon="🎯" accentColor="#EC4899">
          <ul className="space-y-1.5 list-none">
            <li>✅ Interactive dashboards, admin panels</li>
            <li>✅ Ứng dụng không cần SEO</li>
            <li>✅ Real-time data (chat, notifications)</li>
            <li>✅ Heavy user interactions</li>
          </ul>
        </InfoCard>
        <InfoCard title="Lưu ý quan trọng" icon="⚠️" accentColor="#EC4899">
          <ul className="space-y-1.5 list-none">
            <li>
              ❌ SEO kém — HTML ban đầu <strong>không có data</strong>
            </li>
            <li>❌ FCP chậm — phải đợi JS load xong</li>
            <li>❌ Phụ thuộc hoàn toàn vào JavaScript</li>
            <li>
              💡 Nên kết hợp với SSR cho phần cần SEO
            </li>
          </ul>
        </InfoCard>
      </div>

      {/* Crypto Dashboard */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            📈 Crypto Prices{" "}
            <span className="text-sm font-normal text-gray-500">
              (Fetched on client via useEffect)
            </span>
          </h2>
          <button
            onClick={fetchPrices}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 transition-colors text-xs font-semibold disabled:opacity-50"
          >
            {loading ? "Loading..." : `🔄 Refresh (${fetchCount})`}
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {loading
            ? // Skeleton loading
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-5 animate-pulse"
                >
                  <div className="flex justify-between mb-3">
                    <div className="w-10 h-10 rounded-full bg-white/10" />
                    <div className="w-20 h-6 rounded bg-white/10" />
                  </div>
                  <div className="w-24 h-5 rounded bg-white/10 mb-2" />
                  <div className="w-32 h-4 rounded bg-white/10" />
                </div>
              ))
            : prices?.map((crypto) => (
                <div
                  key={crypto.symbol}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:border-pink-500/20 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center text-lg font-bold text-pink-400">
                      {crypto.emoji}
                    </div>
                    <span
                      className={`text-sm font-bold ${
                        crypto.change24h >= 0
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >
                      {crypto.change24h >= 0 ? "+" : ""}
                      {crypto.change24h}%
                    </span>
                  </div>
                  <h3 className="font-bold text-white">{crypto.name}</h3>
                  <p className="text-xs text-gray-500">{crypto.symbol}</p>
                  <p className="text-lg font-bold text-white mt-2">
                    ${crypto.price.toLocaleString()}
                  </p>
                </div>
              ))}
        </div>
        <p className="text-xs text-gray-500">
          👆 Click &quot;Refresh&quot; — data được fetch lại trên browser. Thấy skeleton
          loading không? Đó là nhược điểm của CSR: user phải chờ JS + fetch.
        </p>
      </div>

      {/* SSR vs CSR comparison */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="text-lg font-bold">🔍 SSR vs CSR: View Source</h2>
        </div>
        <div className="p-6 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-amber-400">
              SSR — View Source
            </h4>
            <div className="rounded-lg bg-[#0d1117] p-3 text-xs font-mono text-gray-400">
              <p className="text-emerald-400">&lt;!-- HTML đầy đủ data --&gt;</p>
              <p>&lt;h1&gt;Thời tiết Hà Nội&lt;/h1&gt;</p>
              <p>&lt;p&gt;28°C, Nhiều mây&lt;/p&gt;</p>
              <p className="text-emerald-400">✅ SEO crawlers thấy nội dung</p>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-pink-400">
              CSR — View Source
            </h4>
            <div className="rounded-lg bg-[#0d1117] p-3 text-xs font-mono text-gray-400">
              <p className="text-red-400">&lt;!-- HTML rỗng --&gt;</p>
              <p>&lt;div id=&quot;root&quot;&gt;&lt;/div&gt;</p>
              <p>&lt;script src=&quot;bundle.js&quot;&gt;&lt;/script&gt;</p>
              <p className="text-red-400">❌ SEO crawlers thấy HTML trống</p>
            </div>
          </div>
        </div>
      </div>

      {/* Code Example */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-white">💻 Code minh họa</h2>
        <CodeBlock code={codeExample} filename="app/client/page.tsx" />
      </div>
    </div>
  );
}
