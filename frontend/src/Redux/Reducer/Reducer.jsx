import { MEMBER_DATA } from "../Types";

const memberDataReducer = (state = [], action) => {
    switch(action.type) {
        case MEMBER_DATA : {
            return {...state, data:action.payload}
        }
        default : {
            return state
        }
    }
}

export default memberDataReducer