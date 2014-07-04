describe('A selector graphic', function () {
    var pong, canvas, selector;

    beforeEach(function () {
        canvas       = window.document.getElementById('pong');
        pong         = new window.Pong(canvas);
        pong.context = jasmine.createSpyObj('context', ['fillRect', 'restore']);
        selector     = new window.SelectorGraphic(null, null, 2);
    });

    it('draw the selector on the screen', function () {
        selector.draw(pong);

        expect(pong.context.fillRect).toHaveBeenCalledWith(
            selector.coords.x,
            selector.coords.y + (selector.size.height * selector.index),
            selector.size.width,
            selector.size.height
        );
        expect(pong.context.restore).toHaveBeenCalled();
    });

    it('blink', function () {
        selector.addOpacity = false;
        selector.opCoef     = 0.01;
        selector.opacity    = 0.5;

        selector.draw(pong);

        expect(selector.opacity).toBe(0.5 - selector.opCoef);

        selector.opacity = 0.1;

        selector.draw(pong);

        expect(selector.opacity).toBe(0.1);
        expect(selector.addOpacity).toBe(true);

        selector.draw(pong);

        expect(selector.opacity).toBe(0.1 + selector.opCoef);

        selector.opacity = 0.5;

        selector.draw(pong);

        expect(selector.opacity).toBe(0.5);
        expect(selector.addOpacity).toBe(false);
    });

    it('Move to the up position', function () {
        selector.index = 0;
        selector.limit = 2;

        selector.up();

        expect(selector.index).toBe(1);

        selector.up();

        expect(selector.index).toBe(0);
    });

    it('Move to the down position', function () {
        selector.index = 0;
        selector.limit = 2;

        selector.down();

        expect(selector.index).toBe(1);

        selector.down();

        expect(selector.index).toBe(0);
    });

    it('Initialize centered position', function () {
        selector.coords = {
            x: 'center',
            y: 'center'
        };

        selector.init(pong);

        expect(selector.coords.x).toBe((pong.canvas.width / 2) - (selector.size.width / 2));
        expect(selector.coords.y).toBe((pong.canvas.height / 2) - (selector.size.height / 2));
    });
});
