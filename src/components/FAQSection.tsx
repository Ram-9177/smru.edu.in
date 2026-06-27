"use client";
import React, { useState, memo } from "react";
import { HOME_FAQ_CATEGORIES } from "@/lib/seo/home-faqs";

const faqCategories = HOME_FAQ_CATEGORIES;

const FAQSection = memo(function FAQSection({ customFaqs }: { customFaqs?: { question: string, answer: string }[] }) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openQ, setOpenQ] = useState(0);
  const [search, setSearch] = useState("");

  const filtered = customFaqs 
    ? customFaqs.filter(f => f.question.toLowerCase().includes(search.toLowerCase()))
    : (search.trim()
        ? faqCategories.flatMap((c) => c.faqs).filter((f) =>
            f.question.toLowerCase().includes(search.toLowerCase())
          )
        : faqCategories[activeCategory].faqs);

  const handleCategory = (i) => {
    setActiveCategory(i);
    setOpenQ(0);
    setSearch("");
  };

  return (
    <div className="w-full">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl md:text-3xl font-black text-[#0d315c]">Frequently Asked Questions</h2>
        <div className="flex items-center gap-2 bg-white border border-gray-200 cut-corner-badge px-3 py-2 shadow-sm w-full sm:w-72">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400"
          />
          <div className="w-8 h-8 bg-[#ffaf3a] cut-corner-badge flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Two-column panel */}
      <div className="bg-[#f0f4f8] cut-corner-panel overflow-hidden border border-gray-200">
        <div className="flex flex-col sm:flex-row">
          {/* Left: categories */}
          {!search.trim() && !customFaqs && (
            <div className="sm:w-48 flex-shrink-0 border-b sm:border-b-0 sm:border-r border-gray-200 bg-[#f0f4f8]">
              {faqCategories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => handleCategory(i)}
                  className={`w-full flex items-center justify-between px-5 py-4 text-left text-sm font-bold transition-colors ${
                    activeCategory === i
                      ? "bg-white text-[#0d315c]"
                      : "text-gray-700 hover:text-[#0d315c] hover:bg-white/60"
                  }`}
                >
                  {cat.label}
                  <svg
                    className={`w-4 h-4 transition-transform ${activeCategory === i ? "rotate-0 text-[#0d315c]" : "text-gray-600"}`}
                    fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
              ))}
            </div>
          )}

          {/* Right: questions */}
          <div className="flex-1 bg-white divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <p className="p-6 text-sm text-gray-600">No results found.</p>
            ) : (
              filtered.map((faq, idx) => {
                const isOpen = openQ === idx;
                return (
                  <div key={idx}>
                    <button
                      className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-gray-700 hover:text-[#0d315c] transition-colors"
                      onClick={() => setOpenQ(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                    >
                      <span className="pr-4">{faq.question}</span>
                      <svg
                        className={`w-4 h-4 flex-shrink-0 transition-transform text-gray-400 ${isOpen ? "rotate-180" : ""}`}
                        fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                      >
                        <path d="M19 9l-7 7-7-7"/>
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed bg-[#fafcff]">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default FAQSection;
