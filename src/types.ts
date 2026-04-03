export interface BuildData {
  make: string;
  model: string;
  year: string;
  upgrades: string[];
  name: string;
  email: string;
  phone: string;
}

export type Step = 1 | 2 | 3;

declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}
