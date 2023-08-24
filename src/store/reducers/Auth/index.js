import { AUTH_TYPE } from "../../constants/initType";

const initialState = {
    dataRegister: []
};
const Auth = (state = initialState, {type, payload}) => {
    switch (type) {
        case AUTH_TYPE.REGISTER_USER:
            return {
                ...state,
                dataRegister: payload
            }
        default:
            return state;
    }
}

export default Auth