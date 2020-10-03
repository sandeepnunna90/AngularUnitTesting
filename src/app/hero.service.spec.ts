import { TestBed } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

// HttpClientTestingModule - is used to mock httpClientService
// TestBed.get -> is the way to get instance of the service inside the testing module

describe('Hero Service', () => {

  let mockMessageService = jasmine.createSpyObj(['add']);
  let httpTestingController: HttpTestingController;

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

  })
});
