
export enum ProjectType {
  WebDesign = 'Web Design',
  FullStack = 'Full-Stack App',
  Ecommerce = 'E-commerce',
  UIUX = 'UI/UX Design',
  Maintenance = 'Maintenance',
  SEO = 'SEO Strategy'
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

export interface PortfolioItem {
  title: string;
  category: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model' | 'system' | 'thinking';
  text: string;
  timestamp: number;
}
