import * as types from "../types";
import * as api from "../api";

export const getThemeStatus = (axios) => async (dispatch) => {
  dispatch({ type: types.GET_THEME_STATUS_REQUEST });
  try {
    const res = await api.fetchThemeStatus(axios);
    console.log(`res `, res);
    dispatch({
      type: types.GET_THEME_STATUS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.GET_THEME_STATUS_FAILURE,
      error: error,
    });
  }
};

export const initalizeTheme = (axios) => async (dispatch) => {
  dispatch({ type: types.THEME_INITIALIZE_REQUEST });

  try {
    const res = await api.initalizeTheme(axios);
    console.log(`res `, res);
    dispatch({
      type: types.THEME_INITIALIZE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.THEME_INITIALIZE_FAILURE,
      error: error,
    });
  }
};
