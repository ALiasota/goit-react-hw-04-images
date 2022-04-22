import React, { useEffect } from 'react';
import { createPortal } from "react-dom";
import styles from './Modal.module.css';
import propTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({largeImg, onClose}) => {    
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    })
    
    const handleKeyDown = e => {
        if(e.code === 'Escape') {
            onClose();
        }
    }

    const handleBackdropClick = e => {
        if (e.currentTarget === e.target ) {
            onClose();
        }
    }

        return createPortal(
            <div className={styles.overlay} onClick={handleBackdropClick}>
                <div className={styles.modal} >
                    <img src={largeImg} alt="" />
                </div>
            </div>,
            modalRoot
        )

}

Modal.propTypes = {
    onClose: propTypes.func.isRequired,
    largeImg: propTypes.string.isRequired,
           
  };

  export default Modal;