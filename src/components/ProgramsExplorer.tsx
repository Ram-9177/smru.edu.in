"use client";

import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { OFFICIAL_COURSE_ROWS } from "@/data/official-courses";
import { useApplyModal } from "@/context/ApplyModalContext";

type Step = "LEVEL" | "DOMAIN" | "SCHOOL" | "DEPARTMENT" | "PROGRAM";

interface SelectionState {
  level?: string;
  domain?: string;
  schoolSlug?: string;
  departmentName?: string;
  program?: string;
}

const DOMAIN_MAPPING: Record<string, string> = {
  "rehabilitation-sciences": "Health Sciences",
  "health-allied-health-sciences": "Health Sciences",
  "psychology": "Health Sciences",
  "nursing-sciences": "Health Sciences",
  "engineering-emerging-technologies": "Engineering & Emerging Technologies",
  "law": "Law"
};

const SCHOOL_NAMES: Record<string, string> = {
  "rehabilitation-sciences": "School of Rehabilitation Sciences",
  "health-allied-health-sciences": "School of Health & Allied Health Sciences",
  "psychology": "School of Psychology",
  "nursing-sciences": "School of Nursing",
  "engineering-emerging-technologies": "Engineering & Emerging Technologies",
  "law": "School of Law"
};

const normalizeLevel = (rLevel: string) => {
  if (rLevel === "UG Program") return "UG";
  if (rLevel === "PG Program") return "PG";
  if (rLevel === "Ph.D. Program") return "Ph.D.";
  if (rLevel === "Integrated UG Program") return "Integrated UG";
  if (rLevel === "PG Diploma") return "PG Diploma";
  if (rLevel === "Diploma") return "Diploma";
  return rLevel;
};

