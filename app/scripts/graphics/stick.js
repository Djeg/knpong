(function (window) {
    'use strict';

    var Stick = function (position) {
        this.position = position === 'left' ? position : 'right';
        this.coords = {
            x: 5,
            y: 0
        };
        this.size = {
            width: 20,
            height: 100
        };
        this.speed = 5;
    };

    Stick.prototype.draw = function (pong) {
        pong.context.fillStyle = 'black';
        pong.context.fillRect(
            this.coords.x,
            this.coords.y,
            this.size.width,
            this.size.height
        );
    };

    Stick.prototype.init = function (pong) {
        if ('right' === this.position) {
            this.coords.x = pong.canvas.width - this.size.width - 5;
        }
    };

    Stick.prototype.goUp = function () {
        this.coords.y -= this.speed;

        if (this.coords.y <= 0) {
            this.coords.y = 0;
        }
    };

    Stick.prototype.goDown = function (pong) {
        this.coords.y += this.speed;

        if (this.coords.y + this.size.height > pong.canvas.height) {
            this.coords.y = pong.canvas.height - this.size.height;
        }
    };

    window.StickGraphic = Stick;
})(this);
