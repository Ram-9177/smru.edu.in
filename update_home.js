const fs = require('fs');

const targetFile = 'src/views/Home.tsx';
let content = fs.readFileSync(targetFile, 'utf8');

// Find the start of the trust-snapshot section
const startIndex = content.indexOf('      {/* ===================== TRUST SNAPSHOT ====================== */}');
if (startIndex === -1) throw new Error('Start index not found');

// Find the end of the scholarships section (start of faqs)
const endIndex = content.indexOf('      {/* ====================== FAQ & FOOTER INFO ====================== */}');
if (endIndex === -1) throw new Error('End index not found');

const newContent = `      {/* ===================== TRUST STRIP ====================== */}
      <section id="trust-strip" className="bg-[#0d315c] text-white py-6 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white/90 leading-relaxed max-w-4xl mx-auto">
            St. Mary’s Rehabilitation University is established through Telangana Gazette Act No. 10 of 2026 and recognized by the University Grants Commission under Section 2(f) of the UGC Act, 1956.
          </p>
        </div>
      </section>

      {/* ===================== WHY SMRU ====================== */}
      <section id="why-smru" className="scroll-mt-24 py-16 md:py-24 bg-[#f8fbff]">
        <div className="max-w-7xl mx-auto px-4">
          <UniversitySectionHeader
            title="A Rehabilitation-Led Academic Ecosystem"
            subtitle="SMRU brings together rehabilitation, healthcare, allied sciences, assistive technology, law, management, technology, and multidisciplinary education through a student-first academic ecosystem."
            subtitleClassName="max-w-3xl"
          />
          <BentoTrustGrid
            className="mt-12"
            items={[
              {
                title: "Rehabilitation & Healthcare Focus",
                desc: "Dedicated clinical training embedded into healthcare and allied sciences programmes.",
              },
              {
                title: "6 Focused Schools",
                desc: "A streamlined structure offering depth and specialization across key academic fields.",
              },
              {
                title: "Student-First Ecosystem",
                desc: "Built to support student outcomes from admission through graduation and beyond.",
              },
              {
                title: "Statutory Compliance",
                desc: "Operating transparently under UGC 2(f) and State University guidelines.",
              },
            ]}
          />
        </div>
      </section>

      {/* ===================== EXPLORE SIX SCHOOLS ====================== */}
      <section id="schools" className="scroll-mt-24 py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <UniversitySectionHeader
            title="Explore Our 6 Schools"
            subtitle="Discover focused programmes designed for modern professional pathways in rehabilitation, health, technology, and management."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[
              { name: "School of Rehabilitation Sciences", slug: "rehabilitation-sciences", icon: <FaHandsHelping /> },
              { name: "School of Health & Allied Sciences", slug: "health-allied-health-sciences", icon: <FaStethoscope /> },
              { name: "School of Behavioural Sciences", slug: "behavioural-sciences", icon: <FaBrain /> },
              { name: "School of Nursing", slug: "nursing", icon: <FaHeartbeat /> },
              { name: "School of Technology", slug: "technology", icon: <FaChartLine /> },
              { name: "School of Management & Law", slug: "management", icon: <FaScroll /> },
            ].map((school, i) => (
              <Link 
                key={i} 
                to={\`/schools/\${school.slug}\`} 
                className="bg-[#f5f9ff] p-8 border border-[#d8e8fb] cut-corner-panel shadow-sm hover:shadow-xl transition-all group hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 grayscale pointer-events-none group-hover:opacity-10 transition-opacity">
                  <div className="text-[100px] text-[#0d315c]">{school.icon}</div>
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#019e6e] shadow-sm mb-6">
                    <span className="text-xl">{school.icon}</span>
                  </div>
                  <h3 className="text-xl font-black text-[#0d315c] mb-6 leading-tight group-hover:text-[#019e6e] transition-colors pr-6">
                    {school.name}
                  </h3>
                  <span className="text-[#ffaf3a] text-[11px] font-black uppercase tracking-widest flex items-center gap-2">
                    Explore Programmes <FaArrowRight />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================== STUDENT LEARNING EXPERIENCE ================= */}
      <section id="experience" className="scroll-mt-24 py-16 md:py-24 bg-[#f8fbff]">
        <div className="max-w-7xl mx-auto px-4">
          <UniversitySectionHeader
            title="Student Learning Experience"
            subtitle="We follow advanced, practice-based teaching methods to ensure students gain hands-on experience and a deep understanding of their field."
            subtitleClassName="max-w-3xl"
          />

          <TechniqueModernGrid
            className="mt-12"
            items={[
              {
                title: "Clinical Exposure",
                meta: "Hands-On",
                icon: <FaStethoscope />,
                desc: "Practical, functional tasks in clinical settings that improve learning retention and professional readiness.",
              },
              {
                title: "Simulation Labs",
                meta: "Advanced Facilities",
                icon: <FaBrain />,
                desc: "Realistic clinical simulations that prepare students for patient-facing and technical scenarios.",
              },
              {
                title: "Multisensory Learning",
                meta: "Integrated Methods",
                icon: <FaEye />,
                desc: "Integrated methods that engage visual, auditory, and kinesthetic pathways.",
              },
              {
                title: "Peer-Led Case Discussions",
                meta: "Collaborative Review",
                icon: <FaUsers />,
                desc: "Collaborative case reviews to build critical thinking and team-based decision skills.",
              },
            ]}
          />
        </div>
      </section>

      {/* ================= OFFICIAL RECOGNITION ================= */}
      <section id="recognition" className="scroll-mt-24 py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#f5f9ff] text-[#0d315c] mb-8 shadow-inner border border-[#d8e8fb]">
            <FaScroll size={32} />
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-outfit text-[#0d315c] tracking-tight uppercase leading-none">
            Official <span className="text-[#019e6e]">Recognition.</span>
          </h2>
          <div className="mx-auto mt-6 h-1.5 w-24 cut-corner-underline bg-[#ffaf3a]" />
          
          <p className="mt-8 text-lg text-slate-600 font-medium leading-relaxed">
            St. Mary’s Rehabilitation University operates under complete statutory compliance. We are established by the Government of Telangana and recognized by the UGC, ensuring our degrees hold official value across India and globally.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              to="/approvals-recognitions" 
              className="px-10 py-5 bg-[#019e6e] text-white rounded-xl font-black text-[13px] uppercase tracking-[0.3em] shadow-xl hover:bg-[#0fa571] hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-3"
            >
              View Official Documents <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= ADMISSIONS CTA ================= */}
      <section id="admissions-cta" className="py-16 md:py-24 bg-[#0d315c] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#019e6e]/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-black font-outfit text-white leading-tight uppercase tracking-tight">
            Begin Your <span className="text-[#ffaf3a]">Professional Journey.</span>
          </h2>
          <p className="mt-6 text-white/80 text-lg md:text-xl font-medium leading-relaxed">
            Admissions for the upcoming academic session are now open. Speak to our counselors or start your application today.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={openApply}
              className="px-10 py-5 bg-[#ffaf3a] hover:bg-white text-[#0d315c] rounded-xl font-black text-[13px] uppercase tracking-[0.3em] shadow-[0_12px_40px_rgba(255,175,58,0.35)] hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              Apply Now
            </button>
            <Link 
              to="/contact" 
              className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-black text-[13px] uppercase tracking-[0.3em] shadow-xl hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3 backdrop-blur-sm"
            >
              Talk to Admissions
            </Link>
          </div>
        </div>
      </section>

`;

const finalContent = content.substring(0, startIndex) + newContent + content.substring(endIndex);
fs.writeFileSync(targetFile, finalContent);
console.log('Successfully updated Home.tsx');
