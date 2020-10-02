import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs"; // used for observables


// include providers to include dependencies in the TestBed testing module

// In the providers instead of directly providing HeroServic like providers: [HeroService],
// we use a long hand notation -> providers: [ { provide: HeroService, useValue: mockHeroService }]
// this tells the TestBed module to provide HeroService, but use the mockHeroService value instead of
// the original HeroService which does http calls. (we don't want to test http calls here)

// mockHeroService, mock the methods that are called via heroService in heroesComponent

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
      declarations: [HeroesComponent],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should set heroes correctly from the service', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    expect(fixture.componentInstance.heroes.length).toEqual(3);
  })
});
