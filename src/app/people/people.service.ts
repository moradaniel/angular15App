import {Injectable} from '@angular/core';
import {HttpParams, HttpResponse} from '@angular/common/http';
import {Observable, Observer, throwError} from 'rxjs';
import {Person} from './person';

import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AccountsResponse} from './accountsresponse';
import {catchError, retry} from 'rxjs/operators';
import {EditUserCommand} from "./editUserCommand";
import {PersonDetailsResponseDTO} from "../dto/personDetailsResponseDTO";

import {map, of, switchMap} from 'rxjs';
import {Options} from "../pagination/options";


@Injectable()
export class PeopleService {
  // private baseUrl: string = 'http://swapi.co/api';
  // private baseUrl: string = 'http://localhost:4200/api';
  // private baseUrl: string = environment.backend.baseURL;
  // private baseUrl: string = '/api';

  /*constructor(private http: HttpService){
  }*/

  baseUrl: string = environment.backend.baseURL;

  constructor(private http: HttpClient) {
  }

  getAll2(): Observable<AccountsResponse> {

    return new Observable(observer => {
      this.http.get<AccountsResponse>(`${this.baseUrl}` + '/accounts')
        .subscribe((result) => {
          const accountsResponse = result;
          /*const response = {
            'content' : result.content,
            last: true,
            totalPages: 20
          }
           const accountsResponse = new AccountsResponse(response)*/
          // do something with result.
          observer.next(accountsResponse);
          // call complete if you want to close this stream (like a promise)
          observer.complete();
        });
    });


  }


  getAll(): Observable<AccountsResponse> {
    return new Observable((observer: Observer<AccountsResponse>) => {
      this.http.get<AccountsResponse>(`${this.baseUrl}` + '/accounts')
        .subscribe((result) => {
          const accountsResponse = result;
          /*const response = {
            'content' : result.content,
            last: true,
            totalPages: 20
          }
           const accountsResponse = new AccountsResponse(response)*/
          // do something with result.
          observer.next(accountsResponse);
          // call complete if you want to close this stream (like a promise)
          observer.complete();
        });
    });
  }


  //https://codeomelet.com/posts/baking-pagination-with-angular-and-bootstrap-5
  getEmployees(options: Options): Observable<AccountsResponse> {
    //const url = `${this.baseUrl}/accounts?pageNumber=${options.page}&pageSize=${options.size}&search=${options.search}&orderBy=${options.orderBy}&orderDir=${options.orderDir}`;


    const data = {
      size: `${options.size}`,
      page: `${options.page}`,
      sort: '',
      search:''
    };
    if (options.sort) {
      data.sort = `${options.sort.property},${options.sort.direction}`;
    }
    if (options.search) {
      data.search = options.search;
    }

    const params = new HttpParams({fromObject: data});

    return this.http.get<AccountsResponse>(`${this.baseUrl}/accounts`, {params: params}).pipe(
      map(response => response)
    );
  }


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
  getPerson(id: number): Observable<Person> {
    return this.http.get<PersonDetailsResponseDTO>(`${this.baseUrl}/accounts/${id}`).
    pipe(
      map(product => this.convertToProduct(product))
    );
  }


  private convertToProduct(product: PersonDetailsResponseDTO): Person {
    return {
      id: product.id,
      name: product.name,
      roles: product.roles
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
