import React from "react";
import { FaUniversity, FaAward, FaChartLine, FaHandsHelping, FaBullseye, FaBrain, FaUsers, FaStethoscope } from "react-icons/fa";

type StatItem = {
  value: React.ReactNode;
  label: React.ReactNode;
  note?: React.ReactNode;
};

type PillItem = {
  label: React.ReactNode;
  value?: React.ReactNode;
};

type FeatureItem = {
  icon?: React.ReactNode;
  title: React.ReactNode;
  desc?: React.ReactNode;
};

type StepItem = {
  title: React.ReactNode;
  desc?: React.ReactNode;
  meta?: React.ReactNode;
  icon?: React.ReactNode;
};

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

export function BigNumberGrid({ items, dark = false, className = "", showOrdinal = true }: { items: StatItem[]; dark?: boolean; className?: string; showOrdinal?: boolean }) {
  return (
    <div className={cx("grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4", className)}>
      {items.map((item, idx) => (
        <article
          key={idx}
          className={cx(
            "relative overflow-hidden cut-corner-panel border p-5 md:p-7 text-center smru-shadow-premium transition-all duration-300 hover:-translate-y-1",
            dark ? "border-white/10 bg-white/10 text-white" : "border-[#d8e8fb] bg-white text-[#0d315c]"
          )}
        >
          {showOrdinal ? (
            <span className={cx("absolute left-2 top-0 text-5xl font-black leading-none", dark ? "text-white/5" : "text-[#0d315c]/5")}>
              {String(idx + 1).padStart(2, "0")}
            </span>
          ) : null}
          <p className={cx("relative text-xl md:text-3xl font-black leading-none tracking-tight", dark ? "text-[#ffaf3a]" : "text-[#0d315c]")}>
            {item.value}
          </p>
          <p className={cx("relative mt-2 text-[9px] md:text-[10px] font-black uppercase tracking-[0.22em]", dark ? "text-white/55" : "text-slate-400")}>
            {item.label}
          </p>
          {item.note ? <p className={cx("relative mt-2 text-xs", dark ? "text-white/55" : "text-slate-500")}>{item.note}</p> : null}
        </article>
      ))}
    </div>
  );
}

export function PillBand({ items, className = "" }: { items: PillItem[]; className?: string }) {
  return (
    <div className={cx("flex flex-wrap justify-center gap-2 rounded-full border border-[#d8e8fb] bg-white/80 p-3 shadow-sm", className)}>
      {items.map((item, idx) => (
        <span
          key={idx}
          className="inline-flex items-center gap-2 rounded-full border border-[#e6f2ff] bg-[#f7fbff] px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#0d315c]"
        >
          <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#019e6e] px-1 text-[9px] text-white">
            {idx + 1}
          </span>
          {item.value ? <strong className="text-[#ffaf3a]">{item.value}</strong> : null}
          <span>{item.label}</span>
        </span>
      ))}
    </div>
  );
}

