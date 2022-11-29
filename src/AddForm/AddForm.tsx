import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';

type AddFormType = {
    buttonName: string
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
            {/*<input*/}
            {/*    value={title}*/}
            {/*    onChange={onChangeHandler}*/}
            {/*    onKeyDown={onEnter}*/}
            {/*    placeholder={error ? 'Error!' : 'Enter your text...'}*/}
            {/*/>*/}

            <TextField
                label={error ? 'Error!' : 'Enter your text'}
                variant="outlined"
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onEnter}
                error={error}
                style={{display: 'inline-block', maxWidth: '180px',marginBottom: '10px'}}
                size={'small'}
            />
            <Button style={{maxHeight: '40px', minHeight: '40px'}} variant={'outlined'} onClick={addItem} disabled={error}
                    endIcon={<AddIcon/>}>{props.buttonName}</Button>
        </div>
    );
};

export default AddForm;