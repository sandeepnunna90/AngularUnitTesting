import { inject, TestBed } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

// HttpClientTestingModule - is used to mock httpClientService
// TestBed.get -> is the way to get instance of the service inside the testing module

describe('Hero Service', () => {

  let mockMessageService = jasmine.createSpyObj(['add']);
  let httpTestingController: HttpTestingController;
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService },
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController); // get allows to creates a handle
    let messageService = TestBed.get(MessageService); // get allows it to create a handle for the hero service
    service = TestBed.get(HeroService);
  })

  describe('getHeroes', () => {
    it('should call get the correct URL', () => {
      service.getHero(4).subscribe();

      const req = httpTestingController.expectOne('api/heroes/4');
      req.flush({ id: 4, name: 'HawkEye', strength: 6 });
    });
  });

  // Alternative method to create handles
  describe('getHeroes using inject', () => {
    it('should call get the correct URL',
      inject([HeroService, HttpTestingController],
        (heroService: HeroService, testingController: HttpTestingController) => {
          heroService.getHero(5).subscribe();

          const req = testingController.expectOne('api/heroes/5');
          req.flush({ id: 5, name: 'BlackWidow', strength: 7 });
        }));
  });

});
