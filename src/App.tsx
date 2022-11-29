import React, {useState} from 'react';
import './App.css';
import AddForm from "./AddForm/AddForm";
import {StoreType} from "./reducers/store";
import {v1} from "uuid";
import {
    addNewTodolistAC, changeTodolistFilterAC, changeTodolistSortFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC,
    FilterType, SortType,
    TodoListType
} from "./reducers/todolistReducer";
import {
    addNewTaskAC,
    addTasksForNewTodolistAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC,
    deleteTasksForTodolistAC, TasksStateType,
} from "./reducers/tasksReducer";
import Button from "./Button/Button";
import Todolist from "./Todolist/Todolist";
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

type AppType = {
    store: StoreType;
}

export type StateType = {
    todolists: TodoListType[]
    tasks: TasksStateType
}

function App(props: AppType) {

    // for easiest access
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

    const changeTodolistTitle = (todoId: string, newTodoTitle: string) => {
        dispatch(changeTodolistTitleAC(todoId, newTodoTitle))
    }

    const changeTodolistFilter = (todoId: string, filter: FilterType) => {
        dispatch(changeTodolistFilterAC(todoId, filter));
    }

    const changeTodolistSortFilter = (todoId: string, sortFilter: SortType) => {
        dispatch(changeTodolistSortFilterAC(todoId, sortFilter))
    }

    const addTaskForTodolist = (todoId: string, newTaskTitle: string) => {
        dispatch(addNewTaskAC(todoId, newTaskTitle))
    }

    const deleteTask = (todoId: string, taskId: string) => {
        dispatch(deleteTaskAC(todoId, taskId))
    }

    const changeTaskStatus = (todoId: string, taskId: string, checked: boolean) => {
        dispatch(changeTaskStatusAC(todoId, taskId, checked))
    }

    const changeTaskTitle = (todoId: string, taskId: string, newTaskTitle: string) => {
        dispatch(changeTaskTitleAC(todoId, taskId, newTaskTitle))
    }

    const [toggle, setToggle] = useState(false)

    return <Container fixed>

        {/*log all tasks and todolists*/}
        {/*<Button name={"log"} onClick={() => {
            console.log(state.tasks)
            console.log(state.todolists)
        }}/>*/}
        <Grid container>
            <Paper elevation={3} style={{padding: '10px', marginBottom: '10px',marginTop: '10px'}}>
                <div className={'addFormWrapper'}>{/*form that adds new empty todolist*/}
                    <AddForm buttonName={'Add todolist'} addItem={addTodolist}/>
                    {/*show/hide todolists*/}
                    <IconButton aria-label="arrow" size="small" onClick={() => setToggle(!toggle)}>
                        {toggle ? <ArrowDropDownIcon/> : <ArrowDropUpIcon/>}
                    </IconButton>
                </div>
            </Paper>
        </Grid>
        <Grid container spacing={3}>{
            toggle ? <></> : state.todolists.map(t => {

                const filteredTasks = t.filter === "completed" ? state.tasks[t.todoId].filter(t => t.isDone) :
                    t.filter === 'active' ? state.tasks[t.todoId].filter(t => !t.isDone) : state.tasks[t.todoId]

                const sortedTasks =
                    t.sortFilter === 'reverse' ? [...filteredTasks].reverse() :
                        t.sortFilter === 'a-z' ? [...filteredTasks].sort((a, b) => a.taskTitle.toLowerCase().localeCompare(b.taskTitle.toLowerCase())) :
                            t.sortFilter === 'z-a' ? [...filteredTasks].sort((a, b) => b.taskTitle.toLowerCase().localeCompare(a.taskTitle.toLowerCase())) :
                                filteredTasks

                return <Grid item key={t.todoId}>
                    <Paper elevation={3} style={{padding: '20px'}}>
                        <Todolist
                            sortFilter={t.sortFilter}
                            changeSortFilter={changeTodolistSortFilter}
                            key={t.todoId}
                            removeTodolist={removeTodolist}
                            title={t.title}
                            changeTodoTitle={changeTodolistTitle}
                            tasks={sortedTasks}
                            changeTaskStatus={changeTaskStatus}
                            deleteTask={deleteTask}
                            todoId={t.todoId}
                            filter={t.filter}
                            changeFilter={changeTodolistFilter}
                            addTask={addTaskForTodolist}
                            changeTaskTitle={changeTaskTitle}/>
                    </Paper>
                </Grid>
            })
        }</Grid>
    </Container>
}

export default App;
