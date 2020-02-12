import React from 'react'
import './MiniSection.css'

export default function MiniSection(props) {
    return(
        <>
        <div className="mini-header">
            <ul>
                {props.info.map(el => (
                    <li>{el}</li>
                ))}
            </ul>
        </div>
        <div className="mini-header">
            <h5>{props.text}</h5>
        </div>
        </>
    )
}