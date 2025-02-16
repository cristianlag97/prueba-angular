import User from "../../infrastructure/models/User";

export interface AuthState {
  user: User | null;
  token: string | null;
  error: string | null;
  loading: boolean;
}