import { Algorithm } from '../algorithm';

describe('Algorithm', () => {
  it('correctly constructs from a move string', () => {
    const algorithm = new Algorithm({ moveString: 'UFR' });
    expect(algorithm.toString()).toBe('UFR');
  });

  it('correctly constructs from a move string array', () => {
    const algorithm = new Algorithm({ moveStringArray: ['U', 'F', 'R'] });
    expect(algorithm.toString()).toBe('UFR');
  });

  it('errors on invalid move string', () => {
    expect(() => new Algorithm({ moveString: 'abcde' })).toThrowError('abcde');
  });

  it('errors on invalid move string array', () => {
    expect(
      () => new Algorithm({ moveStringArray: ['a', 'b', 'c'] }),
    ).toThrowError(JSON.stringify(['a', 'b', 'c']));
  });

  it('correctly parses and constructs a movestring with counterclockwise moves', () => {
    const algorithm = new Algorithm({ moveString: "UB'F" });
    expect(algorithm.toString()).toBe("UB'F");
  });

  it('correctly parses and constructs a movestring with wide counterclockwise moves', () => {
    const algorithm = new Algorithm({ moveString: "UBw'F" });
    expect(algorithm.toString()).toBe("UBw'F");
  });

  it('correctly parses and constructs a movestring with half turns', () => {
    const algorithm = new Algorithm({ moveString: 'U2Rw2' });
    expect(algorithm.toString()).toBe('U2Rw2');
  });

  it('correctly parses and constructs a movestring with counter clockwise half turns', () => {
    const algorithm = new Algorithm({ moveString: "D2'Fw2'" });
    expect(algorithm.toString()).toBe("D2'Fw2'");
  });

  const allAcceptedMoves = [
    'U',
    'D',
    'F',
    'B',
    'R',
    'L',
    'M',
    'S',
    'E',
    'Uw',
    'Dw',
    'Fw',
    'Bw',
    'Rw',
    'Lw',
  ]
    // Add half turns
    .flatMap((quarterMove) => [quarterMove, quarterMove + '2'])
    // Add counterclockwise turns
    .flatMap((clockwiseMove) => [clockwiseMove, clockwiseMove + "'"]);

  it("doesn't throw error for any valid move", () => {
    new Algorithm({ moveStringArray: allAcceptedMoves });
    new Algorithm({ moveString: allAcceptedMoves.join('') });
  });

  describe('throws error for each of the following lowercase versions of valid moves:', () => {
    allAcceptedMoves
      .map((x) => x.toLowerCase())
      .forEach((lowercaseMove) =>
        it(lowercaseMove, () => {
          expect(
            () => new Algorithm({ moveStringArray: [lowercaseMove] }),
          ).toThrowError(lowercaseMove);
        }),
      );
  });

  it('correctly inverses a simple algorithm', () => {
    const initialAlgorithm = new Algorithm({ moveString: "UF'R" });

    const inversedAlgorithm = initialAlgorithm.getInverse();

    expect(inversedAlgorithm.toString()).toBe("R'FU'");
  });
});
