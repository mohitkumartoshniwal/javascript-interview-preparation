function wrap(arr) {
  return new Proxy(arr, {
    get(target, property) {
      let index = Number(property);

      if (index < 0) {
        index += target.length;
        // TODO use refelect later
          if (index < 0) {
            throw new Error("Index out of bounds");
          }
        return target[index];
      }
      return target[index];
    },
    set(target, property, value) {
      let index = Number(property);

      if (index < 0) {
        index += target.length;

        if (index < 0) {
          throw new Error("Index out of bounds");
        }

        target[index] = value;

        return true;
      }

      target[index] = value;
      return true;
    },
  });
}

const letters = ["a", "b", "c"];
const wrappedLetters = wrap(letters);

console.log(wrappedLetters[0]);
console.log(wrappedLetters[-1]);
