import fs from 'fs';

const files = [
  './src/views/Department.tsx',
  './src/views/LeaderProfile.tsx',
  './src/views/Program.tsx',
  './src/views/School.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  
  if (f.includes('Department.tsx')) {
    content = content.replace('const { schoolSlug, deptSlug } = useParams();', 'const params = useParams();\n  const schoolSlug = params.schoolSlug as string;\n  const deptSlug = params.deptSlug as string;');
  } else if (f.includes('LeaderProfile.tsx')) {
    content = content.replace('const { slug } = useParams();', 'const params = useParams();\n  const slug = params.slug as string;');
  } else if (f.includes('Program.tsx')) {
    content = content.replace('const { schoolSlug, deptSlug, programSlug } = useParams();', 'const params = useParams();\n  const schoolSlug = params.schoolSlug as string;\n  const deptSlug = params.deptSlug as string;\n  const programSlug = params.programSlug as string;');
  } else if (f.includes('School.tsx')) {
    content = content.replace('const { schoolSlug } = useParams();', 'const params = useParams();\n  const schoolSlug = params.schoolSlug as string;');
  }

  fs.writeFileSync(f, content, 'utf8');
});
