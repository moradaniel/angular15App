/*export interface Person{
    id: number;
    name: string;
    weight: number;
    height: number;
    // it is optional because I know it
    // doesn't exist in the API that we will
    // consume in the next exercise :)
    profession?: string;
}*/


import {Profile} from "./profile";

export interface   Person {
  id: number;
  name: string;
  profile: Profile | null;

  //taxRate: number;

    //weight: number;
    //height: number;
    // it is optional because I know it
    // doesn't exist in the API that we will
    // consume in the next exercise :)
    //profession?: string;
}

export class PersonImpl implements Person {
  /*public id: number = 0;
  public name: string = "default";
  public address: string = "default";
  public age: number = 0;*/

  id!: number;
  name!: string;
  //taxRate!: number;
  //technologies: Technology[];
  profile: Profile | null = null;

  public constructor(
    fields?: {
      id?: number,
      name?: string,
      profile?:Profile
      /*taxRate?:number,
      address?: string,
      age?: number*/
    }) {
    if (fields) {
      this.id = fields.id || this.id;
      this.name = fields.name || this.name;
      this.profile = fields.profile || this.profile;
      //this.taxRate = fields.taxRate || this.taxRate;
     /* this.address = fields.address || this.address;
      this.age = fields.age || this.age;*/
    }
  }


}



