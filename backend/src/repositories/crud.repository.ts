export abstract class CrudRepository<T> {
  abstract getAll(): Promise<T[]>;

  abstract getById(id: number): Promise<T | null>;

  abstract create(body: T): Promise<T | null>;

  abstract update(body: T): Promise<T | null>;

  abstract erase(id: number): Promise<boolean>;
}
