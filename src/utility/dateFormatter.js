export const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date
    .toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", " ");
};
