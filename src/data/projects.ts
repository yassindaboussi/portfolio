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
    desc: 'Solution EPM avec pipeline automatisé et intégration Google Sheets.',
    fullDescription:
      'Plateforme complète d’automatisation de données pour PME. Pipeline Node.js qui récupère les données depuis Google Sheets, les nettoie, les stocke dans Snowflake et génère des rapports automatisés. Dashboard React avec graphiques interactifs.',
    tech: ['Node.js', 'React', 'Snowflake', 'Google Sheets API', 'Recharts'],
    live: 'https://easydata.example.com',
    code: 'https://github.com/yassin-daboussi/easydata',
  },
  {
    id: 2,
    title: 'Allgo RH',
    company: 'Allence',
    type: 'mobile',
    desc: 'App RH native avec Jetpack Compose, AWS et synchronisation temps réel.',
    fullDescription:
      'Application mobile Android pour la gestion RH : pointage GPS, demandes de congés, notes de frais avec scan de tickets, messagerie interne. Fonctionne hors ligne avec synchronisation automatique.',
    tech: ['Kotlin', 'Jetpack Compose', 'AWS Amplify', 'Firebase', 'Room', 'Coroutines'],
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
    live: 'https://cotakwira.com',
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