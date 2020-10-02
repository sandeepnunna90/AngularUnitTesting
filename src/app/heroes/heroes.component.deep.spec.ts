
import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component";
import { Hero } from '../hero';
import { of } from "rxjs";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";

// Deep integration tests - we use real child components.
// But, we are still mocking the dependencies like hero service.

describe('HeroesComponent (deep tests)', () => {
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
        HeroComponent
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();
  });

  it('should be true', () => {
    expect(true).toBe(true);
  });
});
