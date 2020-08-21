export default class Block {
  constructor(x, y) {
    this.el = document.createElement("div");
    this.x = x;
    this.el.setAttribute("x", this.x);
    this.y = y;
    this.el.setAttribute("y", this.y);


    this._start = false;
    this._end = false;
    this._wall = false;
    this._trans = true;
    
    this.ga = 0;
    this.ha = 0;
    this.fa = 0;

    this.visited = false;
    this.neighbors = [];
    this.previous = undefined;
  }

  get start() { return this._start;}

  set start(bool) {
    if (!this.end) {
      this._start = bool;
      if (bool) {
        this.wall = false;
        this.el.id = "start";
      } else {
        this.el.id = "";
      }
    }
  }

  get end() { return this._end;}

  set end(bool) {
    if (!this.start) {
      this._end = bool;
      if (bool) {
        this.wall = false;
        this.el.id = "end";
      } else {
        this.el.id = "";
      }
    }
  }

  get wall() { return this._wall;}

  set wall(bool) {
    if (bool) {
      if (!this.start && !this.end) {
        this._wall = bool;
        this.el.classList.add("wall");
      }
    } else {
      this._wall = bool;
      this.el.classList.remove("wall");
      if (this.trans) {
        this.el.classList.add("wall_down");
        setTimeout(() => {
          this.el.classList.remove("wall_down");
        }, 500)
      }
    }
  }

  get trans() { return this._trans}

  set trans(bool) {
    this._trans = bool
    if (bool) {
      this.el.classList.remove("no_trans");
    } else {
      this.el.classList.add("no_trans");
    }
  }

  wallNoTransSet(bool) {
    this._wall = bool;
    if (bool) {
      if (!this.start && !this.end) {
        this.el.classList.add("wall");
      }
    } else {
      this.el.classList.remove("wall");
    }
  }
}