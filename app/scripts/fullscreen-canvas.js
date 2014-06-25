(function (window) {
    'use strict';

    var FullscreenCanvas = function (canvas, button) {
        this.canvas            = canvas;
        this.size              = {
            width:   canvas.width,
            height:  canvas.height
        };
        this.button            = undefined === button ? this.createButton() : button;
        this.requestFullscreen = canvas.requestFullscreen ||
            canvas.mosRequestFullscreen ||
            canvas.webkitRequestFullscreen
        ;
    };

    FullscreenCanvas.prototype.onFullscreen = function () {
        var isFullscreen = window.document.fullscreenElement ||
            window.document.mozFullscreenElement ||
            window.document.webkitFullscreenElement
        ;
        if (isFullscreen) {
            this.canvas.style.width  = window.innerWidth + 'px';
            this.canvas.style.height = window.innerHeight + 'px';
        } else {
            this.canvas.style.width  = this.size.width + 'px';
            this.canvas.style.height = this.size.height + 'px';
        }
    };

    FullscreenCanvas.prototype.createButton = function () {
        var button = window.document.createElement('button');
        var text   = window.document.createTextNode('Go to fullscreen !');

        button.appendChild(text);

        return button;
    };

    FullscreenCanvas.prototype.bindEvents = function () {
        var self      = this;
        var listeners = [
            'fullscreenchange',
            'mozfullscreenchange',
            'webkitfullscreenchange',
            'msfullscreenchange'
        ];

        for (var i in listeners) {
            window.document.addEventListener(listeners[i], function onFullscreenChange () {
                self.onFullscreen();
            });
        }

        this.button.addEventListener('click', function onClick () {
            if (self.canvas.requestFullscreen) {
                self.canvas.requestFullscreen();
            } else if (self.canvas.mozRequestFullscreen) {
                self.canvas.mozRequestFullscreen();
            } else if (self.canvas.webkitRequestFullscreen) {
                self.canvas.webkitRequestFullscreen();
            }
        });
    };

    FullscreenCanvas.prototype.init = function () {
        window.document.getElementsByTagName('body')[0].appendChild(this.button);

        this.bindEvents();
    };

    window.Fullscreener = FullscreenCanvas;
})(this);
