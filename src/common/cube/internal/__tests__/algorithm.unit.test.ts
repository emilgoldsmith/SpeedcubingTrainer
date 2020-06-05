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

  const acceptedMovesClockwise = [
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
  ];
  const acceptedMovesCounterClockwise = acceptedMovesClockwise.map(
    (x) => x + "'",
  );
  const allAcceptedMoves = [
    ...acceptedMovesClockwise,
    ...acceptedMovesCounterClockwise,
  ];

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
