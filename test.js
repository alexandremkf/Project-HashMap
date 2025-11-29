import HashMap from "./HashMap.js";

const test = new HashMap();

// Load factor = 0.75 → capacidade inicial = 16 → 12 itens enchem 75%

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log("Length before expand:", test.length());
console.log("Capacity before expand:", test.capacity);

// overwrite test
test.set('apple', 'dark red');
test.set('banana', 'light yellow');

console.log("Length after overwrite:", test.length()); // must stay same

// Trigger resize
test.set('moon', 'silver');

console.log("Length after insert moon:", test.length());
console.log("Capacity after expand:", test.capacity);

console.log("GET banana:", test.get('banana'));
console.log("HAS lion:", test.has('lion'));
console.log("REMOVE dog:", test.remove('dog'));

console.log("ALL KEYS:", test.keys());
console.log("ALL VALUES:", test.values());
console.log("ALL ENTRIES:", test.entries());