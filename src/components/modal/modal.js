import React, {useState} from 'react';
import ReactModal from 'react-modal'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const Modal = ({ modal, setModal }) => {
  

  let handleAfterOpenFunc = () => {}

  let handleAfterCloseFunc= () => {}
  let handleRequestCloseFunc= () => {}

  return (
    <div>
      <ReactModal
        isOpen={modal.open}
        contentLabel="Example Modal"
        style={customStyles}
        ariaHideApp={false}
      // onAfterOpen={handleAfterOpenFunc}
      // onAfterClose={handleAfterCloseFunc}
      // onRequestClose={handleRequestCloseFunc}
      // closeTimeoutMS={0}
      // portalClassName={"ReactModalPortal"}
      // overlayClassName={"ReactModal__Overlay"}
      // id={"modal"}
      // className={"ReactModal__Content"}
      // bodyOpenClassName={"ReactModal__Body--open"}
      // htmlOpenClassName={"ReactModal__Html--open"}
      // shouldFocusAfterRender={true}
      // shouldCloseOnOverlayClick={true}
      // shouldCloseOnEsc={true}
      // shouldReturnFocusAfterClose={true}
      // parentSelector={() => document.body}
      // data={{ background: "white" }}
      // overlayRef={node => (this.overlayRef = node)}
      // contentRef={node => (this.overlayRef = node)}
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