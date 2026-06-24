interface Props {
  code: string;
  filename?: string;
  language?: string;
}

export default function CodeBlock({
  code,
  filename,
  language = "tsx",
}: Props) {
  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-lg">
      {filename && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#161b22] border-b border-white/10">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-xs text-gray-400 font-mono ml-2">
            {filename}
          </span>
          {language && (
            <span className="ml-auto text-[10px] text-gray-500 uppercase tracking-wider">
              {language}
            </span>
          )}
        </div>
      )}
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm font-mono text-gray-300 leading-relaxed whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  );
}
