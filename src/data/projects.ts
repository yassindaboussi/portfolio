// data/projects.ts
export type ProjectType = 'web' | 'mobile' | 'desktop';

export interface Project {
  id: number;
  title: string;
  company: string;
  type: ProjectType;
  desc: string;
  fullDescription?: string;
  tech: string[];
  live?: string;
  code?: string;
}

export const projects: Project[] = [
{
  id: 1,
  title: 'EasyData',
  company: 'Freelance',
  type: 'web',
  desc: 'Plateforme BI complète avec workflows métiers, assistant IA conversationnel monétisé, visioconférence Jitsi Meet, intégrations Google Drive & Sheets.',
  fullDescription: `
Solution full-stack de business intelligence permettant la modélisation de processus métiers, 
la saisie structurée de données, la génération automatique de rapports et l’assistance contextuelle 
via un chatbot IA (alimenté par l’API Groq/Llama 3.1).

Fonctionnalités clés :
• Workflows collaboratifs avec pièces jointes et validation multi-étapes
• Assistant IA conversationnel monétisé (pay-per-prompt)
• Visioconférence intégrée via Jitsi Meet
• Synchronisation bidirectionnelle avec Google Drive (documents, pièces jointes)
• Import/export avancé avec Google Sheets (lecture, écriture et synchronisation automatique des tableaux)
• API REST complète documentée avec Swagger UI

Stack technique moderne : React + TypeScript, Node.js/Express, Snowflake Data Warehouse, 
intégrations tierces sécurisées via OAuth2.
  `.trim(),
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
    'Swagger'
  ],
  live: '#',
  code: '#',
},
  {
    id: 2,
    title: 'Allgo RH',
    company: 'Allence',
    type: 'mobile',
    desc: 'App RH native avec Jetpack Compose, AWS et synchronisation temps réel.',
    fullDescription:
      'Application mobile Android pour la gestion RH : pointage GPS, demandes de congés, notes de frais avec scan de tickets, messagerie interne. Fonctionne hors ligne avec synchronisation automatique.',
    tech: ['Kotlin', 'Jetpack Compose', 'AWS Amplify', 'MongoDb', 'Symfony', 'Coroutines'],
    live: '#',
    code: '#',
  },
  {
    id: 3,
    title: 'Cotakwira',
    company: 'Freelance',
    type: 'web',
    desc: "Plateforme de gestion d'équipes sportives avec réservation de terrains et matchs en temps réel.",
    fullDescription:
      'Application web full Symfony pour organiser des matchs amateurs. Réservation de terrains, création d’équipes, chat en temps réel, classements automatiques et notifications push.',
    tech: ['Symfony', 'MySQL', 'Twig', 'Bootstrap', 'WebSocket', 'Mercure'],
    live: '#',
    code: '#',
  },
  {
    id: 4,
    title: 'Plateforme Ticketing',
    company: 'Kleos',
    type: 'web',
    desc: 'Système de billetterie avec QR codes et validation instantanée.',
    fullDescription:
      'Solution complète de billetterie pour événements : génération de billets avec QR code sécurisé, validation via scanner mobile, statistiques en temps réel.',
    tech: ['Symfony', 'Twig', 'TCPDF', 'MySQL', 'Bootstrap'],
    live: '#',
    code: '#',
  },
  {
    id: 5,
    title: 'Gestionnaire de Parc',
    company: 'Prologic',
    type: 'desktop',
    desc: 'App desktop de suivi matériel avec permissions avancées.',
    fullDescription:
      'Application desktop multi-utilisateur pour gérer un parc informatique : inventaire, affectation, maintenance, alertes automatiques. Interface moderne avec Flutter Desktop.',
    tech: ['JavaFX', 'Java', 'FXML', 'MySQL'],
    live: '#',
    code: '#',
  },
];