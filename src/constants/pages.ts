export enum PAGES {
  HOME = 'HOME',
  CHARACTER_CREATOR = 'CHARACTER_CREATOR',
  BAR = 'BAR',
}

export type PageConfig = {
  label: string;
  route: string;
  hasSubRoutes?: boolean;
};

export const PAGE_CONFIGS: { [p in PAGES]: PageConfig } = {
  [PAGES.HOME]: {
    label: 'Home',
    route: 'home',
  },
  [PAGES.CHARACTER_CREATOR]: {
    label: 'Character Creator',
    route: 'character-creator',
    hasSubRoutes: true,
  },
  [PAGES.BAR]: {
    label: 'Bar',
    route: 'bar',
  },
};

export const PAGE_CONFIGS_ENTRIES = Object.entries(PAGE_CONFIGS);
