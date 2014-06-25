describe('A keyboard', function () {
    var keyboard = new window.Keyboard();

    it('Attach events on document key down and key up when initialized', function () {
        var callb                 = function () {};
        window.document.onkeydown = callb;
        window.document.onkeyup   = callb;

        keyboard.init();

        expect(window.document.onkeydown).toNotEqual(callb);
        expect(window.document.onkeyup).toNotEqual(callb);
    });

    it('detect pressed keys', function () {
        keyboard.press(keyboard.keys.ENTER);

        expect(keyboard.isKeyPress('enter')).toBe(true);
    });

    it('detect released keys', function () {
        keyboard.press(keyboard.keys.ENTER);
        keyboard.release(keyboard.keys.ENTER);

        expect(keyboard.isKeyPress('enter')).toBe(false);
    });

    it('can press and released a key when push is called', function () {
        keyboard.press(keyboard.keys.ENTER);

        expect(keyboard.isKeyPush('enter')).toBe(true);
        expect(keyboard.isKeyPress('enter')).toBe(false);
    });
});
