import { User } from "../api-endpoints/users-api";

export default class CreatedData {
  static createdUsers: User[] = [];

  static getUserByEmail(email: string) {
    return this.createdUsers.find((user) => user.response.data.email === email);
  }
  static getUserById(id: number) {
    return this.createdUsers.find((user) => user.response.data.id === id);
  }
}
