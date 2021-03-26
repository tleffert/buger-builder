import React from 'react';

import styles from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    switch (props.elementType) {
        case ('input'): {
            inputElement = <input
                className={styles.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.change}
            />;
            break;
        }
        case ('teaxtarea'): {
            inputElement = <textarea
                className={styles.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.change}
            />
            break;
        }
        case ('select'): {
            inputElement = (
                <select className={styles.InputElement} value={props.value}
                    onChange={props.change}
                >
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            );

            break;
        }
        default: {
            inputElement = <input
                className={styles.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.change}
            />;
        }

    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};


export default input;
