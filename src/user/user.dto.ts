export class UserDTO {
  username: string;
  password: string;
}

export class UserRO {
  id: string;
  created: Date;
  username: string;
  token?: string;
}