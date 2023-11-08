import { CreateSliceOptions, configureStore, createSelector } from "@reduxjs/toolkit";
import GlobalReducer from "./global/GlobalReducer";
import ProjectsReducer from "./projects/store/ProjectsReducer";
import AuthenticationReducer from "./authentication/screens/store/AuthenticationReducer";
import storage from 'redux-persist/lib/storage';
import sessionStorage from "redux-persist/es/storage/session";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import { EqualityFn } from "react-redux";
import { DefaultNormalizerOptions } from "@testing-library/dom";

const persistGlobalConfig = {
  key: 'global',
  storage,
}

const persistAuthConfig = {
  key: 'authentication',
  storage,
}

const persistProjectsConfig = {
  key: 'projects',
  storage: sessionStorage,
}
const persistedAuthReducer = persistReducer(persistAuthConfig, AuthenticationReducer)
const persistedProjectsReducer = persistReducer(persistProjectsConfig, ProjectsReducer)
const persistedGlobalReducer = persistReducer(persistGlobalConfig, GlobalReducer)
export const store = configureStore({
  reducer: {
    global: persistedGlobalReducer,
    projects: persistedProjectsReducer,
    authentication: persistedAuthReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppSelector<Return> = (state: RootState) => Return;
export const createAppSelector = <R>(...selectors:[...AppSelector<R>[], (...args: R[]) => R, CreateSliceOptions<[equalityCheckOrOptions?: EqualityFn | DefaultNormalizerOptions | undefined]>]): AppSelector<R> => {
  return createSelector(...selectors);
};