export function ConnectedPillars({ items, className = "" }: { items: FeatureItem[]; className?: string }) {
  return (
    <div className={cx("relative", className)}>
      <div className="hidden lg:block absolute left-10 right-10 top-12 h-px bg-[#d8e8fb]" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7 relative">
        <div className="absolute left-[39px] top-6 bottom-6 w-px border-l-2 border-dashed border-[#d8e8fb] md:hidden" />
        {items.map((item, idx) => (
          <article
            key={idx}
            className="relative cut-corner-panel border border-[#e6f2ff] bg-white p-6 pl-20 md:pl-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="md:flex items-start justify-between gap-4">
              <div className="absolute left-4 top-6 md:static grid h-12 w-12 md:h-14 md:w-14 place-items-center rounded-2xl border-4 border-[#f5f9ff] bg-[#019e6e]/10 text-xl md:text-2xl text-[#019e6e] shadow-sm">
                {item.icon}
              </div>
              <span className="absolute right-4 top-4 md:static rounded-lg bg-[#fff9ef] px-3 py-1 text-[9px] md:text-[10px] font-black text-[#ffaf3a]">
                {String(idx + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-2 md:mt-5 text-[14px] md:text-[15px] font-black uppercase leading-tight text-[#0d315c]">{item.title}</h3>
            {item.desc ? <p className="mt-2 text-[11px] md:text-sm leading-relaxed text-slate-600 font-medium">{item.desc}</p> : null}
            <div className="mt-4 md:mt-5 h-1 w-10 md:w-12 cut-corner-underline bg-[#ffaf3a]" />
          </article>
        ))}
      </div>
    </div>
  );
}

export function AdvantageConstellation({
  items,
  centerTitle,
  centerSubtitle,
  className = "",
}: {
  items: FeatureItem[];
  centerTitle: React.ReactNode;
  centerSubtitle?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("relative overflow-hidden cut-corner-panel border border-[#d8e8fb] bg-[#f7fbff] p-5 md:p-8", className)}>
      <div className="absolute inset-x-8 top-1/2 hidden h-px bg-[#d8e8fb] lg:block" />
      <div className="absolute inset-y-8 left-1/2 hidden w-px bg-[#d8e8fb] lg:block" />
      <div className="relative grid grid-cols-1 gap-4 lg:grid-cols-[1fr_240px_1fr] lg:items-center">
        <div className="space-y-4">
          {items.slice(0, 2).map((item, idx) => (
            <ConstellationCard key={idx} item={item} idx={idx} />
          ))}
        </div>

        <div className="order-first mx-auto grid min-h-56 w-full max-w-60 place-items-center rounded-full border-[12px] border-white bg-[#0d315c] p-7 text-center shadow-xl lg:order-none">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/45">Stmarys University</p>
            <h3 className="mt-2 text-3xl font-black leading-none text-[#ffaf3a]">{centerTitle}</h3>
            {centerSubtitle ? <p className="mt-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/65">{centerSubtitle}</p> : null}
          </div>
        </div>

        <div className="space-y-4">
          {items.slice(2, 4).map((item, idx) => (
            <ConstellationCard key={idx} item={item} idx={idx + 2} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ConstellationCard({ item, idx }: { item: FeatureItem; idx: number }) {
  return (
    <article className="relative cut-corner-card border border-[#e6f2ff] bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#019e6e]/10 text-xl text-[#019e6e]">
          {item.icon}
        </span>
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-8 cut-corner-underline bg-[#ffaf3a]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">0{idx + 1}</span>
          </div>
          <h3 className="text-[14px] font-black uppercase leading-tight text-[#0d315c]">{item.title}</h3>
          {item.desc ? <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p> : null}
        </div>
      </div>
    </article>
  );
}

export function IdeaOrbitMap({
  items,
  centerTitle,
  centerSubtitle,
  className = "",
}: {
  items: FeatureItem[];
  centerTitle: React.ReactNode;
  centerSubtitle?: React.ReactNode;
  className?: string;
}) {
  const visibleItems = items.slice(0, 5);

  return (
    <div className={cx("relative overflow-hidden cut-corner-panel bg-white border border-[#e2e8f0] p-6 md:p-8 lg:min-h-[580px] shadow-[0_20px_50px_-10px_rgba(13,49,92,0.05)] text-left", className)}>
      {/* Precision Node Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(13,49,92,0.04)_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Central Radiating Lines */}
      <div className="hidden lg:block absolute top-1/2 left-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0d315c]/10 to-transparent -translate-x-1/2 -translate-y-1/2" />
      <div className="hidden lg:block absolute top-1/2 left-1/2 h-full w-[1px] bg-gradient-to-b from-transparent via-[#0d315c]/10 to-transparent -translate-x-1/2 -translate-y-1/2" />

      {/* Center Core */}
      <div className="relative z-20 mx-auto mb-12 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:mb-0 w-64 h-64 bg-white rounded-full border-[12px] border-[#f0f5fa] shadow-[0_0_40px_rgba(13,49,92,0.08)] flex flex-col items-center justify-center text-center">
        <div className="absolute inset-[8px] border border-dashed border-[#0d315c]/20 rounded-full animate-[spin_60s_linear_infinite]" />
        <span className="text-[12px] font-black uppercase tracking-[0.4em] text-[#ffaf3a] mb-2 z-10 relative">Core</span>
        <h3 className="text-3xl font-black text-[#0d315c] leading-none mb-2 z-10 relative">{centerTitle}</h3>
        {centerSubtitle && <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 max-w-[120px] z-10 relative">{centerSubtitle}</p>}
      </div>

      {/* Orbiting Nodes */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:block lg:w-full lg:h-full">
        {visibleItems.map((item, idx) => {
          const positions = [
            "lg:left-[5%] lg:top-[12%]", // Top Left
            "lg:right-[5%] lg:top-[12%]", // Top Right
            "lg:left-[5%] lg:bottom-[12%]", // Bottom Left
            "lg:right-[5%] lg:bottom-[12%]", // Bottom Right
            "lg:left-1/2 lg:-translate-x-1/2 lg:-top-[2%]", // Top Center
          ];
          const isLeft = idx % 2 === 0 || idx === 4;
          const alignClass = "lg:items-start lg:text-left";
          
          return (
            <article 
              key={idx} 
              className={cx(
                "relative bg-white border border-[#e2e8f0] p-6 xl:p-8 cut-corner-panel shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 lg:absolute lg:w-[320px] group flex flex-col justify-center",
                positions[idx],
                alignClass
              )}
            >
              <div 
                className={cx("hidden lg:block absolute top-1/2 w-3 h-3 bg-[#0d315c] rounded-full shadow-[0_0_10px_rgba(13,49,92,0.5)] -mt-1.5 group-hover:scale-150 group-hover:bg-[#019e6e] transition-all duration-300", idx % 2 !== 0 && idx !== 4 ? "left-[-6px]" : "right-[-6px]")} 
              />
              <div className="w-14 h-14 bg-[#f0f5fa] rounded-2xl flex items-center justify-center text-[#019e6e] text-2xl mb-5 group-hover:bg-[#019e6e] group-hover:text-white transition-colors duration-300 shadow-sm border border-[#e2e8f0] group-hover:border-[#019e6e]">
                {item.icon || <span className="font-black text-xl">{idx + 1}</span>}
              </div>
              <h4 className="text-[16px] xl:text-[18px] font-black uppercase text-[#0d315c] leading-tight tracking-tight mb-3">
                {item.title}
              </h4>
              <p className="text-[13px] text-slate-500 font-medium leading-relaxed xl:leading-[1.8]">
                {item.desc}
              </p>
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#019e6e] group-hover:w-full transition-all duration-500" />
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function LadderSteps({ items, className = "" }: { items: StepItem[]; className?: string }) {
  return (
    <ol className={cx("grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4", className)}>
      {items.map((item, idx) => (
        <li
          key={idx}
          className="relative cut-corner-panel border border-[#d8e8fb] bg-white p-6 shadow-sm"
          style={{ marginTop: idx % 4 ? `${Math.min(idx % 4, 3) * 18}px` : 0 }}
        >
          <div className="mb-5 flex items-center justify-between gap-4">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#0d315c] text-sm font-black text-white">
              {idx + 1}
            </span>
            {item.meta ? <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#019e6e]">{item.meta}</span> : null}
          </div>
          <h3 className="text-lg font-black text-[#0d315c]">{item.title}</h3>
          {item.desc ? <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p> : null}
          <div className="absolute -bottom-1 left-6 h-1.5 w-16 cut-corner-underline bg-[#ffaf3a]" />
        </li>
      ))}
    </ol>
  );
}

export function RingStepFlow({ items, className = "" }: { items: StepItem[]; className?: string }) {
  const safeItems = items || [];
  const accents = ["#1d4f8e", "#019e6e", "#ffaf3a", "#0d315c", "#1d4f8e", "#0fa571"];

  return (
    <div className={cx("relative mx-auto max-w-6xl px-1 sm:px-2 md:px-4 py-6 md:py-10", className)}>
      <div className="pointer-events-none absolute left-6 top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#019e6e]/80 via-[#d8e8f0] to-[#0d315c]/40 md:left-1/2 md:-translate-x-1/2" />

      <ol className="relative z-10 space-y-7 md:space-y-10">
        {safeItems.map((item, idx) => {
          const accent = accents[idx % accents.length];
          const isRight = idx % 2 !== 0;

          return (
            <li key={idx} className="relative md:grid md:grid-cols-2 md:gap-10 lg:gap-14">
              <span
                aria-hidden
                className="absolute left-6 top-6 z-20 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border-[3px] border-white bg-[#f8fbff] text-base font-black shadow-[0_8px_20px_rgba(13,49,92,0.14)] md:left-1/2 md:top-1/2 md:h-12 md:w-12 md:-translate-y-1/2 lg:h-14 lg:w-14 md:rounded-full md:border-4 md:text-lg lg:text-xl"
                style={{ color: accent, borderColor: accent }}
              >
                {idx + 1}
              </span>

              <div className={cx("relative pl-12 sm:pl-14 md:pl-0", isRight ? "md:col-start-2" : "md:col-start-1")}>
                <article
                  className={cx(
                    "group relative cut-corner-panel border bg-white p-4 sm:p-5 md:p-7 shadow-[0_12px_30px_rgba(13,49,92,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(13,49,92,0.14)]",
                    isRight ? "md:ml-7" : "md:mr-7"
                  )}
                  style={{ borderColor: `${accent}4d` }}
                >
                  <span
                    aria-hidden
                    className={cx(
                      "hidden md:block absolute top-1/2 h-[2px] w-7 -translate-y-1/2 bg-[#d8e8f0]",
                      isRight ? "-left-7" : "-right-7"
                    )}
                  />

                  <div className="pointer-events-none absolute right-4 top-3 hidden text-[4.2rem] font-black leading-none opacity-[0.07] sm:block md:right-5 md:text-[4.5rem] lg:text-[5.2rem]" style={{ color: accent }}>
                    {String(idx + 1).padStart(2, "0")}
                  </div>

                  {item.meta ? (
                    <span
                      className="inline-flex items-center cut-corner-badge px-2.5 py-1 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.16em] sm:tracking-[0.18em]"
                      style={{ backgroundColor: `${accent}1a`, color: accent }}
                    >
                      {item.meta}
                    </span>
                  ) : null}

                  <h3 className="relative z-10 mt-3 text-[1.05rem] sm:text-xl md:text-2xl font-black uppercase leading-[1.18] tracking-tight text-[#0d315c] pr-0 sm:pr-16">
                    {item.title}
                  </h3>
                  {item.desc ? <p className="relative z-10 mt-2.5 md:mt-3 text-[13px] leading-relaxed text-slate-600 md:text-[15px]">{item.desc}</p> : null}

                  <div className="mt-4 md:mt-5 h-1.5 w-12 sm:w-16 cut-corner-underline transition-all duration-300 group-hover:w-24" style={{ backgroundColor: accent }} />
                </article>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function WindingRoadTimeline({ items, className = "" }: { items: StepItem[]; className?: string }) {
  const safeItems = items || [];
  const accents = ["#019e6e", "#ffaf3a", "#2facea", "#019e6e", "#ffaf3a", "#2facea"];

  return (
    <div className={cx("relative max-w-6xl mx-auto px-2 md:px-4 py-4 md:py-10", className)}>
      <div className="pointer-events-none absolute left-8 top-8 bottom-8 w-[2px] bg-gradient-to-b from-[#019e6e]/70 via-[#2facea]/50 to-[#ffaf3a]/70 md:left-1/2 md:-translate-x-1/2" />

      <ol className="space-y-6 md:space-y-10">
        {safeItems.map((item, idx) => {
          const accent = accents[idx % accents.length];
          const isRight = idx % 2 !== 0;

          return (
            <li key={idx} className="relative md:grid md:grid-cols-2 md:gap-12 lg:gap-16">
              <span
                aria-hidden
                className="absolute left-8 top-8 z-20 grid h-6 w-6 -translate-x-1/2 place-items-center cut-corner-badge border-4 border-white shadow md:left-1/2"
                style={{ backgroundColor: accent }}
              />

              <div className={cx("relative pl-16 md:pl-0", isRight ? "md:col-start-2" : "md:col-start-1")}>
                <article
                  className={cx(
                    "group cut-corner-panel border bg-white p-5 md:p-7 shadow-[0_10px_25px_rgba(13,49,92,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(13,49,92,0.14)]",
                    isRight ? "md:ml-4" : "md:mr-4"
                  )}
                  style={{ borderColor: `${accent}4d` }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className="inline-flex items-center cut-corner-badge px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em]"
                      style={{ backgroundColor: `${accent}1f`, color: accent }}
                    >
                      {item.meta || `0${idx + 1}`}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Milestone {idx + 1}</span>
                  </div>

                  <div className="mt-4 flex items-start gap-4">
                    <span
                      className="grid h-11 w-11 shrink-0 place-items-center cut-corner-badge text-lg"
                      style={{ backgroundColor: `${accent}1f`, color: accent }}
                    >
                      {item.icon || idx + 1}
                    </span>
                    <div>
                      <h3 className="text-[1.05rem] md:text-[1.15rem] font-extrabold uppercase tracking-tight text-[#0d315c] leading-[1.2]">
                        {item.title}
                      </h3>
                      {item.desc ? <p className="mt-2 text-[13.5px] md:text-[14px] leading-relaxed text-slate-600">{item.desc}</p> : null}
                    </div>
                  </div>

                </article>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function ArrowOptionBands({ items, className = "" }: { items: StepItem[]; className?: string }) {
  const colorPairs = [
    ["#1d4f8e", "#0d315c"],
    ["#25b895", "#019e6e"],
    ["#ffaf3a", "#d49400"],
    ["#254a7a", "#0d315c"],
    ["#0fa571", "#0b7d69"],
    ["#f0a622", "#c98c00"],
  ];
  return (
    <ol className={cx("space-y-3", className)}>
      {items.map((item, idx) => {
        const [from, to] = colorPairs[idx % colorPairs.length];
        return (
          <li key={idx} className="grid grid-cols-[54px,1fr] gap-0 md:grid-cols-[84px,1fr]">
            <div className="grid place-items-center cut-corner-badge bg-white text-4xl font-black leading-none text-slate-200 shadow-sm md:text-6xl">
              {idx + 1}
            </div>
            <article
              className="relative overflow-hidden cut-corner-panel px-4 py-3 text-white shadow-[0_10px_18px_rgba(13,49,92,0.15)] md:px-6 md:py-4"
              style={{
                background: `linear-gradient(120deg, ${from}, ${to})`,
              }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),transparent_48%)]" />
              <div className="pointer-events-none absolute left-0 top-0 h-full w-1.5 bg-white/40" />
              <h3 className="relative text-sm font-black uppercase tracking-[0.14em] md:text-base">{item.title}</h3>
              {item.desc ? <p className="relative mt-1 text-xs text-white/90 md:text-sm">{item.desc}</p> : null}
            </article>
          </li>
        );
      })}
    </ol>
  );
}

export function StairHighlightStrips({ items, className = "" }: { items: StepItem[]; className?: string }) {
  const safeItems = items || [];
  const colors = [
    { bg: "#1d4f8e", shadow: "#081d3a", text: "text-white" },
    { bg: "#0fa571", shadow: "#034d32", text: "text-white" },
    { bg: "#ffaf3a", shadow: "#ab711a", text: "text-[#0d315c]" },
    { bg: "#155e75", shadow: "#083344", text: "text-white" },
    { bg: "#1d4f8e", shadow: "#081d3a", text: "text-white" },
  ];

  return (
    <ul className={cx("relative space-y-6 lg:space-y-4 max-w-5xl mx-auto py-8", className)}>
      {safeItems.map((item, idx) => {
        const c = colors[idx % colors.length];
        const stepOffset = `${10 + idx * 25}px`;
        return (
          <li
            key={idx}
            className="relative w-full cursor-default transition-transform duration-500 hover:scale-[1.02] lg:ml-[var(--step-offset)] lg:w-[calc(100%_-_var(--step-offset))]"
            style={{ ["--step-offset" as "--step-offset"]: stepOffset } as React.CSSProperties}
          >
             <article
                className={cx("relative overflow-hidden cut-corner-panel p-5 sm:p-6 lg:skew-x-[-6deg] lg:p-8 shadow-[0_15px_30px_rgba(0,0,0,0.1)] border-b-[6px] transition-all", c.text)}
                style={{ backgroundColor: c.bg, borderBottomColor: c.shadow }}
             >
                <div className="flex items-start gap-4 sm:items-center sm:gap-5 lg:skew-x-[6deg] lg:gap-8">
                  <div className="h-12 w-12 shrink-0 cut-corner-badge border-[3px] border-black/10 flex items-center justify-center sm:h-14 sm:w-14 lg:h-16 lg:w-16">
                     <span className="text-2xl font-black leading-none opacity-90 lg:text-3xl">{idx + 1}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1.5 text-[14px] font-black uppercase leading-tight tracking-[0.08em] sm:text-[15px] lg:text-[18px] lg:tracking-[0.1em]">{item.title}</h3>
                    <p className="max-w-3xl break-words text-[13px] font-medium leading-relaxed opacity-90 lg:text-[14px]">{item.desc}</p>
                  </div>
                </div>
             </article>
          </li>
        );
      })}
    </ul>
  );
}

export function HalfRingStepRail({
  items,
  centerTitle,
  centerSubtitle,
  centerImageSrc,
  centerImageAlt = "Center visual",
  className = "",
}: {
  items: FeatureItem[];
  centerTitle: React.ReactNode;
  centerSubtitle?: React.ReactNode;
  centerImageSrc?: string;
  centerImageAlt?: string;
  className?: string;
}) {
  const safeItems = (items || []).slice(0, 4);
  const accents = ["#019e6e", "#ffaf3a", "#25b895", "#d1902a"];

  return (
    <div className={cx("relative overflow-hidden cut-corner-panel border border-[#d9e7f5] bg-[linear-gradient(135deg,#f9fcff_0%,#f2f8ff_52%,#eef8f3_100%)] p-3 sm:p-5 lg:p-0 shadow-[0_20px_60px_-15px_rgba(13,49,92,0.12)] text-left flex flex-col lg:flex-row", className)}>
       
       {/* Graphical Left Section - The "Half Ring" */}
       <div
         className={cx(
           "relative flex items-center justify-center bg-[radial-gradient(circle_at_top,rgba(37,184,149,0.12),transparent_42%),linear-gradient(180deg,#ffffff_0%,#f6fbff_100%)] py-8 sm:py-10 lg:py-14 overflow-hidden border-b lg:border-b-0 lg:border-r border-[#d9e7f5] w-full lg:w-[42%] shrink-0",
           centerImageSrc ? "lg:justify-center lg:pr-0" : "lg:justify-end lg:pr-10"
         )}
       >
           {/* Background Tech Rings */}
           {!centerImageSrc ? (
             <>
               <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] rounded-full border-[40px] border-[#dbe9f7] opacity-90" />
               <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[300px] h-[300px] lg:w-[450px] lg:h-[450px] rounded-full border-[2px] border-dashed border-[#019e6e]/25" />
             </>
           ) : null}
           
           {centerImageSrc ? (
             <div className="relative z-10 w-[180px] sm:w-[220px] lg:w-[280px] aspect-[449/650] cut-corner-panel bg-[linear-gradient(180deg,#ffffff_0%,#f3f8ff_100%)] p-1.5 sm:p-2 ring-1 ring-[#dbe9f7] shadow-[0_18px_40px_rgba(13,49,92,0.12)] flex items-center justify-center">
               <img src={centerImageSrc} alt={centerImageAlt} className="h-full w-full object-contain" />
             </div>
           ) : (
             <div className="relative z-10 w-[200px] h-[200px] lg:w-[280px] lg:h-[280px] bg-white rounded-full border-[8px] border-[#ffaf3a] shadow-[0_0_40px_rgba(255,175,58,0.12)] flex items-center justify-center">
                <div className="text-center p-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#019e6e] mb-2 leading-tight text-center">Stmarys University Framework</p>
                  <h3 className="text-3xl lg:text-5xl xl:text-6xl font-black text-[#0d315c] leading-none tracking-tighter text-center">{centerTitle}</h3>
                  {centerSubtitle && <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400 mt-3 leading-relaxed max-w-[180px] mx-auto text-center">{centerSubtitle}</p>}
                </div>
             </div>
           )}
       </div>

       {/* Stacked Data Right Section */}
       <div className="relative p-5 sm:p-7 lg:p-10 xl:p-12 flex flex-col justify-center w-full lg:w-[58%] bg-[linear-gradient(180deg,rgba(255,255,255,0.56)_0%,rgba(245,250,255,0.9)_100%)]">
           <div className="space-y-4 sm:space-y-5 lg:space-y-6 relative z-10">
               {safeItems.map((item, idx) => {
                   const accent = accents[idx % accents.length];
                   return (
                       <div key={idx} className="group flex gap-3 sm:gap-4 lg:gap-6 hover:translate-x-0 lg:hover:translate-x-3 transition-transform duration-300">
                           <div 
                             className="w-11 h-11 sm:w-12 sm:h-12 lg:w-16 lg:h-16 shrink-0 cut-corner-badge flex items-center justify-center font-black text-lg sm:text-xl lg:text-3xl shadow-lg transition-colors duration-300"
                             style={{ backgroundColor: accent, color: idx === 1 ? '#0d315c' : '#ffffff' }}
                           >
                             0{idx + 1}
                           </div>
                           <div className="flex flex-col justify-center">
                               <h4 className="text-[14px] sm:text-[15px] lg:text-[20px] font-black uppercase tracking-tight text-[#0d315c] mb-1 group-hover:text-[#019e6e] transition-colors">{item.title}</h4>
                               {item.desc && <p className="text-[12px] sm:text-[13px] lg:text-[15px] font-medium text-slate-600 leading-relaxed max-w-lg">{item.desc}</p>}
                           </div>
                       </div>
                   )
               })}
           </div>
           
           {/* Aesthetic grid overlay */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(13,49,92,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(13,49,92,0.03)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
       </div>
    </div>
  );
}

export function RadialHighlights({ items, centerTitle, centerSubtitle = "", className = "" }: { items: FeatureItem[]; centerTitle: React.ReactNode; centerSubtitle?: React.ReactNode; className?: string }) {
  return (
    <div className={cx("relative mx-auto max-w-6xl", className)}>
      <div className="hidden lg:block absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#0d315c]/20" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px_1fr] gap-5 items-center">
        <div className="space-y-5">
          {items.slice(0, Math.ceil(items.length / 2)).map((item, idx) => (
            <RadialCard item={item} idx={idx} key={idx} align="right" />
          ))}
        </div>
        <div className="order-first lg:order-none rounded-full border-[10px] border-[#f5f9ff] bg-[#0d315c] p-8 text-center text-white shadow-2xl">
          <p className="text-4xl font-black leading-none text-[#ffaf3a]">{centerTitle}</p>
          {centerSubtitle ? <p className="mt-3 text-[10px] font-black uppercase tracking-[0.24em] text-white/65">{centerSubtitle}</p> : null}
        </div>
        <div className="space-y-5">
          {items.slice(Math.ceil(items.length / 2)).map((item, idx) => (
            <RadialCard item={item} idx={idx + Math.ceil(items.length / 2)} key={idx} align="left" />
          ))}
        </div>
      </div>
    </div>
  );
}

function RadialCard({ item, idx, align }: { item: FeatureItem; idx: number; align: "left" | "right" }) {
  return (
    <article className={cx("cut-corner-card border border-[#e6f2ff] bg-white p-5 shadow-sm", align === "right" ? "lg:text-right" : "lg:text-left")}>
      <div className={cx("flex items-center gap-3", align === "right" ? "lg:justify-end" : "")}>
        <span className="grid h-9 w-9 place-items-center cut-corner-badge bg-[#019e6e]/10 text-[#019e6e]">{item.icon}</span>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">0{idx + 1}</span>
      </div>
      <h3 className="mt-3 text-[14px] font-black uppercase text-[#0d315c]">{item.title}</h3>
      {item.desc ? <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p> : null}
    </article>
  );
}

export function ArrowMilestones({ items, className = "" }: { items: StepItem[]; className?: string }) {
  return (
    <ol className={cx("grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4", className)}>
      {items.map((item, idx) => (
        <li key={idx} className="relative cut-corner-card border border-[#d8e8fb] bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-2xl font-black text-[#ffaf3a]">{item.meta}</span>
            {idx < items.length - 1 ? <span className="hidden xl:block h-px flex-1 bg-[#d8e8fb]" /> : null}
          </div>
          <h3 className="text-sm font-black uppercase leading-tight text-[#0d315c]">{item.title}</h3>
          {item.desc ? <p className="mt-2 text-xs leading-relaxed text-slate-600">{item.desc}</p> : null}
        </li>
      ))}
    </ol>
  );
}
export function BentoTrustGrid({ items, className = "" }: { items: FeatureItem[]; className?: string }) {
  const safeItems = items || [];
  // Ensure we have at least 5 items for the layout, or fallback
  if (safeItems.length < 5) return <StairHighlightStrips items={safeItems} className={className} />;

  return (
    <div className={cx("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6", className)}>
       {/* 1st card: Large Focus (The Act) */}
       <article className="md:col-span-2 lg:col-span-2 bg-[#019e6e] text-white p-6 md:p-10 cut-corner-panel border border-white/10 relative overflow-hidden group shadow-[0_20px_50px_-10px_rgba(1,158,110,0.35)]">

          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#ffaf3a]/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="relative z-10 h-full flex flex-col justify-center">
             <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-8 bg-[#ffaf3a]" />
                  <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-[#ffaf3a]">University Accreditation</span>
                </div>
                <h3 className="text-2xl md:text-[2.2rem] font-black leading-[1.05] tracking-tight">{safeItems[0].title}</h3>
             </div>
             <p className="mt-6 text-sm md:text-[15px] text-white/70 font-medium max-w-2xl leading-relaxed">{safeItems[0].desc}</p>
          </div>
       </article>

       {/* 2nd card: Vertical Highlight (Legacy) */}
       <article className="bg-white border border-[#d8e8fb] p-6 md:p-8 cut-corner-panel shadow-[0_15px_45px_rgba(13,49,92,0.06)] hover:shadow-[0_30px_70px_rgba(13,49,92,0.12)] transition-all group relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-16 h-16 bg-[#019e6e]/10 rounded-2xl flex items-center justify-center text-[#019e6e] mb-8 group-hover:bg-[#019e6e] group-hover:text-white transition-all duration-500 shadow-sm border border-[#019e6e]/10">
              <FaAward size={32} />
            </div>
            <h3 className="text-xl font-black text-[#0d315c] uppercase leading-tight tracking-tight">{safeItems[1].title}</h3>
            <p className="mt-5 text-slate-500 font-medium leading-relaxed">{safeItems[1].desc}</p>
            <div className="mt-8 h-1 w-12 cut-corner-underline bg-[#ffaf3a]" />
          </div>
          <div className="absolute bottom-0 right-0 p-4 text-[4rem] font-black text-[#0d315c]/[0.02] leading-none pointer-events-none">30+</div>
       </article>

       {/* 3rd card: Tertiary Highlight (Pathways) */}
       <article className="bg-[#f8fbff] border border-[#d8e8fb] p-8 cut-corner-panel shadow-[0_10px_30px_rgba(13,49,92,0.04)] hover:shadow-xl transition-all group">
          <div className="w-14 h-14 bg-[#0d315c]/5 rounded-2xl flex items-center justify-center text-[#0d315c] mb-6 group-hover:bg-[#0d315c] group-hover:text-white transition-all duration-300">
             <FaChartLine size={26} />
          </div>
          <h3 className="text-lg font-black text-[#0d315c] uppercase tracking-tight leading-tight">{safeItems[2].title}</h3>
          <p className="mt-4 text-[13px] md:text-sm text-slate-500 font-medium leading-relaxed">{safeItems[2].desc}</p>
       </article>

       {/* 4th card: Prominent Success Stat (Scholarships) */}
       <article className="bg-[#0d315c] text-white p-6 md:p-8 cut-corner-panel border border-white/10 shadow-[0_15px_40px_rgba(13,49,92,0.2)] group relative overflow-hidden">

          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
               <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white shadow-inner">
                  <FaHandsHelping size={24} />
               </div>
               <span className="text-4xl md:text-5xl font-black opacity-10 group-hover:opacity-20 transition-opacity">50%</span>
            </div>
            <div className="mt-8">
              <h3 className="text-lg md:text-xl font-black uppercase tracking-tight">{safeItems[3].title}</h3>
              <p className="mt-3 text-sm text-white/80 font-medium leading-relaxed">{safeItems[3].desc}</p>
            </div>
          </div>
       </article>

       {/* 5th card: Career/Placement Focus */}
       <article className="bg-white border border-[#d8e8fb] p-6 md:p-8 cut-corner-panel shadow-[0_15px_45px_rgba(13,49,92,0.05)] hover:shadow-2xl transition-all group flex flex-col justify-center border-l-4 border-l-[#ffaf3a]">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#ffaf3a]/10 flex items-center justify-center text-[#ffaf3a]">
              <FaBullseye size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Career Outcome</span>
          </div>
          <h3 className="text-lg md:text-xl font-black text-[#0d315c] uppercase tracking-tight leading-tight mb-4">{safeItems[4].title}</h3>
          <p className="text-[13px] md:text-sm text-slate-500 font-medium leading-relaxed">{safeItems[4].desc}</p>
       </article>
    </div>
  );
}

export function TechniqueModernGrid({ items, className = "" }: { items: StepItem[]; className?: string }) {
  const safeItems = items || [];
  const accents = ["#1d4f8e", "#019e6e", "#ffaf3a", "#0d315c"];
  
  return (
    <div className={cx("grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8", className)}>
      {safeItems.map((item, idx) => {
        const accent = accents[idx % accents.length];
        return (
          <article 
            key={idx} 
            className="group relative bg-white border border-[#d8e8fb] p-6 md:p-8 cut-corner-panel shadow-[0_15px_45px_rgba(13,49,92,0.04)] hover:shadow-[0_30px_70px_rgba(13,49,92,0.12)] transition-all duration-500 overflow-hidden"
          >
            {/* Background Accent Gradient */}
            <div 
              className="absolute top-0 left-0 w-1.5 h-full transition-all duration-500 group-hover:w-full opacity-0 group-hover:opacity-[0.04] pointer-events-none" 
              style={{ backgroundColor: accent }}
            />
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-8">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-[0_10px_25px_rgba(0,0,0,0.15)] transform group-hover:rotate-6 transition-transform duration-500"
                  style={{ backgroundColor: accent }}
                >
                  {item.icon ? (
                    <span className="text-3xl">{item.icon}</span>
                  ) : (
                    <span className="text-2xl font-black">{idx + 1}</span>
                  )}
                </div>
                <div className="text-right" />
              </div>
              
              <div className="mb-4">
                 <span 
                   className="inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-4 border"
                   style={{ color: accent, borderColor: `${accent}33`, backgroundColor: `${accent}0a` }}
                 >
                   {item.meta}
                 </span>
                 <h3 className="text-xl md:text-2xl font-black text-[#0d315c] uppercase leading-tight tracking-tight">
                   {item.title}
                 </h3>
              </div>
              
              <p className="text-slate-600 font-medium leading-relaxed md:text-lg">
                {item.desc}
              </p>
              
              <div 
                className="mt-8 h-1.5 w-16 transition-all duration-500 group-hover:w-32" 
                style={{ backgroundColor: accent }}
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}



export function StaggeredTechniqueList({ items, className = "" }: { items: StepItem[]; className?: string }) {
  const safeItems = items || [];
  const accents = ["#1d4f8e", "#019e6e", "#ffaf3a", "#0d315c"];
  
  return (
    <div className={cx("flex flex-col gap-4 md:gap-6", className)}>
      {safeItems.map((item, idx) => {
        const accent = accents[idx % accents.length];
        const indent = idx * 40; // 0, 40, 80, 120 pixels indent
        
        return (
          <article 
            key={idx} 
            className="group relative flex items-center gap-6 p-5 md:p-8 rounded-[40px] shadow-xl transition-all duration-700 hover:scale-[1.02] hover:-translate-y-1"
            style={{ 
              backgroundColor: accent,
              marginLeft: `${indent}px`,
              marginRight: `-${indent}px`,
              maxWidth: `calc(100% - ${indent}px)`
            }}
          >
            <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shadow-inner">
               <span className="text-2xl md:text-3xl font-black text-white">{idx + 1}</span>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tight leading-tight mb-2">
                {item.title}
              </h3>
              <p className="text-sm md:text-base text-white/80 font-medium leading-relaxed">
                {item.desc}
              </p>
            </div>
            
            {/* Subtle highlight sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none rounded-[40px]" />
          </article>
        );
      })}
    </div>
  );
}

/**
 * PedagogyZigZag - A "God Level" winding path infographic 
 * specifically designed for Teaching Techniques.
 * Inspired by the "Roadmap" and "Winding Journey" aesthetics.
 */
export function PedagogyZigZag({ items, className }: { items?: any[], className?: string }) {
  const defaultItems = [
    {
      title: "Case-Based Learning",
      desc: "Transforming theoretical knowledge into clinical mastery through complex patient scenarios and simulated decision-making.",
      icon: <FaBrain />,
      meta: "Clinical Reasoning",
      color: "#019e6e"
    },
    {
      title: "Interdisciplinary Rounds",
      desc: "Physiotherapists, Psychologists, and Speech Pathologists collaborating in real-time to develop holistic rehabilitation plans.",
      icon: <FaUsers />,
      meta: "Collaborative Care",
      color: "#0d315c"
    },
    {
      title: "Simulated Clinical Labs",
      desc: "State-of-the-art labs that replicate real-world hospital environments for safe, hands-on skills acquisition.",
      icon: <FaStethoscope />,
      meta: "Hands-on Mastery",
      color: "#ffaf3a"
    },
    {
      title: "Community Outreach",
      desc: "Learning beyond classroom walls by providing rehabilitation services to rural and underserved populations.",
      icon: <FaHandsHelping />,
      meta: "Social Impact",
      color: "#019e6e"
    },
    {
      title: "Evidence-Based Training",
      desc: "Integrating the latest global research findings into daily classroom and clinic practice for superior outcomes.",
      icon: <FaAward />,
      meta: "Research Excellence",
      color: "#0d315c"
    }
  ];

  const displayItems = items || defaultItems;

  return (
    <div className={cx("relative space-y-12 md:space-y-0", className)}>
      {/* The Connecting Path (Desktop only) */}
      <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-slate-200 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#019e6e] via-[#0d315c] to-[#ffaf3a] opacity-20" />
      </div>

      {displayItems.map((item, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <div key={idx} className="relative z-10 flex flex-col md:flex-row items-center group">
            {/* Left side (Desktop) */}
            <div className={cx("w-full md:w-1/2 flex items-center mb-6 md:mb-0", isEven ? "md:justify-end md:pr-16" : "md:order-last md:justify-start md:pl-16")}>
               <div className={cx("max-w-md w-full bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.03)] group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] transition-all duration-700 relative overflow-hidden", isEven ? "text-right" : "text-left")}>
                  {/* Subtle Accent Bar */}
                  <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: item.color }} />
                  
                  <span className="inline-block text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-60" style={{ color: item.color }}>
                    {item.meta}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-[#0d315c] uppercase leading-tight tracking-tight mb-4 group-hover:text-[#019e6e] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 font-medium leading-relaxed text-sm md:text-base">
                    {item.desc}
                  </p>
                  
                  <div className={cx("mt-6 flex items-center gap-2", isEven ? "justify-end" : "justify-start")}>
                    <span className="w-8 h-[2px] bg-slate-100 group-hover:bg-[#ffaf3a] transition-all" />
                    <span className="text-[10px] font-black text-slate-300 group-hover:text-[#ffaf3a] uppercase">Technique {idx + 1}</span>
                  </div>
               </div>
            </div>

            {/* Central Node (The Dot on the Road) */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 items-center justify-center">
               <div className="w-12 h-12 rounded-full bg-white border-4 border-slate-50 flex items-center justify-center shadow-xl z-20 group-hover:scale-125 group-hover:border-[#ffaf3a] transition-all duration-500">
                  <div className="text-xl" style={{ color: item.color }}>
                    {item.icon}
                  </div>
               </div>
               {/* Pulse Effect */}
               <div className="absolute inset-0 rounded-full animate-ping opacity-10" style={{ backgroundColor: item.color }} />
            </div>

            {/* Right side (Desktop - Numbers) */}
            <div className={cx("hidden md:flex w-1/2 items-center", isEven ? "justify-start pl-16" : "justify-end pr-16")}>
               <span className="text-[120px] font-black text-slate-100/50 select-none transition-all duration-700 group-hover:text-slate-200 group-hover:scale-110">
                 {idx + 1}
               </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
