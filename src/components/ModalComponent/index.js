import React, { useState } from "react"
import ReactModal from "react-modal"
import s from "./modal.module.css"

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#e4e4e4",
  },
  overlay: {
    zIndex: 9999,
  },
}

const bookies = {
  BET365: {
    label: "Bet365",
    className: "b365",
    url: (meetingID, outcomeID, eventID, odds) => `https://www.bet365.com/dl/sportsbookredirect?affiliate=365_00929318&bs=${(eventID) ? eventID : 'xxx'}-${(outcomeID) ? outcomeID : 'xxx'}~${(odds) ? odds : 'xxx'}&bet=1`,
  },
  SURREY: {
    label: "SkyBet",
    className: "sky",
    url: (meetingID, outcomeID, eventID, odds) => `http://m.skybet.com/go/event/${(eventID) ? eventID : 'xxx'}/bet?sels=${(outcomeID) ? outcomeID : 'xxx'}&a=30665`,
  },
  BETFAIR: {
    label: "Betfair",
    className: "bf",
    url: (meetingID, outcomeID, eventID, odds) => `https://www.betfair.com/sport/home/?modules=betslip&action=addAffiliateSelections&bssId=${(outcomeID) ? outcomeID : 'xxx'}&bsmId=${(meetingID) ? meetingID : 'xxx'}&pid=3707831&bid=10793`,
  },
  PADDYPOWER: {
    label: "PaddyPower",
    className: "pp",
    url: (meetingID, outcomeID, eventID, odds) => `https://media.paddypower.com/redirect.aspx?pid=12761567&bid=7125&redirectURL=https://www.paddypower.com/?action=addLegs&leg=${(meetingID) ? meetingID : 'xxx'}|${(outcomeID) ? outcomeID : 'xxx'}|SIMPLE_SELECTION|`,
  },
  WH_OXI: {
    label: "William Hill",
    className: "wh",
    url: (meetingID, outcomeID, eventID, odds) => `http://sports.williamhill.com/bet/EN/addtoslip?action=BuildSlip&price=y&ew=n&sel=${(outcomeID) ? outcomeID : 'xxx'}&ustake=5&url=http://sports.williamhill.com/bet/en/betting/e/${(eventID) ? eventID : 'xxx'}`,
  },
  LADB: {
    label: "Ladbrokes",
    className: "ladb",
    url: (meetingID, outcomeID, eventID, odds) => `https://betslip.ladbrokes.com/RemoteBetslip/bets/betslip.html?selections=${(outcomeID) ? outcomeID : 'xxx'}&aff-link=https://partners.ladbrokes.com/C.ashx?btag=718840&affid=104300&siteid=718840&adid=936&c=`,
  },
  CORAL: {
    label: "Coral",
    className: "coral",
    url: (meetingID, outcomeID, eventID, odds) => `https://sports.coral.co.uk/betslip/add/${(outcomeID) ? outcomeID : 'xxx'}?&id=N&member=incomeaccess&profile=1sbxm10000&creferer=BTAG:8113`,
  },
  BETWAY: {
    label: "Betway",
    className: "bway",
    url: (meetingID, outcomeID, eventID, odds) => `https://sports.betway.com/outcomes/${(outcomeID) ? outcomeID : 'xxx'}?s=bw39549&a=affiliate_id`,
  },
  UNIBET: {
    label: "Unibet",
    className: "unibet",
    url: (meetingID, outcomeID, eventID, odds) => `https://www.unibet.co.uk/racing#/event/${(eventID) ? eventID : 'xxx'}?pid=31476271&bid=29335`,
  },
  BOLEYSPORTS: {
    label: "Boylesports",
    className: "boyle",
    url: (meetingID, outcomeID, eventID, odds) => `https://www.boylesports.com/betting/`,
  },
  RB: {
    label: "Racebets",
    className: "rb",
    url: (meetingID, outcomeID, eventID, odds) => `https://www.racebets.com/en/horse-racing/`,
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
        <div className={s.modal_container}>
          <div className={s.modal_content}>
            <button
              onClick={() => {
                setModal(prevState => {
                  return {
                    ...prevState,
                    runner: null,
                    open: false,
                  }
                })
              }}
            >
              Close
            </button>
            <h3 className={s.modal_horse}>{modal.runner ? modal.runner.horse_name : null}</h3>
            <div className={s.odds_header}>
              <div>Bookmaker</div>
              <div>Price</div>
              <div>E.W. Terms</div>
            </div>
            <div className={s.odds_container}>
              

                {Object.entries(bookies).map(([key, value]) => {
                  console.log(value);
                  return (
                    <div className={s.odds_compare}>
                      <div className={s.bookie_name}>{value.label}</div>
                        <div className={s.price}>
                          <div className={s[value.className]}>
                            <a target="_blank">33/1</a>
                          </div>
                        </div>
                      <div className="ew">33/1</div>
                    </div>
                  )
                })}


              
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
  )
}

export default Modal
