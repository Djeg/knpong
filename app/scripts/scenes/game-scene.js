(function (window) {
    'use strict';

    var GameScene = function () {
        this.graphics = {
            stickLeft:   new window.StickGraphic('left'),
            stickRight:  new window.StickGraphic('right'),
            ball:        new window.BallGraphic()
        };
    };

    GameScene.prototype.act = function (pong) {
        for (var i in this.graphics) {
            this.graphics[i].draw(pong);
        }

        this.graphics.ball.move(pong);

        if (pong.keyboard.isKeyPress('up')) {
            this.graphics.stickRight.goUp(pong);
        }

        if (pong.keyboard.isKeyPress('down')) {
            this.graphics.stickRight.goDown(pong);
        }

        if (pong.keyboard.isKeyPress('z')) {
            this.graphics.stickLeft.goUp(pong);
        }

        if (pong.keyboard.isKeyPress('s')) {
            this.graphics.stickLeft.goDown(pong);
        }

        if (this.graphics.ball.collideStick(this.graphics.stickLeft)) {
            this.graphics.ball.goLeft = false;
            this.graphics.ball.goUp   = pong.keyboard.isKeyPress('z') ?
                    true :
                    this.graphics.ball.goUp
            ;
            this.graphics.ball.goDown = pong.keyboard.isKeyPress('q') ?
                true :
                this.graphics.ball.goDown
            ;
        }

        if (this.graphics.ball.collideStick(this.graphics.stickRight)) {
            this.graphics.ball.goLeft = true;
            this.graphics.ball.goUp   = pong.keyboard.isKeyPress('up') ?
                    true :
                    this.graphics.ball.goUp
            ;
            this.graphics.ball.goDown = pong.keyboard.isKeyPress('down') ?
                true :
                this.graphics.ball.goDown
            ;
        }
    };

    GameScene.prototype.init = function (pong) {
        for (var i in this.graphics) {
            if (this.graphics[i].init !== undefined) {
                this.graphics[i].init(pong);
            }
        }
    };

    window.GameScene = GameScene;
})(this);
