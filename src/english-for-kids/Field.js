export class Field {
    constructor(items, rootElement, game) {
        this.items = items;
        this.game = game;
        this.rootElement = rootElement;
        this.cellsContainer = null;
        this.cellIdDataAttributeName = "cellid";
        this.onFieldClick = this.onFieldClick.bind(this);
    }

    init() {
        this.cellsContainer = document.createElement("div");
        this.cellsContainer.addEventListener("click", this.onFieldClick);
        this.renderCells();
        this.rootElement.appendChild(this.cellsContainer);
    }

    renderCells() {
        this.items.forEach(({ word }) => {
            const cell = this.createCell(word);
            this.cellsContainer.appendChild(cell);
        });
    }

    createCell(name) {
        const cellElement = document.createElement("div");
        cellElement.textContent = name;
        cellElement.setAttribute(`data-${this.cellIdDataAttributeName}`, name);

        return cellElement;
    }

    onFieldClick({ target }) {
        const cellId = target.dataset[this.cellIdDataAttributeName];

        if (cellId) {
            this.onCellSelect(cellId);
        }
    }

    onCellSelect() {
        throw new Exception("Not implemented");
    }
}