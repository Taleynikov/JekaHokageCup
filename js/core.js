export class EventEmitter {
    constructor() {
        this._events = {};
    }
    on(evt, listener) {
        (this._events[evt] || (this._events[evt] = [])).push(listener);
        return this;
    }
    emit(evt, arg) {
        (this._events[evt] || []).slice().forEach(lsn => lsn(arg));
    }
}
export function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
    }
    return arr;
}
export function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const color = [
    '#ff0000', '#008000', '#1e90ff', '#ff8c00', '#ffd700', '#6a5acd', '#483d8b', '#ff00ff',
    '#4b0082', '#ff1493', '#ff6347', '#b22222', '#2f4f4f', '#8b4513', '#20b2aa', '#ff69b4'
];

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxPQUFPLFlBQVk7SUFBekI7UUFDSSxZQUFPLEdBQVcsRUFBRSxDQUFDO0lBU3pCLENBQUM7SUFQRyxFQUFFLENBQUMsR0FBVyxFQUFFLFFBQWtCO1FBQzlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNELElBQUksQ0FBQyxHQUFXLEVBQUUsR0FBUztRQUN2QixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztDQUNKO0FBRUQsTUFBTSxVQUFVLE9BQU8sQ0FBQyxHQUFVO0lBQzlCLEtBQUssSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNyQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDZDtJQUVELE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQUVELE1BQU0sVUFBVSxNQUFNLENBQUMsR0FBVyxFQUFFLEdBQVc7SUFDM0MsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckIsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFdEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDN0QsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLEtBQUssR0FBYTtJQUMzQixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztJQUN0RixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztDQUN6RixDQUFDIiwiZmlsZSI6ImNvcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRXZlbnRFbWl0dGVyIHtcclxuICAgIF9ldmVudHM6IE9iamVjdCA9IHt9O1xyXG4gICAgXHJcbiAgICBvbihldnQ6IHN0cmluZywgbGlzdGVuZXI6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgKHRoaXMuX2V2ZW50c1tldnRdIHx8ICh0aGlzLl9ldmVudHNbZXZ0XSA9IFtdKSkucHVzaChsaXN0ZW5lcik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBlbWl0KGV2dDogc3RyaW5nLCBhcmc/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICAodGhpcy5fZXZlbnRzW2V2dF0gfHwgW10pLnNsaWNlKCkuZm9yRWFjaChsc24gPT4gbHNuKGFyZykpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2h1ZmZsZShhcnI6IGFueVtdKTogYW55W10ge1xyXG4gICAgZm9yIChsZXQgaSA9IGFyci5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XHJcbiAgICAgICAgY29uc3QgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xyXG4gICAgICAgIGNvbnN0IHggPSBhcnJbaV07XHJcbiAgICAgICAgYXJyW2ldID0gYXJyW2pdO1xyXG4gICAgICAgIGFycltqXSA9IHg7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGFycjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbShtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgbWluID0gTWF0aC5jZWlsKG1pbik7XHJcbiAgICBtYXggPSBNYXRoLmZsb29yKG1heCk7XHJcbiAgICBcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY29sb3I6IHN0cmluZ1tdID0gW1xyXG4gICAgJyNmZjAwMDAnLCAnIzAwODAwMCcsICcjMWU5MGZmJywgJyNmZjhjMDAnLCAnI2ZmZDcwMCcsICcjNmE1YWNkJywgJyM0ODNkOGInLCAnI2ZmMDBmZicsXHJcbiAgICAnIzRiMDA4MicsICcjZmYxNDkzJywgJyNmZjYzNDcnLCAnI2IyMjIyMicsICcjMmY0ZjRmJywgJyM4YjQ1MTMnLCAnIzIwYjJhYScsICcjZmY2OWI0J1xyXG5dOyJdfQ==
