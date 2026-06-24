import { ReactNode } from "react";

interface Props {
  title: string;
  icon?: string;
  accentColor?: string;
  children: ReactNode;
}

export default function InfoCard({
  title,
  icon = "💡",
  accentColor = "#6366F1",
  children,
}: Props) {
  return (
    <div
      className="relative rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-xl"
      style={{
        background: `linear-gradient(135deg, ${accentColor}08 0%, transparent 50%)`,
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Glow accent */}
      <div
        className="absolute top-0 left-0 w-full h-0.5"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
        }}
      />

      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>

      <div className="text-sm text-gray-300 leading-relaxed space-y-2">
        {children}
      </div>
    </div>
  );
}
