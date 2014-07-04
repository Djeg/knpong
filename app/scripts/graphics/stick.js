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
        this.speed      = 5;
        this.doPush     = false;
        this.pushRight  = false;
        this.powerLimit = window.Math.round(window.Math.random() * 10);
        this.powered    = 0;
        this.power      = null;
    };

    Stick.prototype.draw = function (pong) {
        if (this.doPush) {
            if (this.pushRight) {
                this.coords.x += 2;
            } else {
                this.coords.x -= 2;
            }

            if (this.position === 'left') {
                if (this.coords.x >= 15) {
                    this.pushRight = false;
                }

                if (this.coords.x <= 5) {
                    this.coords.x = 5;
                    this.doPush = false;
                }
            } else {
                if (this.coords.x <= pong.canvas.width - this.size.width - 15) {
                    this.pushRight = true;
                }

                if (this.coords.x >= pong.canvas.width - this.size.width - 5) {
                    this.doPush = false;
                    this.coords.x = pong.canvas.width - this.size.width - 5;
                }
            }
        }

        if (this.power !== null) {
            if(!this.power.check(pong, this)) {
                this.power = null;
            }
        }

        pong.context.fillStyle = 'black';
        pong.context.fillRect(
            this.coords.x,
            this.coords.y,
            this.size.width,
            this.size.height
        );
    };

    Stick.prototype.initPowered = function () {
        this.powered    = 0;
        this.powerLimit = window.Math.round(window.Math.random() * 10);
    };

    Stick.prototype.init = function (pong) {
        if ('right' === this.position) {
            this.coords.x = pong.canvas.width - this.size.width - 5;
        } else {
            this.coords.x = 5;
        }
        this.coords.y   = (pong.canvas.height/2) - (this.size.height/2);
        this.speed      = 5;
        this.doPush     = false;
        this.initPowered();

        if (this.power !== null) {
            this.power.stop(pong, this);
            this.power = null;
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

    Stick.prototype.speedUp = function () {
        this.speed = this.speed + window.Math.random();
    };

    Stick.prototype.push = function () {
        this.doPush    = true;
        this.pushRight = this.position === 'left';
    };

    Stick.prototype.enhancedPower = function (power) {
        if (power.has) {
            return;
        }

        this.powered += 1;
        power.powered = this.powered >= this.powerLimit;
    };

    window.StickGraphic = Stick;
})(this);
