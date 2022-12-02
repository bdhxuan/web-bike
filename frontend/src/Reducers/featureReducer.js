import {
    GET_FEATURE_PRODUCTS_REQUEST,
    GET_FEATURE_PRODUCTS_SUCCESS,
    GET_FEATURE_PRODUCTS_FAIL,
    CLEAR_ERRORS
} from "../Constants/featureConstant"

export const featureReducer = (state = { FeatureProducts: [] }, action) => {
	switch (action.type) {
        case  GET_FEATURE_PRODUCTS_REQUEST:
            return {
                loading: true,
                FeatureProducts: [],
            }
		case GET_FEATURE_PRODUCTS_SUCCESS:
			return {
                loading: false,
				FeatureProducts: action.payload,
			};
        case GET_FEATURE_PRODUCTS_FAIL:
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