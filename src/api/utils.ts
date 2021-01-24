/**
 * Get the date in %d-%m-%y format
 * @param date
 */
export const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};
