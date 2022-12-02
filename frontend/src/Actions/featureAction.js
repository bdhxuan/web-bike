import {
    GET_FEATURE_PRODUCTS_REQUEST,
    GET_FEATURE_PRODUCTS_SUCCESS,
    GET_FEATURE_PRODUCTS_FAIL,
    CLEAR_ERRORS
} from "../Constants/featureConstant"

import axios from 'axios';

export const getFeatureProducts = () => async (dispatch) => {
		try {
            dispatch({type: GET_FEATURE_PRODUCTS_REQUEST})
			const {data} = await axios.get(`/api/v1/feature`);
			dispatch({
				type: GET_FEATURE_PRODUCTS_SUCCESS,
				payload: data.FeatureProducts,
			});
		} catch (error) {
			dispatch({
				type: GET_FEATURE_PRODUCTS_FAIL,
				payload: error.response.data.message,
			});
		}
	};

export const clearErrors = () => async(dispatch) => {
    dispatch({type: CLEAR_ERRORS});
} ;