import {
  commonNames,
  commonSurnameParticles,
  commonSurnames,
} from "./constants";

export function isLikelySurname(word: string): boolean {
  return commonSurnames.has(word.toLowerCase());
}

export function separateFullName(fullName?: string): {
  name: string;
  paternalSurname: string;
  maternalSurname: string;
} {
  if (!fullName) {
    return { name: "", paternalSurname: "", maternalSurname: "" };
  }

  // Clean and normalize the name
  const cleanName = fullName
    .trim()
    .replace(/\s+/g, " ") // Remove extra spaces
    .toLowerCase();

  const parts = cleanName.split(" ");

  if (parts.length === 0) {
    return { name: "", paternalSurname: "", maternalSurname: "" };
  }

  // Helper function to capitalize first letter
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  if (parts.length === 1) {
    // Only one word - treat as first name
    return {
      name: capitalize(parts[0]),
      paternalSurname: "",
      maternalSurname: "",
    };
  }

  if (parts.length === 2) {
    // Two words - first name + paternal surname
    return {
      name: capitalize(parts[0]),
      paternalSurname: capitalize(parts[1]),
      maternalSurname: "",
    };
  }

  // For 3 or more parts
  let nameEndIndex = 0;

  // Strategy 1: Look for compound first names (María + another name)
  if (parts[0] === "maría" && parts.length >= 3) {
    // María + second name is likely the full first name
    nameEndIndex = 1;
  }
  // Strategy 2: Look for compound first names (Juan Carlos, etc.)
  else if (
    commonNames.has(parts[0]) &&
    commonNames.has(parts[1]) &&
    parts.length >= 4
  ) {
    nameEndIndex = 1;
  }
  // Strategy 3: Check if second word is also a common first name
  else if (
    commonNames.has(parts[1]) &&
    !isLikelySurname(parts[1]) &&
    parts.length >= 4
  ) {
    nameEndIndex = 1;
  }
  // Default: first word is the name
  else {
    nameEndIndex = 0;
  }

  // Extract name(s)
  const names = parts.slice(0, nameEndIndex + 1);
  const remainingParts = parts.slice(nameEndIndex + 1);

  if (remainingParts.length === 0) {
    return {
      name: names.map(capitalize).join(" "),
      paternalSurname: "",
      maternalSurname: "",
    };
  }

  if (remainingParts.length === 1) {
    return {
      name: names.map(capitalize).join(" "),
      paternalSurname: capitalize(remainingParts[0]),
      maternalSurname: "",
    };
  }

  // Handle surname particles (de, del, etc.)
  let paternalSurnameEnd = 0;

  // Look for surname particles to group with the surname
  for (let i = 0; i < remainingParts.length - 1; i++) {
    if (commonSurnameParticles.has(remainingParts[i])) {
      paternalSurnameEnd = i + 1; // Include the particle and next word
      break;
    }
  }

  // If no particles found, assume first remaining word is paternal surname
  if (paternalSurnameEnd === 0) {
    paternalSurnameEnd = 0;
  }

  const paternalSurnameParts = remainingParts.slice(0, paternalSurnameEnd + 1);
  const maternalSurnameParts = remainingParts.slice(paternalSurnameEnd + 1);

  return {
    name: names.map(capitalize).join(" "),
    paternalSurname: paternalSurnameParts.map(capitalize).join(" "),
    maternalSurname: maternalSurnameParts.map(capitalize).join(" "),
  };
}
