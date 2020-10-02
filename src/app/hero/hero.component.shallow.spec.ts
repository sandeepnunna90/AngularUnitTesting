import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";

// Shallow Integration Tests - Test for testing Components with their templates
// Shallow -> excludes testing child components
// TestBed -> a special module specifically for testing purposes.

describe('HeroComponent (shallow tests)', () => {

  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent]
    });

    fixture = TestBed.createComponent(HeroComponent);
  });

  it('should have the correct hero', () => {
    fixture.componentInstance.hero = { id: 1, name: 'IronMan', strength: 8 };

    expect(fixture.componentInstance.hero.name).toEqual('IronMan');
  });
});
