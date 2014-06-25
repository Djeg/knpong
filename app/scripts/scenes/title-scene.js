(function (window) {
    'use strict';

    var TitleScene = function () {
        this.graphics = {
            title:     new window.TitleGraphic(),
            selector:  new window.SelectorGraphic(2),
            newGame:   new window.NewGameGraphic(),
            command:   new window.CommandGraphic()
        };
    };

    TitleScene.prototype.act = function (pong) {
        for (var i in this.graphics) {
            this.graphics[i].draw(pong);
        }

        if (pong.keyboard.isKeyPress('enter')) {
            if (this.graphics.selector.index === 0) {
                // start a new game scene
                pong.changeScene(new window.GameScene());
             } else {
                 // change to the command scene
                 pong.changeScene();
             }
        }

        if (pong.keyboard.isKeyPush('up')) {
            this.graphics.selector.up();
        }

        if (pong.keyboard.isKeyPush('down')) {
            this.graphics.selector.down();
        }
    };

    window.TitleScene = TitleScene;
})(this);
