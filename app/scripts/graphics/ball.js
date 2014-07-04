(function (window) {
    'use strict';

    var Ball = function () {
        this.coords         = {
            x: 0,
            y: 0
        };
        this.radius         = 10;
        this.goLeft         = window.Math.random() < 0.5;
        this.goUp           = window.Math.random() < 0.5;
        this.speedX         = 3;
        this.speedY         = 3;
        this.leftColision   = false;
        this.rightColision  = false;
        this.isPushed       = false;
        this.memory         = this.speedX;
    };

    Ball.prototype.move = function (pong) {
        this.leftColision = this.rightColision = false;

        if (this.goLeft) {
            this.coords.x -= this.speedX;
        } else {
            this.coords.x += this.speedX;
        }

        if (this.goUp) {
            this.coords.y -= this.speedY;
        } else if(false === this.goUp) {
            this.coords.y += this.speedY;
        }

        if (this.coords.x <= 0) {
            this.leftColision = true;
            this.coords.x     = 0;
            this.goLeft       = false;
        }

        if (this.coords.x >= pong.canvas.width - this.radius) {
            this.rightColision = true;
            this.coords.x      = pong.canvas.width - this.radius;
            this.goLeft        = true;
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

    Ball.prototype.speedUp = function () {
        if (this.isPushed) {
            this.memory = this.memory + window.Math.random();
        } else {
            this.speedX = this.speedX + window.Math.random();
        }
        this.speedY = this.speedY + window.Math.random();
    };

    Ball.prototype.collideStick = function (stick) {
        var collideY = this.coords.y - this.radius <= stick.coords.y + stick.size.height &&
            this.coords.y + this.radius >= stick.coords.y
        ;

        var collideX = this.coords.x - this.radius  <= stick.coords.x + stick.size.width &&
            this.coords.x + this.radius >= stick.coords.x
        ;

        if (collideX && collideY) {
            this.isPushed = false;
            this.speedX   = this.memory;
        }

        return collideX && collideY;
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

    Ball.prototype.pushed = function () {
        this.memory   = this.speedX;
        this.speedX   = this.speedX * 2;
        this.isPushed = true;
    };

    Ball.prototype.init = function (pong) {
        this.coords.x = pong.canvas.width/2 - this.radius;
        this.coords.y = pong.canvas.height/2 - this.radius;
        this.speedX   = 3;
        this.speedY   = 3;
        this.memory   = this.speedX;
        this.isPushed = false;
    };

    window.BallGraphic = Ball;
})(this);
