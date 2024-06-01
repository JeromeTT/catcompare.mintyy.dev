const PAGES = Object.freeze({
  START: "page-start",
  QUIZ: "page-quiz",
  RESULTS: "page-results",
});
async function test(obj) {
  obj.cats = loadJson;
}

const jsonTest = [
  {
    filename: "peebis.webp",
    name: "peebis (yes this is definitely a cat)",
    description: "",
    html: "",
  },
  {
    filename: "F5OZU_0X0AAN0Vd (1).jpg",
    name: "I ate the alarm clock. Sleep well.",
    description: "",
    html: "",
  },
  {
    filename: "1118801518297100350.gif",
    name: "Crunch Cat",
    description: "",
    html: "",
  },
  {
    filename: "cat-reads-chat-cat-eating (1).gif",
    name: "Mr. Shock",
    description: "",
    html: "",
  },
  {
    filename: "sitty.png",
    name: "sitty",
    description: "",
    html: "",
  },
  {
    filename: "mr-fresh-mr-fresh-multiverse.gif",
    name: "Mr. Fresh",
    description: "",
    html: "",
  },
  {
    filename: "tole-cat (1).gif",
    name: "Tole Tole Cat",
    description: "",
    html: "",
  },
  {
    filename: "wires.png",
    name: "> looks inside <br /> > wires",
    description: "",
    html: "",
  },
  {
    filename: "awakge.png",
    name: "awakge",
    description: "",
    html: "",
  },
  {
    filename: "dahell.png",
    name: "da hell",
    description: "",
    html: "",
  },
  {
    filename: "pogcat.webp",
    name: "Pog Cat",
    description: "",
    html: "",
  },
  {
    filename: "huhcat.webp",
    name: "HUH",
    description: "",
    html: "",
  },
  {
    filename: "catdespair.png",
    name: "CatDespair",
    description: "",
    html: "",
  },
  {
    filename: "plink-cat-plink.gif",
    name: "Plink",
    description: "",
    html: "",
  },
  {
    filename: "ueueue.webp",
    name: "ue ue ue (soung of crying)",
    description: "",
    html: "",
  },
  {
    filename: "MONKA.png",
    name: "MONKA",
    description: "",
    html: "",
  },
  {
    filename: "roomba.gif",
    name: "The Roomba Incident",
    description: "",
    html: "",
  },

  {
    filename: "gnarp7.webp",
    name: "Gnarp 7",
    description: "",
    html: "",
  },
  {
    filename: "glorpShakey.gif",
    name: "Glorp Shakey",
    description: "",
    html: "",
  },
  {
    filename: "ragey.webp",
    name: "Ragey",
    description: "",
    html: "",
  },

  {
    filename: "chef.gif",
    name: "Chef",
    description: "",
    html: "",
  },
  {
    filename: "Sad Cat.webp",
    name: "Sad Cat",
    description: "",
    html: "",
  },
];

class Sorter {
  loadCats() {
    this.cats = jsonTest;
    this.n = this.cats.length;

    this.items = new Array(this.n);
    for (let i = 0; i < this.n; i++) {
      this.items[i] = i;
    }
    this.state = {};
    this.state.spacing = 2;
    this.state.i = 0;
    this.state.divisor = Math.floor(this.n / this.state.spacing);
    this.state.leftA = this.state.i * this.state.spacing;
    this.state.leftB = Math.min(
      this.n,
      this.state.leftA + this.state.spacing / 2
    );
    this.state.rightA = Math.min(this.n, this.state.leftB);
    this.state.rightB = Math.min(this.n, this.state.leftA + this.state.spacing);

    this.state.leftBound = 0;
    this.state.rightBound = 2;
    this.state.remaining = this.state.spacing;

    this.state.temp = new Array(this.n).fill(-1);
    this.state.totalCalc = (() => {
      let total = 0;
      let n = this.n - 1;
      while (n > 0) {
        n >>= 1;
        total++;
      }
      return total * this.n;
    })();
    this.state.currentCalc = 0;
  }

  run() {
    let state = this.state;
    while (state.spacing / 2 < this.items.length) {
      while (state.i <= state.divisor) {
        while (state.leftA < state.leftB || state.rightA < state.rightB) {
          state.currentCalc += 1;
          let remaining = state.rightBound - state.leftBound;
          if (state.leftA >= state.leftB) {
            // Select Right
            if (remaining % 2) {
              // Odd
              state.temp[state.rightBound - 1] = this.items[state.rightB - 1];
              state.rightB -= 1;
              state.rightBound -= 1;
            } else {
              // Even
              state.temp[state.leftBound] = this.items[state.rightA];
              state.rightA += 1;
              state.leftBound += 1;
            }
          } else if (state.rightA >= state.rightB) {
            if (remaining % 2) {
              // Odd
              state.temp[state.rightBound - 1] = this.items[state.leftB - 1];
              state.leftB -= 1;
              state.rightBound -= 1;
            } else {
              // Even
              state.temp[state.leftBound] = this.items[state.leftA];
              state.leftA += 1;
              state.leftBound += 1;
            }
          } else {
            this.updateDOM();
            this.updateButtons();
            return;
          }
        }
        state.i++;
        state.leftBound = state.leftA;
        state.leftA = state.i * state.spacing;
        state.leftB = Math.min(this.n, state.leftA + state.spacing / 2);
        state.rightA = Math.min(this.n, state.leftB);
        state.rightB = Math.min(this.n, state.leftA + state.spacing);

        state.leftBound = state.leftA;
        state.rightBound = state.rightB;
      }
      state.i = 0;
      state.spacing *= 2;
      this.items = state.temp;
      state.temp = new Array(this.n).fill(-1);
      state.leftA = state.i * state.spacing;
      state.leftB = Math.min(this.n, state.leftA + state.spacing / 2);
      state.rightA = Math.min(this.n, state.leftB);
      state.rightB = Math.min(this.n, state.leftA + state.spacing);
      state.leftBound = state.leftA;
      state.rightBound = state.rightB;
    }
    state.currentCalc += 1;
    this.updateDOM();
    this.populateResults();
    this.switchPage(PAGES.RESULTS);
  }

