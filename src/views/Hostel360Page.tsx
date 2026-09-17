import Link from "next/link";
import { FaArrowLeft, FaCameraRetro, FaCompass, FaHome } from "react-icons/fa";
import Hostel360Showcase from "@/components/Hostel360Showcase";

export default function Hostel360Page() {
  return (
    <div className="bg-[#0a2342] text-white">
      {/* Top Breadcrumb Header */}
      <div className="border-b border-white/10 bg-[#07172b]/90 px-5 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            href="/explore"
            prefetch={true}
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white/80 transition hover:text-[#10bb82]"
          >
            <FaArrowLeft /> Back to Explore
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/campus-360"
              prefetch={true}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-white/15"
            >
              <FaCameraRetro className="text-xs text-[#10bb82]" /> Campus 360
            </Link>
            <Link
              href="/campus-guide"
              prefetch={true}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-white/15"
            >
              <FaCompass className="text-xs text-[#10bb82]" /> Campus Guide
            </Link>
          </div>
        </div>
      </div>

      {/* Main Interactive Showcase */}
      <Hostel360Showcase />
    </div>
  );
}
