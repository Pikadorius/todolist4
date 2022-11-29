import React from 'react';
import s from './Button.module.css'

type ButtonType = {
    name: string
    onClick: ()=>void
    disabled?: boolean
    isActive?: boolean
}

const Button = (props: ButtonType) => {

    const btnFinalClassName = props.isActive? `${s.btn} ${s.btnActive}` : s.btn
    return <button className={btnFinalClassName} onClick={props.onClick} disabled={props.disabled}>{props.name}</button>
};

export default Button;