  populateResults() {
    let results = this.items.map(
      (i, index) =>
        `<div class="page-results-row page-results-row-${index + 1}">` +
        `<img src="assets/cats/${this.cats[i].filename}" class="img-small" alt="${this.cats[i].name}">` +
        `<div class="page-results-row-number">${
          index == 0 ? "🥇" : index == 1 ? "🥈" : index == 2 ? "🥉" : index + 1
        }</div>` +
        `<div class="page-results-row-text">${this.cats[i].name}</div>` +
        `</div>`
    );
    console.log(results.join(""));
    document.getElementById("page-results--inner").innerHTML = results.join("");
  }
  select(right) {
    let state = this.state;
    let remaining = state.rightBound - state.leftBound;
    if (remaining % 2) {
      // Odd
      let positiontoFill = state.rightBound - 1;

      if (right) {
        // Odd and Right
        state.temp[positiontoFill] = this.items[state.leftB - 1];
        state.leftB -= 1;
      } else {
        // Odd and Left
        state.temp[positiontoFill] = this.items[state.rightB - 1];
        state.rightB -= 1;
      }

      state.rightBound -= 1;
    } else {
      let positiontoFill = state.leftBound;
      if (right) {
        // Even and Right
        // Right gets placed in front
        state.temp[positiontoFill] = this.items[state.rightA];
        state.rightA += 1;
      } else {
        // Even and Left
        state.temp[positiontoFill] = this.items[state.leftA];
        state.leftA += 1;
      }
      state.leftBound += 1;
    }
    this.run();
  }

  updateDOM() {
    let percentage = Math.round(
      ((this.state.currentCalc - 1) * 100) / this.state.totalCalc
    );
    document.getElementById("p-full").innerHTML = `Full: [${this.items
      .toString()
      .replaceAll(",", ", ")}]`;
    document.getElementById("p-temp").innerHTML = `Temp: [${this.state.temp
      .toString()
      .replaceAll(",", ", ")}] ${this.state.leftA} ${this.state.leftB} ${
      this.state.rightA
    } ${this.state.rightB}`;
    document.getElementById(
      "progress-bar-inner"
    ).innerHTML = ` ${percentage}% (Max. ${
      this.state.totalCalc - this.state.currentCalc + 1
    } remaining)`;
    document.getElementById(
      "progress-bar-inner"
    ).style.width = `${percentage}%`;
  }

  updateButtons() {
    let state = this.state;
    let remaining = state.leftB - state.leftA + state.rightB - state.rightA;
    let leftChoice = remaining % 2 ? this.state.leftB - 1 : this.state.leftA;
    let rightChoice = remaining % 2 ? this.state.rightB - 1 : this.state.rightA;
    let leftCat = this.cats[leftChoice];
    let rightCat = this.cats[rightChoice];
    document.getElementById(
      "select-panel-left--image"
    ).innerHTML = `<img src="assets/cats/${leftCat.filename}" class="img" alt = "cat" />`;
    document.getElementById(
      "select-panel-right--image"
    ).innerHTML = `<img src="assets/cats/${rightCat.filename}" class="img" alt = "cat" />`;
    document.getElementById("select-panel-left--header").innerHTML =
      leftCat.name;
    document.getElementById("select-panel-right--header").innerHTML =
      rightCat.name;
  }

  switchPage(type) {
    if (!Object.values(PAGES).includes(type)) {
      return;
    }
    document.getElementById(PAGES.QUIZ).style.display = "none";
    document.getElementById(PAGES.RESULTS).style.display = "none";
    document.getElementById(PAGES.START).style.display = "none";
    document.getElementById(type).style.display = "block";
  }

  getClipboard() {
    navigator.clipboard.writeText(
      "Cat Ranking: \n" +
        this.items
          .map((i, index) => `${index + 1}. ${this.cats[i].name}`)
          .join("\n")
          .replace("<br />", "")
    );
    let clipboard = document.getElementById("button-clipboard");
    let temp = clipboard.innerHTML;
    clipboard.innerHTML = "Copied!";

    setTimeout(() => {
      clipboard.innerHTML = temp;
    }, 1000);
  }
}

let sorter = async function () {
  let sorter = new Sorter();
  sorter.loadCats();
  let selectLeft = document.getElementById("select-panel-left");
  selectLeft.addEventListener("click", () => {
    selectLeft.disabled = true;
    selectRight.disabled = true;
    sorter.select(false);
  });
  let selectRight = document.getElementById("select-panel-right");
  selectRight.addEventListener("click", () => {
    selectLeft.disabled = true;
    selectRight.disabled = true;
    sorter.select(true);
  });

  // Start
  let startButton = document.getElementById("start");
  startButton.addEventListener("click", () => {
    sorter.run();
    sorter.switchPage(PAGES.QUIZ);
  });

  // Clipboard
  let clipboard = document.getElementById("button-clipboard");
  clipboard.addEventListener("click", () => {
    sorter.getClipboard();
  });
};

sorter();
