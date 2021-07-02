import * as types from "../types";
const initialState = {
  toolbar: {},
  loading: false,
  error: null,
};

export const toolbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TOOLBAR_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.GET_TOOLBAR_SUCCESS:
      return {
        ...state,
        toolbar: action.payload,
        loading: false,
        error: null,
      };

    case types.GET_TOOLBAR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case types.UPDATE_TOOLBAR_REQUEST:
      return { ...state, loading: true, error: null };

    case types.UPDATE_TOOLBAR_SUCCESS:
      return {
        ...state,
        loading: false,
        toolbar: action.payload,
        error: action.error,
      };

    case types.UPDATE_TOOLBAR_FAILURE:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};
