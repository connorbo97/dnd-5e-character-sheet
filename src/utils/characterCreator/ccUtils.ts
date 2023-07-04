export const convertCustomStatsToStatBlock = (customStats) =>
  customStats
    .filter(({ value }) => value)
    .reduce((acc, { mod, value }) => {
      acc[value] = (acc[value] || 0) + mod;
      return acc;
    }, {});
