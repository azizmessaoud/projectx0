import { z } from "zod";

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address"),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z
    .string()
    .trim()
    .min(5, "Message must be at least 5 characters")
    .max(2000),
  honeypot: z
    .string()
    .optional()
    .transform((value) => value?.trim() ?? ""),
}).superRefine((data, ctx) => {
  if (data.honeypot) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["honeypot"],
      message: "Bot submission detected",
    });
  }
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
