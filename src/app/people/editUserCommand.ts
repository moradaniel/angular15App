//import {Profile} from "./profile";

export class EditUserCommand {
  id: number;
  name: string;
  //profile: Profile | null;
  roleIds: Array<number> | null;

  constructor(id:number, name: string, roleIds:number[]) {
    this.id = id;
    this.name = name;
    this.roleIds = roleIds;
  }

  //taxRate: number;

  //weight: number;
  //height: number;
  // it is optional because I know it
  // doesn't exist in the API that we will
  // consume in the next exercise :)
  //profession?: string;
}
