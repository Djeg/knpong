describe('A GameLoop', function () {
    it('Loop with a request animation frame', function () {
        var spy = jasmine.createSpy('requestAnimationFrame');
        var callb = function () {};
        window.requestAnimationFrame = spy;

        var gameLoop = new window.GameLoop();

        gameLoop.loop(callb);

        expect(spy).toHaveBeenCalledWith(callb);
    });
});
