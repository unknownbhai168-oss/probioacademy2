export interface CourseProgramme {
  id: string;
  levelLabel: string;
  title: string;
  shortDescription: string;
  extendedFocus: string;
  learningHighlights: string[];
  iconName: 'book' | 'compass' | 'atom' | 'layers' | 'graduation' | 'award';
}

export interface QualificationItem {
  id: string;
  title: string;
  discipline: string;
  description: string;
  iconName: 'engineering' | 'law' | 'english';
}

export interface BioPerspective {
  id: string;
  label: string;
  qualificationTag: string;
  headline: string;
  summary: string;
  classroomApplication: string;
}

export interface WhyChooseItem {
  id: string;
  number: string;
  title: string;
  description: string;
  iconName: 'userCheck' | 'lightbulb' | 'layers' | 'messageCircle' | 'compass' | 'heartHandshake';
}

export interface MethodologyStep {
  step: string;
  title: string;
  description: string;
  detail: string;
}

export interface ExperiencePillar {
  id: string;
  title: string;
  description: string;
  iconName: 'target' | 'bookOpen' | 'user' | 'helpCircle' | 'listChecks' | 'users';
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const ACADEMY_INFO = {
  name: 'PROBIO ACADEMY',
  brandDisplay: 'ProBio Academy',
  tagline: 'Where Biological Concepts Meet NEET Excellence.',
  teacherName: 'Shubhajit Sir',
  teacherPhotoUrl: '/assets/aistudio/image_b76088bf.png',
  studentGroupPhotoUrl: '/assets/aistudio/image_48a471f3.png',
  phoneDisplay: '+91 89818 00375',
  phoneHref: 'tel:+918981800375',
  whatsappNumber: '918981800375',
  whatsappBaseUrl: 'https://wa.me/918981800375',
  teachingRange: 'NEET UG (Class 11, Class 12 & Droppers) · Class 9–10 Foundation',
  neetFocusHeadline: 'Dedicated NEET UG Biology & Medical Entrance Coaching in Kolkata',
  addressLines: [
    '9/1, Bireswar Dhole Ln,',
    'Bonhoogly, Baranagar,',
    'Kolkata, West Bengal 700035.',
  ],
  fullAddress: '9/1, Bireswar Dhole Ln, Bonhoogly, Baranagar, Kolkata, West Bengal 700035.',
  openingHours: [
    {
      days: 'Monday – Saturday',
      hours: '9:00 AM – 8:00 PM',
      compact: 'Monday – Saturday: 9 AM – 8 PM',
    },
    {
      days: 'Sunday',
      hours: '9:00 AM – 2:00 PM',
      compact: 'Sunday: 9 AM – 2 PM',
    },
  ],
  googleMapsEmbedUrl:
    'https://www.google.com/maps?q=9%2F1%2C%20Bireswar%20Dhole%20Ln%2C%20Bonhoogly%2C%20Baranagar%2C%20Kolkata%2C%20West%20Bengal%20700035&output=embed',
  googleMapsDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=9%2F1%2C%20Bireswar%20Dhole%20Ln%2C%20Bonhoogly%2C%20Baranagar%2C%20Kolkata%2C%20West%20Bengal%20700035',
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'DNA 3D Lab', href: '#dna-explorer', id: 'dna-explorer' },
  { label: 'NEET Courses', href: '#courses', id: 'courses' },
  { label: 'Our Students', href: '#students-batch', id: 'students-batch' },
  { label: 'Our Teacher', href: '#teacher', id: 'teacher' },
  { label: 'Why Choose Us', href: '#why-choose-us', id: 'why-choose-us' },
  { label: 'Admissions', href: '#admission', id: 'admission' },
  { label: 'Contact', href: '#contact', id: 'contact' },
] as const;

