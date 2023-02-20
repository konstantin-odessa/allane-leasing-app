import { NonNullablePipe } from './non-nullable.pipe';

describe('NonNullablePipe', () => {
  it('create an instance', () => {
    const pipe = new NonNullablePipe();
    expect(pipe).toBeTruthy();
  });
});
