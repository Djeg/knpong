describe('A title graphics', function () {
    var pong, titleGraphic, canvas, size;

    beforeEach(function () {
        canvas        = window.document.getElementById('pong');
        pong          = new window.Pong(canvas);
        pong.context  = jasmine.createSpyObj('context', ['fillText', 'measureText']);
        titleGraphic  = new window.TitleGraphic();
        size          = {width: 10};

        pong.context.measureText.andReturn(size);
    });

    it('Display the game title', function () {
        titleGraphic.draw(pong);

        expect(pong.context.fillStyle).toBe('black');
        expect(pong.context.font).toBe(titleGraphic.style);
        expect(pong.context.measureText).toHaveBeenCalled();
        expect(pong.context.fillText).toHaveBeenCalledWith(
            titleGraphic.text,
            (canvas.width/2) - (size.width/2),
            100
        );
    });
});
