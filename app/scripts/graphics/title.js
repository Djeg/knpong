(function (window) {
    'use strict';

    var Title = function () {
        this.text  = 'KnPong';
        this.style = '50px Arial';
    };

    Title.prototype.draw = function (pong) {
        pong.context.fillStyle = 'black';
        pong.context.font = this.style;
        var size = pong.context.measureText(this.text);
        var centerX = (pong.canvas.width/2) - (size.width/2);

        pong.context.fillText(this.text, centerX, 100);
    };

    window.TitleGraphic = Title;
})(this);
