import exp from "constants";
import {v1} from "uuid";

export type TaskType = {
    taskId: string
    taskTitle: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

const initialState: TasksStateType = {
    'todo1': [
        {taskId: '1', taskTitle: 'HTML', isDone: true},
        {taskId: '2', taskTitle: 'CSS', isDone: false},
        {taskId: '3', taskTitle: 'React', isDone: false},
    ]
}

const tasksReducer = (state: TasksStateType = initialState, action: TasksActionType) => {
    switch (action.type) {
        case "ADD_TASKS_FOR_NEW_TODO": {
            return {[action.payload.newTodoId]: [], ...state}
        }
        case "ADD_NEW_TASK": {
            let newTask: TaskType = {
                taskId: v1(),
                taskTitle: action.payload.newTaskTitle,
                isDone: false
            }
            return {...state, [action.payload.todoId]: [newTask, ...state[action.payload.todoId]]}
        }
        case "DELETE_TASKS_FROM_TODO": {
            delete state[action.payload]
            return {...state}
        }
        case "CHANGE_TASK_STATUS": {
            return {
                ...state,
                [action.payload.todoId]:[...state[action.payload.todoId]].map(t=>t.taskId===action.payload.taskId? {...t, isDone:action.payload.checked}: t)
            }
        }
        default:
            return state;
    }

}

type TasksActionType =
    AddTasksForNewTodolistACType |
    AddNewTaskACType |
    DeleteTasksForTodolistACType |
    ChangeTaskStatusACType

type AddTasksForNewTodolistACType = ReturnType<typeof addTasksForNewTodolistAC>
export const addTasksForNewTodolistAC = (newTodoId: string) => {
    return {
        type: 'ADD_TASKS_FOR_NEW_TODO',
        payload: {
            newTodoId
        }
    } as const
}

type DeleteTasksForTodolistACType = ReturnType<typeof deleteTasksForTodolistAC>
export const deleteTasksForTodolistAC = (todoId: string) => {
    return {
        type: 'DELETE_TASKS_FROM_TODO',
        payload: todoId
    } as const
}

type AddNewTaskACType = ReturnType<typeof addNewTaskAC>
export const addNewTaskAC = (todoId: string, newTaskTitle: string) => {
    return {
        type: 'ADD_NEW_TASK',
        payload: {
            todoId,
            newTaskTitle
        }
    } as const
}

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todoId: string, taskId: string, checked: boolean) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload: {
            todoId,
            taskId,
            checked
        }
    } as const
}

export default tasksReducer