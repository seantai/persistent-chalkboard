import './Modal.css'
import { useState } from 'react'
import {ModalItem} from './ModalItem'

export const Modal = ({setModalOpen}) =>{

  const [description, setDescription] = useState('')

  const handleModalClick = (e) => {
    const isOutside = !e.target.closest('.modal__content')
    if(isOutside){
      setModalOpen(false)
    } else return;
  }

  return (
    <>
    <div className="modal" onClick={handleModalClick}>
      <div className={`modal__container`} id="modal-container">
        <div className="modal__content">
          <div className="modal__content_inner">
          <div className="modal__close close-modal" title="Close" 
          onClick={()=>{setModalOpen(false)}}>
            <i className='bx bx-x'></i>
          </div>
          <br/>
          <ModalItem 
            title="What is this?"
            passingEventHandler={()=>{setDescription('what')}}
            isOpen={description === 'what'}
            >
            <p>A blockchain chalkboard that will never get erased.</p>
            <p>Login with your NEAR testnet account, and type your name in to save.</p>
            <p>Built with {' '}
              <a href="https://near.org" target="_blank" rel="noreferrer">NEAR</a>{', '}
              <a href="https://docs.pmnd.rs/react-three-fiber/getting-started/introduction" target="_blank" rel="noreferrer">React Three Fiber</a>{', and '}
              <a href="https://www.assemblyscript.org/" target="_blank" rel="noreferrer">AssemblyScript</a>{'.'}
            </p>
          </ModalItem>
          <ModalItem 
            title="Where can I get a free testnet account?"
            passingEventHandler={()=>{setDescription('whereTest')}}
            isOpen={description === 'whereTest'}
            >
            <a href='https://wallet.testnet.near.org/
            ' target="_blank" rel="noreferrer">https://wallet.testnet.near.org/</a>
            {' to create a new wallet filled with 200 Ⓝ'}
          </ModalItem>
          <ModalItem 
            title="Credits"
            passingEventHandler={()=>{setDescription('credits')}}
            isOpen={description === 'credits'}
            >
             <ul>
               <li>
                {'Code and Design by '}
                  <a href='https://tai.town/' target="_blank" rel="noreferrer">Sean Tai</a>
                </li>
               <li>
                  <a href='https://skfb.ly/ooxXt' target="_blank" rel="noreferrer">Chalkboard</a>
                  {` model by `}
                  <a href="https://sketchfab.com/chin4grci4" target="_blank" rel="noreferrer">House Doctor</a>
                </li>
              </ul>
          </ModalItem>
          </div>
        </div>
      </div>
    </div>
    
    </>
  )
}