(function (window) {
    'use strict';

    var Selector = function (coords, size, indexLimit) {
        this.size       = size === undefined || size === null ? {
            width: 350,
            height: 50
        } : size;
        this.coords     = coords === undefined || coords === null ? {
            x: 0,
            y: 0
        } : coords;
        this.limit      = undefined === indexLimit ? 1 : indexLimit;
        this.opacity    = 0.5;
        this.opCoef     = 0.01;
        this.addOpacity = false;
        this.index      = 0;
    };

    Selector.prototype.draw = function (pong) {
        pong.context.fillStyle = 'rgba(0, 0, 0, ' + this.opacity + ')';
        var y = this.coords.y + (this.size.height * this.index);
        pong.context.fillRect(this.coords.x, y, this.size.width, this.size.height);

        this.opacity = this.addOpacity ?
            this.opacity + this.opCoef :
            this.opacity - this.opCoef
        ;

        if (this.opacity >= 0.5) {
            this.opacity = 0.5;
            this.addOpacity = false;
        }

        if (this.opacity <= 0.1) {
            this.opacity = 0.1;
            this.addOpacity = true;
        }
    };

    Selector.prototype.init = function(pong) {
        if (this.coords.x === 'center') {
            this.coords.x = (pong.canvas.width/2) - (this.size.width / 2);
        }

        if (this.coords.y === 'center') {
            this.coords.y = (pong.canvas.height / 2) - (this.size.height / 2);
        }
    };

    Selector.prototype.up = function () {
        this.index -= 1;

        if (this.index < 0) {
            this.index = this.limit - 1;
        }
    };

    Selector.prototype.down = function () {
        this.index += 1;

        if (this.index > (this.limit - 1)) {
            this.index = 0;
        }
    };

    window.SelectorGraphic = Selector;
})(this);
