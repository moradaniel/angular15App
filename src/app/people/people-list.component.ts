import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Person} from './person';
import {PeopleService} from './people.service';
import {ContentFilterPipe} from './content-filter.pipe';
import {PeopleViewDetailsModalComponent} from './people-view-details-modal.component';
import {Options, SortDirection} from "../pagination/options";
import {Subscription} from "rxjs";
import {AccountsResponse} from "./accountsresponse";

@Component({
  selector: 'people-list',
  templateUrl: './people-list.component.html',
  providers: [
    PeopleService
    , ContentFilterPipe
    , PeopleViewDetailsModalComponent
  ]
})
export class PeopleListComponent implements OnInit, OnDestroy {
  private _index = 0;
  people: Person[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;

  @Output() onView = new EventEmitter<Person>();
  @Output() onEdit = new EventEmitter<Person>();


  options: Options = {
    orderBy: 'Name',
    orderDir: 'ASC',
    sort:{
      property:'name',
      direction:SortDirection.ASC
    },
    page: 1,
    search: '',
    size: 2
  };

  response: AccountsResponse | null = null;
  getEmployeesSub: Subscription | null = null;


  constructor(private peopleService: PeopleService) {
  }

  ngOnInit() {


    this.getEmployees();

    /*
    https://stackoverflow.com/questions/35763730/difference-between-constructor-and-ngoninit
    Mostly we use ngOnInit for all the initialization/declaration and avoid stuff to work in the constructor.
    The constructor should only be used to initialize class members but shouldn't do actual "work".
    So you should use constructor() to setup Dependency Injection and not much else.
    ngOnInit() is better place to "start" - it's where/when components' bindings are resolved.
    */
    this.peopleService
      .getAll()
      .subscribe(
        /* happy path */ p => this.people = p.content,
        /* error path */ e => this.errorMessage = e,
        /* onComplete */ () => this.isLoading = false);
  }

  ngOnDestroy(): void {
    if (this.getEmployeesSub) {
      this.getEmployeesSub.unsubscribe();
    }
  }

  getEmployees(): void {
    this.getEmployeesSub = this.peopleService.getEmployees(this.options)
                          .subscribe(
                            {
                              next: (data) => {
                                //this.people = data.content;
                                this.response = data
                              }/*,
                              error: (err) => {
                                this.errorMessage = "Username or password is incorrect.";
                              }*/
                            }

                          );
  }


  public viewPerson(person: Person) {
    this.onView.emit(person);
  }

  public editPerson(person: Person) {
    this.onEdit.emit(person);
  }

  /*public enableAdd() {
    return this._index < this.people.length;
  }
  public addUser() {
    if (this.enableAdd()) {
      this.people.push(this.people[this._index++]);
    }
  }
  public clearUsers() {
    //this.people = [];
    this._index = 0;
  }*/
  search($event: Event) {
    const text = ($event!.target as HTMLInputElement).value;
    this.options.search = text;
    this.options.page = 1;
    this.getEmployees();
  }

  size(size: number) {
    this.options.size = size;
    this.options.page = 1;
    this.getEmployees();
  }

  get numbers(): number[] {
    //const limit = Math.ceil((this.response && this.response.filtered) / this.options.size);
    const limit = this.response?.totalPages;
    return Array.from({ length: limit! }, (_, i) => i + 1);
    /*
    const limit = Math.ceil((this.response && this.response.filtered) / this.options.size);
    return Array.from({ length: limit }, (_, i) => i + 1);*/
  }

  next() {
    this.options.page++;
    this.getEmployees();
  }

  prev() {
    this.options.page--;
    this.getEmployees();
  }

  to(page: number) {
    this.options.page = page;
    this.getEmployees();
  }

  order(by: string) {
    if (this.options.sort.property === by) {
      this.options.sort.direction = this.options.sort.direction  === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
    } else {
      this.options.sort.property = by;
    }
    this.getEmployees();
  }

  by(order: string) {
    return this.options.sort.property === order;
  }

  get direction() {
    return this.options.sort.direction === SortDirection.ASC  ? SortDirection.ASC  : SortDirection.DESC ;
  }

  isAsc() {
    return this.options.sort.direction === SortDirection.ASC;
  }
}
