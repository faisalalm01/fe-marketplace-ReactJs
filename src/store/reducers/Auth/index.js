import { AUTH_TYPE } from "../../constants/initType";

const initialState = {
    // dataRegister: {},
    dataLogin: []
};
const Auth = (state = initialState, {type, payload}) => {
    switch (type) {
        // case AUTH_TYPE.REGISTER_USER:
        //     return {
        //         ...state,
        //         dataRegister: payload
        //     };
        case AUTH_TYPE.LOGIN_USER:
            return {
                ...state,
                dataLogin: payload
            };
        default:
            return state;
    }
}

export default Auth