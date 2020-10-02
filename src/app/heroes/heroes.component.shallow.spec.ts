import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component";
import { Hero } from '../hero';
import { of } from "rxjs"; // used for observables
import { By } from "@angular/platform-browser";


// include providers to include dependencies in the TestBed testing module

// In the providers instead of directly providing HeroServic like providers: [HeroService],
// we use a long hand notation -> providers: [ { provide: HeroService, useValue: mockHeroService }]
// this tells the TestBed module to provide HeroService, but use the mockHeroService value instead of
// the original HeroService which does http calls. (we don't want to test http calls here)

// mockHeroService, mock the methods that are called via heroService in heroesComponent

// detectChanges -> does change detection, it basically gets Angular to fire ngOnInit() method

// NO_ERRORS_SCHEMA -> doesn't detect misspelt html element names and the test doesn't
// return errors for these cases.

@Component({
  selector: 'app-hero',
  template: '<div></div>',
})
class FakeHeroComponent {
  @Input() hero: Hero;
}


describe('HeroesComponent (shallow tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'SpiderMan', strength: 8 },
      { id: 2, name: 'IronMan', strength: 9 },
      { id: 3, name: 'Hulk', strength: 10 },
    ];

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        FakeHeroComponent
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ],
      // schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should set heroes correctly from the service', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    expect(fixture.componentInstance.heroes.length).toEqual(3);
  });

  it('should create one li for each hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('li')).length).toEqual(3);

  });
});
