import { PRODUCT_TYPE } from "../../constants/initType";

const initialState = {
    dataProduct: []
}
const Product = (state = initialState, { type, payload }) => {
    switch (type) {
        case PRODUCT_TYPE.GET_ALL_PRODUCT:
            return {
                ...state,
                dataProduct: payload
            }
        default:
            return state;
    }
}

export default Product;