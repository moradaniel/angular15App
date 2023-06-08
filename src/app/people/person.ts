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

// https://www.barbarianmeetscoding.com/blog/getting-started-with-angular-2-step-by-step-5-forms-and-validation


import {Role} from "./role";

export interface   Person {
  id: number;
  name: string;
  roles: Role[] | null;

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
  roles: Role[] | null = null;

  public constructor(
    fields?: Person /*{
      id?: number,
      name?: string,
      profile?:Profile
    }*/) {
    if (fields) {
      this.id = fields.id || this.id;
      this.name = fields.name || this.name;
      this.roles = fields.roles || this.roles;
      //this.taxRate = fields.taxRate || this.taxRate;
     /* this.address = fields.address || this.address;
      this.age = fields.age || this.age;*/
    }
  }


}



