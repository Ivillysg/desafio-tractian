export interface IUnit {
  _id: string;
  name: string;
  company: {
    name: string;
  };
  assignedTo: string;
  actives: [];
}

export interface Units {
  data: IUnit[];
  loading: boolean;
}
