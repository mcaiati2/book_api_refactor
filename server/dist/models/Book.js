import { Schema, model } from 'mongoose';
const bookSchema = new Schema({
    bookId: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    authors: [
        {
            type: String,
        },
    ],
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    link: {
        type: String,
    },
});
const Book = model('Book', bookSchema);
export { bookSchema };
export default Book;
