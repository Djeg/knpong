describe('A ball graphic', function () {
    var pong, stick, ball;

    beforeEach(function () {
        pong              = new window.Pong(window.document.getElementById('pong'));
        pong.context      = jasmine.createSpyObj('context', ['arc', 'fill']);
        stick             = new window.StickGraphic('left');
        ball              = new window.BallGraphic();
        stick.coords.y    = 10;
        stick.size.height = 100;
        stick.coords.x    = 5;
        stick.size.width  = 25;
    });

    it('Move randomly on x and y', function () {
        ball.goLeft = true;
        ball.goUp   = true;
        ball.coords = {
            x: 10,
            y: 10
        };

        ball.move(pong);

        expect(ball.coords.x).toBe(10 - ball.speedX);
        expect(ball.coords.y).toBe(10 - ball.speedY);
    });

    it('Detect horizontal colision', function () {
        ball.goLeft = true;
        ball.goUp   = true;
        ball.coords = {
            x: 0,
            y: 10
        };

        ball.move(pong);

        expect(ball.coords.x).toBe(0);
        expect(ball.goLeft).toBe(false);

        ball.goLeft = false;
        ball.goUp   = true;
        ball.coords = {
            x: pong.canvas.width,
            y: 10
        };

        ball.move(pong);

        expect(ball.coords.x).toBe(pong.canvas.width - ball.radius);
        expect(ball.goLeft).toBe(true);
    });

    it('Detect vertical colision', function () {
        ball.goLeft = true;
        ball.goUp   = true;
        ball.coords = {
            x: 10,
            y: 0
        };

        ball.move(pong);

        expect(ball.coords.y).toBe(0);
        expect(ball.goUp).toBe(false);

        ball.goLeft = true;
        ball.goUp   = false;
        ball.coords = {
            x: 10,
            y: pong.canvas.height
        };

        ball.move(pong);

        expect(ball.coords.y).toBe(pong.canvas.height - ball.radius);
        expect(ball.goUp).toBe(true);
    });

    it('Detect left top side of stick colision', function () {
        ball.coords.y = stick.coords.y - ball.radius;
        ball.coords.x = stick.coords.x - ball.radius;

        expect(ball.collideStick(stick)).toBe(true);

        ball.coords.y -= 1;

        expect(ball.collideStick(stick)).toBe(false);
    });

    it('Detect right top side of stick colision', function () {
        ball.coords.y = stick.coords.y - ball.radius;
        ball.coords.x = (stick.coords.x + stick.size.width) + ball.radius;

        expect(ball.collideStick(stick)).toBe(true);

        ball.coords.y -= 1;

        expect(ball.collideStick(stick)).toBe(false);
    });

    it('Detect left bottom side of stick colision', function () {
        ball.coords.y = (stick.coords.y + stick.size.height) + ball.radius;
        ball.coords.x = stick.coords.x - ball.radius;

        expect(ball.collideStick(stick)).toBe(true);

        ball.coords.y += 1;

        expect(ball.collideStick(stick)).toBe(false);
    });

    it('Detect right bottom side of stick colision', function () {
        ball.coords.y = (stick.coords.y + stick.size.height) + ball.radius;
        ball.coords.x = (stick.coords.x + stick.size.width) + ball.radius;

        expect(ball.collideStick(stick)).toBe(true);

        ball.coords.y += 1;

        expect(ball.collideStick(stick)).toBe(false);
    });

    it('Can be drawed', function () {
        ball.draw(pong);

        expect(pong.context.fillStyle).toBe('black');
        expect(pong.context.arc).toHaveBeenCalledWith(
            ball.coords.x,
            ball.coords.y,
            ball.radius,
            0,
            2 * window.Math.PI,
            false
        );
        expect(pong.context.fill).toHaveBeenCalled();
    });

    it('Initialize the ball coords at the center of the canvas', function () {
        ball.init(pong);

        expect(ball.coords.x).toBe(pong.canvas.width/2 - ball.radius);
        expect(ball.coords.y).toBe(pong.canvas.height/2 - ball.radius);
    });
});
