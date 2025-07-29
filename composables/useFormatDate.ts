export function useFormatDate() {
  function formatDate(date: string): string {
    const formattedDate = new Date(date);
    
    const dateOptions: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return formattedDate.toLocaleString("en-GB", dateOptions).replace(',', '');
  }

  return { formatDate };
}