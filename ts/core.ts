export class EventEmitter {
    _events: Object = {};
    
    on(evt: string, listener: Function) {
        (this._events[evt] || (this._events[evt] = [])).push(listener);
        return this;
    }
    emit(evt: string, arg?: any): void {
        (this._events[evt] || []).slice().forEach(lsn => lsn(arg));
    }
}

export function shuffle(arr: any[]): any[] {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
    }

    return arr;
}

export function random(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const color: string[] = [
    '#ff0000', '#008000', '#1e90ff', '#ff8c00', '#ffd700', '#6a5acd', '#483d8b', '#ff00ff',
    '#4b0082', '#ff1493', '#ff6347', '#b22222', '#2f4f4f', '#8b4513', '#20b2aa', '#ff69b4'
];