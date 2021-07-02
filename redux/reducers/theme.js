import * as types from "../types";

const initialState = {
  status: null,
  loading: false,
  error: null,
};

export const themeReducer = (state = initialState, action) => {
  console.log(`action?.payload `, action?.payload);
  switch (action.type) {
    case types.GET_THEME_STATUS_REQUEST:
      return {
        ...state,
        status: null,
        loading: true,
        error: null,
      };

    case types.GET_THEME_STATUS_SUCCESS:
      return {
        ...state,
        status: action?.payload?.status,
        loading: false,
        error: null,
      };

    case types.GET_THEME_STATUS_FAILURE:
      return {
        ...state,
        status: null,
        loading: false,
        error: action.error,
      };

    case types.THEME_INITIALIZE_REQUEST:
      return { ...state, status: null, loading: true, error: null };

    case types.THEME_INITIALIZE_SUCCESS:
      return {
        ...state,
        loading: false,
        status: action?.payload?.status,
        error: null,
      };

    case types.THEME_INITIALIZE_FAILURE:
      return { ...state, status: false, loading: false, error: action.error };

    default:
      return state;
  }
};
