export interface TechSkill {
  name: string;
  icon: string;
}

export interface SkillCategory {
  title: string;
  skills: TechSkill[];
}

export interface Experience {
  period: string;
  company: string;
  role: string;
  highlights: string[];
  technologies: string[];
}

export interface Education {
  period: string;
  degree: string;
  institution: string;
}

export const profile = {
  name: 'Enmanuel de Jesús Reyes Molina',
  title: 'MSc. Ingeniero de Software',
  subtitle: 'Tech Lead & Arquitecto de Soluciones',
  summary:
    'MSc. Ingeniero de Software con sólida formación en desarrollo Full-Stack, diseño de arquitecturas limpias e infraestructura en la nube multiplataforma. Experiencia demostrada en la creación de servicios escalables, gestión de entornos híbridos (AWS, Google Cloud Platform y Microsoft Azure) y automatización integral de procesos CI/CD mediante pipelines en GitHub Actions. Orientado a resultados, con capacidad probada para liderar migraciones de sistemas complejos, optimizar flujos de trabajo e implementar soluciones tecnológicas de alto rendimiento.',
  contact: {
    phone: '+505 57930366',
    email: 'manuelmdd@gmail.com',
    location: 'De los semáforos del Rigoberto 1 c al sur, Managua, Nicaragua',
    //linkedin: 'https://www.linkedin.com/in/enmanuel-reyes-mdd2023/',
    linkedin: 'https://www.linkedin.com/in/enmanuel-reyes-mdd2023/?skipRedirect=true',
  },
  languages: [
    { name: 'Español', level: 'Nativo' },
    { name: 'Inglés', level: 'B1' },
  ],
  stats: [
    { value: '8+', label: 'Años de experiencia' },
    { value: '6', label: 'Empresas líderes' },
    { value: '3', label: 'Clouds dominadas' },
    { value: '15+', label: 'Tecnologías clave' },
  ],
};

