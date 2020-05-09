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
  },
  overlay: {
    zIndex: 9999,
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


          <div className=".odds_container">
            <div className="odds_compare">
              <div className="bookie_name">bookie_name</div>
              <div className="price">
                <div
                  className="">
                    <a target="_blank">33/1</a>
                  </div>          
              </div>
              <div className="ew">33/1</div>
              <div className="red_sign"></div>
            </div>
          </div>

      </ReactModal>
    </div>
  )
}

export default Modal