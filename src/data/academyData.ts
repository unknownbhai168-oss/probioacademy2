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
  tagline: 'Where Knowledge Meets Excellence.',
  teacherName: 'Shubhajit Sir',
  teacherPhotoUrl: '/assets/aistudio/image_b76088bf.png',
  phoneDisplay: '+91 89818 00375',
  phoneHref: 'tel:+918981800375',
  whatsappNumber: '918981800375',
  whatsappBaseUrl: 'https://wa.me/918981800375',
  teachingRange: "Class 9 to Master's Degree level",
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
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Our Teacher', href: '#teacher', id: 'teacher' },
  { label: 'Courses', href: '#courses', id: 'courses' },
  { label: 'Why Choose Us', href: '#why-choose-us', id: 'why-choose-us' },
  { label: 'Contact', href: '#contact', id: 'contact' },
] as const;

export const ABOUT_HIGHLIGHTS = [
  {
    title: 'Conceptual Understanding',
    detail: 'Building genuine comprehension of core principles rather than surface-level memorisation.',
  },
  {
    title: 'Personalised Academic Guidance',
    detail: 'Tailoring explanations and pacing to match each student’s individual learning requirements.',
  },
  {
    title: 'Structured Learning',
    detail: 'Organising every topic into clear, logical progressions for steady academic development.',
  },
  {
    title: 'Doubt-Clearing Support',
    detail: 'Dedicated space to ask questions openly until every concept is thoroughly understood.',
  },
  {
    title: 'Academic Development',
    detail: 'Nurturing analytical thinking, independent reasoning, and confident expression.',
  },
  {
    title: 'Student-Focused Teaching',
    detail: 'A supportive learning environment centred around clarity, curiosity, and steady growth.',
  },
] as const;

export const TEACHER_BIOGRAPHY =
  'Shubhajit Sir brings an interdisciplinary academic perspective to teaching, with educational backgrounds spanning Engineering, Law and English Honours. His diverse academic foundation brings together analytical thinking, structured reasoning and communication skills to support a meaningful learning experience.';

export const QUALIFICATIONS: QualificationItem[] = [
  {
    id: 'engineering',
    title: 'Engineering Degree',
    discipline: 'Analytical & Quantitative Foundation',
    description:
      'Brings systematic problem-solving, analytical precision, and structured conceptual breakdown to complex academic topics.',
    iconName: 'engineering',
  },
  {
    id: 'llb',
    title: 'Bachelor of Laws (LL.B.)',
    discipline: 'Structured Reasoning & Critical Inquiry',
    description:
      'Cultivates disciplined logical argumentation, methodical interpretation, and clarity of reasoning in every lesson.',
    iconName: 'law',
  },
  {
    id: 'english',
    title: 'English Honours',
    discipline: 'Articulate Expression & Comprehension',
    description:
      'Strengthens linguistic clarity, nuanced reading comprehension, and effective academic communication.',
    iconName: 'english',
  },
];

export const TEACHING_PHILOSOPHY = [
  'Focus on conceptual clarity.',
  'Encouragement of independent thinking.',
  'Structured academic guidance.',
  'A supportive learning environment.',
  'Attention to individual learning needs.',
] as const;

export const BIO_PERSPECTIVES: BioPerspective[] = [
  {
    id: 'analytical',
    label: 'Analytical Thinking',
    qualificationTag: 'Engineering Degree Perspective',
    headline: 'Clarity Through Structured Breakdown',
    summary:
      'Complex ideas become approachable when broken into clear, foundational steps. Lessons emphasise why a principle works before moving to application.',
    classroomApplication:
      'Students build confidence by understanding underlying logic rather than relying on rote repetition.',
  },
  {
    id: 'reasoning',
    label: 'Structured Reasoning',
    qualificationTag: 'Bachelor of Laws (LL.B.) Perspective',
    headline: 'Disciplined Inquiry & Independent Thought',
    summary:
      'Every question is an opportunity to examine assumptions, connect ideas methodically, and form well-reasoned conclusions.',
    classroomApplication:
      'Encourages independent thinking and structured presentation across academic levels.',
  },
  {
    id: 'communication',
    label: 'Clear Communication',
    qualificationTag: 'English Honours Perspective',
    headline: 'Precision in Language & Understanding',
    summary:
      'True mastery shows when a student can explain an idea clearly in their own words. Explanations are crafted to be lucid, accessible, and engaging.',
    classroomApplication:
      'Supports articulate expression and deeper comprehension tailored to each learner’s pace.',
  },
];

/**
 * Editable Course & Programme catalogue.
 * Update titles, descriptions, or highlights directly here without changing component code.
 */
