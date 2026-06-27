import type { DeveloperCMSState, Program } from "@/types/developer";
import { slugify } from "@/lib/shared/program-utils";

const levelFromProgramType = (programType?: Program["programType"]) => {
  if (programType === "UG") return "UG Program";
  if (programType === "PG") return "PG Program";
  if (programType === "PhD") return "Ph.D.";
  if (programType === "Diploma" || programType === "Certificate") return "Post Dip";
  if (programType === "Fellowship") return "Fellowship";
  return "Program";
};

const partnerCodesFromProgram = (program?: Program) =>
  (Array.isArray(program?.trainingPartnerAssigned) ? program?.trainingPartnerAssigned : [])
    .map((code) => String(code || "").toUpperCase().trim())
    .filter(Boolean);

const normalizeAcademicMatchText = (value = "") => {
  let text = value.toLowerCase().replace(/&/g, "and").replace(/\s+/g, " ").trim();
  const replacements: Array<[RegExp, string]> = [
    [/\bbachelor(?:'s)?\b/g, ""],
  ];
  replacements.forEach(([pattern, replacement]) => {
    text = text.replace(pattern, replacement);
  });
  return text;
};

const getAcademicMatchKey = (item?: { slug?: string; name?: string }) => slugify(normalizeAcademicMatchText(item?.slug || item?.name || ""));

const mergeAcademicPrograms = (basePrograms: any[] = [], overlayPrograms: any[] = []) => {
  const baseByKey = new Map(basePrograms.map((program) => [getAcademicMatchKey(program), program]));
  const merged = [...basePrograms];

  overlayPrograms.forEach((program) => {
    const key = getAcademicMatchKey(program);
    if (!key) return;
    const existing = baseByKey.get(key);
    if (existing) {
      const nextProgram = { ...existing, ...program };
      baseByKey.set(key, nextProgram);
      const index = merged.findIndex((item) => getAcademicMatchKey(item) === key);
      if (index >= 0) merged[index] = nextProgram;
      return;
    }
    baseByKey.set(key, program);
    merged.push(program);
  });

  return merged;
};

const mergeAcademicDepartments = (baseDepartments: any[] = [], overlayDepartments: any[] = []) => {
  const baseByKey = new Map(baseDepartments.map((department) => [getAcademicMatchKey(department), department]));
  const merged = [...baseDepartments];

  overlayDepartments.forEach((department) => {
    const key = getAcademicMatchKey(department);
    if (!key) return;
    const existing = baseByKey.get(key);
    if (existing) {
      const nextDepartment = {
        ...existing,
        ...department,
        programs: mergeAcademicPrograms(existing.programs || [], department.programs || []),
      };
      baseByKey.set(key, nextDepartment);
      const index = merged.findIndex((item) => getAcademicMatchKey(item) === key);
      if (index >= 0) merged[index] = nextDepartment;
      return;
    }
    const nextDepartment = {
      ...department,
      programs: department.programs || [],
    };
    baseByKey.set(key, nextDepartment);
    merged.push(nextDepartment);
  });

  return merged;
};

export const mergeAcademicSchools = (baseSchools: any[] = [], overlaySchools: any[] = []) => {
  const overlayByKey = new Map(overlaySchools.map((school) => [getAcademicMatchKey(school), school]));
  const merged = baseSchools.map((school) => {
    const overlay = overlayByKey.get(getAcademicMatchKey(school));
    if (!overlay) return school;
    return {
      ...school,
      ...overlay,
      departments: mergeAcademicDepartments(school.departments || [], overlay.departments || []),
    };
  });

  const baseKeys = new Set(baseSchools.map((school) => getAcademicMatchKey(school)));
  overlaySchools.forEach((school) => {
    const key = getAcademicMatchKey(school);
    if (!key || baseKeys.has(key)) return;
    merged.push(school);
  });

  return merged;
};

export const syncAcademicSchoolsWithCms = (baseSchools: any[] = [], cmsSchools: any[] = []) => {
  const baseByKey = new Map<string, any>(baseSchools.map((school) => [getAcademicMatchKey(school), school]));

  return cmsSchools.map((school) => {
    const baseSchool = baseByKey.get(getAcademicMatchKey(school));
    const baseDepartments = baseSchool?.departments || [];
    const baseDeptByKey = new Map<string, any>(baseDepartments.map((department) => [getAcademicMatchKey(department), department]));

    return {
      ...(baseSchool || {}),
      ...school,
      departments: (school.departments || []).map((department) => {
        const baseDepartment = baseDeptByKey.get(getAcademicMatchKey(department));
        const basePrograms = baseDepartment?.programs || [];
        const baseProgramByKey = new Map<string, any>(basePrograms.map((program) => [getAcademicMatchKey(program), program]));

        return {
          ...(baseDepartment || {}),
          ...department,
          programs: (department.programs || []).map((program) => {
            const baseProgram = baseProgramByKey.get(getAcademicMatchKey(program));
            return {
              ...(baseProgram || {}),
              ...program,
              partnerCodes: program.partnerCodes || baseProgram?.partnerCodes,
            };
          }),
        };
      }),
    };
  });
};

const isPublicEntity = (entity?: { visibility?: string; status?: string }) => {
  if (!entity) return false;
  const visibility = entity.visibility || "public";
  const status = entity.status || "live";
  return visibility === "public" && status !== "archived";
};

export function buildAcademicSchoolsFromCms(state: DeveloperCMSState) {
  const schools = [...(state.schools || [])]
    .filter((school) => isPublicEntity(school))
    .filter((school) => {
      const name = (school.name || "").toLowerCase();
      // Explicitly hide these schools for now as requested
      const isCommerce = name.includes("commerce");
      const isNextGen = name.includes("nextgen");
      return !isCommerce && !isNextGen;
    })
    .sort((a, b) => (a.displayOrder || 999) - (b.displayOrder || 999));
  const departments = [...(state.departments || [])]
    .filter((department) => isPublicEntity(department))
    .sort((a, b) => (a.displayOrder || 999) - (b.displayOrder || 999));
  const programs = [...(state.programs || [])].filter((program) => isPublicEntity(program));

  return schools.map((school) => ({
    id: school.id,
    slug: school.slug || "",
    name: school.name || "Untitled School",
    short: school.shortName || school.name || "",
    about: school.overview || school.description || "",
    departments: departments
      .filter((department) => department.schoolId === school.id)
      .map((department) => ({
        id: department.id,
        slug: department.slug || "",
        name: department.name || "Untitled Department",
        short: department.name || "",
        about: department.fullDescription || department.shortDescription || "",
        programs: Object.values(
          programs
            .filter((program) => program.departmentId === department.id && program.schoolId === school.id)
            .reduce((acc: any, program) => {
              const name = program.courseName || program.shortName || "Untitled Program";
              const key = getAcademicMatchKey({ name });
              if (!acc[key]) {
                const partnerCodes = partnerCodesFromProgram(program);
                acc[key] = {
                  id: program.id,
                  slug: program.slug || "",
                  name,
                  level: levelFromProgramType(program.programType),
                  overview: program.fullOverview || program.shortOverview || program.curriculumSummary || "",
                  outcomes: program.learningOutcomes || program.careerOutcomes || program.careerOpportunities || "",
                  duration: program.duration || "",
                  eligibility: program.eligibility || "",
                  highlights: program.highlights || [],
                  specializations: program.electives || [],
                  partnerCode: partnerCodes[0] || "",
                  partnerCodes: [...partnerCodes],
                  partnerLeadUrl: program.applyNowLink || program.primaryCtaLink || "",
                };
              } else {
                const partnerCodes = partnerCodesFromProgram(program);
                partnerCodes.forEach((code) => {
                  if (!acc[key].partnerCodes.includes(code)) {
                    acc[key].partnerCodes.push(code);
                  }
                });
                if (!acc[key].partnerLeadUrl && (program.applyNowLink || program.primaryCtaLink)) {
                  acc[key].partnerLeadUrl = program.applyNowLink || program.primaryCtaLink || "";
                }
              }
              return acc;
            }, {})
        ),
      })),
  }));
}
