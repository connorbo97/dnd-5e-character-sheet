import { PageConfig } from 'constants/pages';

export const getPathFromConfig = (config: PageConfig) =>
  `${config.route}${config.hasSubRoutes ? '/*' : ''}`;
