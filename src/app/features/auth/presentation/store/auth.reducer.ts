import { loadSession, login, loginFailure, loginSuccess, logoutSuccess } from "./auth.action";
import { AuthState } from "./auth.state";
import { createReducer, on } from "@ngrx/store";
import User from '../../infrastructure/models/User';

const initialState : AuthState = {
  user: null,
  token: null,
  error: null,
  loading: false,
};

export const authReducer = createReducer(
  initialState,

  on(loadSession, (state) => {
    const token = localStorage.getItem('authToken');
    return token
      ? { ...state, token, error: null }
      : { ...state, token: null, error: null };
  }),

  // Acción de login: Guarda el usuario en el estado y activa loading
  on(login, (state, { user }) => ({
    ...state,
    user,
    token: null,
    error: null,
  })),

  // Si el login es exitoso, almacena user y token, desactiva loading
  on(loginSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    loading: false,
    error: null
  })),

  // Si el login falla, almacena el error y desactiva loading
  on(loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

   // Logout: Resetea todo el estado
   on(logoutSuccess, () => initialState)
)