import React from 'react';

type ButtonType = {
    name: string
    onClick: ()=>void
    disabled?: boolean
}

const Button = (props: ButtonType) => {
    return <button onClick={props.onClick} disabled={props.disabled}>{props.name}</button>
};

export default Button;