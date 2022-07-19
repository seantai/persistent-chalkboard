import { context, PersistentUnorderedMap } from "near-sdk-as";

const namesMap = new PersistentUnorderedMap<string, string>("names")
const names = new Array<string>();
const contractOwner = 'persistentchalkboard.testnet'

///////////////////////////////////////////

/**
 * Function to add a sender/name pair to a persistent unordered map, and return map. 
 * @param name - user input name
 */

export function addName(name: string): Array<string> {

  assert(name.length > 0, "name can't be blank");
  assert(name.length < 14, "name must be less than 14 characters")

  namesMap.set(context.sender, name)
  
  getNames()

  return names;
}

/**
 * Function to retrieve all names, the values of the map, in this case.
 * @returns an array of names
 */

export function getNames(): Array<string> {

  const accountIds = namesMap.keys();

  accountIds.forEach(accountId => {
    const value = namesMap.getSome(accountId)
    names.push(value)
  })
  
  return names;
}

/**
 * Function to retrieve all users who successfully called addName().
 * @returns an array of users
 */

 export function getAccountId(): Array<string>{

  const accountIds = namesMap.keys();
  
  return accountIds;
}

/**
 * Function to clear all entries.
 */

 export function clear(): void {

  assert(contractOwner == context.sender, "can only be called by contractOwner");

  namesMap.clear();

}