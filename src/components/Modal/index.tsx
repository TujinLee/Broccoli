import React from 'react'
import { createPortal } from 'react-dom'
import './index.less'

interface ModalProps {
    children: React.ReactElement
    visible: boolean
    closeModal: () => void
}

export default React.memo(function Modal({
    children,
    visible,
    closeModal
}: ModalProps) {

    const handleClick = (event: React.SyntheticEvent) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    }

    const modalDom = createPortal(
        <div className='modal' onClick={handleClick}>
            <div className='container'>
                {children}
            </div>
        </div>,
        document.body
    )

    return (
        <div>{visible && modalDom}</div>
    )
})