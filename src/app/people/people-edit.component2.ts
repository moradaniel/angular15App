import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Person, PersonImpl} from './person';
import { PeopleService } from './people.service';
import {ContentFilterPipe} from './content-filter.pipe'
import {PeopleViewDetailsModalComponent} from "./people-view-details-modal.component";

@Component({
  selector: 'people-edit',
  templateUrl: './people-edit.component.html'
  ,providers: [PeopleService]
})
export class PeopleEditComponent2 implements OnInit{
  @Output() onEdited = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  errorMessage: string = '';

  public person: Person = new PersonImpl();

  constructor(private peopleService : PeopleService){ }

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
          /* error path */ e => this.errorMessage = e
          ///* onComplete */ () => this.isLoading = false);

         );
    //this.onAdded.emit(null);
  }

  cancel() {
    this.onCancel.emit(null);
  }

  ngOnInit(){}
}
