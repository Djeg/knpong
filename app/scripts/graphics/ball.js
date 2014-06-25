(function (window) {
    'use strict';

    var Ball = function () {
        this.coords = {
            x: 0,
            y: 0
        };
        this.radius = 10;
        this.goLeft = window.Math.random() < 0.5;
        this.goUp   = window.Math.random() < 0.5;
        this.speedX  = 3;
        this.speedY  = 3;
    };

    Ball.prototype.move = function (pong) {
        if (this.goLeft) {
            this.coords.x -= this.speedX;
        } else {
            this.coords.x += this.speedX;
        }

        if (this.goUp) {
            this.coords.y -= this.speedY;
        } else {
            this.coords.y += this.speedY;
        }

        if (this.coords.x <= 0) {
            this.coords.x = 0;
            this.goLeft = false;
        }

        if (this.coords.x >= pong.canvas.width - this.radius) {
            this.coords.x = pong.canvas.width - this.radius;
            this.goLeft = true;
        }

        if (this.coords.y <= 0) {
            this.coords.y = 0;
            this.goUp = false;
        }

        if (this.coords.y >= pong.canvas.height - this.radius) {
            this.coords.y = pong.canvas.height - this.radius;
            this.goUp = true;
        }
    };

    Ball.prototype.collideStick = function (stick) {
        var collideX = {
            ifGoLeft:  this.coords.x - this.radius <= stick.coords.x + stick.size.width,
            ifGoRight: this.coords.x + this.radius >= stick.coords.x
        };
        var collideY = this.coords.y - this.radius <= stick.coords.y + stick.size.height &&
            this.coords.y + this.radius >= stick.coords.y
        ;

        if (this.goLeft) {
            if (!collideX.ifGoLeft) {
                return false;
            }

            if (!collideY) {
                return false;
            }

            return true;
        } else {
            if (!collideX.ifGoRight) {
                return false;
            }

            if (!collideY) {
                return false;
            }

            return true;
        }

        return false;
    };

    Ball.prototype.draw = function (pong) {
        pong.context.fillStyle = 'black';
        pong.context.arc(
            this.coords.x,
            this.coords.y,
            this.radius,
            0,
            2 * window.Math.PI,
            false
        );
        pong.context.fill();
    };

    Ball.prototype.init = function (pong) {
        this.coords.x = pong.canvas.width/2 - this.radius;
        this.coords.y = pong.canvas.height/2 - this.radius;
    };

    window.BallGraphic = Ball;
})(this);
