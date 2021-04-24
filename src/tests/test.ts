import { of, zip } from 'rxjs';
import { ShareStream } from '..';

let shareStream: ShareStream = null;

beforeEach(() => {
    shareStream = new ShareStream();
});

test('Should receive from shared stream', (done) => {
    const key = 'key';
    const one$ = of(1);
    const two$ = of(2);
    const a$ = shareStream.run(key, one$);
    const b$ = shareStream.run(key, two$);
    const c$ = two$;

    zip(a$, b$, c$).subscribe({
        next: ([a, b, c]) => {
            expect(a).toBe(1);
            expect(a).toBe(b);
            expect(b).not.toBe(c);
            expect(c).toBe(2);
        },
        complete: () => done(),
    });
});
