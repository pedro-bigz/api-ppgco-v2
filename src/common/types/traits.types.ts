export type Constructor = new (...a: any[]) => any;
export type Merge<
  TTrait extends Constructor,
  TTarget extends Constructor,
> = (new (
  ...a: ConstructorParameters<TTarget>
) => InstanceType<TTrait> & InstanceType<TTarget>) &
  Pick<TTarget, keyof TTarget> &
  Pick<TTrait, keyof TTrait>;
