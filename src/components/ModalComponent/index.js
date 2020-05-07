import React, {useState} from 'react';
import ReactModal from 'react-modal'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    zIndex                : 9999,
  }
};

const Modal = ({ modal, setModal }) => {
  
  return (
    <div>
      <ReactModal
        isOpen={modal.open}
        contentLabel="Example Modal"
        style={customStyles}
        ariaHideApp={false}
      >
          <p>{modal.runner ? modal.runner.horse_name : null}</p>
          <button onClick={() => {
            setModal(prevState => {
              return {
                ...prevState,
                runner: null,
                open: false,
              }
            })
          }}>Close</button>
      </ReactModal>
    </div>
  )
}

export default Modal