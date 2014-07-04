describe('A game scene', function () {
    var pong, game;

    beforeEach(function () {
        pong          = new window.Pong(window.document.getElementById('pong'));
        game          = new window.GameScene();
        game.graphics = {
            stickLeft:   new window.StickGraphic('left'),
            stickRight:  new window.StickGraphic('right'),
            ball:        new window.BallGraphic()
        };
        pong.keyboard = jasmine.createSpyObj('keyboard', ['isKeyPress']);
        spyOn(game.graphics.stickLeft, 'goUp');
        spyOn(game.graphics.stickLeft, 'goDown');
        spyOn(game.graphics.stickRight, 'goUp');
        spyOn(game.graphics.stickRight, 'goDown');
    });

    it('Draw every graphics', function () {
        for (var i in game.graphics) {
            spyOn(game.graphics[i], 'draw')
        }

        game.act(pong);

        for (var i in game.graphics) {
            expect(game.graphics[i].draw).toHaveBeenCalled();
        }
    });

    it('Move the ball', function () {
        spyOn(game.graphics.ball, 'move');
        game.act(pong);

        expect(game.graphics.ball.move).toHaveBeenCalledWith(pong);
    });

    it('Move the sticks when specified keys is pressed', function () {
        pong.keyboard.isKeyPress.andReturn(true);

        game.act(pong);

        expect(game.graphics.stickRight.goUp).toHaveBeenCalledWith(pong);
        expect(game.graphics.stickRight.goDown).toHaveBeenCalledWith(pong);
        expect(game.graphics.stickLeft.goUp).toHaveBeenCalledWith(pong);
        expect(game.graphics.stickRight.goDown).toHaveBeenCalledWith(pong);
    });
});
