describe('A pong', function () {
    var canvas = window.document.createElement('canvas');
    canvas.setAttribute('width', '800');
    canvas.setAttribute('height', '600');

    it('play a given scene', function () {
        var scene    = jasmine.createSpyObj('scene', ['act', 'init']);
        var pong     = new Pong(canvas);
        var gameLoop = jasmine.createSpyObj('gameLoop', ['loop']);
        var clearSpy = jasmine.createSpy('clear');
        pong.clear   = clearSpy;

        pong.init(scene);

        expect(pong.scene).toEqual(scene);

        pong.play(gameLoop);

        expect(scene.init).toHaveBeenCalled();
        expect(pong.clear).toHaveBeenCalled();
        expect(gameLoop.loop).toHaveBeenCalled();
        expect(scene.act).toHaveBeenCalled();
    });

    it('switch between scene', function () {
        var scene    = jasmine.createSpyObj('scene', ['act', 'init']);
        var scene2   = jasmine.createSpyObj('scene', ['act', 'init']);
        var pong     = new Pong(canvas);
        var gameLoop = jasmine.createSpyObj('gameLoop', ['loop']);
        var clearSpy = jasmine.createSpy('clear');
        pong.clear   = clearSpy;

        pong.init(scene);

        pong.changeScene(scene2);

        pong.play(gameLoop);

        expect(scene2.init).toHaveBeenCalled();
        expect(pong.clear).toHaveBeenCalled();
        expect(gameLoop.loop).toHaveBeenCalled();
        expect(scene2.act).toHaveBeenCalled();
    });

    it('initialize the keyboard control', function () {
        var keyboard = jasmine.createSpyObj('keyboard', ['init']);
        var pong     = new Pong(canvas, keyboard);

        expect(keyboard.init).toHaveBeenCalled();
    });
});
