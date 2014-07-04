(function (window) {
    'use strict';

    var Score = function (position) {
        this.position = position === 'left' ? 'left' : 'right';
        this.coords   = {
            x: 0,
            y: 0
        };
        this.amount = 0;
    };

    Score.prototype.init = function (pong) {
        if ('left' === this.position) {
            this.coords.x = (pong.canvas.width/2) - 100;
        }

        if ('right' === this.position) {
            this.coords.x = (pong.canvas.width/2) + 100;
        }

        this.coords.y = pong.canvas.height - 30;
    };

    Score.prototype.draw = function (pong) {
        pong.context.font      = '20px Arial';
        pong.context.fillStyle = 'rgba(0, 0, 0, 0.8)';

        pong.context.fillText(this.amount, this.coords.x, this.coords.y);
    };

    Score.prototype.up = function (pong) {
        this.amount = this.amount + 1;
    };

    window.ScoreGraphic = Score;
})(this);
