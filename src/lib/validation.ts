import { z } from "zod";

// Shared input schemas: every free-text field on the site runs through one of
// these before it touches Supabase or gets forwarded to Shopify. Each one
// trims, bounds the length, and restricts characters to what that field could
// legitimately contain — mainly to stop stray markup/control characters and
// oversized payloads from reaching the database, not to catch SQL injection
// (Supabase's client already parameterizes everything).

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Email is required")
  .max(254, "Email is too long")
  .email("Enter a valid email");

export const nameSchema = z
  .string()
  .trim()
  .min(1, "Name is required")
  .max(100, "Name is too long")
  .regex(/^[\p{L}\p{M} '.-]+$/u, "Name can only contain letters, spaces, hyphens, and apostrophes");

export const phoneSchema = z
  .string()
  .trim()
  .max(20, "Phone number is too long")
  .regex(/^[0-9+()\-.\s]*$/, "Phone number can only contain digits, spaces, and + ( ) - .");

export const addressLineSchema = z
  .string()
  .trim()
  .max(150, "Address is too long")
  .regex(/^[^<>]*$/, "Address can't contain < or >");

export const citySchema = z
  .string()
  .trim()
  .max(85, "City name is too long")
  .regex(/^[\p{L}\p{M} '.-]*$/u, "City can only contain letters, spaces, hyphens, and apostrophes");

export const stateSchema = z
  .string()
  .trim()
  .max(56, "State is too long")
  .regex(/^[\p{L} '.-]*$/u, "State can only contain letters, spaces, and hyphens");

export const zipSchema = z
  .string()
  .trim()
  .max(12, "ZIP/postal code is too long")
  .regex(
    /^[a-zA-Z0-9\s-]*$/,
    "ZIP/postal code can only contain letters, numbers, spaces, and hyphens",
  );

// General free-text (business names, messages, "City, ST" combo fields, etc.)
// — too varied for a character whitelist, so this only blocks angle brackets
// and bounds the length.
export function freeTextSchema(label: string, max: number) {
  return z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .max(max, `${label} is too long`)
    .regex(/^[^<>]*$/, `${label} can't contain < or >`);
}

// --- Password strength -------------------------------------------------

// A handful of the most-guessed passwords and obvious brand/keyboard-walk
// variants. This is a speed bump, not a full breach-corpus check — it's
// backed up by the sequential/repeated-character checks below, which catch
// the broader "12345678"-style pattern the list can't enumerate.
const COMMON_PASSWORDS = new Set([
  "password",
  "password1",
  "password123",
  "passw0rd",
  "p@ssword1",
  "12345678",
  "123456789",
  "1234567890",
  "qwerty123",
  "qwertyuiop",
  "11111111",
  "00000000",
  "letmein1",
  "letmein123",
  "iloveyou1",
  "admin1234",
  "welcome1",
  "welcome123",
  "abc123456",
  "abcd1234",
  "trustno1",
  "monkey123",
  "dragon123",
  "football1",
  "baseball1",
  "sunshine1",
  "princess1",
  "superman1",
  "starwars1",
  "changeme1",
  "12341234",
  "87654321",
  "1q2w3e4r",
  "zaq12wsx",
  "qazwsx123",
  "steshbutter",
  "steshbutter1",
  "steshbutter123",
  "pistachio1",
]);

// True if the password contains a run of 5+ consecutive ascending or
// descending characters, e.g. "12345", "45678", "abcde", "edcba".
function hasSequentialRun(password: string): boolean {
  const lower = password.toLowerCase();
  let ascending = 1;
  let descending = 1;
  for (let i = 1; i < lower.length; i++) {
    const prev = lower.charCodeAt(i - 1);
    const curr = lower.charCodeAt(i);
    ascending = curr === prev + 1 ? ascending + 1 : 1;
    descending = curr === prev - 1 ? descending + 1 : 1;
    if (ascending >= 5 || descending >= 5) return true;
  }
  return false;
}

// True if the same character repeats 4+ times in a row, e.g. "aaaa", "1111".
function hasRepeatedRun(password: string): boolean {
  return /(.)\1{3,}/.test(password);
}

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(72, "Password must be 72 characters or fewer")
  .refine((pw) => /[a-zA-Z]/.test(pw), "Password must include at least one letter")
  .refine((pw) => /[0-9]/.test(pw), "Password must include at least one number")
  .refine(
    (pw) => !COMMON_PASSWORDS.has(pw.toLowerCase()),
    "That password is too common, please choose another",
  )
  .refine((pw) => !hasSequentialRun(pw), 'Avoid simple sequences like "12345" or "abcde"')
  .refine((pw) => !hasRepeatedRun(pw), "Avoid repeating the same character many times in a row");
