import * as types from "../types";
import * as api from "../api";

export const getBanners = (axios) => async (dispatch) => {
  dispatch({ type: types.GET_BANNER_REQUEST, loading: false, error: false });
  try {
    const res = await api.fetchBanners(axios);
    console.log(`res `, res);
    dispatch({
      type: types.GET_BANNER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.GET_BANNER_FAILURE,
      error: error,
    });
  }
};

export const initalizeBanner = (axios) => async (dispatch) => {
  dispatch({ type: types.INITIALIZE_BANNER_REQUEST });

  try {
    const res = await api.initalizeBanner(axios);
    console.log(`res `, res);
    dispatch({
      type: types.INITIALIZE_BANNER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.INITIALIZE_BANNER_FAILURE,
      error: error,
    });
  }
};

export const updateBanner = (axios, data) => async (dispatch) => {
  dispatch({ type: types.UPDATE_BANNER_REQUEST });

  try {
    const res = await api.updateBanner(axios, data);
    console.log(`res `, res);
    dispatch({
      type: types.UPDATE_BANNER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.UPDATE_BANNER_FAILURE,
      error: error,
    });
  }
};
