import { requestPost } from "../../../config"
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