export interface IActive {
  status: string;
  healthScore: number;
  _id: string;
  name: string;
  description: string;
  model: string;
  image: string;
  assignedTo: string;
  unit: {
    name: string;
  };
  company: string;
}

export interface Actives {
  data: IActive[];
  error: string;
}
