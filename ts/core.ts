export class EventEmitter {
    _events: Object = {};
    
    on(evt: string, listener: Function) {
        (this._events[evt] || (this._events[evt] = [])).push(listener);
        return this;
    }
    emit(evt: string, arg: any): void {
        (this._events[evt] || []).slice().forEach(lsn => lsn(arg));
    }
}