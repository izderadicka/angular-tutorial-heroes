import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[]=[];
  @ViewChild('newName') newHeroElem?: ElementRef;

  constructor(private heroService: HeroService) { }

  initHeroes() {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  ngOnInit(): void {
    this.initHeroes();
  }

  addHero(newName: string) {
    const name = newName.trim();
    if (!name.length) return;
    this.heroService.addHero({name} as Hero).subscribe(hero => {
      this.heroes.unshift(hero);
      if (this.newHeroElem) {
        this.newHeroElem.nativeElement.value = '';
      }
    });
  }

  deleteHero(id: number) {
    this.heroes = this.heroes.filter(h => h.id !== id);
    this.heroService.deleteHero(id).subscribe()
  }

}
