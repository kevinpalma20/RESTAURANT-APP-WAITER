export interface AuthState {
  status: "checking" | "authenticated" | "not-authenticated";
  token: string | null;
  errorMessage: string;
}

type AuthAction =
  | { type: "signUp"; payload: { token: string } }
  | { type: "addError"; payload: string }
  | { type: "removeError" }
  | { type: "authFailed" }
  | { type: "notAuthenticated" }
  | { type: "logout" };

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "addError":
      return {
        ...state,
        status: "not-authenticated",
        token: null,
        errorMessage: action.payload,
      };

    case "removeError":
      return {
        ...state,
        errorMessage: "",
      };

    case "signUp":
      return {
        ...state,
        errorMessage: "",
        status: "authenticated",
        token: action.payload.token,
      };

    case "logout":
    case "notAuthenticated":
      return {
        ...state,
        status: "not-authenticated",
        token: null,
      };

    default:
      return state;
  }
};
