import {combineReducers} from 'redux';
import {GET_ANIMALS_SUCCESS} from "../actions/animalsActions";


function list(state=[], action){
    switch(action.type){
        case GET_ANIMALS_SUCCESS:
            return action.animals;
        default:
            return state;
    }
}


const animalsReducer = combineReducers({
    list:list,
});

export default animalsReducer