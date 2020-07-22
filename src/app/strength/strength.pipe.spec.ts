import { StrengthPipe } from './strength.pipe';

describe('Strength Pipe', () => {
  it('should display weak if strength is 5', () => {
    const pipe = new StrengthPipe();
    const val = pipe.transform(5);

    expect(val).toEqual('5 (weak)');
  });

  it('should display strong if strength is 10', () => {
    const pipe = new StrengthPipe();
    const val = pipe.transform(10);

    expect(val).toEqual('10 (strong)');
  });

  it('should display unbelievable if strength is 20', () => {
    const pipe = new StrengthPipe();
    const val = pipe.transform(20);

    expect(val).toEqual('20 (unbelievable)');
  });
});
