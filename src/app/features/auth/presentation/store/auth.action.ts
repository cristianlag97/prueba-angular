import { createAction, props } from '@ngrx/store';
import User from '../../infrastructure/models/User';

export enum ActionType {
  LOAD_SESSION = '[Auth] Load Session',
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  LOGOUT = '[Auth] Logout',
  LOGOUT_SUCCESS = '[Auth] Logout Success',
}

export const loadSession = createAction(ActionType.LOAD_SESSION);


export const login = createAction(
  ActionType.LOGIN,
  props<{ user: User }>()
)

export const loginSuccess = createAction(
  ActionType.LOGIN_SUCCESS,
  props<{ user: User; token: string }>()
);

export const loginFailure = createAction(
  ActionType.LOGIN_FAILURE,
  props<{ error: string }>()
);

export const logout = createAction(ActionType.LOGOUT);
export const logoutSuccess = createAction(ActionType.LOGOUT_SUCCESS);