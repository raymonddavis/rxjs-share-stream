# rxjs-share-stream

## Install

```
npm i rxjs-share-stream
```

## Usage

```js
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
```

ShareStream will share Observables be using the key passed along with it. If the stream stored at the given key is still hot it will share the stream.

ShareStream uses ReplaySubject meaning if you share the stream after its hot the stream joining later will recieve the previously emitted values.

