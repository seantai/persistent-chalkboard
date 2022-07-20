import { PersistentUnorderedMap } from "near-sdk-as";

@nearBindgen
export class Name {
  text: string;
  color: string;

  public static fromPayload(payload: Name): Name {
    const name = new Name();

    name.text = payload.text;
    name.color = payload.color ? payload.color : '#000000';
    return name;
  }
}

export const listedNames = new PersistentUnorderedMap<string, Name>("NAME");
