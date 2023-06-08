import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Person, PersonImpl} from './person';
import {PeopleService} from './people.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {of} from "rxjs";

import {EditUserCommand} from "./editUserCommand";
import {RoleService} from "./role.service";
import {Role} from "./role";


/**
 * 2017 - Building Web Apps with Spring 5 and Angular
 * Reactive forms
 *
 * https://www.concretepage.com/angular/angular-select-option-reactive-form
 */
@Component({
  selector: 'people-edit',
  templateUrl: './people-edit.component.html'
  , providers: [PeopleService, RoleService]
})
export class PeopleEditComponent implements OnInit {

  @Input() person!: Person;


  @Output() onEdited = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  allRoles: Role[] | null = null;

  errorMessage = '';

  // -------------------
  formErrors: { [key: string]: string } = {
    'name': ''/*,
    'password': ''*/,
    'roles': ''
  };
  validationMessages: { [key: string]: { [key: string]: string } } = {
    'name': {
      'required': 'Name is required.'
    }/*,
    'password': {
      'required': 'Password is required.'
    }*/,
    'roles': {
      'required': 'Role is required.'
    }
  };

  loginForm!: FormGroup;


  constructor(private peopleService: PeopleService,
              private roleService: RoleService,
              private fb: FormBuilder) {

    /*this.peopleService.getPerson(this.person.id)
      //.pipe(first())
      .subscribe(x => {
        this.person = x;
        //this.loginForm.patchValue(x)
      });*/
  }

// ----------------------------------------------------------------------------------------


  createForm() {
    this.loginForm = this.fb.group({
      name: [this.person.name, Validators.required],
      roles: [null, Validators.required]

      // ,password: [this.login.password, Validators.required]
    });

    this.loginForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) {
      return;
    }
    const form = this.loginForm;
    for (const field in this.formErrors) {
// clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }


  onSubmit() {
    console.log('Person Name: ' + this.loginForm.get('name')!.value /*+ ', Password: ' + this.loginForm.get('password').value*/);

    let thePerson: Person = this.loginForm.value;

    let roleIds: number[] = new Array();

    let selectedRoleIds: number[] = thePerson.roles!.map(x => x.id);
    roleIds.push(...selectedRoleIds);

    let editUserCommand = new EditUserCommand(
      this.person.id,
      thePerson.name,
      roleIds);

    this.peopleService
      //.saveOrUpdate(this.person)
      .saveOrUpdate(editUserCommand)
      .subscribe(
        // (p: Response) => {console.log('success');}

        /* happy path */ p => {
          //this.people = p;
          console.log('success');
          this.onEdited.emit(null);
        },
        /* error path */ e => {
          this.errorMessage = e;
          console.log(this.errorMessage);
        }
        ///* onComplete */ () => this.isLoading = false);

      );

    // this.onEdited.emit(null);
  }

  //----------------------------------------------------------------------------------------

  // editPerson() {
  //
  //   this.peopleService
  //     .saveOrUpdate(this.person)
  //     .subscribe(
  //       // (p: Response) => {console.log('success');}
  //
  //       /* happy path */ p => {
  //         //this.people = p;
  //         console.log('success');
  //         this.onEdited.emit(null);
  //       },
  //       /* error path */ e => {
  //         this.errorMessage = e;
  //         console.log(this.errorMessage);
  //       }
  //       ///* onComplete */ () => this.isLoading = false);
  //
  //     );
  //   //this.onAdded.emit(null);
  // }

  cancel() {
    this.onCancel.emit(null);
  }

  ngOnInit() {

    this.createForm();

    //this.allProfiles = this.userService.getPofiles();
    //this.allTechnologies = this.userService.getTechnologies();

    // async orders
    //https://coryrylan.com/blog/creating-a-dynamic-select-with-angular-forms
    //of(this.getOrders()).subscribe(orders => {
    //  this.allProfiles = orders;
    //this.loginForm.controls.orders.patchValue(this.orders[0].id);
    //});

    //async roles
    this.roleService.getAll()

      .subscribe(/*x => {
        this.person = x;
        this.loginForm.get("role")!.patchValue(x.profile);
        //this.loginForm.patchValue(x)*/
        result => {
          this.allRoles = result.content;
        }
      );

    // synchronous orders
    // this.orders = this.getOrders();
    // this.form.controls.orders.patchValue(this.orders[0].id);


    //if (!this.isAddMode) {
    this.peopleService.getPerson(this.person.id)
      //.pipe(first())
      .subscribe(x => {
        this.name!.patchValue(x.name);
        this.roles!.patchValue(x.roles);
      });
    //}
  }

  getOrders() {
    /*return [
      { id: '1', name: 'order 1' },
      { id: '2', name: 'order 2' },
      { id: '3', name: 'order 3' },
      { id: '4', name: 'order 4' }
    ];*/
    let profiles = [
      new Role(2, 'Developer'),
      new Role(22, 'Manager'),
      new Role(23, 'Director')
    ]
    return profiles;
  }

  get roles() {
    return this.loginForm.get('roles');
  }

  get name() {
    return this.loginForm.get('name');
  }

  onRolesChange() {
    if (this.roles) {

      let theRoles: Role[] = this.roles.value;
      for (const theRole of theRoles) {
        console.log('Role Changed: ' + theRole!.name);
      }

    }
  }


  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
