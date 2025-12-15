
import { eq } from 'drizzle-orm';
import { db } from '..';
import { alunoT, type InsertAluno, type SelectAluno } from './schema';
import { createAndAssignRole } from '../db/helpers';
import { alunoSchema } from '$lib/shared/schemas/aluno';

function validarAlunoInput(info: InsertAluno) {
	const parsed = alunoSchema.safeParse(info);
	if (!parsed.success) {
		// Aggregate Zod errors into a single message
		const message = parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join('; ');
		throw new Error(`Validação inválida: ${message}`);
	}
	return parsed.data;
}

export const alunoModel = {
	listar: async () => {
		return await db.query.alunoT.findMany({
			with: {
				user: true
			},
			orderBy: (t, { desc }) => [desc(t.saldo)]
		});
	},
	buscarPorId: async (id: SelectAluno['id']) => {
		return await db.query.alunoT.findFirst({
			where: eq(alunoT.id, id)
		});
	},
		       criar: async (info: InsertAluno) => {
			       const data = validarAlunoInput(info);
			       return await db.transaction(async (tx) => {
				       return await createAndAssignRole(tx, async () => await tx.insert(alunoT).values(data).returning(), data.user_id, 'estudante');
			       })
		       },
	atualizar: async (id: SelectAluno['id'], newInfo: Partial<InsertAluno>) => {
		return await db.update(alunoT).set(newInfo).where(eq(alunoT.id, id));
	},
	deletar: async (id: SelectAluno['id']) => {
		return await db.delete(alunoT).where(eq(alunoT.id, id));
	}
};
