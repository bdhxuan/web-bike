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
    CLEAR_ERRORS } from '../Constants/filterConstant';


export const filterReducer = (state = { newArrivals: [] }, action) => {
	switch (action.type) {
        case GET_NEW_ARRIVALS_REQUEST:
            return {
                loading: true,
                newArrivals: [],
            }
		case GET_NEW_ARRIVALS_SUCCESS:
			return {
                loading: false,
				newArrivals: action.payload,
			};
        case GET_NEW_ARRIVALS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

		default:
			return state;
	}
};


export const priceAscReducer = (state = { FilterPriceAscs: [] }, action) => {
	switch (action.type) {
        case GET_PRICE_ASC_REQUEST:
            return {
                loading: true,
                FilterPriceAscs: [],
            }
		case GET_PRICE_ASC_SUCCESS:
			return {
                loading: false,
				FilterPriceAscs: action.payload,
			};
        case GET_PRICE_ASC_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

		default:
			return state;
	}
};



export const priceDescReducer = (state = { FilterPriceDescs: [] }, action) => {
	switch (action.type) {
        case GET_PRICE_DESC_REQUEST:
            return {
                loading: true,
                FilterPriceDescs: [],
            }
		case GET_PRICE_DESC_SUCCESS:
			return {
                loading: false,
				FilterPriceDescs: action.payload,
			};
        case GET_PRICE_DESC_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

		default:
			return state;
	}
};