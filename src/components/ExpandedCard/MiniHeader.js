import React from 'react'
import './MiniHeader.css'

export default function MiniHeader(props) {
    return(
        <div className="mini-header">
            <h5>{props.text}</h5>
        </div>
    )
}