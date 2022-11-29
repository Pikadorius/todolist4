import React, {ChangeEvent, useState} from 'react';
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

    return (
        <div>
            <input
                value={title}
                onChange={onChangeHandler}
                placeholder={error ? 'Error!' : 'Enter your text...'}
            />
            <Button name={props.itemName} onClick={addItem}/>
        </div>
    );
};

export default AddForm;