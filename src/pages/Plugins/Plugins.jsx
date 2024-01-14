import React from 'react'
import './Plugins.scss'
import facebook from 'assets/images/png/facebook.png'
import googleSheets from 'assets/images/png/googleSheets.png'
import PluginModal from 'components/Modal/components/PluginModal/PluginModal'
import Modal from "components/Modal/Modal"
import { useModal } from "hooks/useModal";
import call from 'assets/images/svg/pluginCall.svg'
function Plugins() {
  const { isOpen, handleClose, handleOpen } = useModal();
  
  return (
    <div className='plugins'>
      <p className='plugins-title'>Plugins</p>
      <div className='plugins__content'>
        <div className='plugins__info'>
            <p className='plugins__info-text'>Installed plugins</p>
            <div className='plugins__info-card'>
              <img className='plugins__info-img' src={facebook} alt="" />
              <button className='plugins__info-btn'>Settings</button>
            </div>
            <div className='plugins__info-subcard'>
              <img className='plugins__info-img' src={googleSheets} alt="" />
              <button className='plugins__info-btn'>Settings</button>
            </div>
        </div>
        <div className='plugins__cards'>
            <div className='plugins__content-card'>
              <img className='plugins__info-img' src={googleSheets} alt="" />
              <button className='plugins__info-btn' onClick={handleOpen}>+ Add plugin</button>
            </div>
            <div className='plugins__content-card'>
              <img className='plugins__info-img' src={googleSheets} alt="" />
              <button className='plugins__info-btn' onClick={handleOpen}>+ Add plugin</button>
            </div>
            <div className='plugins__content-card'>
              <img className='plugins__info-img' src={googleSheets} alt="" />
              <button className='plugins__info-btn' onClick={handleOpen}>+ Add plugin</button>
            </div>
            <div className='plugins__content-card'>
              <img className='plugins__info-img' src={googleSheets} alt="" />
              <button className='plugins__info-btn' onClick={handleOpen}>+ Add plugin</button>
            </div>
            <div className='plugins__content-card'>
              <img className='plugins__info-img' src={googleSheets} alt="" />
              <button className='plugins__info-btn' onClick={handleOpen}>+ Add plugin</button>
            </div>
            <div className='plugins__content-card'>
              <img className='plugins__info-img' src={googleSheets} alt="" />
              <button className='plugins__info-btn' onClick={handleOpen}>+ Add plugin</button>
            </div>
            <div className='plugins__content-card'>
              <img className='plugins__info-img' src={googleSheets} alt="" />
              <button className='plugins__info-btn' onClick={handleOpen}>+ Add plugin</button>
            </div>
            <div className='plugins__content-card'>
              <img className='plugins__info-img' src={googleSheets} alt="" />
              <button className='plugins__info-btn' onClick={handleOpen}>+ Add plugin</button>
            </div>
            <div className='plugins__content-card'>
              <img className='plugins__info-img' src={googleSheets} alt="" />
              <button className='plugins__info-btn' onClick={handleOpen}>+ Add plugin</button>
            </div>
            <div className='plugins__content-card'>
              <img className='plugins__info-img' src={googleSheets} alt="" />
              <button className='plugins__info-btn' onClick={handleOpen}>+ Add plugin</button>
            </div>
            <div className='plugins__content-card'>
              <img className='plugins__info-img' src={googleSheets} alt="" />
              <button className='plugins__info-btn' onClick={handleOpen}>+ Add plugin</button>
            </div>
            <div className='plugins__content-card'>
              <img className='plugins__info-img' src={googleSheets} alt="" />
              <button className='plugins__info-btn' onClick={handleOpen}>+ Add plugin</button>
            </div>
            <div className='plugins__content-card'>
              <img className='plugins__info-img' src={googleSheets} alt="" />
              <button className='plugins__info-btn' onClick={handleOpen}>+ Add plugin</button>
            </div>
            <div className='plugins__content-card'>
              <img className='plugins__info-img' src={googleSheets} alt="" />
              <button className='plugins__info-btn' onClick={handleOpen}>+ Add plugin</button>
            </div>
            <div className='plugins__content-card'>
              <img className='plugins__info-img' src={googleSheets} alt="" />
              <button className='plugins__info-btn' onClick={handleOpen}>+ Add plugin</button>
            </div>
            <div className='plugins__content-card'>
              <img className='plugins__info-img' src={googleSheets} alt="" />
              <button className='plugins__info-btn' onClick={handleOpen}>+ Add plugin</button>
            </div>
            <div className='plugins__content-card'>
              <img className='plugins__info-img' src={googleSheets} alt="" />
              <button className='plugins__info-btn' onClick={handleOpen}>+ Add plugin</button>
            </div>
            <div className='plugins__content-card'>
              <img className='plugins__info-img' src={googleSheets} alt="" />
              <button className='plugins__info-btn' onClick={handleOpen}>+ Add plugin</button>
            </div>
            <div className='plugins__content-card'>
              <img className='plugins__info-img' src={googleSheets} alt="" />
              <button className='plugins__info-btn' onClick={handleOpen}>+ Add plugin</button>
            </div>
            <div className='plugins__content-card'>
              <img className='plugins__info-img' src={googleSheets} alt="" />
              <button className='plugins__info-btn' onClick={handleOpen}>+ Add plugin</button>
            </div>
            <div className='plugins__content-card'>
              <img className='plugins__info-img' src={googleSheets} alt="" />
              <button className='plugins__info-btn' onClick={handleOpen}>+ Add plugin</button>
            </div>
            <div className='plugins__content-card'>
              <img className='plugins__info-img' src={googleSheets} alt="" />
              <button className='plugins__info-btn' onClick={handleOpen}>+ Add plugin</button>
            </div>
            <div className='plugins__content-card'>
              <img className='plugins__info-img' src={googleSheets} alt="" />
              <button className='plugins__info-btn' onClick={handleOpen}>+ Add plugin</button>
            </div>
            <div className='plugins__content-card'>
              <img className='plugins__info-img' src={googleSheets} alt="" />
              <button className='plugins__info-btn' onClick={handleOpen}>+ Add plugin</button>
            </div>
            
        </div>
        <button className='plugins__call'>
          <img src={call} alt="" />
        </button>
      </div>

      <Modal isOpen={isOpen} size={700}
					toggle={() => { }}
					customClass="modal-test">
					<PluginModal handleClose={handleClose}/>
			</Modal>

    </div>
  )
}

export default Plugins