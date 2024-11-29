import { Schema, model, type Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { type IBook, bookSchema } from './Book.js';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  savedBooks: IBook[];
  isCorrectPassword(password: string): Promise<boolean>;
  bookCount: number;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    savedBooks: [bookSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre<IUser>('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.virtual('bookCount').get(function (this: IUser) {
  return this.savedBooks.length;
});

const User = model<IUser>('User', userSchema);

export default User;
