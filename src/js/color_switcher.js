const refs = {
  body: document.querySelector('body'),
};

export default class colorSwitcher {
  constructor(col) {
    this.colors = col;
    this.timerId = null;
    this.randomIntegerFromInterval = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };
    this.initPage();
  }

  colorSwitch() {
    refs.body.style.backgroundColor = `${
      this.colors[this.randomIntegerFromInterval(0, this.colors.length - 1)]
    }`;
  }

  start() {
    this.timerId = setInterval(e => {
      this.colorSwitch();
    }, 8000);
  }

  initPage() {
    refs.body.style.backgroundColor = `${this.colors[0]}`;
    this.start();
  }
}
