export interface User {
  id: number;
  email: string;
  name: string;
  password: string; // Consider omitting this in frontend for security reasons
  username: string;
  imageUrl: string;
}

export interface UsersResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: User[];
}
