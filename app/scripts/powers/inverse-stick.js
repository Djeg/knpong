(function (window) {
    'use strict';

    var InverseStick = function () {
        this.duration      = 500;
        this.index         = 0;
        this.goUp          = null;
        this.goDown        = null;
        this.inversedStick = null;
    };

    InverseStick.prototype.start = function (pong, stick) {
        if (stick.position === 'left') {
            this.inversedStick = pong.scene.graphics.stickRight;
        } else {
            this.inversedStick = pong.scene.graphics.stickLeft;
        }

        this.goUp                 = this.inversedStick.goUp;
        this.goDown               = this.inversedStick.goDown;
        this.inversedStick.goUp   = this.goDown;
        this.inversedStick.goDown = this.goUp;
    };

    InverseStick.prototype.check = function (pong) {
        if (this.index >= this.duration) {
            this.stop(pong);

            return false;
        }

        this.index += 1;

        return true;
    };

    InverseStick.prototype.stop = function (pong) {
        this.inversedStick.goUp   = this.goUp;
        this.inversedStick.goDown = this.goDown;
        this.index                = 0;
    };

    window.InverseStickPower = InverseStick;
})(this);
