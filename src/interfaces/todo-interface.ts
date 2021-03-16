export interface ITodo {
  id?: string;
  description: string;
  completed: boolean;
  completedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}
