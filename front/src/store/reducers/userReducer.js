import * as actionTypes from '../actions/actionTypes';

const initialState = {
    users:[]
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.GET_USER_LIST:
            return {...state, users: action.users};
        default:
            return state;
    }
};

export default reducer;