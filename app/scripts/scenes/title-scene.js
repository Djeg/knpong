(function (window) {
    'use strict';

    var TitleScene = function () {
        this.graphics = {
            title:     new window.TitleGraphic(),
            selector:  new window.SelectorGraphic({
                x: 'center',
                y: 365
            }, {height: 50, width: 350}, 2),
            newGame:   new window.NewGameGraphic(),
            command:   new window.CommandGraphic()
        };
        this.menuSound     = new window.Audio('sound/menu.mp3');
        this.validateSound = new window.Audio('sound/valider.mp3');
    };

    TitleScene.prototype.act = function (pong) {
        for (var i in this.graphics) {
            this.graphics[i].draw(pong);
        }

        if (pong.keyboard.isKeyPress('enter')) {
            this.validateSound.play();
            if (this.graphics.selector.index === 0) {
                // start a new game scene
                pong.changeScene(new window.GameScene());
             } else {
                 // change to the command scene
                 pong.changeScene();
             }
        }

        if (pong.keyboard.isKeyPush('up')) {
            this.menuSound.play();
            this.graphics.selector.up();
        }

        if (pong.keyboard.isKeyPush('down')) {
            this.menuSound.play();
            this.graphics.selector.down();
        }
    };

    TitleScene.prototype.init = function (pong) {
        for (var i in this.graphics) {
            if (undefined !== this.graphics[i].init) {
                this.graphics[i].init(pong);
            }
        }
    };

    window.TitleScene = TitleScene;
})(this);
