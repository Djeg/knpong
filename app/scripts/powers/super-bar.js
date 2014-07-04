(function (window) {
    'use strict';

    var SuperBar = function () {
        this.duration = 1000;
        this.index    = 0;
        this.fired    = false;
        this.height   = false;
    };

    SuperBar.prototype.start = function (pong, stick) {
        this.height       = stick.size.height;
        stick.size.height = stick.size.height * 2;
    };

    SuperBar.prototype.stop = function (pong, stick) {
        stick.size.height = this.height;
    };

    SuperBar.prototype.check = function (pong, stick) {
        if (this.index >= this.duration) {
            this.stop(pong, stick);

            return false;
        }

        this.index += 1;

        return true;
    };

    window.SuperBarPower = SuperBar;
})(this);
