describe('A stick graphic', function () {
    var pong, canvas, stick;

    beforeEach(function () {
        canvas       = window.document.getElementById('pong');
        pong         = new window.Pong(canvas);
        pong.context = jasmine.createSpyObj('context', ['fillRect']);
        stick        = new window.StickGraphic('left');
    });

    it('draw a stick', function () {
        stick.draw(pong);

        expect(pong.context.fillStyle).toBe('black');
        expect(pong.context.fillRect).toHaveBeenCalledWith(
            stick.coords.x,
            stick.coords.y,
            stick.size.width,
            stick.size.height
        );
    });

    it('initialize right coords', function () {
        stick.position = 'right';

        stick.init(pong);

        expect(stick.coords.x).toBe(pong.canvas.width - stick.size.width - 5);
    });

    it('goes up', function () {
        stick.coords.y = 10;

        stick.goUp();

        expect(stick.coords.y).toBe(10 - stick.speed);

        stick.coords.y = 0;

        stick.goUp();

        expect(stick.coords.y).toBe(0);
    });

    it('goes down', function () {
        stick.coords.y = 10;

        stick.goDown(pong);

        expect(stick.coords.y).toBe(10 + stick.speed);

        stick.coords.y = pong.canvas.height - stick.size.height;

        stick.goDown(pong);

        expect(stick.coords.y).toBe(pong.canvas.height -stick.size.height);
    });
})
