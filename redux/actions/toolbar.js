import * as types from "../types";
import * as api from "../api";

export const getToolbar = (axios) => async (dispatch) => {
  dispatch({ type: types.GET_TOOLBAR_REQUEST });
  try {
    const res = await api.fetchToolbar(axios);
    console.log(`res `, res);
    dispatch({
      type: types.GET_TOOLBAR_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.GET_TOOLBAR_FAILURE,
      error: error,
    });
  }
};

export const updateToolbar = (axios, data) => async (dispatch) => {
  dispatch({ type: types.UPDATE_TOOLBAR_REQUEST });

  try {
    const res = await api.updateToolbar(axios, data);
    console.log(`res `, res);
    dispatch({
      type: types.UPDATE_TOOLBAR_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.UPDATE_TOOLBAR_FAILURE,
      error: error,
    });
  }
};
