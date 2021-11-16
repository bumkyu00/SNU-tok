import * as actionTypes from '../actions/actionTypes';

const initialState = {
    login: false,
    id: null,
    username: null,
    checkLogin: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.LOG_IN:
            return {...state, login: true, id: 1, username: "Software Lover"};
        case actionTypes.LOG_OUT:
            return {...state, login: false, id: null, username: null};
        case actionTypes.CHECK_LOG_IN:
            return {...state, checkLogin: true};
        default:
            return state;
    }
};

export default reducer;