import axios from "axios";
import {
  GET_ITEMS,
  ADD_ITEM,
  ITEMS_LOADING,
  GET_ITEM_BY_ID,
  DELETE_ITEM,
  GET_USERS,
} from "./types";

export const getItems = () => (dispatch) => {
  dispatch(setItemLoading());
  axios.get("/api/items").then((res) =>
    dispatch({
      type: GET_ITEMS,
      payload: res.data,
    })
  );
};
export const addItems = (nnn) => (dispatch) => {
  axios.post("/items", nnn).then((res) =>
    dispatch({
      type: ADD_ITEM,
      payload: res.data,
    })
  );
};
export const getItemById = (id, cb) => (dispatch) => {
  axios.post("/getitem", id).then((res) => {
    if (res.data.msg) {
      cb(res.data.msg);
    } else {
      dispatch({
        type: GET_ITEM_BY_ID,
        payload: res.data,
      });
    }
  });
};
export const deleteItem = (id) => {
  return {
    type: DELETE_ITEM,
    payload: id,
  };
};
export const setItemLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};

export const getUsers = () => (dispatch) => {
  dispatch(setItemLoading());
  axios.get("/api/users").then((res) =>
    dispatch({
      type: GET_USERS,
      payload: res.data,
    })
  );
};

export const deleteUser = (id) => (dispatch) => {
  axios.get(`/user/${id}`).then((res) => console.log(res));
};
export const removeItem = (id) => (dispatch) => {
  axios.get(`/item/${id}`).then((res) => console.log(res));
};
