import React, {useState} from 'react';
import EditableSpan from "../EditableSpan/EditableSpan";
import {TaskType} from "../reducers/tasksReducer";
import {FilterType, SortType} from "../reducers/todolistReducer";
import AddForm from "../AddForm/AddForm";
import Checkbox from "../Checkbox/Checkbox";
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DeleteIcon from '@mui/icons-material/Delete';

type TodolistType = {
    todoId: string
    // todolist title
    title: string
    changeTodoTitle: (todoId: string, newTodoTitle: string) => void
    // remove todolist
    removeTodolist: (todoId: string) => void
    // todolist filter
    filter: FilterType
    sortFilter: SortType
    changeSortFilter: (todoId: string, sortFilter: SortType) => void
    changeFilter: (todoId: string, filter: FilterType) => void
    // props for tasks
    addTask: (todoId: string, newTaskTitle: string) => void
    deleteTask: (todoId: string, taskId: string) => void
    tasks: TaskType[]
    changeTaskStatus: (todoId: string, taskId: string, checked: boolean) => void
    changeTaskTitle: (todoId: string, taskId: string, newTaskTitle: string) => void
}

const Todolist = (props: TodolistType) => {
    // callbacks for buttons
    const setFilter = (filter: FilterType) => {
        return () => props.changeFilter(props.todoId, filter)
    }
    const setSortFilter = (sortFilter: SortType) => {
        return () => props.changeSortFilter(props.todoId, sortFilter)
    }
    // local state for show/hide tasks
    const [toggle, setToggle] = useState(false)

    return (
        <div>
            <h3>
                <EditableSpan text={props.title}
                              onChange={(newTodoTitle) => props.changeTodoTitle(props.todoId, newTodoTitle)}/>
                <IconButton aria-label="arrow" size="small" onClick={() => setToggle(!toggle)}>
                    {toggle? <ArrowDropDownIcon /> : <ArrowDropUpIcon/>}
                </IconButton>
                <IconButton aria-label="delete" size="small" onClick={() => props.removeTodolist(props.todoId)}>
                    <DeleteIcon fontSize={"small"}/>
                </IconButton>
            </h3>
            {/*form that adds tasks*/}
            {toggle ? <></> : <>
                <AddForm buttonName={'Add task'} addItem={(item: string) => props.addTask(props.todoId, item)}/>

                <div>
                    {props.tasks.length ?
                        props.tasks.map(t => {

                            const changeTaskTitle = (newTaskTitle: string) => {
                                props.changeTaskTitle(props.todoId, t.taskId, newTaskTitle)
                            }

                            const changeTaskStatus = (checked: boolean) => {
                                props.changeTaskStatus(props.todoId, t.taskId, checked)
                            }

                            const deleteTask = () => {
                                props.deleteTask(props.todoId, t.taskId)
                            }

                            return <div key={t.taskId}>
                                <Checkbox checked={t.isDone} onChange={changeTaskStatus}/>
                                <EditableSpan text={t.taskTitle} onChange={changeTaskTitle}/>
                                <IconButton aria-label="delete" size="small" onClick={deleteTask}>
                                    <DeleteIcon sx={{ fontSize: 15}}/>
                                </IconButton>
                            </div>
                        }) : <div>Your list is empty!</div>}
                    {/*Buttons field*/}
                    <div>
                        <ButtonGroup size="small" aria-label="small button group" style={{padding:'20px'}}>
                            <Button variant={props.filter === 'all' ? "contained" : "outlined"}
                                    onClick={setFilter('all')}>All</Button>
                            <Button variant={props.filter === 'active' ? "contained" : "outlined"}
                                    onClick={setFilter('active')}>Active</Button>
                            <Button variant={props.filter === 'completed' ? "contained" : "outlined"}
                                    onClick={setFilter('completed')}>Completed</Button>
                        </ButtonGroup>
                    </div>
                    <div>
                        <ButtonGroup size="small" aria-label="small button group"  style={{padding:'20px'}}>
                            <Button variant={props.sortFilter === 'default' ? "contained" : "outlined"}
                                onClick={setSortFilter("default")}>Default</Button>
                            <Button variant={props.sortFilter === 'reverse' ? "contained" : "outlined"}
                                onClick={setSortFilter("reverse")}>Reversed</Button>
                            <Button variant={props.sortFilter === 'a-z' ? "contained" : "outlined"}
                                onClick={setSortFilter("a-z")}>A-Z</Button>
                            <Button variant={props.sortFilter === 'z-a' ? "contained" : "outlined"}
                                onClick={setSortFilter("z-a")}>Z-A</Button>
                        </ButtonGroup>
                    </div>
                </div>
            </>}
        </div>
    );
};

export default Todolist;