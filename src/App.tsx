import React from 'react';
import './App.css';
import AddForm from "./AddForm/AddForm";
import {StoreType} from "./reducers/store";
import {v1} from "uuid";
import {
    addNewTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC,
    FilterType,
    TodoListType
} from "./reducers/todolistReducer";
import {
    addNewTaskAC,
    addTasksForNewTodolistAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC,
    deleteTasksForTodolistAC, TasksStateType,
} from "./reducers/tasksReducer";
import Button from "./Button/Button";
import Todolist from "./Todolist/Todolist";

type AppType = {
    store: StoreType;
}

export type StateType = {
    todolists: TodoListType[]
    tasks: TasksStateType
}

function App(props: AppType) {

    const state: StateType = props.store.getState()
    const dispatch = props.store.dispatch

    const addTodolist = (newTitle: string) => {
        let newTodoId = v1()
        dispatch(addNewTodolistAC(newTodoId, newTitle))
        dispatch(addTasksForNewTodolistAC(newTodoId))
    }

    const removeTodolist = (todoId: string) => {
        dispatch(deleteTodolistAC(todoId))
        dispatch(deleteTasksForTodolistAC(todoId))
    }

    const changeTodolistTitle = (todoId:string, newTodoTitle: string)=>{
        dispatch(changeTodolistTitleAC(todoId, newTodoTitle))
    }

    const changeTodolistFilter = (todoId: string, filter: FilterType)=>{
        dispatch(changeTodolistFilterAC(todoId, filter));
    }

    const addTaskForTodolist = (todoId: string, newTaskTitle: string) => {
        dispatch(addNewTaskAC(todoId, newTaskTitle))
    }

    const deleteTask = (todoId: string, taskId: string) => {
       dispatch(deleteTaskAC(todoId,taskId))
    }

    const changeTaskStatus = (todoId: string, taskId: string, checked: boolean) => {
        dispatch(changeTaskStatusAC(todoId, taskId, checked))
    }

    const changeTaskTitle = (todoId: string, taskId: string, newTaskTitle: string) => {
        dispatch(changeTaskTitleAC(todoId, taskId, newTaskTitle))
    }

    return <div>
        {/*log all tasks and todolists*/}
        <Button name={"log"} onClick={() => {
            console.log(state.tasks)
            console.log(state.todolists)
        }}/>

        {/*form that adds new empty todolist*/}
        <AddForm itemName={'add todolist'} addItem={addTodolist}/>

        {state.todolists.map(t => {

            const filteredTasks = t.filter==="completed"? state.tasks[t.todoId].filter(t=>t.isDone) :
                t.filter==='active'? state.tasks[t.todoId].filter(t=>!t.isDone): state.tasks[t.todoId]

            return <Todolist
                key={t.todoId}
                removeTodolist={removeTodolist}
                title={t.title}
                changeTodoTitle={changeTodolistTitle}
                tasks={filteredTasks}
                changeTaskStatus={changeTaskStatus}
                deleteTask={deleteTask}
                todoId={t.todoId}
                filter={t.filter}
                changeFilter={changeTodolistFilter}
                addTask={addTaskForTodolist}
                changeTaskTitle={changeTaskTitle}/>
        })}


    </div>
}

export default App;
