export type FilterType = 'all' | 'active' | 'completed'

export type TodoListType = {
    todoId: string
    title: string
    filter: FilterType
}

const initialTodo: TodoListType[] = [{todoId: 'todo1', title: 'What to learn:', filter: 'all'}]

const todolistReducer = (state: TodoListType[] = initialTodo, action: TodolistActionsType) => {
    switch (action.type) {
        case "ADD_NEW_TODOLIST": {
            return [
                {
                    todoId: action.payload.newTodoId,
                    title: action.payload.newTitle,
                    filter: 'all'
                },
                ...state]
        }
        case "DELETE_TODOLIST": {
            return state.filter(t => t.todoId !== action.payload)
        }
        case "CHANGE_TODO_TITLE": {
            return [...state].map(t => t.todoId === action.payload.todoId ? {
                ...t,
                title: action.payload.newTodoTitle
            } : t)
        }
        case "CHANGE_TODOLIST_FILTER": {
            return [...state].map(t => t.todoId === action.payload.todoId ? {...t, filter: action.payload.filter} : t)
        }
        default:
            return state;
    }
}

export type TodolistActionsType =
    AddNewTodolistACType |
    DeleteTodolistACType |
    ChangeTodolistTitleACType |
    ChangeTodolistFilterACType

type AddNewTodolistACType = ReturnType<typeof addNewTodolistAC>
export const addNewTodolistAC = (newTodoId: string, newTitle: string) => {
    return {
        type: 'ADD_NEW_TODOLIST',
        payload: {
            newTodoId,
            newTitle
        }
    } as const
}

type DeleteTodolistACType = ReturnType<typeof deleteTodolistAC>
export const deleteTodolistAC = (todoId: string) => {
    return {
        type: 'DELETE_TODOLIST',
        payload: todoId
    } as const
}

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todoId: string, newTodoTitle: string) => {
    return {
        type: 'CHANGE_TODO_TITLE',
        payload: {
            todoId,
            newTodoTitle
        }
    } as const
}

type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (todoId: string, filter: FilterType) => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        payload: {
            todoId,
            filter
        }
    } as const
}


export default todolistReducer;