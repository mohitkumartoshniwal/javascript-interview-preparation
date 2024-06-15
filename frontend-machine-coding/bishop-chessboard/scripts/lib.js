let defaultConfig = {
  container: ".bishop-chessboard",
  count: 8,
  cellSize: "3rem",
};

export class BishopChessboard {
  constructor(config) {
    this.config = JSON.parse(JSON.stringify(defaultConfig));
    this.init(config);
  }

  init(config) {
    Object.keys(config).forEach((key) => {
      this.config[key] = config[key];
    });

    this.createChessBoard();
  }

  createChessBoard() {
    this.container = document.querySelector(this.config.container);

    if (!this.container) return;
    let containerFrag = document.createDocumentFragment();
    for (let rowIndex = 0; rowIndex < this.config.count; rowIndex++) {
      let row = document.createElement("tr");
      let rowFrag = document.createDocumentFragment();
      let isWhite = rowIndex % 2 == 0 ? true : false;

      for (let colIndex = 0; colIndex < this.config.count; colIndex++) {
        let cell = document.createElement("td");
        cell.style.width = this.config.cellSize;
        cell.style.height = this.config.cellSize;

        cell.dataset.value = `${rowIndex}-${colIndex}`;

        if (isWhite) {
          cell.classList.add("white");
        } else {
          cell.classList.add("black");
        }
        isWhite = !isWhite;

        rowFrag.appendChild(cell);
      }
      row.appendChild(rowFrag);
      containerFrag.appendChild(row);
    }

    this.container.appendChild(containerFrag);
    this.container.addEventListener("mouseover", this.onMouseOver.bind(this));
    this.container.addEventListener("mouseleave", this.onMouseLeave.bind(this));
  }

  onMouseOver(e) {
    let value = e.target.dataset.value;

    if (!value) return;

    let [rowIndex, colIndex] = value.split("-").map(Number);
    let map = new Map();
    map.set(value, true);

    this.findTopLeft(rowIndex, colIndex, map);
    this.findTopRight(rowIndex, colIndex, map);
    this.findBottomLeft(rowIndex, colIndex, map);
    this.findBottomRight(rowIndex, colIndex, map);

    let cells = document.querySelectorAll("td");

    cells.forEach((cell) => {
      cell.classList.remove("orange");
    });

    cells.forEach((cell) => {
      let cellValue = cell.dataset.value;
      if (map.get(cellValue)) {
        cell.classList.add("orange");
      }
    });
  }
  onMouseLeave(e) {
    let cells = document.querySelectorAll("td");
    cells.forEach((cell) => {
      cell.classList.remove("orange");
    });
  }

  findTopLeft(rowIndex, colIndex, map) {
    rowIndex--;
    colIndex--;

    while (rowIndex >= 0 && colIndex >= 0) {
      let cellValue = `${rowIndex}-${colIndex}`;
      map.set(cellValue, true);
      rowIndex--;
      colIndex--;
    }
  }
  findTopRight(rowIndex, colIndex, map) {
    rowIndex--;
    colIndex++;

    while (rowIndex >= 0 && colIndex < this.config.count) {
      let cellValue = `${rowIndex}-${colIndex}`;
      map.set(cellValue, true);
      rowIndex--;
      colIndex++;
    }
  }
  findBottomLeft(rowIndex, colIndex, map) {
    rowIndex++;
    colIndex--;

    while (rowIndex < this.config.count && colIndex >= 0) {
      let cellValue = `${rowIndex}-${colIndex}`;
      map.set(cellValue, true);
      rowIndex++;
      colIndex--;
    }
  }
  findBottomRight(rowIndex, colIndex, map) {
    rowIndex++;
    colIndex++;

    while (rowIndex < this.config.count && colIndex < this.config.count) {
      let cellValue = `${rowIndex}-${colIndex}`;
      map.set(cellValue, true);
      rowIndex++;
      colIndex++;
    }
  }
}
