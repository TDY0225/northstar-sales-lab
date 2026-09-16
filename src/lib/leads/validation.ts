import { z } from "zod";

export const leadKindSchema = z.enum(["webinar", "guide"]);

export const leadSchema = z.object({
  kind: leadKindSchema,
  email: z.string().trim().email("Enter a valid email address."),
  firstName: z.string().trim().max(80).optional(),
  consent: z.literal(true, { error: "Please confirm you would like to receive this resource." }),
  honeypot: z.string().max(0).optional(),
});

export type LeadKind = z.infer<typeof leadKindSchema>;
export type LeadInput = z.infer<typeof leadSchema>;

export function validateLead(input: unknown) {
  return leadSchema.safeParse(input);
}
