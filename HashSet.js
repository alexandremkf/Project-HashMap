class HashSet {
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
  // RESIZE
  // ----------------------------
  resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;

    for (const bucket of oldBuckets) {
      for (const key of bucket) {
        this.add(key);
      }
    }
  }

  // ----------------------------
  // ADD (equivale ao set do HashMap)
  // ----------------------------
  add(key) {
    if (typeof key !== "string") {
      throw new Error("Keys must be strings");
    }

    const index = this.hash(key);
    const bucket = this.buckets[index];

    // If exists, ignore
    if (bucket.includes(key)) return;

    bucket.push(key);
    this.size++;

    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  // ----------------------------
  // HAS
  // ----------------------------
  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    return bucket.includes(key);
  }

  // ----------------------------
  // REMOVE
  // ----------------------------
  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    const pos = bucket.indexOf(key);
    if (pos === -1) return false;

    bucket.splice(pos, 1);
    this.size--;
    return true;
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
      for (const key of bucket) arr.push(key);
    }
    return arr;
  }

  // ----------------------------
  // ENTRIES (Opcional)
  // ----------------------------
  entries() {
    // Para manter padrão com Map: retorna [[key], [key], ...]
    return this.keys().map(key => [key]);
  }
}

export default HashSet;