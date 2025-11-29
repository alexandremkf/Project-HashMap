class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.size = 0;
    this.buckets = new Array(capacity).fill(null).map(() => []);
  }

  // ----------------------------
  // HASH FUNCTION
  // ----------------------------
  hash(key) {
    let hashCode = 0;
    const prime = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (hashCode * prime + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  // ----------------------------
  // REHASH (DUPLICAR CAPACIDADE)
  // ----------------------------
  resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;

    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }

  // ----------------------------
  // SET
  // ----------------------------
  set(key, value) {
    if (typeof key !== "string") {
      throw new Error("Keys must be strings");
    }

    const index = this.hash(key);
    const bucket = this.buckets[index];

    // update if exists
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }

    // insert new pair
    bucket.push([key, value]);
    this.size++;

    // check load factor
    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  // ----------------------------
  // GET
  // ----------------------------
  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (const [k, v] of bucket) {
      if (k === key) return v;
    }

    return null;
  }

  // ----------------------------
  // HAS
  // ----------------------------
  has(key) {
    return this.get(key) !== null;
  }

  // ----------------------------
  // REMOVE
  // ----------------------------
  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }

    return false;
  }

  // ----------------------------
  // LENGTH
  // ----------------------------
  length() {
    return this.size;
  }

  // ----------------------------
  // CLEAR
  // ----------------------------
  clear() {
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  // ----------------------------
  // KEYS
  // ----------------------------
  keys() {
    const arr = [];
    for (const bucket of this.buckets) {
      for (const [key] of bucket) arr.push(key);
    }
    return arr;
  }

  // ----------------------------
  // VALUES
  // ----------------------------
  values() {
    const arr = [];
    for (const bucket of this.buckets) {
      for (const [, value] of bucket) arr.push(value);
    }
    return arr;
  }

  // ----------------------------
  // ENTRIES
  // ----------------------------
  entries() {
    const arr = [];
    for (const bucket of this.buckets) {
      for (const pair of bucket) arr.push(pair);
    }
    return arr;
  }
}

export default HashMap;