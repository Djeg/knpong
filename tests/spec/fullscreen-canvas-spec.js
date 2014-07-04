describe('A fullscreen canvas', function () {
    var button;
    var canvas;
    var fullscreen;

    beforeEach(function () {
        button     = window.document.createElement('button');
        canvas     = window.document.createElement('canvas');
        fullscreen = new window.Fullscreener(canvas, button);
    });

    it('initiliaze the fullscreen events', function () {
        var fullscreen = new window.Fullscreener(canvas, button);
        var body = jasmine.createSpyObj('body', ['appendChild']);
        spyOn(window.document, 'getElementsByTagName').andReturn([body]);
        spyOn(fullscreen, 'bindEvents');

        fullscreen.init();

        expect(fullscreen.bindEvents).toHaveBeenCalled();
    });


    it('add listeners on the document and button for handle fullscreen changement', function () {
        spyOn(window.document, 'addEventListener');
        spyOn(button, 'addEventListener');

        fullscreen.bindEvents();

        expect(window.document.addEventListener).toHaveBeenCalledWith(
            'fullscreenchange',
            jasmine.any(Function)
        );
        expect(window.document.addEventListener).toHaveBeenCalledWith(
            'mozfullscreenchange',
            jasmine.any(Function)
        );
        expect(window.document.addEventListener).toHaveBeenCalledWith(
            'webkitfullscreenchange',
            jasmine.any(Function)
        );
        expect(window.document.addEventListener).toHaveBeenCalledWith(
            'msfullscreenchange',
            jasmine.any(Function)
        );
        expect(button.addEventListener).toHaveBeenCalledWith('click', jasmine.any(Function));
    });

    it('can create the toggle button', function () {
        var button = window.document.createElement('button');
        var text   = window.document.createTextNode('Go to fullscreen !');

        spyOn(window.document, 'createElement').andReturn(button);
        spyOn(window.document, 'createTextNode').andReturn(text);
        spyOn(button, 'appendChild');

        var btn    = fullscreen.createButton();

        expect(window.document.createElement).toHaveBeenCalledWith('button');
        expect(window.document.createTextNode).toHaveBeenCalledWith('Go to fullscreen !');
        expect(button.appendChild).toHaveBeenCalledWith(text);
        expect(btn).toEqual(button);
    });

    it('resize the canvas when fullscreen is toggle', function () {
        window.document.fullscreenElement = true;

        fullscreen.onFullscreen();

        expect(canvas.style.width).toEqual(window.innerWidth + 'px');
        expect(canvas.style.height).toEqual(window.innerHeight + 'px');

        window.document.fullscreenElement = false;

        fullscreen.onFullscreen();

        expect(canvas.style.width).toEqual(fullscreen.size.width + 'px');
        expect(canvas.style.height).toEqual(fullscreen.size.height + 'px');
    });
});
