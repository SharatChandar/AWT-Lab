import {GET_ITEMS, ADD_ITEM, ITEMS_LOADING, GET_ITEM_BY_ID, DELETE_ITEM} from '../actions/types';

const initialState = {
    items:[],
    getitemsbyid:[],
    loading: false
};



export default function(state = initialState, action){
    switch (action.type) {
        case GET_ITEMS :
        return {
            ...state,
            items: action.payload,
            loading :false

        };
        case ADD_ITEM :
        return {
            ...state,
            items: [...state.items, action.payload]
            

        };
        case DELETE_ITEM :
        return {
            ...state,
            getitemsbyid: state.getitemsbyid.filter(item => item.id !== action.payload)
            

        };

        case GET_ITEM_BY_ID :
        return {
            ...state,
            getitemsbyid:[...state.getitemsbyid, action.payload]
            

        }
        case ITEMS_LOADING :
        return {
            ...state,
            loading :true

        }
        default :
        return  state
    }
    
    
}
