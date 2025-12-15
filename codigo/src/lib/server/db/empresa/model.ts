import { eq } from 'drizzle-orm';
import { db } from '..';
import { empresaT, type InsertEmpresa, type SelectEmpresa } from './schema';
import { createAndAssignRole } from '../db/helpers';
import { empresaSchema } from '$lib/shared/schemas/empresa';

function validarEmpresaInput(info: InsertEmpresa) {
	const parsed = empresaSchema.safeParse(info as any);
	if (!parsed.success) {
		const message = parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join('; ');
		throw new Error(`Validação inválida: ${message}`);
	}
	return parsed.data;
}

export const empresaModel = {
	listar: async () => {
		return await db.query.empresaT.findMany();
	},
	criarEmpresa: async (info: InsertEmpresa) => {
		const data = validarEmpresaInput(info);
		return await db.transaction(async (tx) => {
			return await createAndAssignRole(tx, async () => await tx.insert(empresaT).values(data).returning(), data.user_id, 'empresa');
		});
	},
	// backward-compatible alias
	criar: async (info: InsertEmpresa) => {
		return await (empresaModel as any).criarEmpresa(info);
	},
	atualizar: async (id: SelectEmpresa['id'], newInfo: Partial<InsertEmpresa>) => {
		return await db.update(empresaT).set(newInfo).where(eq(empresaT.id, id));
	},
	deletar: async (id: SelectEmpresa['id']) => {
		return await db.delete(empresaT).where(eq(empresaT.id, id));
	}
};
