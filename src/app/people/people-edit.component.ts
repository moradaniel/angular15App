import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Person, PersonImpl} from './person';
import { PeopleService } from './people.service';
import {ContentFilterPipe} from './content-filter.pipe'
import {PeopleViewDetailsModalComponent} from "./people-view-details-modal.component";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


/**
 * 2017 - Building Web Apps with Spring 5 and Angular
 * Reactive forms
 *
 */
@Component({
  selector: 'people-edit',
  templateUrl: './people-edit.component.html'
  ,providers: [PeopleService]
})
export class PeopleEditComponent implements OnInit{

  @Input() person!: Person;


  @Output() onEdited = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  errorMessage = '';

  // -------------------
  formErrors: { [key: string]: string } = {
    'name': ''/*,
    'password': ''*/
  };
  validationMessages: { [key: string]: { [key: string]: string } } = {
    'name': {
      'required': 'Name is required.'
    }/*,
    'password': {
      'required': 'Password is required.'
    }*/
  };

  loginForm!: FormGroup;

  // --------------------

  // public person: Person = new PersonImpl();

  constructor(private peopleService: PeopleService, private fb: FormBuilder){



  }

// ----------------------------------------------------------------------------------------


  createForm() {
    this.loginForm = this.fb.group({
      name: [this.person.name, Validators.required]
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
    console.log('Person Name: ' +   this.loginForm.get('name')!.value /*+ ', Password: ' + this.loginForm.get('password').value*/);
    this.person.name = this.loginForm.value.name;

    this.peopleService
      .saveOrUpdate(this.person)
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

  editPerson() {

    this.peopleService
      .saveOrUpdate(this.person)
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
    //this.onAdded.emit(null);
  }

  cancel() {
    this.onCancel.emit(null);
  }

  ngOnInit(){

    this.createForm();

  }
}
