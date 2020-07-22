import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {

  });

  it('should have no messages to start', () => {
    service = new MessageService();
    expect(service.messages.length).toBe(0);
  });

  it('should add a message when add is called', () => {
    // arrange
    service = new MessageService();

    // act
    service.add('message1');

    // assert
    expect(service.messages.length).toBe(1);
  });

  it('should remove all messages when clear is called', () => {
    // arrange (need one message to do the action clear)
    service = new MessageService();
    service.add('message2');

    // act
    service.clear();

    // assert
    expect(service.messages.length).toBe(0);
  });
});
