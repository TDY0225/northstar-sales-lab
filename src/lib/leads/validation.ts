import { z } from "zod";

export const leadKindSchema = z.enum(["webinar", "guide"]);

const optionalTrimmedName = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.string().trim().max(80, "First name must be 80 characters or fewer.").optional(),
);

const optionalNumber = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.coerce.number().int().positive().optional(),
);

export const leadSchema = z.object({
  kind: leadKindSchema,
  email: z.string().trim().toLowerCase().email("Enter a valid email address."),
  firstName: optionalTrimmedName,
  consent: z.literal(true, { error: "Please confirm you would like to receive this resource." }),
  // Keep the honeypot inside the trusted input shape, then let the anti-spam
  // boundary classify any non-empty value without exposing a field error.
  honeypot: z.string().max(512).optional(),
  formStartedAt: optionalNumber,
  turnstileToken: z.string().trim().max(2048).optional(),
}).strict();

export type LeadKind = z.infer<typeof leadKindSchema>;
export type LeadInput = z.infer<typeof leadSchema>;
export type LeadField = "email" | "firstName" | "consent";

export function validateLead(input: unknown) {
  return leadSchema.safeParse(input);
}

export function getLeadFieldErrors(error: z.ZodError) {
  const fieldErrors: Partial<Record<LeadField, string[]>> = {};

  for (const issue of error.issues) {
    const field = issue.path[0];
    if (field === "email" || field === "firstName" || field === "consent") {
      fieldErrors[field] = [...(fieldErrors[field] ?? []), issue.message];
    }
  }

  return fieldErrors;
}
