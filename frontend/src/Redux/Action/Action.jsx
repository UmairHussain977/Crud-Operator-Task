import { MEMBER_DATA } from "../Types";

const memberData = (data) => {
    return {
        type: MEMBER_DATA,
        payload: data
    }
}

export {memberData}