export const ABOUT_HIGHLIGHTS = [
  {
    title: 'NCERT Line-by-Line Mastery',
    detail: 'Complete decoding of every biological diagram, terminology, summary table, and hidden nuance essential for NEET UG.',
  },
  {
    title: '3D Bio-Molecular Conceptualisation',
    detail: 'Visualise DNA replication, transcription, translation, and physiological pathways in 3D for deep, permanent retention.',
  },
  {
    title: 'Assertion-Reasoning & MCQ Tactics',
    detail: 'Methodical logical deduction to eliminate deceptive options and master modern NEET statement-based questions.',
  },
  {
    title: 'Dedicated Doubt-Clearing Support',
    detail: 'One-on-one time to ask questions openly until every biological concept and numerical doubt is thoroughly resolved.',
  },
  {
    title: 'Dropper & Repeater Strategy',
    detail: 'Tailored study roadmaps for gap-year aspirants to identify previous score bottlenecks and rebuild 340+ Biology confidence.',
  },
  {
    title: 'Timed Speed & Accuracy Tests',
    detail: 'Regular OMR-based practice simulating strict NEET examination timing, question-skipping strategy, and zero negative-marking discipline.',
  },
] as const;

export const TEACHER_BIOGRAPHY =
  'Shubhajit Sir brings a unique, high-impact interdisciplinary perspective to NEET UG coaching and academic mentoring. With academic qualifications spanning an Engineering Degree, Bachelor of Laws (LL.B.), and English Honours, his mentorship combines quantitative modeling, razor-sharp logical deduction, and linguistic clarity. This rare multidisciplinary approach equips NEET aspirants, Class 11–12 students, and droppers with the analytical power to conquer tricky assertion-reasoning questions, multi-statement questions, and complex biochemical mechanisms without relying on rote memorisation.';

export const QUALIFICATIONS: QualificationItem[] = [
  {
    id: 'engineering',
    title: 'Engineering Degree',
    discipline: 'Analytical Modeling & Quantitative Bio-Energetics',
    description:
      'Applies systematic problem-solving, flowchart modeling, and quantitative analysis to genetics numericals, Hardy-Weinberg equilibrium, and molecular pathways.',
    iconName: 'engineering',
  },
  {
    id: 'llb',
    title: 'Bachelor of Laws (LL.B.)',
    discipline: 'Rigorous Logic & Assertion-Reasoning Precision',
    description:
      'Trains medical aspirants in disciplined logical scrutiny to analyze complex Assertion & Reasoning questions and avoid high-penalty distractor options.',
    iconName: 'law',
  },
  {
    id: 'english',
    title: 'English Honours',
    discipline: 'Nuanced Text Comprehension & Statement Decoding',
    description:
      'Enables rapid, accurate comprehension of lengthy NCERT multi-statement questions and subtle medical entrance terminology under strict exam clock pressure.',
    iconName: 'english',
  },
];

export const TEACHING_PHILOSOPHY = [
  'Focus on deep conceptual clarity rather than rote memorisation.',
  'Line-by-line NCERT mastery with 3D molecular visualization.',
  'Disciplined assertion-reasoning logic to eliminate negative marks.',
  'Dedicated personal doubt resolution for every student.',
  'Targeted test analysis and strategic score optimization for Droppers and 11-12 batches.',
] as const;

export const BIO_PERSPECTIVES: BioPerspective[] = [
  {
    id: 'analytical',
    label: 'Engineering Logic for NEET',
    qualificationTag: 'Engineering Degree Perspective',
    headline: 'Deconstructing Complex Pathways into Logical Systems',
    summary:
      'In NEET Biology, students often struggle with intricate metabolic cycles and molecular genetics. Using engineering system frameworks, respiration, photosynthesis, and DNA replication are taught as elegant logical circuits rather than dry lists of steps.',
    classroomApplication:
      'Students master genetics numericals, pedigree charts, and biochemical cascades with effortless clarity.',
  },
  {
    id: 'reasoning',
    label: 'Legal Precision for A&R Questions',
    qualificationTag: 'Bachelor of Laws (LL.B.) Perspective',
    headline: 'Eliminating Trap Options with Razor-Sharp Scrutiny',
    summary:
      'Modern NEET Biology papers are packed with Assertion-Reasoning and multi-statement questions where tiny qualifiers (such as "always", "mostly", or "all") create costly negative marks. Shubhajit Sir trains students to dissect statements like legal clauses.',
    classroomApplication:
      'Aspirants develop the critical scrutiny needed to secure the full 4 marks without second-guessing.',
  },
  {
    id: 'communication',
    label: 'Linguistic Speed & NCERT Decoding',
    qualificationTag: 'English Honours Perspective',
    headline: 'Mastering Dense NCERT Vocabulary Under Clock Pressure',
    summary:
      'NEET Biology requires reading over 90 complex questions in approximately 45 minutes. An English Honours background ensures explanations are articulate and teaches students how to scan, comprehend, and extract core biological premises instantly.',
    classroomApplication:
      'Students build rapid reading fluency and linguistic precision, saving precious minutes for physics and chemistry.',
  },
];

