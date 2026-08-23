import { z } from "zod";
import { PROJECT_TYPES } from "./constants";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(200),
  projectType: z.enum(PROJECT_TYPES, {
    message: "Choose a project type",
  }),
  message: z.string().trim().min(10, "Tell us a bit more about your project").max(5000),
  // Honeypot: real users never fill this in. Bots that blind-fill every field do.
  company: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