export const COURSES: CourseProgramme[] = [
  {
    id: 'class-9',
    levelLabel: 'Secondary Foundation',
    title: 'Class 9',
    shortDescription:
      'Building strong conceptual foundations, analytical curiosity, and structured study habits at a pivotal academic stage.',
    extendedFocus:
      'Focuses on clear concept formation, regular practice, and attentive doubt-clearing so students transition smoothly into higher secondary studies.',
    learningHighlights: [
      'Foundational conceptual clarity',
      'Individual attention to learning pace',
      'Regular guided practice & doubt resolution',
    ],
    iconName: 'book',
  },
  {
    id: 'class-10',
    levelLabel: 'Secondary Milestone',
    title: 'Class 10',
    shortDescription:
      'Structured academic guidance designed to deepen understanding, strengthen problem-solving accuracy, and build steady confidence.',
    extendedFocus:
      'Emphasises thorough conceptual mastery, consistent practice, and identifying learning gaps early through personalised feedback.',
    learningHighlights: [
      'Step-by-step concept reinforcement',
      'Structured practice and revision',
      'Supportive doubt-clearing sessions',
    ],
    iconName: 'compass',
  },
  {
    id: 'class-11',
    levelLabel: 'Higher Secondary Transition',
    title: 'Class 11',
    shortDescription:
      'Bridging the leap into advanced concepts with clear explanations, independent thinking, and disciplined academic mentorship.',
    extendedFocus:
      'Helps students adapt to deeper analytical concepts with patient, structured guidance tailored to individual learning needs.',
    learningHighlights: [
      'Deep conceptual understanding from first principles',
      'Encouragement of independent analytical thinking',
      'Personalised academic guidance',
    ],
    iconName: 'atom',
  },
  {
    id: 'class-12',
    levelLabel: 'Higher Secondary Completion',
    title: 'Class 12',
    shortDescription:
      'Focused mentorship combining conceptual depth, regular practice, and clear articulation for higher secondary excellence.',
    extendedFocus:
      'Supports students in consolidating core concepts, resolving doubts promptly, and refining structured academic presentation.',
    learningHighlights: [
      'Comprehensive conceptual clarity',
      'Targeted doubt-clearing & gap resolution',
      'Structured practice for steady progress',
    ],
    iconName: 'layers',
  },
  {
    id: 'undergraduate',
    levelLabel: 'Higher Education',
    title: 'Undergraduate Programmes',
    shortDescription:
      'Interdisciplinary academic mentorship supporting deeper subject exploration, critical reasoning, and structured study at the degree level.',
    extendedFocus:
      'Guided academic support tailored to undergraduate coursework, fostering independent reasoning and conceptual rigour.',
    learningHighlights: [
      'In-depth conceptual & theoretical clarity',
      'Structured reasoning and critical analysis',
      'Personalised one-to-one academic guidance',
    ],
    iconName: 'graduation',
  },
  {
    id: 'postgraduate',
    levelLabel: 'Advanced Scholarship',
    title: "Postgraduate / Master's Level",
    shortDescription:
      'Specialised academic guidance for Master’s-level learners seeking conceptual depth, analytical clarity, and scholarly precision.',
    extendedFocus:
      'Supports advanced learners through structured discussion, independent inquiry, and clear articulation of complex ideas.',
    learningHighlights: [
      'Advanced conceptual & analytical mentorship',
      'Independent critical inquiry & synthesis',
      'Tailored guidance for individual academic goals',
    ],
    iconName: 'award',
  },
];

export const WHY_CHOOSE_US: WhyChooseItem[] = [
  {
    id: 'personalised-attention',
    number: '01',
    title: 'Personalised Attention',
    description:
      'Every student learns differently. Guidance is adapted to each learner’s pace, questions, and individual academic needs.',
    iconName: 'userCheck',
  },
  {
    id: 'concept-based',
    number: '02',
    title: 'Concept-Based Learning',
    description:
      'Emphasis on understanding core principles deeply so students can reason through problems independently rather than memorising.',
    iconName: 'lightbulb',
  },
  {
    id: 'interdisciplinary',
    number: '03',
    title: 'Interdisciplinary Academic Guidance',
    description:
      'Informed by backgrounds in Engineering, Law, and English Honours to unite analytical rigour, logic, and clear expression.',
    iconName: 'layers',
  },
  {
    id: 'doubt-clearing',
    number: '04',
    title: 'Doubt-Clearing Support',
    description:
      'An open, encouraging atmosphere where students are welcomed to ask questions until every doubt is resolved with clarity.',
    iconName: 'messageCircle',
  },
  {
    id: 'structured-learning',
    number: '05',
    title: 'Structured Learning',
    description:
      'Well-organised progression from foundational concepts to deeper exploration and regular practice.',
    iconName: 'compass',
  },
  {
    id: 'supportive-environment',
    number: '06',
    title: 'Supportive Learning Environment',
    description:
      'A calm, respectful, and motivating space that encourages curiosity, steady effort, and academic confidence.',
    iconName: 'heartHandshake',
  },
];

