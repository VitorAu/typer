import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type LoginSchema = z.infer<typeof loginSchema>;

const registerSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
});

type RegisterSchema = z.infer<typeof registerSchema>;

export { loginSchema, registerSchema };
export type { LoginSchema, RegisterSchema };
