import { Writable } from 'stream';

export class WritableAsPromise extends Writable {
  private _output: string;
  private _deferred: {
    promise: Promise<unknown> | null;
    resolve: (value: any) => any;
    reject: (reason: any) => any;
  };

  constructor() {
    super();

    this._output = ``;
    this._deferred = {
      promise: null,
      resolve: () => {},
      reject: () => {},
    };
    this._deferred.promise = new Promise((resolve, reject) => {
      this._deferred.resolve = resolve;
      this._deferred.reject = reject;
    });
  }

  _write(chunk: any, _: any, next: any) {
    this._output += chunk.toString();
    next();
  }

  _destroy(error: any, next: any) {
    if (error instanceof Error) {
      this._deferred.reject(error);
    } else {
      next();
    }
  }

  public end() {
    this._deferred.resolve(this._output);
    this.destroy();
    return this;
  }

  // disguise us as a promise
  public then(resolve: any, reject: any) {
    return (this._deferred.promise as Promise<unknown>).then(resolve, reject);
  }
}
