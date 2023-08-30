import { requestPost } from "../../../config"
import { storeData } from "../../../utils";
import { AUTH } from "../../constants/initHttp"
import { AUTH_TYPE } from "../../constants/initType";


export const registerUser = (body) => {
    return async(dispatch) => {
        try {
            let res = await requestPost(AUTH.REGISTER_USER, body);
            dispatch({ type: AUTH_TYPE.REGISTER_USER, payload: res})
        } catch (error) {
            dispatch({ type: AUTH_TYPE.REGISTER_USER, payload: false});
            console.log('registerUser', JSON.stringify(error));
        }
    }
}

export const loginUser = (body) => {
    return async(dispatch) => {
        try {
            let res = await requestPost(AUTH.LOGIN_USER, body);
            dispatch({ type: AUTH_TYPE.LOGIN_USER, payload: res})
            console.log(res);
            await storeData('access_token', res.data.token);
        } catch (error) {
            dispatch({ type: AUTH_TYPE.LOGIN_USER, payload: error });
            console.log('loginUser', JSON.stringify(error));
        }
    }
}