export interface IUser {
  _id: string;
  email: string;
  companys: [];
}

export interface Users {
  data: IUser[];
  error: string;
}
