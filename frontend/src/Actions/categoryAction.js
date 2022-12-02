import {
    ALL_CATEGORY_REQUEST,
    ALL_CATEGORY_SUCCESS,
    ALL_CATEGORY_FAIL,
    NEW_CATEGORY_REQUEST,
    NEW_CATEGORY_SUCCESS,
    NEW_CATEGORY_FAIL,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    CLEAR_ERRORS,
} from "../Constants/categoryConstant";

import axios from "axios";


//lay ta ca danh muc
export const getCategories = () => async dispatch => {

    try{
        dispatch ({type: ALL_CATEGORY_REQUEST})

        const { data } = await axios.get(`/api/v1/admin/categories`);

        dispatch({
        type: ALL_CATEGORY_SUCCESS,
        payload: data.categories,
        });
    } catch (error) {
        dispatch({
            type: ALL_CATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
};

//tao danh muc san pham -- amdin
export const createCategory = (categoryData) => async dispatch => {
    try{
        dispatch ({type: NEW_CATEGORY_REQUEST})

        const config = { headers: { "Content-Type": "application/json" }};

        const { data } = await axios.post(`/api/v1/admin/category/new`, categoryData, config);

        dispatch({
            type: NEW_CATEGORY_SUCCESS,
            payload: data,
        });

    }catch(error) {
        dispatch({
            type: NEW_CATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
}

//xoa danh muc -- admin
export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORY_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/category/${id}`);

    dispatch({
      type: DELETE_CATEGORY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async(dispatch) => {
    dispatch({type: CLEAR_ERRORS});
} ;