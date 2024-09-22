export function MagicMethods(clazz: any) {
  // A toggle switch for the __isset method
  // Needed to control "prop in instance" inside of getters
  let issetEnabled = true;

  const classHandler = Object.create(null);

  // Trap for class instantiation
  classHandler.construct = (target: any, args: any, receiver: any) => {
    // Wrapped class instance
    const instance = Reflect.construct<any, object>(target, args, receiver);

    // Instance traps
    const instanceHandler = Object.create(null);

    // __get()
    // Catches "instance.property"
    const get = Object.getOwnPropertyDescriptor(clazz.prototype, '__get');
    if (get) {
      instanceHandler.get = (
        target: object,
        name: PropertyKey,
        receiver: unknown,
      ) => {
        // We need to turn off the __isset() trap for the moment to establish compatibility with PHP behaviour
        // PHP's __get() method doesn't care about its own __isset() method, so neither should we
        issetEnabled = false;
        const exists = Reflect.has(target, name);
        issetEnabled = true;

        if (exists) {
          return Reflect.get(target, name, receiver);
        } else {
          return get.value.call(target, name);
        }
      };
    }

    // __set()
    // Catches "instance.property = ..."
    const set = Object.getOwnPropertyDescriptor(clazz.prototype, '__set');
    if (set) {
      instanceHandler.set = (
        target: { __set: { call: (arg0: any, arg1: any, arg2: any) => any } },
        name: string,
        value: any,
        receiver: any,
      ) => {
        if (name in target) {
          Reflect.set(target, name, value, receiver);
        } else {
          return target.__set.call(target, name, value);
        }
      };
    }

    // __isset()
    // Catches "'property' in instance"
    const isset = Object.getOwnPropertyDescriptor(clazz.prototype, '__isset');
    if (isset) {
      instanceHandler.has = (target: object, name: PropertyKey) => {
        if (!issetEnabled) return Reflect.has(target, name);

        return isset.value.call(target, name);
      };
    }

    // __unset()
    // Catches "delete instance.property"
    const unset = Object.getOwnPropertyDescriptor(clazz.prototype, '__unset');
    if (unset) {
      instanceHandler.deleteProperty = (target: any, name: any) => {
        return unset.value.call(target, name);
      };
    }

    return new Proxy(instance, instanceHandler);
  };

  // __getStatic()
  // Catches "class.property"
  if (Object.getOwnPropertyDescriptor(clazz, '__getStatic')) {
    classHandler.get = (
      target: {
        [x: string]: any;
        __getStatic: { call: (arg0: any, arg1: any) => any };
      },
      name: string,
      receiver: any,
    ) => {
      if (name in target) {
        return target[name];
      } else {
        return target.__getStatic.call(receiver, name);
      }
    };
  }

  // __setStatic()
  // Catches "class.property = ..."
  if (Object.getOwnPropertyDescriptor(clazz, '__setStatic')) {
    classHandler.set = (
      target: {
        [x: string]: any;
        __setStatic: { call: (arg0: any, arg1: any, arg2: any) => any };
      },
      name: string,
      value: any,
      receiver: any,
    ) => {
      if (name in target) {
        return target[name];
      } else {
        return target.__setStatic.call(receiver, name, value);
      }
    };
  }

  return new Proxy(clazz, classHandler);
}
