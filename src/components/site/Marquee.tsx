type Props = { items: string[]; reverse?: boolean };

export function Marquee({ items, reverse }: Props) {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        className={`flex whitespace-nowrap ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ width: "max-content" }}
      >
        {row.map((t, i) => (
          <span
            key={i}
            className="mx-8 inline-flex items-center gap-8 text-[11px] uppercase tracking-widest-extra text-pistachio-deep"
          >
            {t}
            <span aria-hidden className="text-warm-tan">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
