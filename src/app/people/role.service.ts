import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Observable, Observer, throwError} from 'rxjs';
import {Person} from './person';

import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AccountsResponse} from './accountsresponse';
import {catchError, retry} from 'rxjs/operators';
import {EditUserCommand} from "./editUserCommand";
import {PersonDetailsResponseDTO} from "../dto/personDetailsResponseDTO";

import {map, of, switchMap} from 'rxjs';
import {PaginationPage, PaginationPropertySort} from "../pagination/pagination";
import {RoleDetailsResponseDTO} from "../dto/roleDetailsResponseDTO";
import {Role} from "./role";

@Injectable()
export class RoleService {

  baseUrl: string = environment.backend.baseURL;

  constructor(private http: HttpClient) {
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

  getAll(): Observable<PaginationPage<Role>> {
    return this.http.get<PaginationPage<RoleDetailsResponseDTO>>(`${this.baseUrl}` + '/roles')
      .pipe(
        map(page => {

            const pageOfRoles = {
              content:
                page.content.map(roleDetailRessonseDTO => {
                  return this.convertToRole(roleDetailRessonseDTO);
                }),
              last: page.last,
              first: page.first,
              number: page.number,
              size: page.size,
              totalPages: page.totalPages,
              itemsPerPage: page.itemsPerPage
              //sort?: Array<PaginationPropertySort>;*/

            } as PaginationPage<Role>;

            return pageOfRoles;
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


  private convertToRole(role: RoleDetailsResponseDTO): Role {
    return {
      id: role.id,
      name: role.name//,
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
  saveOrUpdate(person: EditUserCommand)/*: Observable<Response>*/ {
    // this won't actually work because the StarWars API doesn't
    // is read-only. But it would look like this:

    console.log(JSON.stringify(person));

    if (person.id) {
      return this.http
        .put(`${this.baseUrl}` + '/accounts/' + `${person.id}`, JSON.stringify(person))
        // .map(mapPersons)
        // .catch(handleError);
        .pipe(
          catchError(handleError)
        );
    }
    return this.http
      .post(`${this.baseUrl}` + '/accounts', JSON.stringify(person))
      .pipe(
        catchError(handleError)
      );

    //   .map(mapPersons)
    // .catch(handleError);

  }


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