/**
 * High-Yield NEET UG, Class 11, Class 12, Droppers & Foundation Catalogue.
 */
export const COURSES: CourseProgramme[] = [
  {
    id: 'neet-droppers',
    levelLabel: 'Intensive Repeater Batch',
    title: 'Target NEET — Droppers & Repeaters',
    shortDescription:
      'Full-throttle 1-year dedicated program engineered specifically for gap-year aspirants aiming for a 340+ Biology score and top medical ranks.',
    extendedFocus:
      'Rigorous coverage of the entire Class 11 and 12 NEET syllabus. Focuses on identifying past score bottlenecks, line-by-line NCERT dissection, daily 90-MCQ speed drills, OMR test series, and personalized mentor sessions to eliminate negative marking.',
    learningHighlights: [
      'Comprehensive 11th & 12th syllabus consolidation',
      'Daily timed NCERT-based MCQ tests & negative-marking audits',
      'One-on-one personal doubt-clearing with Shubhajit Sir',
    ],
    iconName: 'award',
  },
  {
    id: 'class-12-neet',
    levelLabel: 'Class 12 & NEET UG',
    title: 'Class 12 Boards + NEET Mastery',
    shortDescription:
      'Dual-track program synchronizing Board examination presentation excellence with high-speed NEET competitive mastery.',
    extendedFocus:
      'Complete mastery of Class 12 Biology: Reproduction, Genetics & Evolution, Biology in Human Welfare, Biotechnology & Ecology. Balances descriptive Board answer writing with fast-paced Assertion-Reasoning and diagrammatic MCQ drills.',
    learningHighlights: [
      'Simultaneous Board exam theory & NEET MCQ mastery',
      'Deep dive into Biotechnology, Genetics & Molecular Biology',
      'Regular full-length mock tests and chapter-wise revisions',
    ],
    iconName: 'layers',
  },
  {
    id: 'class-11-neet',
    levelLabel: 'Class 11 Pre-Medical',
    title: 'Class 11 NEET & Biology Foundation',
    shortDescription:
      'Smooth transition from Class 10 into high-yield medical entrance depth with 3D molecular visualization and first-principles learning.',
    extendedFocus:
      'Class 11 carries nearly 50% of the NEET Biology paper. Master Diversity in Living World, Structural Organisation, Cell Structure & Function, Plant Physiology, and Human Physiology with interactive 3D models and clear concept notes.',
    learningHighlights: [
      'First-principles clarity on high-yield physiology and cytology',
      '3D DNA & macromolecular visualization for permanent memory',
      'Early introduction to NEET MCQ patterns and analytical thinking',
    ],
    iconName: 'atom',
  },
  {
    id: 'neet-crash-doubt',
    levelLabel: 'High-Yield Drill',
    title: 'NEET High-Yield MCQ & Doubt-Buster',
    shortDescription:
      'Fast-paced question-solving module focused on previous years papers, high-weightage topics, and dedicated doubt resolution.',
    extendedFocus:
      'Tailored for students seeking intensive question practice. Covers tricky Assertion-Reasoning sets, NCERT summary charts, scientist contributions, and high-frequency examination traps with detailed step-by-step reasoning.',
    learningHighlights: [
      'Over 2,500+ curated NEET standard practice questions',
      'Assertion-Reasoning & Statement-based question strategies',
      'Rapid error analysis and weak-zone remediation',
    ],
    iconName: 'compass',
  },
  {
    id: 'class-10-foundation',
    levelLabel: 'Pre-Medical Launchpad',
    title: 'Class 10 Pre-Medical Foundation',
    shortDescription:
      'Deepening scientific rigor, life processes, and analytical reasoning to secure top board marks while preparing for Class 11 medical entrance.',
    extendedFocus:
      'Covers Class 10 Biology and Science foundations thoroughly: Life Processes, Control & Coordination, How Organisms Reproduce, and Heredity, instilling early analytical curiosity and scientific confidence.',
    learningHighlights: [
      'Comprehensive Board exam conceptual mastery',
      'Early foundation for Class 11 Medical Entrance concepts',
      'Interactive doubt resolution and structured test series',
    ],
    iconName: 'book',
  },
  {
    id: 'class-9-foundation',
    levelLabel: 'Early Foundation',
    title: 'Class 9 Science & Biology Foundation',
    shortDescription:
      'Building rock-solid conceptual roots, scientific inquiry, and disciplined study habits at the start of secondary education.',
    extendedFocus:
      'Emphasises cell theory, tissue architecture, improvement in food resources, and fundamental science principles, ensuring students develop curiosity and confidence long before high school board exams.',
    learningHighlights: [
      'Crystal-clear fundamental biology concepts',
      'Guided problem-solving and patient doubt-clearing',
      'Individual attention matched to each student’s pace',
    ],
    iconName: 'graduation',
  },
];

