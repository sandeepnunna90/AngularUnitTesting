import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";

// Shallow Integration Tests - Test for testing Components with their templates
// Shallow -> excludes testing child components
// TestBed -> a special module specifically for testing purposes.

// NO_ERRORS_SCHEMA -> Tells the test to ignore unidentified elements or directives
// in the template eg. igonres router link directive as we have not imported and set it up
// in this case.

// NativeElement  -> is a standard HTML DOM element - plain old HTML
// Exposes the underlying DOM API to access HTML elements

// DetectChanges -> Updates the bindings in the template
// updates the hero name value in template e.g {{ Hero.name }}

describe('HeroComponent (shallow tests)', () => {

  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroComponent);
  });

  it('should have the correct hero', () => {
    fixture.componentInstance.hero = { id: 1, name: 'IronMan', strength: 8 };

    expect(fixture.componentInstance.hero.name).toEqual('IronMan');
  });

  it('should render the hero name in an anchor tag', () => {
    fixture.componentInstance.hero = { id: 1, name: 'IronMan', strength: 8 };
    fixture.detectChanges()

    expect(fixture.nativeElement.querySelector('a').textContent).toContain('IronMan');
  });
});
