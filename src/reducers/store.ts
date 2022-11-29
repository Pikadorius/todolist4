import {combineReducers, legacy_createStore} from "redux";
import todolistReducer, {TodoListType} from "./todolistReducer";
import tasksReducer, {TasksStateType} from "./tasksReducer";

// combine reducers with redux method
const reducers = combineReducers({
        todolists: todolistReducer,
        tasks: tasksReducer
    }
)

//
export type StoreType=typeof store;
// create store with redux method
const store = legacy_createStore(reducers)

export default store;