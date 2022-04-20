import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
};

@Injectable()
export class TestUserService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'Limsm',
      username: 'limsangmin',
      password: '1234',
    },
    {
      id: 2,
      name: 'test_name',
      username: 'test_user_name',
      password: '1234',
    },
    {
      id: 3,
      name: 'test_name_1',
      username: 'test_user_name_1',
      password: '1234',
    },
    {
      id: 4,
      name: 'test_name_2',
      username: 'test_user_name_2',
      password: '1234',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
