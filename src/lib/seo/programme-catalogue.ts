import { schools } from "@/data/schools";
import { getProgrammeFee, formatINR } from "@/data/programme-fees";
import { safeSlug, detectProgramCategory } from "@/lib/shared/program-utils";
import { getProgrammeDisplayName } from "@/lib/shared/programme-names";

export type CatalogueProgramme = {
  name: string;
  path: string;
  schoolName: string;
  schoolSlug: string;
  departmentName: string;
  level: string;
  category: "ug" | "pg" | "diploma" | "phd" | "integrated_phd";
  categoryLabel: string;
  duration?: string;
  eligibility?: string;
  feeLabel: string;
};

const CATEGORY_LABEL: Record<CatalogueProgramme["category"], string> = {
  ug: "Undergraduate",
  pg: "Postgraduate",
  diploma: "Diploma",
  phd: "Doctoral",
  integrated_phd: "Integrated Doctoral",
};

const feeLabelFor = (path: string): string => {
  const fee = getProgrammeFee(path);
  if (fee?.annualINR) return `${formatINR(fee.annualINR)} / year`;
  if (fee?.totalINR) return `${formatINR(fee.totalINR)} total`;
  return "Published at counselling";
};

// Every routable programme, flattened. Drives /programmes/ and the coverage audit.
export function getCatalogueProgrammes(): CatalogueProgramme[] {
  const items: CatalogueProgramme[] = [];
  for (const school of schools) {
    if (school.visibility && school.visibility !== "public") continue;
    const schoolSlug = safeSlug(school.slug, school.name);
    for (const department of school.departments || []) {
      const deptSlug = safeSlug(department.slug, department.name);
      for (const program of department.programs || []) {
        const progSlug = safeSlug(program.slug, program.name);
        const path = `/schools/${schoolSlug}/${deptSlug}/${progSlug}`;
        const category = detectProgramCategory(program) as CatalogueProgramme["category"];
        items.push({
          name: getProgrammeDisplayName(program),
          path,
          schoolName: school.name,
          schoolSlug,
          departmentName: department.name,
          level: program.level || CATEGORY_LABEL[category],
          category,
          categoryLabel: CATEGORY_LABEL[category],
          duration: program.duration,
          eligibility: program.eligibility,
          feeLabel: feeLabelFor(path),
        });
      }
    }
  }
  return items;
}

export function getCatalogueGroupedBySchool() {
  const programmes = getCatalogueProgrammes();
  const bySchool = new Map<string, { schoolName: string; schoolSlug: string; programmes: CatalogueProgramme[] }>();
  for (const programme of programmes) {
    const group = bySchool.get(programme.schoolSlug) || {
      schoolName: programme.schoolName,
      schoolSlug: programme.schoolSlug,
      programmes: [],
    };
    group.programmes.push(programme);
    bySchool.set(programme.schoolSlug, group);
  }
  for (const group of bySchool.values()) {
    group.programmes.sort((a, b) => a.name.localeCompare(b.name));
  }
  return [...bySchool.values()];
}
