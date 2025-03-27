export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
  }
  
  export interface UsersResponse {
    success: boolean;
    data: User[];
    message?: string;
  }
  