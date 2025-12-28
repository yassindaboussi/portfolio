// data/projects.ts

export type ProjectType = 'web' | 'mobile' | 'desktop';

export interface Project {
  id: number;
  slug: string;
  title: string;
  company: string;
  type: ProjectType;
  desc: string;
  fullDescription?: string;
  tech: string[];
  live?: string;
  code?: string;
  imageCount?: number;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'worqly',
    title: 'Worqly',
    company: 'Projet Personnel',
    type: 'web',
    desc: 'Plateforme complète de mise en relation freelance avec gestion de projets.',
    fullDescription:
      "Worqly est une plateforme SaaS complète dédiée aux freelances et aux clients cherchant à collaborer sur des projets. La solution inclut un système avancé de mise en relation, gestion de projets avec suivi en temps réel, messagerie intégrée, système de paiement sécurisé, notation et avis, ainsi qu'un programme de partenariat pour entreprises. L'application propose des tableaux de bord personnalisés pour freelances et clients, un système de matching intelligent basé sur les compétences, et des outils de collaboration pour faciliter le travail à distance. Développée avec Next.js 16, TypeScript, Worqly vise à révolutionner l'expérience freelance avec une approche moderne et intuitive.",
    tech: [
      'Next.js 16',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
    ],
    live: 'https://worqly.netlify.app',
    code: 'https://github.com/yassindaboussi/worqly',
    imageCount: 7,
  },
  {
    id: 2,
    slug: 'sensasdata',
    title: 'SensasData',
    company: 'Freelance',
    type: 'web',
    desc: 'Plateforme BI complète avec workflows métiers, assistant IA conversationnel monétisé, visioconférence Jitsi Meet, intégrations Google Drive & Sheets.',
    fullDescription:
      "Solution full‑stack de business intelligence intégrant modélisation des processus, saisie structurée et génération automatique de rapports, enrichie par un chatbot IA (Groq/Llama 3.1). Elle offre workflows collaboratifs, assistant conversationnel monétisé, visioconférence Jitsi et intégration directe de Google Sheets/Drive. L'ensemble repose sur une API REST documentée (Swagger UI) et un stack moderne : React/TypeScript, Node.js/Express, Snowflake, OAuth2 sécurisé.",
    tech: [
      'React',
      'TypeScript',
      'Node.js',
      'Express',
      'Snowflake',
      'Tailwind CSS',
      'Groq/Llama API',
      'Google Sheets API',
      'Google Drive API',
      'Jitsi Meet',
      'Swagger',
    ],
    live: '#',
    code: '#',
    imageCount: 5,
  },
  {
    id: 3,
    slug: 'instanalyzer',
    title: 'InstAnalyzer',
    company: 'Projet Personnel',
    type: 'web',
    desc: 'Outil privacy-first pour analyser les relations de suivi Instagram via upload de données officielles — 100% client-side.',
    fullDescription:
      "InstAnalyzer est un outil web moderne et sécurisé permettant d'analyser instantanément les relations de suivi sur Instagram (qui ne vous suit pas en retour, fans, etc.) en uploadant vos fichiers JSON officiels téléchargés depuis Instagram. Tout le traitement se fait côté client dans le navigateur : aucune donnée n'est envoyée, collectée ou stockée. L'application gère plusieurs fichiers followers_*.json, affiche des insights intelligents avec dates de suivi, propose tri (alphabétique, ancienneté), actions rapides (copier usernames, ouvrir profils) et export CSV/JSON. Interface élégante avec mode sombre, glassmorphism et animations fluides pour une expérience premium et responsive.",
    tech: [
      'PHP 8.1+',
      'Symfony 6/7',
      'Twig',
      'Tailwind CSS',
      'Lucide Icons',
      'JavaScript (client-side)',
      'Glassmorphism UI'
    ],
    live: '#',
    code: 'https://github.com/yassindaboussi/instanalyzer',
    imageCount: 4,
  },
  {
    id: 4,
    slug: 'arabilex',
    title: 'ArabiLex',
    company: 'Open Source',
    type: 'web',
    desc: 'Moteur de recherche arabe avancé — recherche par début, fin, inclusion ou permutation de lettres.',
    fullDescription:
      "ArabiLex est un moteur de recherche dédié à la langue arabe, conçu pour permettre des recherches lexicale et morphologique flexibles : recherche par préfixe, suffixe, inclusion (contains) et permutations d'ordres de lettres. Le projet met l'accent sur la normalisation de l'arabe (gestion des diacritiques, hamza, ta marbuta, alef variations), une interface RTL conviviale et des algorithmes de recherche optimisés côté client/serveur selon l'implémentation. Idéal pour linguistes, enseignants, étudiants et développeurs travaillant sur le traitement du texte arabe ou des dictionnaires interactifs.",
    tech: [
      'Python',
      'JavaScript',
      'HTML',
      'CSS',
      'Arabic normalization',
      'RTL UI',
    ],
    live: 'https://arabilex.netlify.app/',
    code: 'https://github.com/yassindaboussi/ArabiLex',
    imageCount: 3,
  },
  {
    id: 5,
    slug: 'instanoback',
    title: 'InstaNoBack',
    company: 'Projet Personnel',
    type: 'mobile',
    desc: 'Application Android native pour détecter les non-followers Instagram via analyse locale des JSON officiels — 100% offline & privacy-first.',
    fullDescription:
      "InstaNoBack est une application Android moderne et sécurisée permettant d'analyser les relations de suivi Instagram en important les fichiers JSON officiels téléchargés depuis Instagram. Tout le traitement est effectué localement (offline, sans serveur) avec Room pour la persistance, offrant des fonctionnalités avancées : détection des non-followers avec dates de suivi, favoris, archivage, hashtags personnalisés, tri multiple, export (CSV/JSON/HTML/TEXT), comparaison de données entre deux exports, import/export de base de données, thèmes personnalisés Material 3 et mode sombre. Modèle freemium avec limitations quotidiennes intelligentes pour la version gratuite. Interface fluide en Jetpack Compose avec animations premium, gestion fine des permissions SAF et design soigné (glassmorphism, gradients, dialogues animés).",
    tech: [
      'Kotlin',
      'Jetpack Compose',
      'Material 3',
      'Room',
      'ViewModel',
      'Coroutine',
      'Coil',
      'OkHttp + Jsoup',
      'SharedPreferences',
      'JSON Parsing',
      'Multi-theme Support',
      'Freemium Logic',
      'Offline Processing',
      'SAF (Storage Access Framework)',
    ],
    live: '#',
    code: '#',
    imageCount: 14,
  },
  {
    id: 6,
    slug: 'allgo',
    title: 'Allgo RH',
    company: 'Allence',
    type: 'mobile',
    desc: 'Application RH Android (Jetpack Compose) avec backend NestJS (TypeScript) et AWS serverless.',
    fullDescription:
      "Développement complet d'une application RH mobile en Kotlin/Jetpack Compose avec backend Symfony et architecture serverless AWS. L'application intègre l'authentification sécurisée via AWS Cognito, la gestion de la paie et des congés, un calendrier partagé et la consultation de PDF, ainsi qu'un tableau de bord managers pour le suivi en temps réel des absences et KPI. Les données sensibles sont protégées par chiffrement AES‑256, avec logs avancés et crash reporting pour une stabilité optimale. Des tests unitaires et d'instrumentation (JUnit, Mockito, PHPUnit) assurent la qualité, tandis qu'un pipeline CI/CD GitLab automatise builds et déploiements, jusqu'à la publication sur le Play Store via API Google Play. Le projet a été mené en méthodologie Agile Scrum au sein d'une équipe pluridisciplinaire.",
    tech: [
      'Kotlin',
      'Jetpack Compose',
      'NestJS',
      'AWS Amplify',
      'AWS Cognito',
      'AWS S3',
      'AES-256',
      'AWS Lambda',
      'AWS API Gateway',
      'JUnit',
      'Mockito',
      'Jest',
      'GitLab CI/CD',
      'Scrum',
      'Google Play Publishing API',
    ],
    live: '#',
    code: '#',
    imageCount: 4,
  },
  {
    id: 7,
    slug: 'pte',
    title: 'Gestion RH & Réservation',
    company: 'Prologic',
    type: 'mobile',
    desc: 'Application mobile Flutter de gestion RH, réservation de véhicules et salles de réunion.',
    fullDescription:
      "Création d'une application mobile Flutter multi‑rôles (admin, manager, employé) pour la gestion interne de l'entreprise. Elle permet la réservation en temps réel de salles et véhicules avec validation managériale et notifications push, ainsi que la gestion des profils employés (informations, expériences, certifications, génération automatique de CV PDF). L'application inclut tableaux de bord, rapports et historique complet, reposant sur un backend Node.js/Express avec APIs REST et MongoDB. Application utilisée tous les jours par plus de 40 employés de l'entreprise.",
    tech: [
      'Flutter',
      'Dart',
      'Node.js',
      'Express',
      'MongoDB',
      'REST API',
      'PDF Generation',
      'Multi-role System',
      'Git',
    ],
    live: '#',
    code: 'https://github.com/yassindaboussi/PTE-Mobile',
    imageCount: 8,
  },
  {
    id: 8,
    slug: 'ticketing',
    title: 'Plateforme Ticketing',
    company: 'Kleos',
    type: 'mobile',
    desc: 'Système de billetterie avec QR codes et validation instantanée.',
    fullDescription:
      'Solution complète de billetterie pour événements : génération de billets avec QR code sécurisé, validation via scanner mobile, statistiques en temps réel. Développée en flutter avec backend Node.js et MongoDB. Le système permet la création, distribution et validation numérique de billets pour événements, concerts et conférences, avec interface admin pour la gestion des événements et suivi des statistiques.',
    tech: [
      'Flutter',
      'SQLite',
      'Node.js',
      'MongoDB',
      'Express',
      'REST API',
      'JWT',
      'OpenStreetMap',
      'QR Code',
    ],
    live: '#',
    code: '#',
    imageCount: 1,
  },
];