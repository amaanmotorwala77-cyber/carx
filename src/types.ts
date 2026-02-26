export interface Category {
  id: string;
  title: string;
  description: string;
  image: string;
  icon?: string;
}

export interface Component {
  id: string;
  title: string;
  features: string[];
  image?: string;
  icon?: string;
  tier?: string;
}

export type Step = 1 | 2 | 3;

export interface BuildData {
  make: string;
  model: string;
  year: string;
  upgrades: string[];
  name: string;
  email: string;
  phone: string;
}
