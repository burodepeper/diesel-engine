var App, LAYER_BACKGROUND, LAYER_FOREGROUND, Lightsaber, layer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

layer = 1;

LAYER_BACKGROUND = layer++;

LAYER_FOREGROUND = layer++;

App = {
  init: function() {
    var i, j, lightsaber, settings;
    settings = {
      viewport: {
        width: 100,
        height: 100
      }
    };
    if (Engine.init(settings)) {
      this.lightsabers = [];
      for (i = j = 1; j <= 100; i = ++j) {
        lightsaber = new Lightsaber();
        lightsaber.setPosition(0, 0);
        lightsaber.setSize(100, 100);
        lightsaber.init();
        this.lightsabers.push(lightsaber);
      }
    }
  }
};

Lightsaber = (function(superClass) {
  extend(Lightsaber, superClass);

  function Lightsaber() {
    Lightsaber.__super__.constructor.call(this);
    this.color = new Color('#fff');
    this.timer = null;
    this.count = 0;
    this.speed = getRandomInt(500, 1500) * 2;
  }

  Lightsaber.prototype.init = function() {
    this.width = this.getWidth() - 1;
    this.height = this.getHeight() - 1;
    this.a = new Point(getRandomInt(0, this.width), getRandomInt(0, this.height));
    this.b = new Point(getRandomInt(0, this.width), getRandomInt(0, this.height));
    this.line = new Line(LAYER_FOREGROUND);
    this.line.setColor(this.color);
    this.line.from(this.a).to(this.b);
  };

  Lightsaber.prototype.pickRandomColor = function() {
    var color, i, j, values;
    values = [0, 3, 6, 9, 'c', 'f'];
    color = '#';
    for (i = j = 1; j <= 3; i = ++j) {
      color += getRandomFromArray(values);
    }
    this.color.change(color);
  };

  Lightsaber.prototype.pickRandomA = function() {
    var x, y;
    x = getRandomInt(0, this.width);
    y = getRandomInt(0, this.height);
    this.a.moveTo(x, y, this.speed);
  };

  Lightsaber.prototype.pickRandomB = function() {
    var x, y;
    x = getRandomInt(0, this.width);
    y = getRandomInt(0, this.height);
    this.b.moveTo(x, y, this.speed);
  };

  Lightsaber.prototype._update = function() {
    if (!this.timer) {
      this.timer = new Timer(this.speed / 2);
    } else {
      if (this.timer.isComplete) {
        this.pickRandomColor();
        if (this.count % 2) {
          this.pickRandomA();
        } else {
          this.pickRandomB();
        }
        this.timer = null;
        this.count++;
      }
    }
  };

  return Lightsaber;

})(Pane);
