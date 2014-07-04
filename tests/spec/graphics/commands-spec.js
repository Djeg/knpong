describe('A command graphic', function () {
    var pong, canvas, size, command;

    beforeEach(function () {
        canvas       = window.document.getElementById('pong');
        pong         = new window.Pong(canvas);
        size         = {width: 10};
        command      = new window.CommandGraphic();
        pong.context = jasmine.createSpyObj('context', ['measureText', 'fillText']);
        pong.context.measureText.andReturn(size);
    });

    it('display a command title', function () {
        expect(command.text).toBe('Commands');
        expect(command.style).toBe('25px Arial');

        command.draw(pong);

        expect(pong.context.font).toBe(command.style);
        expect(pong.context.fillStyle).toBe('black');
        expect(pong.context.measureText).toHaveBeenCalledWith(command.text);
        expect(pong.context.fillText).toHaveBeenCalledWith(
            command.text,
            (pong.canvas.width / 2) - (size.width / 2),
            450
        );
    });
})
