import type { CourseCode } from "@/types/developer";

type CourseCodeTuple = readonly [
  serialNo: string,
  schoolCode: string,
  schoolName: string,
  departmentCode: string,
  departmentName: string,
  levelCode: string,
  level: string,
  courseCodeWithTrack: string,
  courseName: string,
  track: string,
  fullCode: string,
  years: string,
  semesters: string,
];

const sourceRows = `
1	01	Rehabilitation Sciences	A	Audiology & Speech-Language Pathology	03	UG	00100	Bachlor In Audio and Speech Language Pathology (BASLP)	Stmarys University	01A0300100	4	8
2	01	Rehabilitation Sciences	A	Audiology & Speech-Language Pathology	06	PG	00200	M.Sc Audiology	Stmarys University	01A0600200	2	4
3	01	Rehabilitation Sciences	A	Audiology & Speech-Language Pathology	08	Ph.D.	00300	Ph.D. Audiology	Stmarys University	01A0800300	3/4	
4	01	Rehabilitation Sciences	B	Prosthetics & Orthotics	03	UG	00400	Bachelor in Prosthetics and Orthotics(BPO)	Stmarys University	01B0300400	4	8
5	01	Rehabilitation Sciences	B	Prosthetics & Orthotics	06	PG	00500	Master in Prosthetics and Orthotics (MPO)	Stmarys University	01B0600500	2	
6	01	Rehabilitation Sciences	C	Special & Inclusive Education	04	IPG	00600	B.A B.Ed	Stmarys University	01C0400600	4	8
7	01	Rehabilitation Sciences	C	Special & Inclusive Education	04	IPG	00700	B.Sc B.Ed	Stmarys University	01C0400700	4	8
8	01	Rehabilitation Sciences	C	Special & Inclusive Education	04	IPG	00800	B.Com B.Ed	Stmarys University	01C0400800	4	8
9	01	Rehabilitation Sciences	C	Special & Inclusive Education	08	Ph.D.	00900	Ph.D. Inclusive Education	Stmarys University	01C0800900	3/4	
10	01	Rehabilitation Sciences	C	Special & Inclusive Education	08	Ph.D.	01000	Ph.D. Special Education	Stmarys University	01C0801000	3/4	
11	02	Health & Allied Health Sciences	A	Physiotherapy	03	UG	01100	Bachelor of Physiotherapy (BPT)	Stmarys University (SM)	02A0301100	5	
12	02	Health & Allied Health Sciences	A	Physiotherapy	03	UG	01109	Bachelor of Physiotherapy (BPT(EM))	Emversity (EM)	02A0301109	5	
13	02	Health & Allied Health Sciences	A	Physiotherapy	06	PG	01200	Master in Physiotherapy (MPT)	Stmarys University	02A0601200	2	
14	02	Health & Allied Health Sciences	A	Physiotherapy	08	Ph.D.	01300	Ph.D. Physiotherapy	Stmarys University	02A0801300	3/4	
15	02	Health & Allied Health Sciences	A	Physiotherapy	08	Ph.D.	01400	Ph.D. Physiotherapy Neurology	Stmarys University	02A0801300	3/4	
16	02	Health & Allied Health Sciences	B	Occupational Therapy	03	UG	01500	Bachelor of Occupatioanltherapy (BOT)	Stmarys University	02B0301500	5	
17	02	Health & Allied Health Sciences	B	Occupational Therapy	03	UG	01509	Bachelor of Occupatioanltherapy (BOT(EM))	Emversity	02B0301509	5	
18	02	Health & Allied Health Sciences	B	Occupational Therapy	06	PG	01600	Master of Occupationaltherapy (MOT)	Stmarys University	02B0601600	2	
19	02	Health & Allied Health Sciences	B	Occupational Therapy	08	Ph.D.	01700	Ph.D. Occupational Therapy	Stmarys University	02B0801700	3/4	
20	02	Health & Allied Health Sciences	C	Allied Health Technologies	03	UG	01809	Medical Lab Sciences(EM)	Emversity	02C0301809	4	8
21	02	Health & Allied Health Sciences	C	Allied Health Technologies	03	UG	01909	Anesthesia & OT Technology(EM)	Emversity	02C0301909	4	
22	02	Health & Allied Health Sciences	C	Allied Health Technologies	03	UG	02009	Cardiovascular Technology(EM)	Emversity	02C0302009	4	
23	02	Health & Allied Health Sciences	C	Allied Health Technologies	03	UG	02109	Emergency Medical Technology(EM)	Emversity	02C0302109	4	
24	02	Health & Allied Health Sciences	C	Allied Health Technologies	03	UG	02209	Optometry(EM)	Emversity	02C0302209	4	8
25	02	Health & Allied Health Sciences	C	Allied Health Technologies	03	UG	02309	Radiotherapy Technology	Emversity	02C0302309	4	8
26	02	Health & Allied Health Sciences	C	Allied Health Technologies	03	UG	02410	Forensic Science	Edinbox	02C0302410	4	8
27	03	Psychology	A	Clinical Psychology	03	UG	02500	B.Sc Clinical Psychology	Stmarys University	03A0302500	4	8
28	03	Psychology	A	Clinical Psychology	06	PG	02600	M.A Clinical Psychology	Stmarys University	03A0602600	2	
29	03	Psychology	A	Clinical Psychology	08	Ph.D.	02700	Ph.D. Clinical Psycology	Stmarys University	03A0802700	4	
30	03	Psychology	A	Clinical Psychology	05	PGD	02800	Post Graduate Diploma in Clinical Psychology (PDCP)	Stmarys University	03A0502800	1	
31	03	Psychology	B	Rehabilitation Psychology	05	PGD	02900	Post Graduate Diploma in Rehabilitation Psychology (PGDRP)	Stmarys University	03B0502900	1	
32	03	Psychology	B	Rehabilitation Psychology	08	Ph.D.	03000	Ph.D. Rehabilitation Psychology	Stmarys University	03B0803000	3/4	
33	03	Psychology	C	Applied Psychology & Behavioral Health	03	UG	03100	B.Psychology	Stmarys University	03C0303100		
34	03	Psychology	C	Applied Psychology & Behavioral Health	06	PG	03200	M.Psychology	Stmarys University	03C0603200		
35	03	Psychology	C	Applied Psychology & Behavioral Health	08	Ph.D.	03300	Ph.D. Psychology	Stmarys University	03C0803300	3/4	
36	03	Psychology	C	Applied Psychology & Behavioral Health	08	Ph.D.	03400	Ph.D. Applied Psychology	Stmarys University	03C0803400	3/4	
37	04	Nursing	A	Nursing	03	UG	03500	B.Sc Nursing	Stmarys University	04A0303500	4	8
38	04	Nursing	A	Nursing	06	PG	03600	M.Sc Nursing	Stmarys University	04A0603600	2	4
39	05	Engineering & Emerging Technologies	A	Rehabilitation Engineering	03	UG	03700	B.Tech Rehab Engineering	Stmarys University	05A0303700		
40	05	Engineering & Emerging Technologies	A	Rehabilitation Engineering	03	UG	03800	B.Tech RE (P&O/AT)	Stmarys University	05A0303800		
41	05	Engineering & Emerging Technologies	B	Computer Science & Engineering	03	UG	03900	B.Tech CSE(SM)	Stmarys University	05B0303900	4	8
42	05	Engineering & Emerging Technologies	B	Computer Science & Engineering	03	UG	03903	B.Tech CSE(QT)	QTST	05B0303903	4	8
43	05	Engineering & Emerging Technologies	B	Computer Science & Engineering	03	UG	03906	B.Tech CSE(II)	IIAT	05B0303906	4	8
44	05	Engineering & Emerging Technologies	B	Computer Science & Engineering	03	UG	03907	B.Tech CSE(VE)	Veloces	05B0303907	4	8
45	05	Engineering & Emerging Technologies	B	Computer Science & Engineering	03	UG	04000	B.Tech CSE (AI & ML)(SM)	Stmarys University	05B0304000	4	8
46	05	Engineering & Emerging Technologies	B	Computer Science & Engineering	03	UG	04002	B.Tech CSE (AI & ML)(NI)	NIAT	05B0304002	4	8
47	05	Engineering & Emerging Technologies	B	Computer Science & Engineering	03	UG	04004	B.Tech CSE (AI & ML)(IS)	IST	05B0304004	4	8
48	05	Engineering & Emerging Technologies	B	Computer Science & Engineering	03	UG	04006	B.Tech CSE (AI & ML)(II)	IIAT	05B0304006	4	8
49	05	Engineering & Emerging Technologies	B	Computer Science & Engineering	03	UG	04007	B.Tech CSE (AI & ML)(VE)	Veloces	05B0304007	4	8
50	05	Engineering & Emerging Technologies	B	Computer Science & Engineering	03	UG	04008	B.Tech CSE (AI & ML)(BX)	ByteXL	05B0304008	4	8
51	05	Engineering & Emerging Technologies	B	Computer Science & Engineering	03	UG	04100	B.Tech CSE (AI & DS)(SM)	Stmarys University	05B0304100	4	8
52	05	Engineering & Emerging Technologies	B	Computer Science & Engineering	03	UG	04103	B.Tech CSE (AI & DS)(QT)	QTST	05B0304103	4	8
53	05	Engineering & Emerging Technologies	B	Computer Science & Engineering	03	UG	04105	B.Tech CSE (AI & DS)(BB)	BB	05B0304105	4	8
54	05	Engineering & Emerging Technologies	B	Computer Science & Engineering	03	UG	04106	B.Tech CSE (AI & DS)(II)	IIAT	05B0304106	4	8
55	05	Engineering & Emerging Technologies	B	Computer Science & Engineering	08	Ph.D.	04200	Ph.D. CSE	Stmarys University	05B0804200	3/4	
56	05	Engineering & Emerging Technologies	C	Sciences & Humanities	08	Ph.D.	04300	Ph.D. Mathematics	Stmarys University	05C0804300	3/4	
57	05	Engineering & Emerging Technologies	C	Sciences & Humanities	08	Ph.D.	04400	Ph.D.  Physics	Stmarys University	05C0804400	3/4	
58	05	Engineering & Emerging Technologies	C	Sciences & Humanities	08	Ph.D.	04500	Ph.D. Chemistry	Stmarys University	05C0804500	3/4	
59	05	Engineering & Emerging Technologies	C	Sciences & Humanities	08	Ph.D.	04600	Ph.D. English	Stmarys University	05C0804600	3/4	
60	05	Engineering & Emerging Technologies	D	Business Administration & Computer Applications	08	Ph.D.	04700	Ph.D. Business Administration	Stmarys University	05D0804700	3/4	
61	06	Law	A	Law	03	UG	04800	LLB	Stmarys University	06A0304800	3	6
62	06	Law	A	Law	03	UG	04900	LLB (Hons)	Stmarys University	06A0304900	3	6
63	06	Law	A	Law	04	IPG	05000	BA LLB (Hons)	Stmarys University	06A0405000	5	10
64	06	Law	A	Law	04	IPG	05100	BBA LLB (Hons)	Stmarys University	06A0405100	5	10
65	06	Law	A	Law	04	IPG	05200	BSc LLB (Hons)	Stmarys University	06A0405200	5	10
66	01	Rehabilitation Sciences	A	Audiology & Speech-Language Pathology	06	PG	05300	MSc in Audiology (MAO)	Stmarys University	01A0605300	2	4
67	02	Health & Allied Health Sciences	C	Allied Health Technologies	03	UG	05400	Bachelor of Medical Laboratory Science (BMLS)	Stmarys University	02C0305400	4	8
68	02	Health & Allied Health Sciences	C	Allied Health Technologies	03	UG	05500	Bachelor of Emergency Medical Technologist (B.EMT)	Stmarys University	02C0305500	4	8
69	02	Health & Allied Health Sciences	C	Allied Health Technologies	02	Diploma	05600	Diploma in Anaesthesia and Operation Theatre Technology (D.AOTT)	Stmarys University	02C0205600	2.5	5
70	02	Health & Allied Health Sciences	C	Allied Health Technologies	03	UG	05700	Bachelor of Anaesthesia and Operation Theatre Technology (BAOTT)	Stmarys University	02C0305700	4	8
71	02	Health & Allied Health Sciences	C	Allied Health Technologies	03	UG	05800	Bachelor of Nutrition and Dietetics (Hons)	Stmarys University	02C0305800	4	8
72	02	Health & Allied Health Sciences	C	Allied Health Technologies	02	Diploma	05900	Diploma of Radiotherapy Technology (D.RT)	Stmarys University	02C0205900	2.5	5
73	02	Health & Allied Health Sciences	C	Allied Health Technologies	03	UG	06000	Bachelor of Radiotherapy Technology (B.RTT)	Stmarys University	02C0306000	4	7
74	02	Health & Allied Health Sciences	C	Allied Health Technologies	03	UG	06100	Bachelor of Physician Assistant (B.PA)	Stmarys University	02C0306100	4	8
75	02	Health & Allied Health Sciences	C	Allied Health Technologies	02	Diploma	06200	Diploma of Dialysis Technology (D.DT)	Stmarys University	02C0206200	2.5	5
76	02	Health & Allied Health Sciences	C	Allied Health Technologies	03	UG	06300	Bachelor of Dialysis Therapy Technology (B.DTT)	Stmarys University	02C0306300	4	8
77	02	Health & Allied Health Sciences	C	Allied Health Technologies	03	UG	06400	Bachelor of Respiratory Technology (B.RT)	Stmarys University	02C0306400	4	8
78	03	Psychology	C	Applied Psychology & Behavioral Health	03	UG	06500	Bachelor of Medical and Psychiatric Social Work (B.MPSW)	Stmarys University	03C0306500	4	8
79	03	Psychology	C	Applied Psychology & Behavioral Health	06	PG	06600	Master of Medical and Social Work (M.MSW)	Stmarys University	03C0606600	2	4
80	03	Psychology	C	Applied Psychology & Behavioral Health	06	PG	06700	Master of Psychiatric Social Work (M.PSW)	Stmarys University	03C0606700	2	4
81	06	Law	A	Law	04	IPG	06800	B.Sc. (Forensic) LL.B. (Hons.)	Stmarys University	06A0406800	5	10
82	05	Engineering & Emerging Technologies	B	Computer Science & Engineering	03	UG	06906	B.Tech CSE(CS)	IIAT	05B0306906	4	8
83	05	Engineering & Emerging Technologies	B	Computer Science & Engineering	03	UG	07006	B.Tech CSE(Fintech & AI)	IIAT	05B0307006	4	8
84	05	Engineering & Emerging Technologies	B	Computer Science & Engineering	03	UG	07106	B.Tech CSE (Biomedical Engineering)	IIAT	05B0307106	4	8
85	01	Rehabilitation Sciences	A	Audiology & Speech-Language Pathology	08	Ph.D.	07200	Ph.D. Speech & Hearing	Stmarys University	01A0807200	3/4	
86	06	Law	A	Law	06	PG	07300	LLM	Stmarys University	06A0607300	1	2
87	06	Law	A	Law	08	Ph.D.	07400	Ph.D. in Law	Stmarys University	06A0807400	3/4	
88	02	Health & Allied Health Sciences	A	Physiotherapy	03	UG	01111	Bachelor of Physiotherapy (BPT (EG))	Edridge	02A0301111	5	
89	02	Health & Allied Health Sciences	B	Occupational Therapy	03	UG	01511	Bachelor of Occupatioanltherapy (BOT(EG))	Edridge	02B0301511	5	
90	02	Health & Allied Health Sciences	C	Allied Health Technologies	03	UG	01911	Anesthesia & OT Technology (EG)	Edridge	02C0301911	4	
91	02	Health & Allied Health Sciences	C	Allied Health Technologies	03	UG	02011	Cardiovascular Technology (EG)	Edridge	02C0302011	4	
92	02	Health & Allied Health Sciences	A	Physiotherapy	06	PG	01211	Master in Physiotherapy (MPT)	Stmarys University	02A0601211	2	
93	02	Health & Allied Health Sciences	C	Allied Health Technologies	03	UG	01811	Medical Lab Sciences(EG)	Edridge	02C0301811	4	8
94	02	Health & Allied Health Sciences	C	Allied Health Technologies	03	UG	07511	Bachelor in Medical Radiology and Imaging Technology	Edridge	02C0307511	4	8
95	05	Engineering & Emerging Technologies	B	Computer Science & Engineering	03	UG	04005	B.Tech CSE (AI & ML)(BB)	Black Buck	05B0304005	4	8
96	05	Engineering & Emerging Technologies	B	Computer Science & Engineering	03	UG	04105	B.Tech CSE (AI & DS)(SM)	Stmarys University	05B0304105	4	8
`;

const toCourseSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const rows = sourceRows.trim().split("\n").map((line) => line.split("\t") as unknown as CourseCodeTuple);

export const COURSE_CODES: CourseCode[] = rows.map(
  ([
    serialNo,
    schoolCode,
    schoolName,
    departmentCode,
    departmentName,
    levelCode,
    level,
    courseCodeWithTrack,
    courseName,
    track,
    fullCode,
    years,
    semesters,
  ]) => ({
    id: `course-code-${serialNo}-${fullCode || courseCodeWithTrack}`,
    slug: toCourseSlug(`${fullCode || courseCodeWithTrack}-${courseName}`),
    serialNo,
    schoolCode,
    schoolName,
    departmentCode,
    departmentName,
    levelCode,
    level,
    courseCodeWithTrack,
    courseName,
    track,
    fullCode,
    years,
    semesters,
    visibility: "public",
    status: "live",
  })
);
