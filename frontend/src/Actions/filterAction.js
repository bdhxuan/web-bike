import {
    GET_NEW_ARRIVALS_REQUEST, 
    GET_NEW_ARRIVALS_SUCCESS, 
    GET_NEW_ARRIVALS_FAIL,
	GET_PRICE_ASC_REQUEST,
    GET_PRICE_ASC_SUCCESS,
    GET_PRICE_ASC_FAIL,
    GET_PRICE_DESC_REQUEST,
    GET_PRICE_DESC_SUCCESS,
    GET_PRICE_DESC_FAIL,
    CLEAR_ERRORS} from "../Constants/filterConstant";

import axios from 'axios';


//lay san pham moi den
export const getNewArrivals = () => async (dispatch) => {
		try {
            dispatch({type: GET_NEW_ARRIVALS_REQUEST})
			const {data} = await axios.get(`/api/v1/filter`);
			dispatch({
				type: GET_NEW_ARRIVALS_SUCCESS,
				payload: data.newArrivals,
			});
		} catch (error) {
			dispatch({
				type: GET_NEW_ARRIVALS_FAIL,
				payload: error.response.data.message,
			});
		}
};


//loc san pham theo gia tang dan
export const getFilterPriceAsc = () => async (dispatch) => {
		try {
            dispatch({type: GET_PRICE_ASC_REQUEST})
			const {data} = await axios.get(`/api/v1/filter/priceasc`);
			dispatch({
				type: GET_PRICE_ASC_SUCCESS,
				payload: data.FilterPriceAscs,
			});
		} catch (error) {
			dispatch({
				type: GET_PRICE_ASC_FAIL,
				payload: error.response.data.message,
			});
		}
};


//loc san pham theo gia gaim dan
export const getFilterPriceDesc = () => async (dispatch) => {
		try {
            dispatch({type: GET_PRICE_DESC_REQUEST})
			const {data} = await axios.get(`/api/v1/filter/pricedesc`);
			dispatch({
				type: GET_PRICE_DESC_SUCCESS,
				payload: data.FilterPriceDescs,
			});
		} catch (error) {
			dispatch({
				type: GET_PRICE_DESC_FAIL,
				payload: error.response.data.message,
			});
		}
};

export const clearErrors = () => async(dispatch) => {
    dispatch({type: CLEAR_ERRORS});
} ;
