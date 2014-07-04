(function (window) {
    'use strict';

    var FartMode = function () {
        this.duration = 1500;
        this.index    = 0;
        this.sounds   = null;
    };

    FartMode.prototype.start = function (pong) {
        this.sounds           = pong.scene.pushSounds;
        this.index            = 0;
        pong.scene.pushSounds = [
            new window.Audio('sound/fart_01.mp3'),
            new window.Audio('sound/fart_02.mp3'),
            new window.Audio('sound/fart_03.mp3'),
            new window.Audio('sound/fart_04.mp3'),
            new window.Audio('sound/fart_05.mp3')
        ];
    };

    FartMode.prototype.check = function (pong) {
        if (this.index >= this.duration) {
            this.stop(pong);

            return false;
        }

        this.index += 1;

        return true;
    };

    FartMode.prototype.stop = function (pong) {
        pong.scene.pushSounds = this.sounds;
        this.sounds           = null;
        this.index            = 0;
    };

    window.FartModePower = FartMode;
})(this)