export const WHY_CHOOSE_US: WhyChooseItem[] = [
  {
    id: 'neet-focused',
    number: '01',
    title: 'Dedicated NEET UG Focus',
    description:
      'Targeted pedagogy designed specifically for Class 11, Class 12, and Droppers aiming for 340+ marks in NEET Biology.',
    iconName: 'userCheck',
  },
  {
    id: 'ncert-molecular',
    number: '02',
    title: 'Line-by-Line NCERT & 3D Visualisation',
    description:
      'Every line, diagram, and table decoded with interactive 3D DNA and cell models for permanent conceptual retention.',
    iconName: 'lightbulb',
  },
  {
    id: 'interdisciplinary',
    number: '03',
    title: 'Interdisciplinary Mentor Edge',
    description:
      'Guided by Shubhajit Sir (Engineering, LL.B., English Honours) to combine quantitative modeling, legal logic, and reading speed.',
    iconName: 'layers',
  },
  {
    id: 'unrestricted-doubts',
    number: '04',
    title: 'Unrestricted Doubt-Clearing',
    description:
      'An encouraging, zero-hesitation classroom environment where every question is welcomed and solved patiently.',
    iconName: 'messageCircle',
  },
  {
    id: 'dropper-strategy',
    number: '05',
    title: 'Specialised Dropper Batch Support',
    description:
      'Customized test series, time management techniques, and mistake-analysis logs designed to maximize repeater scores.',
    iconName: 'compass',
  },
  {
    id: 'supportive-community',
    number: '06',
    title: 'Supportive Classroom Community',
    description:
      'A motivating, energetic peer group of future doctors in Baranagar, Kolkata, pushing each other to academic excellence.',
    iconName: 'heartHandshake',
  },
];

export const METHODOLOGY_STEPS: MethodologyStep[] = [
  {
    step: '01',
    title: 'Deconstruct',
    description: 'Break down complex NCERT biology topics with first-principles clarity.',
    detail:
      'Every topic begins with intuitive biological principles and 3D molecular visualization so students see how biological systems actually function.',
  },
  {
    step: '02',
    title: 'Analyze',
    description: 'Master Assertion-Reasoning and critical statement scrutiny.',
    detail:
      'Using structured legal logic, students learn to dissect deceptive distractors in NEET multiple-choice questions without second-guessing.',
  },
  {
    step: '03',
    title: 'Drill',
    description: 'Timed OMR practice to master speed, accuracy, and negative marking control.',
    detail:
      'Consistent chapter-wise and cumulative mock tests simulate actual NEET exam stress and hone question-selection instincts.',
  },
  {
    step: '04',
    title: 'Remediate',
    description: 'Personalized error-log audits and one-on-one doubt clearance.',
    detail:
      'Targeted analysis of every missed question with Shubhajit Sir ensures weak concepts are identified and turned into scoring strengths.',
  },
];

