import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
import getConfig from './config'

const nearConfig = getConfig('development')

export async function initContract() {
  const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig))

  window.walletConnection = new WalletConnection(near)

  window.accountId = window.walletConnection.getAccountId()

  window.contract = await new Contract(window.walletConnection.account(), nearConfig.contractName, {
    viewMethods: ['getNames'],
    changeMethods: ['addName', 'clear'],
  })
}

export function logout() {
  window.walletConnection.signOut()
  window.location.replace(window.location.origin + window.location.pathname)
}

export function login() {
  window.walletConnection.requestSignIn(nearConfig.contractName)
}

export async function addName(name){
  let response = await window.contract.addName({
    args:{name: name}
  })
  return response
}

export async function getNames(){
  let response = await window.contract.getNames()
  return response
}

export function clear(){
  window.contract.clear()
}


