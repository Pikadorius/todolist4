import React from 'react';
import EditableSpan from "../EditableSpan/EditableSpan";
import {TaskType} from "../reducers/tasksReducer";
import {FilterType} from "../reducers/todolistReducer";
import AddForm from "../AddForm/AddForm";
import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";

type TodolistType = {
    todoId: string
    // todolist title
    title: string
    changeTodoTitle: (todoId: string, newTodoTitle: string) => void
    // remove todolist
    removeTodolist: (todoId: string) => void
    // todolist filter
    filter: FilterType
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
    const setAll = () => {
        return props.changeFilter(props.todoId, 'all')
    }
    const setActive = () => {
        return props.changeFilter(props.todoId, 'active')
    }
    const setCompleted = () => {
        return props.changeFilter(props.todoId, 'completed')
    }


    return (
        <div>
            <h3>
                <EditableSpan text={props.title}
                              onChange={(newTodoTitle) => props.changeTodoTitle(props.todoId, newTodoTitle)}/>
                <Button name={'X'} onClick={() => props.removeTodolist(props.todoId)}/>
            </h3>
            {/*form that adds tasks*/}
            <AddForm itemName={'add task'} addItem={(item: string) => props.addTask(props.todoId, item)}/>

            <div>
                props.tasks.length ?
                {props.tasks.map(t => {

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
                        <Button name={'x'} onClick={deleteTask}/>
                    </div>
                })}
                {/*Buttons field*/}
                <div>
                    <Button name={'all'} onClick={setAll}/>
                    <Button name={'active'} onClick={setActive}/>
                    <Button name={'completed'} onClick={setCompleted}/>
                </div>
            </div>
        </div>
    );
};

export default Todolist;