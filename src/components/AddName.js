import './Navbar.css'
import React, { useState } from 'react'
import {addName} from '../assets/js/near/utils'
import getConfig from '../assets/js/near/config'

export function AddName({useNamesArray}) {

  const setNamesArray = useNamesArray((state) => state.setNamesArray)

  const [placeholder, setPlaceholder] = useState('Add your name')
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [showNotification, setShowNotification] = useState(false)

  return (
    <>
      <form onSubmit={async event => {
        event.preventDefault()

        const { fieldset, name } = event.target.elements

        const newName = name.value

        fieldset.disabled = true

        try {

          const names = await addName(newName)

          

          setNamesArray(names)
          
        } catch (e) {
          alert(
            'Something went wrong! ' +
            'Maybe you need to sign out and back in? ' +
            'Check your browser console for more info.'
          )
          throw e
        } finally {
          fieldset.disabled = false
        }

        setPlaceholder(newName)

        setShowNotification(true)
        setTimeout(() => {
          setShowNotification(false)
        }, 15000)

      }}>

        <fieldset id="fieldset" className='nav__item'>
          <div style={{ display: 'flex' }}>
            <input
              autoComplete="off"
              id="name"
              onChange={e => setButtonDisabled(e.target.value === placeholder)}
              style={{ flex: 1 }}
              placeholder={placeholder}
            />
            <button
              disabled={buttonDisabled}
              style={{ borderRadius: '0 5px 5px 0' }}
            >
              Save
            </button>
          </div>
        </fieldset>
      </form>

      {showNotification && <Notification newName={placeholder}/>}
    </>
  );
}

function Notification({newName}) {
  const { networkId } = getConfig(process.env.NODE_ENV || 'development')
  const urlPrefix = `https://explorer.${networkId}.near.org/accounts`

  return (
    <aside>
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.accountId}`}>
        {window.accountId}
      </a>
      {' '}
      added: <b>{newName}</b> to contract:
      {' '}
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.contract.contractId}`}>
        {window.contract.contractId}
      </a>
      <footer>
        <div>✔ Succeeded</div>
        <div>Just now</div>
      </footer>
    </aside>
  )
}