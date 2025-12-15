import { z } from 'zod';

export const empresaSchema = z.object({
  nome: z.string().min(1),
  cnpj: z
    .string()
    .min(8)
    .regex(/^[0-9.\-/]+$/)
    .transform((s) => s.replace(/\D/g, '')),
  saldo: z.number().int().nonnegative().optional(),
  user_id: z.string().min(1)
});

export type EmpresaCreate = z.infer<typeof empresaSchema>;
