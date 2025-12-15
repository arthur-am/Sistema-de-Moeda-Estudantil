import { command, query } from '$app/server';
import { alunoModel } from '$lib/server/db/aluno/model';
import { transacaoModel } from '$lib/server/db/transacao/model';
import type { InsertAluno } from '$lib/server/db/schema';
import { alunoSchema } from '$lib/shared/schemas/aluno';

export const listarAlunos = query(async () => {
	return await alunoModel.listar();
});

export const inserirAluno = command(alunoSchema, async (info) => {
	// server-side validation via Zod schema in the command
	await alunoModel.criar(info as any);
	await listarAlunos().refresh();
});

export const editarAluno = command(
	z.object({
		id: z.number(),
		info: z.object({
			cpf: z.string().optional(),
			curso: z.string().optional(),
			endereco: z.string().nullable().optional(),
			saldo: z.number().optional()
		})
	}),
	async ({ id, info }) => {
		await alunoModel.atualizar(id, info);
		await listarAlunos().refresh();
	}
);

export const excluirAluno = command(z.number(), async (id) => {
	await alunoModel.deletar(id);
	await listarAlunos().refresh();
});

export const getExtratoAluno = query(z.string(), async (cpfAluno) => {
	return await transacaoModel.listarExtratoAluno(cpfAluno);
});
