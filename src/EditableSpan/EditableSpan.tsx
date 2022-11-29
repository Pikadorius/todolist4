import React, {ChangeEvent, useState,KeyboardEvent} from 'react';

type EditableSpanType = {
    text: string
    onChange: (text: string) => void
}

const EditableSpan = (props: EditableSpanType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.text)
    const [error, setError] = useState(false)

    const setEditModeOn = () => setEditMode(true)
    const setEditModeOff = () => setEditMode(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const onBlurHandler = () => {
        if (title.trim()) {
            props.onChange(title)
            setError(false)
            setEditModeOff()
        } else {
            setError(true)
        }
    }

    const onEnter = (e:KeyboardEvent<HTMLInputElement>) => {
        if(e.key==='Enter') {
            onBlurHandler()
        }
    }

    return editMode
        ? <input
            placeholder={error? 'Error!':'Enter your text...'}
            value={title}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            onKeyDown={onEnter}
            autoFocus/>
        : <span
            onDoubleClick={setEditModeOn}>{props.text}</span>
};

export default EditableSpan;