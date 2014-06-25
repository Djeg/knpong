(function (window) {
    'use strict';

    var Pong = function (canvas, keyboard) {
        this.canvas       = canvas;
        this.context      = this.canvas.getContext('2d');
        this.scene        = null;
        this.isInitialize = false;
        this.started      = false;
        this.keyboard     = undefined === keyboard ? new window.Keyboard() : keyboard;
        this.keyboard.init();
    };

    Pong.prototype.clear = function () {
        this.canvas.width  = this.canvas.width;
        this.canvas.height = this.canvas.height;
    };

    Pong.prototype.play = function (gameLoop) {
        var self = this;

        this.clear();

        if (!this.isInitialize) {
            if (this.scene.init !== undefined) {
                this.scene.init(this);
            }

            this.isInitialize = true;
        }

        if (this.scene) {
            this.scene.act(this);
        }

        if (!this.started) {
            return;
        }

        gameLoop.loop(function mainLoop () {
            self.play(gameLoop);
        });
    };

    Pong.prototype.init = function (scene) {
        this.scene   = scene;
        this.started = true;
    };

    Pong.prototype.stop = function () {
        this.started = false;
    };

    Pong.prototype.changeScene = function (scene) {
        this.isInitialize = false;
        this.scene        = scene;
    };

    window.Pong = Pong;
})(this);
