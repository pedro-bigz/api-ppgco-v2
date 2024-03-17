class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export { CustomError };
