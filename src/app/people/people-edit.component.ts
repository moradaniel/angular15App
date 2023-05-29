import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Person, PersonImpl} from './person';
import {PeopleService} from './people.service';
import {ContentFilterPipe} from './content-filter.pipe'
import {PeopleViewDetailsModalComponent} from "./people-view-details-modal.component";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {of} from "rxjs";
import {Profile} from "./profile";
import {EditUserCommand} from "./editUserCommand";


/**
 * 2017 - Building Web Apps with Spring 5 and Angular
 * Reactive forms
 *
 * https://www.concretepage.com/angular/angular-select-option-reactive-form
 */
@Component({
  selector: 'people-edit',
  templateUrl: './people-edit.component.html'
  , providers: [PeopleService]
})
export class PeopleEditComponent implements OnInit {

  @Input() person!: Person;


  @Output() onEdited = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  allProfiles: Profile[] | null = null;

  errorMessage = '';

  // -------------------
  formErrors: { [key: string]: string } = {
    'name': ''/*,
    'password': ''*/,
    'role': ''
  };
  validationMessages: { [key: string]: { [key: string]: string } } = {
    'name': {
      'required': 'Name is required.'
    }/*,
    'password': {
      'required': 'Password is required.'
    }*/,
    'role': {
      'required': 'Role is required.'
    }
  };

  loginForm!: FormGroup;

  // --------------------

  // public person: Person = new PersonImpl();

  constructor(private peopleService: PeopleService, private fb: FormBuilder) {

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
      role: [''/*this.person.profile*/, Validators.required]

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
    /*let user ={'name':"",
      'roleIds':[]
    };*/
    //this.person.name = this.loginForm.value.name;


   // user['name'] = this.loginForm.value.name;

    let roleIds:number[] = new Array();
    roleIds.push(this.loginForm.value.role.id);
    //user['roleIds'] = roleIds;

    let editUserCommand = new EditUserCommand(
      this.person.id,
      this.loginForm.value.name,
      roleIds);

    //this.person = this.loginForm.value;

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
    of(this.getOrders()).subscribe(orders => {
      this.allProfiles = orders;
      //this.loginForm.controls.orders.patchValue(this.orders[0].id);
    });

    // synchronous orders
    // this.orders = this.getOrders();
    // this.form.controls.orders.patchValue(this.orders[0].id);

    //if (!this.isAddMode) {
      this.peopleService.getPerson(this.person.id)
        //.pipe(first())
        .subscribe(x => {
          this.person = x;
          this.loginForm.get("role")!.patchValue(x.profile);
          //this.loginForm.patchValue(x)
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
      new Profile(2, 'Developer'),
      new Profile(22, 'Manager'),
      new Profile(23, 'Director')
    ]
    return profiles;
  }

  get role() {
    return this.loginForm.get('role');
  }

  onProfileChange() {
    if (this.role) {

      let profile: Profile = this.role.value;
      // let profile: Profile|null = this.role.profile;
      console.log('Profile Changed: ' + profile!.name);
    }
  }

  /*isCurrentRole(id: number) {
    return id === this.person.profile!.id
  }*/

  compareFn(c1: any, c2:any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
