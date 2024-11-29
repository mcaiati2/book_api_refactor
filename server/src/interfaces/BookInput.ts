// IBookInput defines the properties a BookIput object can have
export default interface IBookInput {

  // ? means property is optional and may or not be present in the object
  
  // authors can be an array of strings or it can be null (since property is optional)
  authors?: string[] | null;
  description: string | null;
  bookId: string | null;
  image?: string | null;
  link?: string | null;
  title: string | null;
}
