import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, Observer, throwError} from 'rxjs';


import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

import {catchError, retry} from 'rxjs/operators';

import {PersonDetailsResponseDTO} from "../dto/personDetailsResponseDTO";

import {map, of, switchMap} from 'rxjs';
import {PaginationPage, PaginationPropertySort} from "../pagination/pagination";

import {Environment} from "../environment.interface";
import {Department} from "./department";
import {DepartmentDetailsResponseDTO} from "./departmentDetailsResponseDTO";

declare let __config: Environment;


const CURRENT_DEPARTMENT = 'currentDepartment';

@Injectable({
    providedIn: 'root'
  }
)
export class DepartmentService {

  baseUrl: string = __config.apiUrl;



  private currentDepartmentSubject = new BehaviorSubject<Department | null>(null);
  currentDepartment$ = this.currentDepartmentSubject.asObservable();

  constructor(private http: HttpClient) {
    this.updateCurrentDepartment(null);
  }

  updateCurrentDepartment(department: Department | null) {
    if (department) {
      window.sessionStorage.setItem(CURRENT_DEPARTMENT, JSON.stringify(department));
      this.currentDepartmentSubject.next(department);
    }else {
      this.currentDepartmentSubject.next(null);
      window.sessionStorage.removeItem(CURRENT_DEPARTMENT);

    }
  }

  /*
  getAll2(): Observable<PaginationPage<Person>> {
    return new Observable((observer: Observer<PaginationPage<Person>>) => {
      this.http.get<AccountsResponse>(`${this.baseUrl}` + '/accounts')
        .subscribe((result) => {
          const accountsResponse = result;

          // do something with result.
          observer.next(accountsResponse);
          // call complete if you want to close this stream (like a promise)
          observer.complete();
        });
    });
  }*/


  /*getAll(): Observable<PaginationPage<RoleDetailsResponseDTO>> {
    return new Observable((observer: Observer<PaginationPage<RoleDetailsResponseDTO>>) => {
      this.http.get<PaginationPage<RoleDetailsResponseDTO>>(`${this.baseUrl}` + '/roles')
        .subscribe((result) => {

        .pipe(
            map(product => this.convertToProduct(product))
          );

          const accountsResponse = result;

          // do something with result.
          observer.next(accountsResponse);
          // call complete if you want to close this stream (like a promise)
          observer.complete();
        });
    });
  }*/

  findAvailableDepartmentsForAccount(username: string): Observable<PaginationPage<Department>> {
    return this.http.get<PaginationPage<DepartmentDetailsResponseDTO>>(`${this.baseUrl}/departments/findAvailableDepartmentsForAccount/${username}`)
      .pipe(
        map(page => {

            const pageOfDepartments = {
              content:
                page.content.map(departmentDetailsResponseDTO => {
                  return this.convertToDepartment(departmentDetailsResponseDTO);
                }),
              last: page.last,
              first: page.first,
              number: page.number,
              size: page.size,
              totalPages: page.totalPages,
              itemsPerPage: page.itemsPerPage
              //sort?: Array<PaginationPropertySort>;*/

            } as PaginationPage<Department>;

            return pageOfDepartments;
          }
        )
      );
  }


  //https://github.com/arifcseru/springboot-angular-mysql-basic-crud/blob/master/angular_app/src/app/person.service.ts
  // findPersons(/*page: number, pageSize: number, sort: PaginationPropertySort*/): Rx.Observable<PaginationPage<Person>> {
  //   let params = new URLSearchParams();
  //   params.set('size', `${pageSize}`);
  //   params.set('page', `${page}`);
  //   if (sort != null) {
  //     params.set('sort', `${sort.property},${sort.direction}`);
  //   }
  //
  //   let options = new RequestOptions({
  //     search: params
  //   });
  //   return this.http.get(`${webServiceEndpoint}/person`, options).map(this.extractData).publish().refCount();
  // }


  /*get(id: number): Observable<Person> {
    return this.http.get(`${this.baseUrl}/accounts/${id}`);
  }*/

  /*
  https://nehalist.io/working-with-models-in-angular/

    getUser(): Observable<User[]> {
      return this.http.get('/api/user')
        .map((res: Response) => res.json().response.map((user: User) => new User().deserialize(user)));
    }*/


  /**
   * 2023 - Book: Aristeidis Bampakos Pablo Deeleman - Learning Angular-Packt.pdf
   */

  /*getPerson(id: number): Observable<Person> {
    return this.http.get<PersonDetailsResponseDTO>(`${this.baseUrl}/accounts/${id}`).pipe(
      map(product => this.convertToProduct(product))
    );
  }*/


  private convertToDepartment(department: DepartmentDetailsResponseDTO): Department {
    return {
      id: department.id,
      name: department.name//,
      //profile: product.roles[0]
    };
  }

  /*
  get(id: number): Observable<Person> {
    let person$  = this.http
      .get(`/users/${id}`)
      .map(mapPerson)
      .catch(handleError);

    //let arrayPersons = <Array<Person>>person$;

    //<Array<number>>x

      //if(Array.isArray(person$) && Array.length(person$)>0){

     // }
      //return person$[0];
    return person$;
  }
*/


}

/*
function mapPersons(response:Response): Person[]{
   // uncomment to simulate error:
   // throw new Error('ups! Force choke!');

   // The response of the API has a results
   // property with the actual results

  //return response.json().results.map(toPerson);
  return response.json().content.map(toPerson);
}
*/

/*
function mapPerson(response:Response): Person{
  // toPerson looks just like in the previous example
 // return toPerson(response.results.json());

  let persons:Array<Person> = mapPersons(response);//.json().results.map(toPerson);

  if(persons && persons.length===1){
    return persons[0];
  }else{
    return null;
  }


 //return response.json().results(toPerson);
}*/

/*
function toPerson(r:any): Person{
  let person = <Person>( {
    //id: extractId(r),
    id:r.id
    //,url: r.url,
    ,name: r.name
    //,address: r.address,
    //,height: r.height
  });
  console.log('Parsed person:', person);
  return person;
}
*/
// to avoid breaking the rest of our app
// I extract the id from the person url
/*function extractId(personData:any){
  let extractedId = personData.url.replace('http://swapi.co/api/people/','').replace('/','');
  return parseInt(extractedId);
}*/


// this could also be a private method of the component class
function handleError(error: any) {
  // log error
  // could be something more sofisticated
  const errorMsg = error.message || `Yikes! There was a problem with our hyperdrive device and we couldn't retrieve your data!`;
  console.error(errorMsg);

  // throw an application level error
  return throwError(errorMsg);
}
