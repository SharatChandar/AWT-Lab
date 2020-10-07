import {GET_USERS, DELETE_USER} from '../actions/types';
const initialState = {
    users:[],
    delete:false,
    loading: false
};

export default function(state = initialState, action){
    switch (action.type) {
        case GET_USERS :
        return {
            ...state,
            users: action.payload,
            loading :false

        };
        case DELETE_USER :
        console.log('delte')
        return {
            ...state,
            delete:true
            

        };

        default :
        return  state
    }
    
    
}