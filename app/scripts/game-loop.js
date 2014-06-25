(function (window) {
    'use strict';

    var GameLoop = function () {};

    GameLoop.prototype.loop = function (callback) {
        if (window.requestAnimationFrame) {
            window.requestAnimationFrame(callback);
        } else if (window.mozRequestAnimationFrame) {
            window.mozRequestAnimationFrame(callback);
        } else if (window.webkitRequestAnimationFrame) {
            window.webkitRequestAnimationFrame(callback);
        }
    };

    window.GameLoop = GameLoop;
})(this);
