let defaultConfig = {
  container: ".tic-tac-toe",
  count: 3,
  cellStyle: "cell",
  styleX: "cellX",
  styleO: "cellO",
  resultContainer: ".result",
};

export class TicTacToe {
  constructor(config) {
    this.config = JSON.parse(JSON.stringify(defaultConfig));
    this.init(config);
  }

  init(config) {
    Object.keys(config).forEach((key) => {
      this.config[key] = config[key];
    });

    this.playerXTurn = true;
    this.cellsFilled = 0;
    this.map = new Map();

    this.createBoard();
  }

  createBoard() {
    this.container = document.querySelector(this.config.container);
    this.resultContainer = document.querySelector(this.config.resultContainer);

    if (!this.container) return;
    if (!this.resultContainer) return;

    let frag = document.createDocumentFragment();

    for (let rowIndex = 0; rowIndex < this.config.count; rowIndex++) {
      let row = document.createElement("tr");
      let rowFrag = document.createDocumentFragment();
      for (let colIndex = 0; colIndex < this.config.count; colIndex++) {
        let cell = document.createElement("td");
        cell.classList.add(this.config.cellStyle);
        cell.dataset.value = `${rowIndex}-${colIndex}`;
        rowFrag.appendChild(cell);
      }
      row.appendChild(rowFrag);
      frag.appendChild(row);
    }
    this.container.appendChild(frag);
    this.container.addEventListener("click", this.onClick.bind(this));
  }

  onClick(e) {
    let cellValue = e.target.dataset.value;

    if (!cellValue) return;

    if (!this.map.has(cellValue)) {
      if (this.playerXTurn) {
        let cellTarget = e.target;
        cellTarget.classList.add(this.config.styleX);
        cellTarget.textContent = "X";
        this.map.set(cellValue, "X");
      } else {
        let cellTarget = e.target;
        cellTarget.classList.add(this.config.styleO);
        cellTarget.textContent = "O";
        this.map.set(cellValue, "O");
      }
      this.cellsFilled++;
      this.playerXTurn = !this.playerXTurn;

      let result = this.checkWin();

      if (result) {
        this.resultContainer.textContent = `Player ${result} wins`;
        this.container.style.pointerEvents = "none";
      }

      if (this.cellsFilled === Math.pow(this.config.count, 2)) {
        this.resultContainer.textContent = `Match draw`;
        this.container.style.pointerEvents = "none";
      }
    }
  }

  checkWin() {
    // check each row
    for (let rowIndex = 0; rowIndex < this.config.count; rowIndex++) {
      let player = "";
      let set = new Set();
      for (let colIndex = 0; colIndex < this.config.count; colIndex++) {
        let key = `${rowIndex}-${colIndex}`;
        let value = this.map.get(key);
        player = value;
        set.add(value);
      }
      if (set.size === 1 && player) {
        return player;
      }
    }

    // check each column

    for (let colIndex = 0; colIndex < this.config.count; colIndex++) {
      let player = "";
      let set = new Set();
      for (let rowIndex = 0; rowIndex < this.config.count; rowIndex++) {
        let key = `${rowIndex}-${colIndex}`;
        let value = this.map.get(key);
        player = value;
        set.add(value);
      }
      if (set.size === 1 && player) {
        return player;
      }
    }

    // check left to right diagonal
    let rowIndex = 0,
      colIndex = 0;
    let player = "";
    let set = new Set();
    while (rowIndex < this.config.count && colIndex < this.config.count) {
      let key = `${rowIndex}-${colIndex}`;
      let value = this.map.get(key);
      player = value;
      set.add(value);
      rowIndex++;
      colIndex++;
    }
    if (set.size === 1 && player) {
      return player;
    }

    // check right to left diagonal

    rowIndex = 0;
    colIndex = this.config.count - 1;
    set.clear();
    player = "";

    while (rowIndex < this.config.count && colIndex >= 0) {
      let key = `${rowIndex}-${colIndex}`;
      let value = this.map.get(key);
      player = value;
      set.add(value);
      rowIndex++;
      colIndex--;
    }
    if (set.size === 1 && player) {
      return player;
    }
  }
}
