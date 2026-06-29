export function MenuAddonsPanel({ title, description, items }) {
  return (
    <article className="rounded-[2rem] border border-ink/10 bg-white/78 p-6 shadow-[0_18px_50px_rgba(20,18,15,0.06)] backdrop-blur-md sm:p-7">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink/42">
        Make it better
      </p>
      <h3 className="mt-3 font-display text-[2rem] leading-[0.95] tracking-[-0.04em] text-ink">
        {title}
      </h3>
      <p className="mt-3 max-w-lg text-sm leading-6 text-ink/62">{description}</p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li
            className="rounded-[1.25rem] border border-ink/8 bg-cream/82 px-4 py-3 text-sm font-medium text-ink/78"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
