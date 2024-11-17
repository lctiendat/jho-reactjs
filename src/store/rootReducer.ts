import { combineReducers } from 'redux';
import contactReducer from '../features/contactSlice'
import tagReducer from '../features/tagSlice'
import mannagerReducer from '../features/managerSlice'
import userReducer from '../features/userSlice'


const rootReducer = combineReducers({
    contact: contactReducer,
    tag: tagReducer,
    manager: mannagerReducer,
    user: userReducer
});

export default rootReducer;