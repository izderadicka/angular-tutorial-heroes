import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { HEROES } from './mock-heroes';

const HEROES_URL="api/heroes";

export interface SearchResult{
  heroes: Hero[],
  term: string
  complete: boolean
}

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private requestOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  };

  updateHero(hero: Hero) {
    return this.http.put(HEROES_URL, hero, this.requestOptions).pipe(
      tap(() => this.log("updated hero id "+ hero.id)),
      catchError(this.handleError(`updateHero(${JSON.stringify(hero)})`))
    )
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(HEROES_URL, hero, this.requestOptions).pipe(
      tap(h => this.log(`hero ${JSON.stringify(h)} `)),
      catchError(this.handleError<Hero>(`addHero(${JSON.stringify(hero)})`))
    )
  }

  deleteHero(id: number) {
    return this.http.delete(this.itemUrl(id)).pipe(
      tap(() => this.log(`hero id ${id} deleted`)),
      catchError(this.handleError(`deleteHero(${id})`))
    )
  }

  searchHero(term: string): Observable<SearchResult> {
    const query = term.trim();
    if (!query.length) return of({heroes:[], term: '', complete: false});
    return this.http.get<Hero[]>(`${HEROES_URL}?name=${query}`).pipe(
      map(x => {
        const res =
        x.length?`${x.length}`: `no`;
        this.log(`search for ${term} returned ${res} results`);
        return {
          heroes:x,
          complete: true,
          term: query
        }
      }),
      catchError(this.handleError<SearchResult>(`searchHero(${term})`))
    )

  }


  constructor(private messageService: MessageService,
    private http: HttpClient) { }

  log(msg: string) {
    this.messageService.addMessage("HeroService: " + msg);
  }

  handleError<T>(operation='operation', defautResult?:T) {

    return (err: any):Observable<T> => {
      console.error(err);
      this.log(`ERROR in ${operation}: ${err.message}`);
      return of(defautResult as T);
    }

  }

  getHeroes(): Observable< Hero[]> {
    return this.http.get<Hero[]>(HEROES_URL).pipe(
      tap(v => this.log(`fetched ${v.length} heroes`)),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  itemUrl(id: number) {
    return `${HEROES_URL}/${id}`
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(this.itemUrl(id)).pipe(
      tap(h => this.log(`fetched hero id ${h.id}`)),
      catchError(this.handleError<Hero>(`getHero(${id})`))
    )
  }


}
