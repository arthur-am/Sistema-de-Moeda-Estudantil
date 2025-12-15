import { z } from 'zod';

export const alunoSchema = z.object({
  cpf: z
    .string()
    .min(11)
    .regex(/^[0-9.\-]+$/)
    .transform((s) => s.replace(/\D/g, '')),
  curso: z.string().min(1),
  endereco: z.string().optional().nullable(),
  user_id: z.string().min(1)
});

export type AlunoCreate = z.infer<typeof alunoSchema>;
