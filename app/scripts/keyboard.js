(function (window) {
    'use strict';

    var Keyboard = function () {
        this.keys = {
            ENTER:  13,
            enter:  13,
            SPACE:  32,
            space:  32,
            UP:     38,
            up:     38,
            DOWN:   40,
            down:   40,
            LEFT:   37,
            left:   37,
            RIGHT:  39,
            right:  39,
            A:      65,
            B:      66,
            C:      67,
            D:      68,
            E:      69,
            F:      70,
            G:      71,
            H:      72,
            I:      73,
            J:      74,
            K:      75,
            L:      76,
            M:      77,
            N:      78,
            O:      79,
            P:      80,
            Q:      81,
            R:      82,
            S:      83,
            T:      84,
            U:      85,
            V:      86,
            W:      87,
            X:      88,
            Y:      89,
            Z:      90,
            a:      65,
            b:      66,
            c:      67,
            d:      68,
            e:      69,
            f:      70,
            g:      71,
            h:      72,
            i:      73,
            j:      74,
            k:      75,
            l:      76,
            m:      77,
            n:      78,
            o:      79,
            p:      80,
            q:      81,
            r:      82,
            s:      83,
            t:      84,
            u:      85,
            v:      86,
            w:      87,
            x:      88,
            y:      89,
            z:      90,
            ',':    44,
            ';':    59,
            ':':    58,
            '!':    33,
            '?':    63,
            '.':    46,
            '/':    47,
            '§':    167,
            '^':    94,
            '$':    36,
            'ù':    249,
            '*':    42,
            '¨':    168,
            '£':    163,
            '%':    37,
            'µ':    181,
            'ê':    234,
            '&':    238,
            'é':    233,
            '"':    34,
            '\'':   39,
            '(':    40,
            '-':    45,
            'è':    232,
            '_':    95,
            'ç':    231,
            'à':    224,
            ')':    41,
            '=':    61,
            '~':    126,
            '#':    35,
            '{':    123,
            '[':    91,
            '|':    124,
            '`':    96,
            '\\':   92,
            '@':    64,
            ']':    93,
            '}':    125,
            '<':    60,
            '>':    62,
            'œ':    339,
            '°':    176,
            '+':    43,
            '0':    48,
            '1':    49,
            '2':    50,
            '3':    51,
            '4':    52,
            '5':    53,
            '6':    54,
            '7':    55,
            '8':    56,
            '9':    57
        };
        this.pressedKeys = {};
    };

    Keyboard.prototype.press = function (code) {
        this.pressedKeys[code] = true;

        return this;
    };

    Keyboard.prototype.release = function (code) {
        this.pressedKeys[code] = false;

        return this;
    };

    Keyboard.prototype.isCodePress = function (code) {
        return this.pressedKeys[code];
    };

    Keyboard.prototype.isKeyPress = function (key) {
        return this.pressedKeys[this.keys[key]];
    };

    Keyboard.prototype.isCodePush = function (code) {
        var is                 = this.isCodePress(code);
        this.pressedKeys[code] = false;

        return is;
    };

    Keyboard.prototype.isKeyPush = function (code) {
        var is                            = this.isKeyPress(code);
        this.pressedKeys[this.keys[code]] = false;

        return is;
    };

    Keyboard.prototype.init = function () {
        var self = this;
        window.document.onkeydown = function onKeydown (event) {
            self.press(event.which);
        };
        window.document.onkeyup = function onKeyup (event) {
            self.release(event.which);
        };
    };

    window.Keyboard = Keyboard;
})(this);
