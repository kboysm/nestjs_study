// C는 create를 의미
interface CUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  created_at?: Date;
}

export { CUser };
