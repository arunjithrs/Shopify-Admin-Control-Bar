import * as types from "../types";
const initialState = {
  banner: {},
  loading: false,
  error: null,
};

export const bannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_BANNER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.GET_BANNER_SUCCESS:
      return {
        ...state,
        banner: action.payload,
        loading: false,
        error: null,
      };

    case types.GET_BANNER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case types.INITIALIZE_BANNER_REQUEST:
      return { ...state, loading: true, error: null };

    case types.INITIALIZE_BANNER_SUCCESS:
      return { ...state, loading: false, error: null };

    case types.INITIALIZE_BANNER_FAILURE:
      return { ...state, loading: false, error: action.error };

    case types.UPDATE_BANNER_REQUEST:
      return { ...state, loading: true, error: null };

    case types.UPDATE_BANNER_SUCCESS:
      return {
        ...state,
        loading: false,
        banner: action.payload,
        error: action.error,
      };

    case types.UPDATE_BANNER_FAILURE:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};
