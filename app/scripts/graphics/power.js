(function (window) {
    'use strict';

    var Power = function (position) {
        this.position = 'left' === position ? 'left' : 'right';
        this.coords = {
            x: 5,
            y: 0
        };
        this.size = {
            width: 15,
            height: 15
        };
        this.powered = false;
    };

    Power.prototype.draw = function (pong) {
        if (this.powered) {
            pong.context.fillStyle = 'rgba(0, 0, 0, 0.8)';
            pong.context.fillRect(this.coords.x, this.coords.y, this.size.width, this.size.height);
        } else {
            pong.context.strokeStyle = 'rgba(0, 0, 0, 0.8)';
            pong.context.strokeRect(this.coords.x, this.coords.y, this.size.width, this.size.height);
        }
    };

    Power.prototype.init = function (pong) {
       if ('right' === this.position) {
            this.coords.x = ((pong.canvas.width/2) - (this.size.width/2)) + 40;
       } else {
            this.coords.x = ((pong.canvas.width/2) - (this.size.width/2)) - (40 + this.size.width/2);
       }
       this.coords.y = 5;
    };

    window.PowerGraphic = Power;
})(this);
