const CATEGORIES = [
    {
        name: "Action 1",
        picture: ".asdf",
        words: [
            {
                word: "asd",
                audio: "adsf",
                picture: "asd",
                translation: "афыфывапвпап",
            },
            {
                word: "asd",
                audio: "adsf",
                picture: "asd",
                translation: "афыфывапвпап",
            },
            {
                word: "asd",
                audio: "adsf",
                picture: "asd",
                translation: "афыфывапвпап",
            },
            {
                word: "asd",
                audio: "adsf",
                picture: "asd",
                translation: "афыфывапвпап",
            },
        ]
    }
]

class Game {
    constructor(categories) {
        this.currentCategory = null;
        this.gameMode = null;
        this.contentContainer = null;
        this.gameController = null;
        this.page = null;
        this.categories = categories;
    }

    onCategorySelect(category) {
        this.currentCategory = category;
    }

    renderMenu() {
        const menuElement = document.createElement("nav");
        this.categories.forEach(({ name }) => {
            const categoryElement = document.createElement("div");
            categoryElement.innerText = name;
            categoryElement.setAttribute("data-categoryName", name);
            menuElement.appendChild(categoryElement);
        });
    }

    onMenuClick() {
        const categoryName = target.dataset["data-categoryName"];
        const PageClass = ...
        this.page = new PageClass(this.contentContainer);
        this.page.render();
    }
}

class AbstractPage {
    constructor(rootElement) {
        this.rootElement = rootElement;
        this.headerElement = null;
    }

    renderHeader() {
        this.headerElement = 

        this.addHeaderContent();
    }

    addHeaderContent() {}

    createContent() {}

    render() {
        this.renderHeader();
        this.renderContent()
    }
}

class AbstractGamePage extends AbstractPage {
    constructor(categoryItems, rootElement) {
        this.categoryItems = categoryItems;
        this.rootElement = rootElement;
        this.cellsContainer = null;
        this.onCellClick = this.onCellClick.bind(this);
    }

    addHeaderContent() {
        const gameModeToggleElement = ...
    }

    init() {
        this.cellsContainer = document.createElement("div");
        this.rootElement.appendChild(this.cellsContainer);
    }

    onCellClick({ target }) {
        const id = target.dataset['id'];
        const item = this.getItemForId(id);
        this.processItemSelect(item);
    }

    getItemForId(id) {}

    renderContent() {
        this.items.array.forEach((item) => {
            const item = this.renderCell(item);
            this.cellsContainer.appendChild(item);
        });
        this.cellsContainer.addEventListener("click", this.onCellClick);
    }

    renderCell() {}
}

class MainPage extends AbstractGameMode {
    constructor(categoryItems, game) {
        super(categoryItems);
        this.game = game;
    }

    processItemSelect(item) {
        this.game.startGame(item);
    }


}

class TrainingCategoryPage {


    processItemSelect(item) {
        this.game.startGame(item);
    }
}

class CellsRenderer {
    constructor(items, game, onClick) {
        this.items = items;
    }

    
}

class TraingingMode {
    processItemSelect(item) {
        this.playSound(item.audio);
    }
}

class RealGameMode {
    constructor(words) {
        this.currentItemIndex = null;
        this.words = words;
        this.errors = null;
    }

    init() {
        this.currentItemIndex = this.words.length - 1;
    }

    processItemSelect(item) {
        const selectedItemIndex = this.words.findIndex(item);
        if (selectedItemIndex === this.currentItemIndex) {

        } else {

        }
    }
}
