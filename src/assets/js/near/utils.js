import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
import getConfig from './config'
import {parseNearAmount} from "near-api-js/lib/utils/format";

const nearConfig = getConfig('development')

const GAS = 100000000000000;
const FEE = "1";


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

export async function addName(name, color){
  let response = await window.contract.addName({text: name, color: color}, GAS, parseNearAmount(FEE))
  return response
}

export async function getNames(){
  let response = await window.contract.getNames()
  return response
}

export function clear(){
  window.contract.clear()
}


