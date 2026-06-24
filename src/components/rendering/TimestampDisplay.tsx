interface Props {
  label?: string;
  timestamp?: string;
  accentColor?: string;
}

export default function TimestampDisplay({
  label = "Rendered at",
  timestamp,
  accentColor = "#6366F1",
}: Props) {
  const displayTime = timestamp || new Date().toISOString();
  const date = new Date(displayTime);

  const formatted = date.toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3,
  });

  return (
    <div
      className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/10"
      style={{
        background: `linear-gradient(135deg, ${accentColor}15 0%, transparent 100%)`,
      }}
    >
      <div
        className="w-2 h-2 rounded-full animate-pulse"
        style={{ backgroundColor: accentColor }}
      />
      <div>
        <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-0.5">
          {label}
        </div>
        <div className="text-sm font-mono font-semibold text-white">
          {formatted}
        </div>
      </div>
    </div>
  );
}
