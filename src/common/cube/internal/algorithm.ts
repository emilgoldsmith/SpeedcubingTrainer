class InvalidMove extends Error {}

class Move {
  private readonly validMovesClockwise = [
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
  private readonly validMovesCounterClockwise = this.validMovesClockwise.map(
    (x) => x + "'",
  );
  private readonly allValidMoves = [
    ...this.validMovesClockwise,
    ...this.validMovesCounterClockwise,
  ];

  constructor(private readonly move: string) {
    if (!this.isValidMove(move)) {
      throw new InvalidMove(
        `"${move}" is an invalid move. Only a single outer, wide or slice move allowed`,
      );
    }
  }

  private isValidMove(move: string): boolean {
    return this.allValidMoves.includes(move);
  }

  getInverse(): Move {
    if (this.move.endsWith("'"))
      return new Move(this.move.substring(0, this.move.length - 1));
    return new Move(this.move + "'");
  }

  getMoveString(): string {
    return this.move;
  }
}

class MoveParser {
  fromMoveString(moveString: string): Move[] {
    let restOfMoveString = moveString;
    const moveObjectArray = [];
    while (restOfMoveString.length > 0) {
      const {
        firstMove: nextMove,
        restOfString: newRestOfString,
      } = this.extractFirstMove(restOfMoveString);
      moveObjectArray.push(nextMove);
      restOfMoveString = newRestOfString;
    }
    return moveObjectArray;
  }

  private extractFirstMove(
    moveString: string,
  ): { firstMove: Move; restOfString: string } {
    for (
      let prefixLength = moveString.length;
      prefixLength > 0;
      prefixLength--
    ) {
      try {
        const firstMove = new Move(moveString.substr(0, prefixLength));
        return {
          firstMove,
          restOfString: moveString.substring(prefixLength),
        };
      } catch (e) {
        const isExpectedError = e instanceof InvalidMove;
        if (!isExpectedError) {
          throw e;
        }
      }
    }
    throw new Error(`No valid moves in start of ${moveString}`);
  }
}

export class Algorithm {
  private moveArray: Move[];

  constructor(
    arg: { moveString: string } | { moveStringArray: string[] } = {
      moveStringArray: [],
    },
  ) {
    try {
      if ('moveString' in arg) {
        this.moveArray = new MoveParser().fromMoveString(arg.moveString);
      } else {
        this.moveArray = arg.moveStringArray.map((x) => new Move(x));
      }
    } catch (e) {
      if (e instanceof InvalidMove) {
        throw new Error(`Invalid algorithm supplied: ${JSON.stringify(arg)}`);
      }
      throw e;
    }
  }

  getInverse(): Algorithm {
    const inversedMoveArray = this.moveArray
      .map((x) => x.getInverse())
      .reverse();
    return new Algorithm({
      moveStringArray: inversedMoveArray.map((x) => x.getMoveString()),
    });
  }

  toString(): string {
    return this.moveArray.map((x) => x.getMoveString()).join('');
  }
}
