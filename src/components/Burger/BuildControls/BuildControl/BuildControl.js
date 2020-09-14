import React from 'react';
import classes from './BuildControl.css'

const buildControl = (props) => (
    <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button 
                className={classes.Less} 
                onClick={props.lessBtn} 
                disabled={props.disabled}>
                    Less
            </button>
            <button className={classes.More} onClick={props.moreBtn}>More</button>
    </div>
);

export default buildControl;