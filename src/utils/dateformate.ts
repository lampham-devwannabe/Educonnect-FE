/**
 * Formats a date string into a localized date and time string
 * @param dateString The date string to format
 * @returns Formatted date and time string
 */
export const formatDateTime = (dateString: string | Date): string => {
  const date = dateString instanceof Date ? dateString : new Date(dateString)

  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long', // 'long', 'short', or 'numeric'
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // Set to false for 24-hour time format
  })
}
