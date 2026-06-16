import { useState } from "react";
import { getRandomQuote } from "../utils/motivation";

/** Mengembalikan satu kata motivasi acak, dipilih sekali per mount komponen. */
export function useMotivation(): string {
  const [quote] = useState(getRandomQuote);
  return quote;
}
