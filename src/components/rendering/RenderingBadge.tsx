type RenderingType = "SSG" | "SSR" | "ISR" | "CSR";

const config: Record<
  RenderingType,
  { label: string; color: string; bgColor: string; description: string }
> = {
  SSG: {
    label: "SSG",
    color: "#10B981",
    bgColor: "rgba(16, 185, 129, 0.15)",
    description: "Static Site Generation",
  },
  SSR: {
    label: "SSR",
    color: "#F59E0B",
    bgColor: "rgba(245, 158, 11, 0.15)",
    description: "Server-Side Rendering",
  },
  ISR: {
    label: "ISR",
    color: "#6366F1",
    bgColor: "rgba(99, 102, 241, 0.15)",
    description: "Incremental Static Regeneration",
  },
  CSR: {
    label: "CSR",
    color: "#EC4899",
    bgColor: "rgba(236, 72, 153, 0.15)",
    description: "Client-Side Rendering",
  },
};

interface Props {
  type: RenderingType;
  showDescription?: boolean;
}

export default function RenderingBadge({
  type,
  showDescription = false,
}: Props) {
  const { label, color, bgColor, description } = config[type];

  return (
    <span className="inline-flex items-center gap-2">
      <span
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase"
        style={{
          color,
          backgroundColor: bgColor,
          border: `1px solid ${color}33`,
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: color }}
        />
        {label}
      </span>
      {showDescription && (
        <span className="text-sm text-gray-400">{description}</span>
      )}
    </span>
  );
}
