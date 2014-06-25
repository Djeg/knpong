(function (window) {
    'use strict';

    var createCanvas = function () {
        var canvas = window.document.createElement('canvas');
        canvas.setAttribute('width', '800');
        canvas.setAttribute('height', '600');

        window.document.getElementsByTagName('body')[0].appendChild(canvas);

        return canvas;
    };

    // get the canvas and init the game ;)
     var canvas     = createCanvas();
     var fullscreen = new window.Fullscreener(canvas);
     var scene      = new window.TitleScene();
     var game       = new window.Pong(canvas);
     fullscreen.init();
     game.init(scene);
     game.play(new window.GameLoop());
})(this);
