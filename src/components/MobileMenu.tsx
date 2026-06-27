"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MobileAccordionItem = ({ group, closeMenu }) => {
  const isHeading = !!group.links;
  const [expanded, setExpanded] = useState(false);
  const navigate = useRouter();

  return (
    <div className="border-b border-slate-100 last:border-0">
      {isHeading ? (
        <div>
          <button 
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between py-6 group"
          >
            <span className={`text-[18px] font-bold tracking-tight transition-colors ${expanded ? "text-[#019e6e]" : "text-[#0d315c]"}`}>
              {group.title}
            </span>
            <span className={`text-[#0d315c] transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </span>
          </button>
          <ul className={`space-y-6 pl-6 overflow-hidden transition-all duration-300 ${expanded ? "max-h-[500px] opacity-100 pb-8" : "max-h-0 opacity-0"}`}>
            {group.links.map((link, lIdx) => (
              <li key={lIdx}>
                {link.external ? (
                  <a 
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="block py-2 text-[16px] font-bold text-slate-500 hover:text-[#019e6e] transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      closeMenu();
                      navigate.push(link.to);
                    }}
                    className="block text-left w-full py-2 text-[16px] font-bold text-slate-500 hover:text-[#019e6e] transition-colors"
                  >
                    {link.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <button 
          onClick={(e) => {
            e.preventDefault();
            closeMenu();
            navigate.push(group.to);
          }}
          className="block text-left w-full text-[18px] font-bold text-[#0d315c] py-6 hover:text-[#019e6e] transition-colors"
        >
          {group.title}
        </button>
      )}
    </div>
  );
};

export default function MobileMenu({ isOpen, closeMenu, openApply }) {
  return (
    <div 
      className={`fixed inset-0 z-[10000] lg:hidden transition-all duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={closeMenu}
      />

      {/* White Drawer Container */}
      <div 
        className={`absolute right-0 top-0 h-[100dvh] w-[min(88vw,380px)] bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Header */}
        <div className="flex items-center justify-end px-6 py-5 shrink-0">
          <button 
            onClick={closeMenu}
            className="w-11 h-11 rounded-full bg-slate-50 flex items-center justify-center text-[#0d315c] hover:bg-slate-100 active:scale-90 transition-all duration-200"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Sidebar Content: Accordion Menu */}
        <div className="flex-grow overflow-y-auto px-5 sm:px-8">
          <nav className="divide-y divide-slate-100">
            {[
              { title: "Home", to: "/" },
              { title: "About us", to: "/about" },
              { 
                title: "Academics", 
                links: [
                  { label: "Schools & Programs", to: "/schools" },
                  { label: "Academic Structure", to: "/academic-structure" },
                ] 
              },
              { 
                title: "Admissions",
                links: [
                  { label: "Admission Overview", to: "/admissions" },
                  { label: "Counselling Helpdesk", to: "/contact" },
                  { label: "Ph.D Admissions", to: "/phd-admissions" },
                ] 
              },
              { title: "Events", to: "/events" },
              { title: "Search", to: "/search" },
              { title: "Discover", to: "/leadership/all" },
              { title: "Campus 360", to: "/campus-360" },
              { title: "Contact us", to: "/contact" },
            ].map((group, idx) => (
              <MobileAccordionItem 
                key={idx} 
                group={group} 
                closeMenu={closeMenu} 
              />
            ))}
          </nav>
        </div>

        {/* Sidebar Bottom: Enquire Now & Footer */}
        <div className="px-5 sm:px-8 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-6 shrink-0 border-t border-slate-50 mt-auto">
          <button 
            onClick={() => {
              openApply();
              closeMenu();
            }}
            aria-label="Enquire for 2026 Admissions"
            className="w-full py-4 bg-[#019e6e] text-white rounded-[12px] font-black text-[14px] uppercase tracking-widest shadow-lg shadow-[#019e6e]/20 hover:bg-[#0fa571] active:scale-95 transition-all mb-6"
          >
            ENQUIRE NOW
          </button>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
            © {new Date().getFullYear()} ST. MARY&apos;S REHABILITATION UNIVERSITY
          </p>
        </div>
      </div>
    </div>
  );
}
