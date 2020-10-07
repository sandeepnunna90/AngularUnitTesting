
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
  });

  it('should render each hero as a hero component', () => {
    //arrange
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    //act
    fixture.detectChanges();

    let heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

    expect(heroComponentDEs.length).toEqual(3);

    expect(heroComponentDEs[0].componentInstance.hero.name).toEqual('SpiderMan');
    expect(heroComponentDEs[1].componentInstance.hero.name).toEqual('IronMan');
    expect(heroComponentDEs[2].componentInstance.hero.name).toEqual('Hulk');

    // OR - we are asserting hero objects

    for (let i = 0; i < heroComponentDEs.length; i++) {
      expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
    }
  });

  // we are using spy on delete method of the heroes component

  it(`should call heroService.deleteHero when the Hero Component's delete
    button is called`, () => {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

    heroComponents[0].query(By.css('button')).triggerEventHandler('click', { stopPropagation: () => { } });

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  })
});
