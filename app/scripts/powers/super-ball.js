(function (window) {
    'use strict';

    var SuperBall = function () {
        this.duration  = 800;
        this.index     = 0;
        this.radius    = null;
        this.newRadius = 30;
    };

    SuperBall.prototype.start = function (pong, stick) {
        if (pong.scene.graphics.ball.radius === this.newRadius) {
            return false;
        }

        this.radius                     = pong.scene.graphics.ball.radius;
        pong.scene.graphics.ball.radius = this.newRadius;
    };

    SuperBall.prototype.stop = function (pong, stick) {
        pong.scene.graphics.ball.radius = this.radius;
    };

    SuperBall.prototype.check = function (pong, stick) {
        if (this.index >= this.duration) {
            this.stop(pong, stick);

            return false;
        }

        this.index += 1;

        return true;
    };

    window.SuperBallPower = SuperBall;
})(this);
