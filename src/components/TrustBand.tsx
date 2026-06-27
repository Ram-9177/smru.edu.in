import React from "react";

type TrustBandItem = {
  icon?: React.ReactNode;
  text: string;
};

type Props = {
  items: TrustBandItem[];
  className?: string;
  itemClassName?: string;
  dark?: boolean;
};

export default function TrustBand({
  items,
  className = "",
  itemClassName = "",
  dark = false,
}: Props) {
  return (
    <div
      className={`flex flex-wrap justify-center gap-x-8 gap-y-4 ${
        dark ? "text-white/85" : "text-slate-500"
      } ${className}`}
    >
      {items?.map((item, idx) => (
        <span
          key={`${item.text}-${idx}`}
          className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] ${itemClassName}`}
        >
          {item.icon ? item.icon : null}
          {item.text}
        </span>
      ))}
    </div>
  );
}
