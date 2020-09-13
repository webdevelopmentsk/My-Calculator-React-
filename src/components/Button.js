import React from 'react';
import './Button.css'

const Button = ({value,type,onClickTask}) =>{
    return <button className = {type} onClick={e => onClickTask(type,value)} >{value}</button>
};

export default Button;
