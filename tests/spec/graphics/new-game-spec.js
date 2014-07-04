describe('A new game graphic', function () {
    var pong, canvas, size, context, newGame;

    beforeEach(function () {
        canvas       = window.document.getElementById('pong');
        pong         = new window.Pong(canvas);
        size         = {width: 10};
        pong.context = jasmine.createSpyObj('context', [
            'measureText',
            'fillText'
        ]);
        pong.context.measureText.andReturn(size);

        newGame = new window.NewGameGraphic();
    });

    it('display the game new game text', function () {
        expect(newGame.text).toBe('New game');
        expect(newGame.style).toBe('25px Arial');

        newGame.draw(pong);

        expect(pong.context.font).toBe(newGame.style);
        expect(pong.context.fillStyle).toBe('black');

        expect(pong.context.measureText).toHaveBeenCalledWith(newGame.text);

        expect(pong.context.fillText).toHaveBeenCalledWith(
            newGame.text,
            (pong.canvas.width/2) - (size.width/2),
            400
        );
    });
});
