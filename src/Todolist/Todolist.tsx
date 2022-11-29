import React, {useState} from 'react';
import EditableSpan from "../EditableSpan/EditableSpan";
import {TaskType} from "../reducers/tasksReducer";
import {FilterType, SortType} from "../reducers/todolistReducer";
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
                <Button name={'X'} onClick={() => props.removeTodolist(props.todoId)}/>
                <Button name={toggle ? 'show' : 'hide'} onClick={() => setToggle(!toggle)} isActive={toggle}/>
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
                                <Button name={'x'} onClick={deleteTask}/>
                            </div>
                        }) : <div>Your list is empty!</div>}
                    {/*Buttons field*/}
                    <div>
                        <Button name={'all'} onClick={setFilter('all')} isActive={props.filter === 'all'}/>
                        <Button name={'active'} onClick={setFilter('active')} isActive={props.filter === 'active'}/>
                        <Button name={'completed'} onClick={setFilter('completed')}
                                isActive={props.filter === 'completed'}/>
                    </div>
                    <div>
                        <Button name={'Default'} onClick={setSortFilter("default")}
                                isActive={props.sortFilter === 'default'}/>
                        <Button name={'Reverse'} onClick={setSortFilter("reverse")}
                                isActive={props.sortFilter === 'reverse'}/>
                        <Button name={'A-Z'} onClick={setSortFilter("a-z")} isActive={props.sortFilter === 'a-z'}/>
                        <Button name={'Z-A'} onClick={setSortFilter("z-a")} isActive={props.sortFilter === 'z-a'}/>
                    </div>
                </div>
            </>}
        </div>
    );
};

export default Todolist;