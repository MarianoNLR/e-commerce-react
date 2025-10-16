import { PropTypes } from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import './SimpleToastAlert.css'
import { useLocation } from 'react-router-dom';

export function SimpleToastAlert({ message, variant = 'default', duration = 3000, onClose}) {

    // useEffect(() => {
    //     console.log(toastTimer.current);
    //     if (toastTimer.current) {
    //         console.log("xd")
    //         clearTimeout(toastTimer.current);
    //         onClose(false);
    //     }
    //     toastTimer.current = setTimeout(() => {
    //         // Logic to hide the toast after duration
    //         console.log('Toast duration ended');
    //         onClose(false);
    //     }, duration);

    //     // return () => clearTimeout(toastTimer.current);
    // }, [duration, onClose]);

    return (
        <div className={`toast-alert-container ${variant}`}>
            <p className="toast-alert-message">{message}</p>
        </div>
    );
}

SimpleToastAlert.propTypes = {
    message: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(['default', 'success', 'error']),
    duration: PropTypes.number,
    onClose: PropTypes.func,
};
