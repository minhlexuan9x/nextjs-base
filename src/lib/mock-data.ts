// ============================================
// MOCK DATA cho các demo Rendering Strategies
// ============================================

// --- SSG: Blog Posts ---
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  coverEmoji: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "nextjs-15-features",
    title: "Tính năng mới trong Next.js 15",
    excerpt:
      "Khám phá các tính năng mới nhất của Next.js 15 bao gồm Turbopack, React 19, và nhiều cải tiến khác.",
    content: `Next.js 15 mang đến nhiều cải tiến đáng kể:\n\n1. **Turbopack** - Bundler mới nhanh gấp 700x so với Webpack\n2. **React 19** - Server Components, Actions, và Form handling\n3. **Partial Prerendering (PPR)** - Kết hợp static shell + dynamic content\n4. **Enhanced Caching** - Kiểm soát cache tốt hơn với revalidate\n5. **Async Request APIs** - params, searchParams, cookies, headers đều async`,
    author: "Minh",
    date: "2025-12-15",
    readTime: "5 phút",
    tags: ["Next.js", "React", "Web Development"],
    coverEmoji: "🚀",
  },
  {
    slug: "ssg-vs-ssr",
    title: "SSG vs SSR: Khi nào dùng gì?",
    excerpt:
      "So sánh chi tiết giữa Static Site Generation và Server-Side Rendering trong Next.js.",
    content: `## SSG (Static Site Generation)\nTrang được render tại **build time**. HTML được tạo sẵn và serve từ CDN.\n\n**Ưu điểm:** Nhanh nhất, tiết kiệm server, SEO tốt\n**Nhược điểm:** Dữ liệu có thể cũ, phải rebuild để cập nhật\n\n## SSR (Server-Side Rendering)\nTrang được render **mỗi request**. Server tạo HTML mới cho mỗi lần truy cập.\n\n**Ưu điểm:** Dữ liệu luôn mới, cá nhân hóa được\n**Nhược điểm:** Chậm hơn SSG, tốn tài nguyên server`,
    author: "Minh",
    date: "2025-11-20",
    readTime: "8 phút",
    tags: ["SSG", "SSR", "Performance"],
    coverEmoji: "⚡",
  },
  {
    slug: "react-server-components",
    title: "React Server Components là gì?",
    excerpt:
      "Tìm hiểu về React Server Components - paradigm mới thay đổi cách chúng ta xây dựng ứng dụng React.",
    content: `React Server Components (RSC) cho phép render component trên server mà không cần gửi JavaScript tới client.\n\n**Lợi ích chính:**\n- Giảm bundle size JavaScript\n- Truy cập trực tiếp database/filesystem\n- Tự động code splitting\n- Zero client-side JavaScript cho static content\n\n**Lưu ý:**\n- Không thể dùng hooks (useState, useEffect)\n- Không thể dùng browser APIs\n- Dùng "use client" directive cho interactive components`,
    author: "Minh",
    date: "2025-10-05",
    readTime: "6 phút",
    tags: ["React", "Server Components", "Architecture"],
    coverEmoji: "🧩",
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

// --- ISR: Products ---
export interface Product {
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  emoji: string;
}

export const products: Product[] = [
  {
    slug: "mechanical-keyboard",
    name: "Bàn phím cơ RGB Pro",
    price: 1599000,
    originalPrice: 2199000,
    description:
      "Bàn phím cơ hot-swap, switch Cherry MX, LED RGB 16.8 triệu màu, kết nối USB-C.",
    category: "Phụ kiện",
    rating: 4.8,
    reviewCount: 342,
    inStock: true,
    emoji: "⌨️",
  },
  {
    slug: "wireless-mouse",
    name: "Chuột không dây Ultra Light",
    price: 899000,
    description:
      "Chuột gaming không dây 60g, sensor PAW3395, pin 70h, polling rate 4000Hz.",
    category: "Phụ kiện",
    rating: 4.6,
    reviewCount: 189,
    inStock: true,
    emoji: "🖱️",
  },
  {
    slug: "monitor-4k",
    name: 'Màn hình 4K 27" IPS',
    price: 8990000,
    originalPrice: 10990000,
    description:
      'Màn hình 27 inch, 4K UHD, IPS, 144Hz, HDR600, 99% sRGB, USB-C PD 90W.',
    category: "Màn hình",
    rating: 4.9,
    reviewCount: 567,
    inStock: true,
    emoji: "🖥️",
  },
  {
    slug: "usb-c-hub",
    name: "Hub USB-C 7-in-1",
    price: 650000,
    description:
      "Hub USB-C với HDMI 4K@60Hz, 2x USB-A 3.0, SD/TF, PD 100W, Ethernet RJ45.",
    category: "Phụ kiện",
    rating: 4.4,
    reviewCount: 98,
    inStock: false,
    emoji: "🔌",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

// --- SSR: User Profiles ---
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  bio: string;
  joinDate: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
}

export const userProfiles: UserProfile[] = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    role: "Senior Developer",
    avatar: "👨‍💻",
    bio: "Full-stack developer với 5 năm kinh nghiệm. Đam mê Next.js và React.",
    joinDate: "2023-01-15",
    stats: { posts: 42, followers: 1200, following: 350 },
  },
  {
    id: "2",
    name: "Trần Thị B",
    email: "tranthib@example.com",
    role: "UI/UX Designer",
    avatar: "👩‍🎨",
    bio: "Designer sáng tạo, chuyên về design systems và micro-interactions.",
    joinDate: "2023-06-20",
    stats: { posts: 28, followers: 890, following: 210 },
  },
  {
    id: "3",
    name: "Lê Minh C",
    email: "leminhc@example.com",
    role: "DevOps Engineer",
    avatar: "🧑‍🔧",
    bio: "DevOps engineer, chuyên CI/CD, Docker, Kubernetes và cloud infrastructure.",
    joinDate: "2022-11-01",
    stats: { posts: 15, followers: 560, following: 180 },
  },
];

export function getUserProfile(id: string): UserProfile | undefined {
  return userProfiles.find((user) => user.id === id);
}

// --- SSR: Weather Data (simulated realtime) ---
export interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  condition: string;
  emoji: string;
  wind: string;
  uvIndex: number;
}

export function getRealtimeWeather(): WeatherData[] {
  // Simulate "realtime" by adding random variations
  const baseData: WeatherData[] = [
    {
      city: "Hà Nội",
      temperature: 28 + Math.round(Math.random() * 6 - 3),
      humidity: 70 + Math.round(Math.random() * 20 - 10),
      condition: "Nhiều mây",
      emoji: "⛅",
      wind: `${10 + Math.round(Math.random() * 10)} km/h`,
      uvIndex: Math.round(Math.random() * 5 + 3),
    },
    {
      city: "Hồ Chí Minh",
      temperature: 32 + Math.round(Math.random() * 4 - 2),
      humidity: 65 + Math.round(Math.random() * 20 - 10),
      condition: "Nắng nóng",
      emoji: "☀️",
      wind: `${5 + Math.round(Math.random() * 8)} km/h`,
      uvIndex: Math.round(Math.random() * 3 + 7),
    },
    {
      city: "Đà Nẵng",
      temperature: 30 + Math.round(Math.random() * 4 - 2),
      humidity: 75 + Math.round(Math.random() * 15 - 7),
      condition: "Có mưa rào",
      emoji: "🌧️",
      wind: `${15 + Math.round(Math.random() * 10)} km/h`,
      uvIndex: Math.round(Math.random() * 4 + 2),
    },
  ];
  return baseData;
}

// Helper: format VND
export function formatVND(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}
