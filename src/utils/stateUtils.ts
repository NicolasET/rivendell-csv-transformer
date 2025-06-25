import { validMexicanStates, DEFAULT_STATE } from "./constants";

export function normalizeState(estado?: string): string {
  if (!estado) return DEFAULT_STATE;

  const inputState = estado.trim();

  // First, try exact match (case-insensitive)
  for (const state of validMexicanStates) {
    if (state.toLowerCase() === inputState.toLowerCase()) {
      return state;
    }
  }

  // Try partial match (fuzzy matching)
  for (const state of validMexicanStates) {
    const stateWords = state.toLowerCase().split(/\s+/);
    const inputWords = inputState.toLowerCase().split(/\s+/);

    // Check if any word from input matches any word from state name
    const hasMatch = inputWords.some((inputWord) =>
      stateWords.some(
        (stateWord) =>
          stateWord.includes(inputWord) || inputWord.includes(stateWord)
      )
    );

    if (hasMatch) {
      return state;
    }
  }

  // Try removing accents and special characters for better matching
  const normalizeText = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .replace(/[^a-z\s]/g, ""); // Remove special characters

  const normalizedInput = normalizeText(inputState);

  for (const state of validMexicanStates) {
    const normalizedState = normalizeText(state);

    if (
      normalizedState.includes(normalizedInput) ||
      normalizedInput.includes(normalizedState)
    ) {
      return state;
    }
  }

  // If no match found, return default state
  return DEFAULT_STATE;
}
