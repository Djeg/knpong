(function (window) {
    'use strict';

    var MiddleBar = function () {
        this.coords = {
            x: 0,
            y: 0
        };
        this.width = 10;
        this.spacement = 10;
    };

    MiddleBar.prototype.draw = function (pong) {
        var lineHeight = parseInt(pong.canvas.height / 10) - this.spacement;
        var y = 0;

        pong.context.strokeStyle = 'rgba(0, 0, 0, 0.5)';

        do {
            pong.context.beginPath();
            pong.context.moveTo(this.coords.x, y);
            y = window.Math.round(y + lineHeight);
            pong.context.lineTo(this.coords.x, y);
            pong.context.stroke();
            y = y + this.spacement;
        } while ((y + lineHeight) < pong.canvas.height)
    };

    MiddleBar.prototype.init = function (pong) {
        this.coords.x = (pong.canvas.width/2) - (this.width/2);
    };

    window.MiddleBarGraphic = MiddleBar;
})(this);
