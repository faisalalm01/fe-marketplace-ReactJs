import { MARKET_TYPE } from "../../constants/initType";

const initialState = {
    dataMarket: [],
    dataDetailMarket: []
}
const Market = (state = initialState, { type, payload }) => {
    switch (type) {
        case MARKET_TYPE.GET_ALL_MARKET:
            return {
                ...state,
                dataMarket: payload
            };
        case MARKET_TYPE.GET_DETAIL_MARKET:
            return {
                ...state,
                dataDetailMarket: payload
            };
        default:
            return state;
    }
}

export default Market;