const icon = (slug: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-original.svg`;

export const skillCategories: SkillCategory[] = [
  {
    title: 'Cloud Computing',
    skills: [
      { name: 'AWS', icon: icon('amazonwebservices') },
      { name: 'Google Cloud', icon: icon('googlecloud') },
      { name: 'Firebase', icon: icon('firebase') },
      { name: 'Azure', icon: icon('azure') },
    ],
  },
  {
    title: 'DevOps & CI/CD',
    skills: [
      { name: 'GitHub Actions', icon: icon('github') },
      { name: 'Docker', icon: icon('docker') },
      { name: 'Git', icon: icon('git') },
      { name: 'Linux', icon: icon('linux') },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Python', icon: icon('python') },
      { name: 'C#', icon: icon('csharp') },
      { name: '.NET Core', icon: icon('dotnetcore') },
      { name: 'PHP / Laravel', icon: icon('laravel') },
      { name: 'REST APIs', icon: icon('postman') },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'React JS', icon: icon('react') },
      { name: 'Vite', icon: icon('vitejs') },
    ],
  },
  {
    title: 'Móvil',
    skills: [{ name: 'Flutter', icon: icon('flutter') }],
  },
  {
    title: 'Bases de Datos',
    skills: [
      { name: 'MySQL', icon: icon('mysql') },
      { name: 'SQL Server', icon: icon('microsoftsqlserver') },
      { name: 'PostgreSQL', icon: icon('postgresql') },
      { name: 'Firestore', icon: icon('firebase') },
      { name: 'Oracle', icon: icon('oracle') },
    ],
  },
  {
    title: 'Gestión Técnica',
    skills: [
      { name: 'Jira', icon: icon('jira') },
      { name: 'Trello', icon: icon('trello') },
    ],
  },
];

export const experiences: Experience[] = [
  {
    period: '2026 — Presente',
    company: 'Novacomp Costa Rica',
    role: 'Ingeniero de Software',
    technologies: ['.NET Core 8', 'React', 'Zustand', 'Axios', 'MuleSoft', 'Azure', 'Git', 'CI/CD'],
    highlights: [
      'Desarrollo Full-Stack con .NET Core 8 y React aplicando DDD y Feature First.',
      'Interfaces dinámicas con Zustand y consumo eficiente de APIs con Axios.',
      'Integraciones empresariales complejas con MuleSoft.',
      'Despliegue y administración de entornos en Microsoft Azure.',
      'Pipelines CI/CD para integración y despliegue continuo.',
    ],
  },
  {
    period: 'Ene — Dic 2025',
    company: 'Onservices Nicaragua',
    role: 'Ingeniero de Software',
    technologies: ['GitHub Actions', 'AWS', 'GCP', 'Azure', 'Python', 'Laravel', 'Vite', 'React', 'Firebase', 'Flutter'],
    highlights: [
      'Pipelines CI/CD automatizados en AWS, Google Cloud y Azure.',
      'Microservicios escalables en Python con Google Cloud Run.',
      'Migración del sistema legacy HorusLogistic a arquitectura moderna con Laravel y Vite.',
      'Apps web de alto rendimiento con React y backend serverless en Firebase.',
      'Apps móviles corporativas en Flutter publicadas en Play Store.',
    ],
  },
  {
    period: 'Nov — Dic 2024',
    company: 'Rappaccioli McGregor RAMAC',
    role: 'Consultor Senior de Desarrollo de Software',
    technologies: ['Visual Basic', 'C#', 'SOLID', 'Git', '.NET Core', 'Docker', 'GitHub Actions'],
    highlights: [
      'Nuevos módulos transaccionales para sistemas contables y de nómina.',
      'Aplicación de principios SOLID para mantenibilidad y escalabilidad.',
      'Integración CI/CD con GitHub Actions para APIs .NET Core + Docker.',
    ],
  },
  {
    period: 'Feb — Oct 2024',
    company: 'Banco de Finanzas, Nicaragua',
    role: 'Especialista de Control de Calidad del Software',
    technologies: ['Postman', 'SoapUI', 'JMeter', 'Testing automatizado'],
    highlights: [
      'Auditorías de calidad y supervisión técnica de aplicativos bancarios core.',
      'Flujos de testing automatizados y manuales con Postman, SoapUI y JMeter.',
    ],
  },
  {
    period: 'Ene — Dic 2023',
    company: 'Procuraduría General de la República de Nicaragua',
    role: 'Consultor Senior / Desarrollador Back-end',
    technologies: ['C#', '.NET', 'REST APIs', 'SOLID', 'Clean Architecture'],
    highlights: [
      'APIs RESTful robustas para control y gestión de acceso de usuarios corporativos.',
      'Arquitectura limpia con principios SOLID y bajo acoplamiento.',
      'Optimización de endpoints para procesamiento de información gubernamental crítica.',
    ],
  },
  {
    period: '2018 — 2020',
    company: 'Consejo de Iglesias CEPAD Nicaragua',
    role: 'Analista Programador FullStack',
    technologies: ['React', 'PHP', 'MySQL', 'UML', 'GitLab', 'Joomla'],
    highlights: [
      'Arquitectura de N-capas y transición hacia metodologías escalables.',
      'Soluciones web integrales con React JS y PHP.',
      'Administración y optimización de bases de datos MySQL.',
      'Implementación de control de versiones con GitLab.',
    ],
  },
];

export const education: Education[] = [
  {
    period: '2023 — 2024',
    degree: 'Master en Ingeniería del Software y Sistemas Informáticos',
    institution: 'Universidad Nacional Autónoma de Nicaragua | UNAN Managua',
  },
  {
    period: '2012 — 2016',
    degree: 'Ingeniero en Sistemas de Información',
    institution: 'Universidad Nacional Autónoma de Nicaragua | UNAN Managua',
  },
];

export const navItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Perfil', href: '#perfil' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Educación', href: '#educacion' },
  { label: 'Pac-Man', href: '#pacman' },
  { label: 'Contacto', href: '#contacto' },
];
