import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from "../Button/Button";

type AddFormType = {
    itemName: string
    addItem: (item: string) => void
}

const AddForm = (props: AddFormType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const addItem = () => {
        if (title.trim()) {
            props.addItem(title)
            setError(false)
            setTitle('')
        } else {
            setError(true)
        }
    }
    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
        }
    }

    return (
        <div>
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onEnter}
                placeholder={error ? 'Error!' : 'Enter your text...'}
            />
            <Button name={props.itemName} onClick={addItem} disabled={error}/>
        </div>
    );
};

export default AddForm;