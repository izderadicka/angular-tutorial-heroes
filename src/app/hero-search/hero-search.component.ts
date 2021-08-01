import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService, SearchResult } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
})
export class HeroSearchComponent implements OnInit {
  searchResult: SearchResult = {heroes: [], term: '', complete: false};
  searchPipe?: Observable<SearchResult>;
  searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.searchPipe = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map(term => term.trim().toLowerCase()),
      switchMap((term) => {
        if (this.searchResult.complete && term.indexOf(this.searchResult.term)>=0) {
          return of(this.localSearch(term))
        } else {
        return this.heroService.searchHero(term);
        }
      })
    );
    this.searchPipe.subscribe(result => this.searchResult = result);
  }

  localSearch(term:string):SearchResult {
    return {
      heroes: this.searchResult.heroes.filter(h => h.name.toLocaleLowerCase().indexOf(term)>=0),
      complete: true,
      term
    }
    throw new Error("Not implemented")
  }

  search(term: string) {
    this.searchTerms.next(term);
  }
}
