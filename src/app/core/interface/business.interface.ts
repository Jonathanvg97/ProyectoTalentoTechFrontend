export interface businessInterface {
  _id?: string;
  title: string;
  description: string;
  status: string;
  industry: number;
  createdBy?: {
    userName: string;
  };
  createdAt?: string;
}
