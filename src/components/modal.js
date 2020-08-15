import React, { forwardRef, useImperativeHandle } from "react"
import modalStyles from "./modal.module.css"
import Close from "../images/close.svg"

const Modal = forwardRef((props, ref) => {
  const [display, setDisplay] = React.useState(false)

  useImperativeHandle(ref, () => {
    return {
      openModal: () => openModal(),
      closeModal: () => closeModal(),
    }
  })

  const openModal = () => {
    setDisplay(true)
  }

  const closeModal = () => {
    setDisplay(false)
  }

  if (display) {
    return (
      <div className={modalStyles.modalWrapper}>
        {/* <div onClick={closeModal} className={modalStyles.modalBackdrop}/> */}
        <div
          className={modalStyles.modalBox}
          onMouseEnter={() => {
            openModal()
          }}
        >
          <img
            src={Close}
            onClick={() => {
              closeModal()
              props.deleteSubMenu()
            }}
          />
          {props.children}
        </div>
      </div>
    )
  }
  return null
})

export default Modal
