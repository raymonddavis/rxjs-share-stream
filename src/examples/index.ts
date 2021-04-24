import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { ShareStream } from '..';

const shareStream = new ShareStream();

const key = 'key';
const obs$ = interval(1000).pipe(take(10));

const share1$ = shareStream.run(key, obs$);
const share2$ = shareStream.run(key, obs$);

share1$.subscribe({
    next: (val) => {
        console.log('share1$', val);
    },
    error: (err) => {
        console.error(err);
    },
    complete: () => {
        console.log('share1$ complete');
    },
});

share2$.subscribe({
    next: (val) => {
        console.log('share2$', val);
    },
    error: (err) => {
        console.error(err);
    },
    complete: () => {
        console.log('share2$ complete');
    },
});
