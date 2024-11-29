export default interface IUserContext { 
  user: {
    username: string | null;
    email: string | null;
    _id: string | null;
  } | null;
}
