export interface CrudRepository<T, CreateInput> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(input: CreateInput): Promise<T>;
}
