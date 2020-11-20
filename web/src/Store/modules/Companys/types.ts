export interface ICompany {
  _id: string;
  name: string;
  assignedTo: {
    email: string;
  };
  units: [];
}

export interface Companys {
  data: ICompany[];
  error: string;
}
