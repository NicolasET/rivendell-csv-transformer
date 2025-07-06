import dayjs from "../config/dayjs";

export function formatPhone(phone?: string): string {
  if (!phone) return "";

  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, "");

  // Check if it starts with 52 (Mexico country code)
  if (digits.startsWith("52") && digits.length === 12) {
    // Remove the country code and return the 10-digit number
    return digits.substring(2);
  }

  // If it doesn't match Mexican format, return empty
  return "";
}

export function formatDate(dateStr?: string): string {
  if (!dateStr) return "";

  // Try to parse the date with dayjs
  const date = dayjs(dateStr);

  // Check if the date is valid
  if (!date.isValid()) return "";

  // Set timezone to Mexico City and format as requested
  // Format: 20/04/2020  01:58:28 p. m.
  return date
    .tz("America/Mexico_City")
    .format("YYYY-MM-DDTHH:mm:ss.SSSZ")
    .replace("AM", "a. m.")
    .replace("PM", "p. m.");
}
