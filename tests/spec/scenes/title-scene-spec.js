describe('A title scene', function () {
    var scene;
    var pong;
    var canvas;
    var keyboard;

    beforeEach(function () {
        canvas   = window.document.createElement('canvas');
        keyboard = new window.Keyboard();
        scene    = new window.TitleScene();
        pong     = new window.Pong(canvas, keyboard);
    });

    it('draw every graphics', function () {
        for (var i in scene.graphics) {
            spyOn(scene.graphics[i], 'draw');
        }

        scene.act(pong);

        for (var i in scene.graphics) {
            expect(scene.graphics[i].draw).toHaveBeenCalledWith(pong);
        }
    });

    it('Move selector on key up and down', function () {
        spyOn(keyboard, 'isKeyPush').andReturn(true);
        spyOn(scene.graphics.selector, 'up');
        spyOn(scene.graphics.selector, 'down');

        scene.act(pong);

        expect(scene.graphics.selector.up).toHaveBeenCalled();
        expect(scene.graphics.selector.down).toHaveBeenCalled();
    });

    it('does not move if key up and down are not pushed', function () {
        spyOn(keyboard, 'isKeyPush').andReturn(false);
        spyOn(scene.graphics.selector, 'up');
        spyOn(scene.graphics.selector, 'down');

        scene.act(pong);

        expect(scene.graphics.selector.up).not.toHaveBeenCalled();
        expect(scene.graphics.selector.down).not.toHaveBeenCalled();
    });

    it('Change scene when enter is press', function () {
        spyOn(keyboard, 'isKeyPress').andReturn(true);
        spyOn(pong, 'changeScene');
        scene.graphics.selector.index = 0;

        scene.act(pong);

        expect(pong.changeScene).toHaveBeenCalledWith(jasmine.any(Object));
    });
});
