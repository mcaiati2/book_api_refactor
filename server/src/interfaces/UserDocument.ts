import type { IBook } from '../models/Book.js';
export default interface IUserDocument {
  username: string | null;
  email: string | null;
  password: string | null;
  savedBooks: IBook[];
  isCorrectPassword(password: string): Promise<boolean>;
  bookCount: number | null;
}
