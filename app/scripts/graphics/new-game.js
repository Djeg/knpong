(function (window) {
    'use strict';

    var NewGame = function () {
        this.text  = 'New game';
        this.style = '25px Arial';
    };

    NewGame.prototype.draw = function (pong) {
        pong.context.font      = this.style;
        pong.context.fillStyle = 'black';
        var textSize           = pong.context.measureText(this.text);
        var centerX            = (pong.canvas.width/2) - (textSize.width/2);

        pong.context.fillText(this.text, centerX, 400);
    };

    window.NewGameGraphic = NewGame;
})(this);
