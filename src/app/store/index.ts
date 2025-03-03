import { ActionReducerMap } from "@ngrx/store";
import { authFeatureName, authReducer, AuthState } from "./auth/auth.reducer";
import { estudiante } from "../shared/utils";

export interface RootState {
    [authFeatureName]: AuthState;,
    [authFeatureName]: estudiante
}
export const rootReducer: ActionReducerMap<RootState> = {
    [authFeatureName]: authReducer
}