import { requestGet } from "../../../config";
import { MARKET } from "../../constants/initHttp";
import { MARKET_TYPE } from "../../constants/initType";

export const getAllMarket = (params) => {
    return async (dispatch) => {
        try {
            let res = await requestGet(MARKET.GET_ALL_MARKET, params);
            dispatch({ type: MARKET_TYPE.GET_ALL_MARKET, payload: res.data })
        } catch (error) {
            console.log('getAllMarket', JSON.stringify(error));
        }
    }
};

export const getDetailMarket = (id) => {
    return async (dispatch) => {
        try {
            let res = await requestGet(MARKET.GET_DETAIL_MARKET + id);
            dispatch({ type: MARKET_TYPE.GET_DETAIL_MARKET, payload:res.data})
        } catch (error) {
            console.log('getDetailMarket', JSON.stringify(error));
        }
    }
}
