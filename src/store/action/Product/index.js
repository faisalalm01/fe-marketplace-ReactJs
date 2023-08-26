import { requestGet } from "../../../config"
import { PRODUCT } from "../../constants/initHttp"
import { PRODUCT_TYPE } from "../../constants/initType";

export const getAllProduct = (params) => {
    return async (dispatch) => {
        try {
            let res = await requestGet(PRODUCT.GET_ALL_PRODUCT, params);
            dispatch({ type:PRODUCT_TYPE.GET_ALL_PRODUCT, payload: res.data })
        } catch (error) {
            console.log('getAllProduct', JSON.stringify(error));
        }
    }
};

export const getDetailProduct = (id) => {
    return async (dispatch) => {
        try {
            let res = await requestGet(PRODUCT.GET_DETAIL_PRODUCT + id);
            dispatch({ type: PRODUCT_TYPE.GET_DETAIL_PRODUCT, payload: res.data })
        } catch (error) {
            console.log('getDetailProduct', JSON.stringify(error));
        }
    }
}