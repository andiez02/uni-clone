import { AxiosInstance } from 'axios';

export default class UserService {
  constructor(private axios: AxiosInstance) {}

  getUserDetail = async () => {
    const { data } = await this.axios.get('users/me');
    return data;
  };

  login = async (username: string, password: string) => {
    const request = await this.axios.post('user/login', {
      username,
      password,
    });
    const response = await request.data.user;
    return response;
  };
}
