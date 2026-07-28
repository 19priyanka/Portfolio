import type { StatChipData } from '../../types';

/** A single headline number from the profile header. */
export function StatChip({ label, value }: StatChipData) {
  return (
    <div className="rounded-lg border border-line bg-white/5 px-4 py-3">
      <div className="text-lg leading-tight font-bold text-ink">{value}</div>
      <div className="mt-0.5 text-[11px] tracking-wide text-subdued uppercase">{label}</div>
    </div>
  );
}
