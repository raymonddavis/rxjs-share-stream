import { Observable } from 'rxjs';
import { finalize, publishReplay, refCount } from 'rxjs/operators';

export class ShareStream {
    private _streams: Record<string, Observable<any>> = {};

    public run<T>(key: string, observer: Observable<T>): Observable<T>;
    public run(key: string, observer: Observable<any>): Observable<any> {
        if (this._streams.hasOwnProperty(key)) {
            return this._streams[key];
        }

        this._streams[key] = observer.pipe(
            finalize(() => {
                delete this._streams[key];
            }),
            publishReplay(),
            refCount(),
        );

        return this._streams[key];
    }
}
