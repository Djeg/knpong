(function (window) {
    'use strict';

    var Command = function () {
        this.text  = 'Commands';
        this.style = '25px Arial';
    };

    Command.prototype.draw = function (pong) {
        pong.context.font      = this.style;
        pong.context.fillStyle = 'black';
        var textSize           = pong.context.measureText(this.text);
        var centerX            = (pong.canvas.width/2) - (textSize.width/2);

        pong.context.fillText(this.text, centerX, 450);
    };

    window.CommandGraphic = Command;
})(this);
