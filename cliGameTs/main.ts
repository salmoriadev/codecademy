const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

type FieldGrid = string[][];

class Field {
  field: FieldGrid;
  private playerRow: number;
  private playerCol: number;
  private gameOver: boolean;

  constructor(field: FieldGrid) {
    this.field = field;
    this.playerRow = 0;
    this.playerCol = 0;
    this.gameOver = false;
  }

  print(): void {
    console.log(this.field.map((row) => row.join("")).join("\n"));
  }

  static generateField(
    height: number,
    width: number,
    holePercent = 0.2,
  ): FieldGrid {
    const grid: FieldGrid = [];

    for (let row = 0; row < height; row += 1) {
      const rowCells: string[] = [];
      for (let col = 0; col < width; col += 1) {
        const isHole = Math.random() < holePercent;
        rowCells.push(isHole ? hole : fieldCharacter);
      }
      grid.push(rowCells);
    }

    const hatRow = Math.floor(Math.random() * height);
    const hatCol = Math.floor(Math.random() * width);
    grid[hatRow][hatCol] = hat;
    grid[0][0] = pathCharacter;

    return grid;
  }

  play(): void {
    this.print();

    while (!this.gameOver) {
      const move = prompt("Which way? (u/d/l/r): ").trim().toLowerCase();
      const moveDeltas = new Map<string, [number, number]>([
        ["u", [-1, 0]],
        ["d", [1, 0]],
        ["l", [0, -1]],
        ["r", [0, 1]],
      ]);
      const delta = moveDeltas.get(move);

      if (!delta) {
        console.log("Invalid move. Use u, d, l, or r.");
        continue;
      }

      const [rowDelta, colDelta] = delta;
      const nextRow = this.playerRow + rowDelta;
      const nextCol = this.playerCol + colDelta;

      if (
        nextRow < 0 ||
        nextRow >= this.field.length ||
        nextCol < 0 ||
        nextCol >= this.field[0].length
      ) {
        console.log("You moved outside the field. Game over.");
        this.gameOver = true;
        break;
      }

      const tile = this.field[nextRow][nextCol];
      if (tile === hat) {
        this.field[nextRow][nextCol] = pathCharacter;
        this.print();
        console.log("You found your hat. You win!");
        this.gameOver = true;
        break;
      }

      this.playerRow = nextRow;
      this.playerCol = nextCol;
      this.field[nextRow][nextCol] = pathCharacter;
      this.print();
    }
  }
}

const myField = new Field(Field.generateField(5, 7, 0.25));
myField.play();