export default function ProgramsExplorer() {
  const { openApplyModal } = useApplyModal();
  const [step, setStep] = useState<Step>("LEVEL");
  const [history, setHistory] = useState<Step[]>([]);
  const [selection, setSelection] = useState<SelectionState>({});

  const pushStep = (newStep: Step, newState: SelectionState) => {
    setHistory(prev => [...prev, step]);
    setSelection(newState);
    setStep(newStep);
  };

  const goBack = () => {
    if (history.length === 0) return;
    const prevStep = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setStep(prevStep);
  };

  // Data Selectors
  const getAvailableDomains = (level: string) => {
    const rows = OFFICIAL_COURSE_ROWS.filter(r => normalizeLevel(r.level) === level);
    return Array.from(new Set(rows.map(r => DOMAIN_MAPPING[r.schoolSlug] || "Other")));
  };

  const getAvailableSchools = (level: string, domain: string) => {
    const rows = OFFICIAL_COURSE_ROWS.filter(r => normalizeLevel(r.level) === level && DOMAIN_MAPPING[r.schoolSlug] === domain);
    return Array.from(new Set(rows.map(r => r.schoolSlug)));
  };

  const getAvailableDepartments = (level: string, domain: string, schoolSlug: string) => {
    const rows = OFFICIAL_COURSE_ROWS.filter(r => normalizeLevel(r.level) === level && r.schoolSlug === schoolSlug);
    return Array.from(new Set(rows.map(r => r.departmentName)));
  };

  const getAvailablePrograms = (level: string, domain: string, schoolSlug: string, departmentName: string) => {
    const rows = OFFICIAL_COURSE_ROWS.filter(r => normalizeLevel(r.level) === level && r.schoolSlug === schoolSlug && r.departmentName === departmentName);
    return Array.from(new Set(rows.map(r => r.name)));
  };

  // Handlers
  const handleLevelSelect = (level: string) => {
    const newState = { level };
    const domains = getAvailableDomains(level);
    if (domains.length === 1) {
      handleDomainSelect(domains[0], newState);
    } else if (domains.length > 0) {
      pushStep("DOMAIN", newState);
    }
  };

  const handleDomainSelect = (domain: string, state = selection) => {
    const newState = { ...state, domain };
    
    if (domain === "Engineering & Emerging Technologies") {
      // Flow: Domain -> Department -> Program
      const newStateWithSchool = { ...newState, schoolSlug: "engineering-emerging-technologies" };
      const depts = getAvailableDepartments(newState.level!, domain, "engineering-emerging-technologies");
      if (depts.length === 1) {
        handleDepartmentSelect(depts[0], newStateWithSchool);
      } else if (depts.length > 0) {
        pushStep("DEPARTMENT", newStateWithSchool);
      }
    } else if (domain === "Law") {
      // Flow: Domain -> Program
      const newStateWithSchoolAndDept = { ...newState, schoolSlug: "law", departmentName: "Law" };
      const progs = getAvailablePrograms(newState.level!, domain, "law", "Law");
      if (progs.length === 1) {
        handleProgramSelect(progs[0], newStateWithSchoolAndDept);
      } else if (progs.length > 0) {
        pushStep("PROGRAM", newStateWithSchoolAndDept);
      }
    } else {
      // Health Sciences Flow: Domain -> School -> Department -> Program
      const schools = getAvailableSchools(newState.level!, domain);
      if (schools.length === 1) {
        handleSchoolSelect(schools[0], newState);
      } else if (schools.length > 0) {
        pushStep("SCHOOL", newState);
      }
    }
  };

  const handleSchoolSelect = (schoolSlug: string, state = selection) => {
    const newState = { ...state, schoolSlug };
    const depts = getAvailableDepartments(newState.level!, newState.domain!, schoolSlug);
    if (depts.length === 1) {
      handleDepartmentSelect(depts[0], newState);
    } else if (depts.length > 0) {
      pushStep("DEPARTMENT", newState);
    }
  };

  const handleDepartmentSelect = (departmentName: string, state = selection) => {
    const newState = { ...state, departmentName };
    const progs = getAvailablePrograms(newState.level!, newState.domain!, newState.schoolSlug!, departmentName);
    if (progs.length === 1) {
      handleProgramSelect(progs[0], newState);
    } else if (progs.length > 0) {
      pushStep("PROGRAM", newState);
    }
  };

  const handleProgramSelect = (program: string, state = selection) => {
    setSelection({ ...state, program });
    // Open the CTPL popup instead of transitioning to the lead form
    openApplyModal();
  };

  const renderHeader = (title: string, showBack: boolean = true) => {
    // Hide redundant breadcrumb items
    const hideSchool = selection.domain === "Engineering & Emerging Technologies" || selection.domain === "Law";
    const hideDept = selection.domain === "Law";

    const breadcrumbItems = [
      selection.level,
      selection.domain,
      (!hideSchool && selection.schoolSlug) ? SCHOOL_NAMES[selection.schoolSlug] : undefined,
      (!hideDept && selection.departmentName) ? selection.departmentName : undefined,
      selection.program
    ].filter(Boolean);

    const breadcrumb = breadcrumbItems.join(" › ");

    return (
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-black leading-tight text-[#0d315c] md:text-2xl">{title}</h3>
          {breadcrumb && (
            <p className="mt-2 text-xs font-bold leading-relaxed text-[#10bb82]">
              {breadcrumb}
            </p>
          )}
        </div>
        {showBack && (
          <button
            onClick={goBack}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f1f5f9] text-[#0d315c] transition hover:bg-[#e2e8f0]"
            aria-label="Go Back"
          >
            <FaArrowLeft />
          </button>
        )}
      </div>
    );
  };

  const renderOptions = (options: { label: string; value: string }[], onSelect: (val: string) => void) => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onSelect(opt.value)}
          className="flex min-h-[64px] w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-left text-sm font-black text-[#0d315c] shadow-[0_8px_20px_rgba(13,49,92,0.04)] transition hover:-translate-y-0.5 hover:border-[#10bb82]/40 hover:shadow-[0_12px_28px_rgba(13,49,92,0.08)]"
        >
          <span className="leading-snug">{opt.label}</span>
          <FaArrowRight className="shrink-0 text-[#10bb82]" />
        </button>
      ))}
    </div>
  );

  // Compute Options for the current step
  const getOptionsForCurrentStep = () => {
    switch (step) {
      case "LEVEL":
        // Order predefined options
        const allLevels = Array.from(new Set(OFFICIAL_COURSE_ROWS.map(r => normalizeLevel(r.level))));
        const ordered = ["UG", "PG", "Ph.D.", "Diploma", "Integrated UG", "PG Diploma"].filter(l => allLevels.includes(l));
        return ordered.map(l => ({ label: l, value: l }));
      case "DOMAIN":
        return getAvailableDomains(selection.level!).map(d => ({ label: d, value: d }));
      case "SCHOOL":
        return getAvailableSchools(selection.level!, selection.domain!).map(s => ({ label: SCHOOL_NAMES[s], value: s }));
      case "DEPARTMENT":
        return getAvailableDepartments(selection.level!, selection.domain!, selection.schoolSlug!).map(d => ({ label: d, value: d }));
      case "PROGRAM":
        return getAvailablePrograms(selection.level!, selection.domain!, selection.schoolSlug!, selection.departmentName!).map(p => ({ label: p, value: p }));
      default:
        return [];
    }
  };

  const options = getOptionsForCurrentStep();

  return (
    <div className="rounded-[24px] border border-[#f4aa00]/20 bg-white p-5 shadow-[0_14px_34px_rgba(13,49,92,0.06)] md:p-8">
      {step === "LEVEL" && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="mb-5">
            <h3 className="text-xl font-black leading-tight text-[#0d315c] md:text-2xl">
              Select Admission Level
            </h3>
            <p className="mt-1 text-sm text-slate-500">Choose your current education level to view applicable programs.</p>
          </div>
          {renderOptions(options, handleLevelSelect)}
        </div>
      )}

      {step === "DOMAIN" && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          {renderHeader("Select Domain")}
          {renderOptions(options, handleDomainSelect)}
        </div>
      )}

      {step === "SCHOOL" && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          {renderHeader("Select School")}
          {renderOptions(options, handleSchoolSelect)}
        </div>
      )}

      {step === "DEPARTMENT" && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          {renderHeader("Select Department")}
          {renderOptions(options, handleDepartmentSelect)}
        </div>
      )}

      {step === "PROGRAM" && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          {renderHeader("Select Program")}
          {renderOptions(options, handleProgramSelect)}
        </div>
      )}
    </div>
  );
}
