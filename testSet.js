import HashSet from "./HashSet.js";

const set = new HashSet();

set.add("apple");
set.add("banana");
set.add("carrot");

console.log("Has apple?", set.has("apple"));
console.log("Length:", set.length());

set.remove("banana");
console.log("After remove banana:", set.keys());

set.add("dog");
set.add("elephant");
set.add("frog");
set.add("grape");
set.add("hat");
set.add("ice");
set.add("jacket");
set.add("kite");

console.log("Capacity before expand:", set.capacity);

set.add("lion"); // trigger resize

console.log("Capacity after expand:", set.capacity);
console.log("All keys:", set.keys());