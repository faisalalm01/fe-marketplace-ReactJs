import { PRODUCT_TYPE } from "../../constants/initType";

const initialState = {
    dataProduct: [],
    dataDetailProduct: []
}
const Product = (state = initialState, { type, payload }) => {
    switch (type) {
        case PRODUCT_TYPE.GET_ALL_PRODUCT:
            return {
                ...state,
                dataProduct: payload
            };
        case PRODUCT_TYPE.GET_DETAIL_PRODUCT:
            return {
                ...state,
                dataDetailProduct: payload
            };
        default:
            return state;
    }
}

export default Product;