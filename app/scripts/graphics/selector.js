(function (window) {
    'use strict';

    var Selector = function (indexLimit) {
        this.size       = {
            width: 350,
            height: 50
        };
        this.opacity    = 0.5;
        this.opCoef     = 0.01;
        this.addOpacity = false;
        this.index      = 0;
        this.limit      = undefined === indexLimit ? 2 : indexLimit;
    };

    Selector.prototype.draw = function (pong) {
        var centerX = (pong.canvas.width/2) - (this.size.width/2);
        pong.context.fillStyle = 'rgba(0, 0, 0, ' + this.opacity + ')';
        var y = 368 + (50 * this.index);
        pong.context.fillRect(centerX, y, this.size.width, this.size.height);

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

        pong.context.restore();
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
