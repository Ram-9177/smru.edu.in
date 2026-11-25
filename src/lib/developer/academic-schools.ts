import { schools as builtInSchools } from "@/data/schools";
import { buildAcademicSchoolsFromCms, syncAcademicSchoolsWithCms } from "./academic-data";
import type { DeveloperCMSState } from "@/types/developer";

const merged = new WeakMap<DeveloperCMSState, any[]>();

// The schools with their departments and programmes, as the public pages show them. Merged once per CMS state and
// shared, so moving between pages does not rebuild the catalogue. Read it, never change it.
export function getAcademicSchools(state: DeveloperCMSState): any[] {
  let schools = merged.get(state);
  if (!schools) {
    schools = syncAcademicSchoolsWithCms(builtInSchools, buildAcademicSchoolsFromCms(state));
    merged.set(state, schools);
  }
  return schools;
}
