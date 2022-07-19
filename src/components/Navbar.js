import './Navbar.css'
import { useState } from 'react'
import {login, logout} from '../assets/js/near/utils'
import { AddName } from './AddName'
import { Modal } from './Modal'

export function Navbar({useNamesArray}) {
  
  const [modalOpen, setModalOpen] = useState(false);
  
  if(!window.walletConnection.isSignedIn()) {
    return (
      <>
        <div className="nav__menu">
          <div className="nav__list">

            <div 
            onClick={()=>{setModalOpen(true)}}className="nav__item">
              <div className="nav__item_wrapper">
                <i className='bx bx-info-circle nav__icon' />
                <span>Info</span>
              </div>
            </div>

            <div 
            onClick={login} 
            className="nav__item">
              <div className="nav__item_wrapper">
                <i className='bx bxs-user-account nav__icon' />
                <span>Login</span>
              </div>
            </div>

          </div>
        </div>

      {modalOpen && <Modal setModalOpen={setModalOpen}/>}
      </>
    )
  }

  return (
    <>
      <div className="nav__menu">
        <div className="nav__list">

          <AddName useNamesArray={useNamesArray} />

          <div 
          onClick={()=>{setModalOpen(true)}}className="nav__item">
            <div className="nav__item_wrapper">
              <i className='bx bx-info-circle nav__icon' />
              <span>Info</span>
            </div>
          </div>

          <div 
          onClick={logout} 
          className="nav__item">
            <div className="nav__item_wrapper">
              <i className='bx bxs-user-account nav__icon' />
              <span>Logout</span>
            </div>
          </div>

        </div>
      </div>

      {modalOpen && <Modal setModalOpen={setModalOpen}/>}

    </>
  );


}