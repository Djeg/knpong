(function (window) {
    'use strict';

    // get the canvas and init the game ;)
     var canvas           = window.document.getElementById('pong');
     var fullscreenButton = window.document.getElementById('fullscreener');
     var fullscreen       = new window.Fullscreener(canvas, fullscreenButton);
     var scene            = new window.TitleScene();
     var game             = new window.Pong(canvas);
     fullscreen.init();
     game.init(scene);
     game.play(new window.GameLoop());
})(this);
