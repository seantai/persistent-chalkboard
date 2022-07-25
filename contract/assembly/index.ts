import { context, ContractPromiseBatch, u128 } from "near-sdk-as";
import {listedNames, Name} from "./model";

const names = new Array<Name>();

const contractOwner = 'persistentchalkboard.testnet';
const FEE = "0.1";

///////////////////////////////////////////

/**
 * Function to add a sender/name pair to a persistent unordered map, and return map. 
 * @param name - user input name object
 */

export function addName(name: Name): Array<Name> {

  assert(name.text.length > 0, "name can't be blank");
  assert(name.text.length < 14, "name must be less than 14 characters");

  let storedName = listedNames.get(context.sender);
  if (storedName !== null) {
      throw new Error(`Name with the user id ${context.sender} already exists`);
  }

  if (u128.from(FEE).toString() != context.attachedDeposit.toString()) {
      throw new Error("attached deposit should equal to the " +FEE+ " NEAR.");
  }

  ContractPromiseBatch.create(contractOwner).transfer(context.attachedDeposit);

  listedNames.set(context.sender, Name.fromPayload(name));

  getNames()

  return names;
}

/**
 * Function to retrieve all names, the values of the map, in this case.
 * @returns an array of names
 */

export function getNames(): Array<Name> {

  const accountIds = listedNames.keys();

  accountIds.forEach(accountId => {
    const value = listedNames.getSome(accountId)
    names.push(value)
  })
  
  return names;
}

/**
 * Function to retrieve all users who successfully called addName().
 * @returns an array of users
 */

 export function getAccountId(): Array<string>{

  const accountIds = listedNames.keys();
  
  return accountIds;
}

/**
 * Function to clear all entries.
 */

 export function clear(): void {

  assert(contractOwner == context.sender, "can only be called by contractOwner");

  listedNames.clear();

}