export const STUDENT_EXPERIENCE_PILLARS: ExperiencePillar[] = [
  {
    id: 'focused-guidance',
    title: 'NEET-Centric Mentorship',
    description:
      'Purpose-built coaching aligned with the latest NTA NEET UG pattern, high-yield topics, and NCERT revisions.',
    iconName: 'target',
  },
  {
    id: 'clear-explanations',
    title: '3D Molecular Clarity',
    description:
      'Complex molecular genetics, bio-energetics, and human physiology brought to life with clear visual demonstrations.',
    iconName: 'bookOpen',
  },
  {
    id: 'individual-attention',
    title: 'Individual Attention',
    description:
      'Small batch sizes ensure Shubhajit Sir tracks each student’s question-solving speed and concept retention closely.',
    iconName: 'user',
  },
  {
    id: 'doubt-resolution',
    title: 'Patient Doubt Clearance',
    description:
      'Dedicated doubt slots before and after class so no confusion is carried home or allowed to linger before exam day.',
    iconName: 'helpCircle',
  },
  {
    id: 'structured-learning-exp',
    title: 'Structured Revision Cycles',
    description:
      'Systematic spaced-repetition roadmaps ensuring earlier chapters remain fresh as syllabus advances.',
    iconName: 'listChecks',
  },
  {
    id: 'supportive-interaction',
    title: 'Inspiring Classroom Culture',
    description:
      'An authentic, warm, and highly motivated batch of aspirants working collectively toward medical admissions.',
    iconName: 'users',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'neet-focus',
    question: 'What is the primary focus of ProBio Academy?',
    answer:
      'ProBio Academy focuses on premier NEET UG Medical Entrance Preparation with dedicated batches for Class 11, Class 12, and Droppers / Repeaters, along with Pre-Medical Foundations for Class 9 and 10.',
  },
  {
    id: 'dropper-batch',
    question: 'Is there a dedicated batch for NEET Droppers and Repeaters?',
    answer:
      'Yes! ProBio Academy runs an intensive Target NEET Droppers & Repeaters Batch featuring full Class 11 and 12 syllabus consolidation, daily 90-MCQ timed drills, line-by-line NCERT audits, and personal error analysis with Shubhajit Sir.',
  },
  {
    id: 'class-11-12',
    question: 'How are Class 11 and Class 12 batches structured?',
    answer:
      'Class 11 focuses on establishing deep conceptual roots in Cell Biology, Plant Physiology, and Human Physiology with 3D molecular visualization. Class 12 combines synchronized Board exam preparation with high-yield NEET competitive problem-solving.',
  },
  {
    id: 'book-demo',
    question: 'How can I book a free demo class for NEET preparation?',
    answer:
      'You can book a free demo class using the Admission & Demo Booking form on this website. Fill in the student, parent, and course details, and click "BOOK A FREE DEMO CLASS" to automatically open WhatsApp with your details pre-filled for direct confirmation with Shubhajit Sir.',
  },
  {
    id: 'contact-teacher',
    question: 'How can I connect directly with Shubhajit Sir?',
    answer:
      'You can contact Shubhajit Sir directly by phone or WhatsApp at +91 89818 00375, or visit ProBio Academy in person at Bonhoogly, Baranagar, Kolkata.',
  },
  {
    id: 'location',
    question: 'Where is ProBio Academy located in Kolkata?',
    answer:
      'ProBio Academy is located at 9/1, Bireswar Dhole Ln, Bonhoogly, Baranagar, Kolkata, West Bengal 700035. You can view the Google Maps embed and get directions directly in the Location section of this website.',
  },
  {
    id: 'opening-hours',
    question: 'What are the academy opening hours?',
    answer:
      'ProBio Academy is open Monday to Saturday from 9:00 AM to 8:00 PM, and on Sunday from 9:00 AM to 2:00 PM.',
  },
  {
    id: 'interdisciplinary-advantage',
    question: 'How does Shubhajit Sir’s qualification help NEET aspirants?',
    answer:
      'Shubhajit Sir holds an Engineering Degree, LL.B., and English Honours. This enables him to teach bio-energetics and genetics with mathematical precision, tackle tricky Assertion-Reasoning questions with legal scrutiny, and decode dense NCERT passages with rapid linguistic clarity.',
  },
];
