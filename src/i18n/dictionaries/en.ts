export const en = {
  nav: {
    mainLabel: 'Main navigation',
    about: 'About',
    skills: 'Skills',
    experience: 'Experience',
    services: 'Services',
    lab: 'Lab',
    contact: 'Contact',
    downloadCv: 'Download CV',
  },
  home: {
    role: 'Senior Full-Stack Software Engineer',
    tagline:
      'senior full-stack engineer · building software since 2018 — most of it shipped alone, from database design to deployment',
    available: 'open to senior full-stack roles · remote',
    aboutTitle: 'About me',
    aboutBody:
      "I've been building software since 2018, most of it through my own consultancy, F A Cavalcante. Most of what I've shipped, I've shipped alone: database design, back-end, front-end, deployment. That was true of the university platform I rebuilt from scratch in 6 weeks, and it was true at the agency where I covered 13 clients at once.\n\nThe work I'm proudest of usually isn't the code. At Gran Cursos — a platform that grew from 300,000 to 800,000 paying students while I was there — I shipped the Black Friday campaign in 5 days against a 10-day deadline, and it closed its first day at R$16M against a R$10M target. The part that mattered more was building the re-skin as a theming layer, so marketing and design could keep changing things without engineering.\n\nLately a lot of my work is performance and multi-tenant infrastructure: cutting the heaviest query from 1.21s to 47ms, removing up to 99.7% of database round-trips, tuning PostgreSQL across 6 tenant databases. Plus AI in production — transcription with OpenAI Whisper across three languages, search over transcripts, and captions that made every lesson usable by deaf and hard-of-hearing students.\n\nTech I work with daily: TypeScript, NestJS, React, Next.js, Node.js, PHP, Laravel, Go, PostgreSQL, AWS, Docker.",
    skillsTitle: 'Skills',
    experienceTitle: 'Work experience',
    labTitle: 'The Lab',
    labIntro: 'lab highlights — click a card to see the structure behind it',
    labViewAll: 'see the full lab',
    contactTitle: "Let's talk.",
    email: 'Email',
    resume: 'Resume',
  },
  lab: {
    heading: 'The Lab',
    intro:
      'live experiments, case studies and projects I have shipped — click a card to see the structure behind it',
    backHome: 'back to home',
    structure: 'structure',
    openDemo: 'Open demo',
    visitSite: 'Visit the site',
    close: 'esc',
    caseStudy: 'case study',
    experiment: 'experiment · online',
    problemLabel: 'the problem',
  },
  services: {
    heading: 'Web Developer for Custom Sites, Systems and Integrations',
    intro:
      'I build websites, web systems and integrations for companies that need software that actually works. Over 6 years of experience, remote, across Brazil.',
    whatIDo: 'What I do',
    contactHeading: "Let's talk",
    contactBody:
      'I\u2019m open to senior full-stack roles, remote. If you have a role that fits, send me a message \u2014 I reply quickly. I also still take on project work through my consultancy.',
  },
  common: {
    whatsappCta: 'Message me on WhatsApp',
    emailCta: 'Send an email',
    switchLanguage: 'Português',
  },
} as const;