export const METHODOLOGY_STEPS: MethodologyStep[] = [
  {
    step: '01',
    title: 'Understand',
    description: 'Build strong foundations through clear explanations.',
    detail:
      'Every topic begins with lucid, unhurried explanation of core principles so students grasp the foundational logic.',
  },
  {
    step: '02',
    title: 'Explore',
    description: 'Develop deeper subject understanding and independent thinking.',
    detail:
      'Guided questioning and interdisciplinary perspectives encourage learners to think independently and connect ideas.',
  },
  {
    step: '03',
    title: 'Practise',
    description: 'Strengthen learning through regular practice.',
    detail:
      'Consistent, structured exercises reinforce comprehension and build fluency in applying concepts.',
  },
  {
    step: '04',
    title: 'Improve',
    description: 'Identify learning gaps and work towards academic progress.',
    detail:
      'Attentive feedback and dedicated doubt-clearing help address specific gaps and support continuous improvement.',
  },
];

export const STUDENT_EXPERIENCE_PILLARS: ExperiencePillar[] = [
  {
    id: 'focused-guidance',
    title: 'Focused Academic Guidance',
    description:
      'Uncluttered, attentive mentorship designed to keep every session purposeful and aligned with the student’s academic goals.',
    iconName: 'target',
  },
  {
    id: 'clear-explanations',
    title: 'Clear Explanations',
    description:
      'Complex concepts communicated in straightforward, well-structured language that makes learning approachable.',
    iconName: 'bookOpen',
  },
  {
    id: 'individual-attention',
    title: 'Individual Attention',
    description:
      'Close attention to how each student thinks, processes new ideas, and progresses through their coursework.',
    iconName: 'user',
  },
  {
    id: 'doubt-resolution',
    title: 'Doubt Resolution',
    description:
      'Prompt, patient clarification of questions so small misunderstandings never accumulate into larger hurdles.',
    iconName: 'helpCircle',
  },
  {
    id: 'structured-learning-exp',
    title: 'Structured Learning',
    description:
      'A clear roadmap through every topic, balancing conceptual explanation with guided practice and review.',
    iconName: 'listChecks',
  },
  {
    id: 'supportive-interaction',
    title: 'Supportive Interaction',
    description:
      'Respectful, encouraging dialogue that helps students feel comfortable asking questions and thinking critically.',
    iconName: 'users',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'classes-taught',
    question: 'Which classes does ProBio Academy teach?',
    answer:
      "ProBio Academy offers academic coaching and personalised guidance from Class 9 all the way up to the Master's Degree level, covering Classes 9, 10, 11, 12, Undergraduate Programmes, and Postgraduate / Master's Level studies.",
  },
  {
    id: 'undergraduate',
    question: 'Does the academy offer classes for undergraduate students?',
    answer:
      'Yes. ProBio Academy provides dedicated academic guidance for Undergraduate Programmes, focusing on conceptual clarity, structured reasoning, and individual learning support.',
  },
  {
    id: 'postgraduate',
    question: "Are postgraduate or Master's-level programmes available?",
    answer:
      "Yes. Academic coaching and mentorship are available up to the Postgraduate / Master's Degree level. You can connect with Shubhajit Sir via WhatsApp or book a demo session to discuss your specific postgraduate study goals.",
  },
  {
    id: 'book-demo',
    question: 'How can I book a demo class?',
    answer:
      'You can book a free demo class using the Admission & Demo Class Booking form on this website. Once you fill in the student and parent details and click "BOOK A FREE DEMO CLASS", WhatsApp opens with your details pre-filled so you can send the request directly to Shubhajit Sir to confirm available timings.',
  },
  {
    id: 'contact-teacher',
    question: 'How can I contact Shubhajit Sir?',
    answer:
      'You can reach Shubhajit Sir directly by phone or WhatsApp at +91 89818 00375, or visit ProBio Academy in person during opening hours.',
  },
  {
    id: 'location',
    question: 'Where is ProBio Academy located?',
    answer:
      'ProBio Academy is located at 9/1, Bireswar Dhole Ln, Bonhoogly, Baranagar, Kolkata, West Bengal 700035. You can also view the interactive map and get directions in the Location section of this website.',
  },
  {
    id: 'opening-hours',
    question: "What are the academy's opening hours?",
    answer:
      'ProBio Academy is open Monday to Saturday from 9:00 AM to 8:00 PM, and on Sunday from 9:00 AM to 2:00 PM.',
  },
  {
    id: 'course-fees',
    question: 'How can I enquire about course fees?',
    answer:
      'For details regarding course fees, schedules, and programme structure, please message Shubhajit Sir directly on WhatsApp at +91 89818 00375 or call during academy hours for accurate information tailored to your class or programme.',
  },
];
