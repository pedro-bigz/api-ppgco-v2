export type PromisePusherCallback = (...items: Promise<any>[]) => number;
export type AwaitAllCallback = (adder: PromisePusherCallback) => void;

export const awaitAll = async (cb: AwaitAllCallback) => {
  const promisesList: Array<Promise<any>> = [];

  const push = (...items: Promise<any>[]) => {
    return promisesList.push(...items);
  };

  cb(push);

  return Promise.all(promisesList);
};
