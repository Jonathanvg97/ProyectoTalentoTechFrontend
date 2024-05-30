export class UserModel {
  constructor(
    public readonly _id: string,
    public name: string,
    public email: string,
    public password: string,
    public role: string,
    public createdAt: Date,
    public clientType?: number,
    public matches?: any[],
    public createdBusinesses?: any[],
    public token?: string
  ) {}
}
