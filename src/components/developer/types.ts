export type DeveloperTabKey =
  | "dashboard"
  | "map"
  | "routes"
  | "schools"
  | "departments"
  | "programs"
  | "courseCodes"
  | "partners"
  | "missing"
  | "preview";

export const DEVELOPER_TABS: Array<{ key: DeveloperTabKey; label: string }> = [
  { key: "dashboard", label: "Dashboard" },
  { key: "map", label: "Mind Map" },
  { key: "routes", label: "Routes" },
  { key: "schools", label: "Schools" },
  { key: "departments", label: "Departments" },
  { key: "programs", label: "Programs" },
  { key: "courseCodes", label: "Course Codes" },
  { key: "partners", label: "Partners" },
  { key: "missing", label: "Missing Content" },
  { key: "preview", label: "Preview" },
];
