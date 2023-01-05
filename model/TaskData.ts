export interface TaskData {
  id?: string;
  description: string;
  dev: string;
  status: "A Fazer" | "Fazendo" | "Concluído" | "Em Teste";
  type: "Curso" | "Erro" | "Nova";
  date: Date;
}
