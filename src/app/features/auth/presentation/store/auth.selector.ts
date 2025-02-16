import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

export const FeatureKey = 'AUTH_STATE';
export const selectAuthState = createFeatureSelector<AuthState>(FeatureKey);


// Selecciona el usuario autenticado
export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);

// Selecciona el token de autenticación
export const selectToken = createSelector(
  selectAuthState,
  (state) => state.token
);

// Selecciona si hay un usuario autenticado (retorna `true` si hay un token)
export const selectIsAuthenticated = createSelector(
  selectToken,
  (token) => !!token
);

// Selecciona el estado de carga (`loading`)
export const selectAuthLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);

// Selecciona el mensaje de error si la autenticación falla
export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);
