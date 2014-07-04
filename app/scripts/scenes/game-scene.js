(function (window) {
    'use strict';

    var GameScene = function () {
        this.graphics = {
            stickLeft:   new window.StickGraphic('left'),
            stickRight:  new window.StickGraphic('right'),
            ball:        new window.BallGraphic(),
            middleBar:   new window.MiddleBarGraphic(),
            scoreLeft:   new window.ScoreGraphic('left'),
            scoreRight:  new window.ScoreGraphic('right'),
            powerLeft:   new window.PowerGraphic('left'),
            powerRight:  new window.PowerGraphic('right')
        };
        this.powers      = [
            window.SuperBarPower,
            window.SuperBallPower,
            window.FartModePower,
            window.InverseStickPower
        ];
        this.pushSounds  = [new window.Audio('sound/ni.mp3')];
        this.powerSounds = [
            new window.Audio('sound/banzai_01.mp3'),
            new window.Audio('sound/banzai_02.mp3'),
            new window.Audio('sound/banzai_03.mp3'),
            new window.Audio('sound/banzai_04.mp3'),
            new window.Audio('sound/banzai_05.mp3'),
            new window.Audio('sound/banzai_06.mp3'),
        ];
        this.looseSound = new window.Audio('sound/loose.mp3');
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

        if (pong.keyboard.isKeyPress('d') && !this.graphics.stickLeft.doPush) {
            this.graphics.stickLeft.push();
        }

        if (pong.keyboard.isKeyPress('left') && !this.graphics.stickRight.doPush) {
            this.graphics.stickRight.push();
        }

        if (pong.keyboard.isKeyPress('q') &&
                this.graphics.powerLeft.powered &&
                null === this.graphics.stickLeft.power
        ) {
            var power = this.pickPower();
            if (false !== power.start(pong, this.graphics.stickLeft)) {
                this.playPowerSound();
                this.graphics.powerLeft.powered = false;
                this.graphics.stickLeft.initPowered();
                this.graphics.stickLeft.power = power;
            }
        }

        if (pong.keyboard.isKeyPress('right') &&
                this.graphics.powerRight.powered &&
                null === this.graphics.stickRight.power
        ) {
            var power = this.pickPower();
            if (false !== power.start(pong, this.graphics.stickRight)) {
                this.playPowerSound();
                this.graphics.powerRight.powered = false;
                this.graphics.stickRight.initPowered();
                this.graphics.stickRight.power = power;
            }
        }

        if (this.graphics.ball.collideStick(this.graphics.stickLeft)) {
            this.playPushSound();
            this.graphics.stickLeft.enhancedPower(this.graphics.powerLeft);
            if (this.graphics.stickLeft.doPush) {
                this.graphics.ball.pushed();
            }
            this.graphics.ball.goLeft = false;
            this.graphics.ball.goUp   = pong.keyboard.isKeyPress('z') ?
                    true :
                    this.graphics.ball.goUp
            ;
            this.graphics.ball.goDown = pong.keyboard.isKeyPress('q') ?
                true :
                this.graphics.ball.goDown
            ;

            this.graphics.ball.speedUp();
            this.graphics.stickLeft.speedUp();
            this.graphics.stickRight.speedUp();
        }

        if (this.graphics.ball.collideStick(this.graphics.stickRight)) {
            this.playPushSound();
            this.graphics.stickRight.enhancedPower(this.graphics.powerRight);
            if (this.graphics.stickRight.doPush) {
                this.graphics.ball.pushed();
            }
            this.graphics.ball.goLeft = true;
            this.graphics.ball.goUp   = pong.keyboard.isKeyPress('up') ?
                    true :
                    this.graphics.ball.goUp
            ;
            this.graphics.ball.goDown = pong.keyboard.isKeyPress('down') ?
                true :
                this.graphics.ball.goDown
            ;

            this.graphics.ball.speedUp();
            this.graphics.stickLeft.speedUp();
            this.graphics.stickRight.speedUp();
        }

        if (this.graphics.ball.leftColision) {
            this.looseSound.play();
            this.graphics.scoreRight.up();
            this.graphics.ball.init(pong);
            this.graphics.stickLeft.init(pong);
            this.graphics.stickRight.init(pong);
        }

        if (this.graphics.ball.rightColision) {
            this.looseSound.play();
            this.graphics.scoreLeft.up();
            this.graphics.ball.init(pong);
            this.graphics.stickLeft.init(pong);
            this.graphics.stickRight.init(pong);
        }
    };

    GameScene.prototype.pickPower = function () {
        var i = window.Math.floor(window.Math.random() * this.powers.length);

        return new this.powers[i]();
    };

    GameScene.prototype.playPowerSound = function () {
        var i = window.Math.floor(window.Math.random() * this.powerSounds.length);

        this.powerSounds[i].play();
    };

    GameScene.prototype.playPushSound = function () {
        var i = window.Math.floor(window.Math.random() * this.pushSounds.length);

        this.pushSounds[i].play();
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
