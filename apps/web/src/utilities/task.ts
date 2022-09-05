import { makeAutoObservable } from "mobx";

export enum State {
  Idle = "idle",
  Running = "running",
  Succeeded = "succeeded",
  Faulted = "faulted",
}

type Action<I extends unknown[], O> = (...args: I) => Promise<O>;

type BaseTask<I extends unknown[], O> = {
  run: (...args: I) => Promise<void>;

  abort: () => void;

  reset: () => void;
  resolve: (data: O) => void;
  reject: (error: Error) => void;
};

type IdleTask = {
  state: State.Idle;
  data: undefined;
  error: undefined;

  isIdle: true;
  isRunning: false;
  isSucceeded: false;
  isFaulted: false;
  isCompleted: false;
};

type PendingTask<O> = {
  state: State.Running;
  data?: O;
  error: undefined;

  isIdle: false;
  isRunning: true;
  isSucceeded: false;
  isFaulted: false;
  isCompleted: false;
};

type FulfilledTask<O> = {
  state: State.Succeeded;
  data: O;
  error: undefined;

  isIdle: false;
  isRunning: false;
  isSucceeded: true;
  isFaulted: false;
  isCompleted: true;
};

type FaultedTask<O> = {
  state: State.Faulted;
  data?: O;
  error: Error;

  isIdle: false;
  isRunning: false;
  isSucceeded: false;
  isFaulted: true;
  isCompleted: true;
};

type Task<I extends unknown[], O> = BaseTask<I, O> &
  (IdleTask | PendingTask<O> | FulfilledTask<O> | FaultedTask<O>);

class TaskImplementation<I extends unknown[], O> {
  constructor(private action: Action<I, O>) {
    makeAutoObservable(this);
  }

  private _state = State.Idle;

  get state() {
    return this._state;
  }

  private set state(value: State) {
    this._state = value;
  }

  private _data?: O = undefined;

  get data() {
    return this._data;
  }

  private set data(value: O | undefined) {
    this._data = value;
  }

  private _error?: Error = undefined;

  get error() {
    return this._error;
  }

  private set error(value: Error | undefined) {
    this._error = value;
  }

  private _requestId = 0;

  private get requestId() {
    return this._requestId;
  }

  private set requestId(value: number) {
    this._requestId = value;
  }

  private _abortedRequestId = 0;

  private get abortedRequestId() {
    return this._abortedRequestId;
  }

  private set abortedRequestId(value: number) {
    this._abortedRequestId = value;
  }

  get isIdle() {
    return this.state === State.Idle;
  }

  get isRunning() {
    return this.state === State.Running;
  }

  get isSucceeded() {
    return this.state === State.Succeeded;
  }

  get isFaulted() {
    return this.state === State.Faulted;
  }

  get isCompleted() {
    return this.state === State.Succeeded || this.state === State.Faulted;
  }

  run = async (...args: I) => {
    this.abort();

    this.state = State.Running;
    this.error = undefined;

    const requestId = ++this.requestId;
    await this.action(...args).then(
      this.handleTaskSuccess.bind(this, requestId),
      this.handleTaskFailure.bind(this, requestId)
    );
  };

  abort = () => {
    this.abortedRequestId = this.requestId;

    if (this.error) {
      this.state = State.Faulted;
    } else if (this.data) {
      this.state = State.Succeeded;
    } else {
      this.state = State.Idle;
    }
  };

  reset = () => {
    this.abort();

    this.state = State.Idle;
    this.data = undefined;
    this.error = undefined;
  };

  resolve = (data: O) => {
    this.abort();

    this.state = State.Succeeded;
    this.data = data;
    this.error = undefined;
  };

  reject = (error: Error) => {
    this.abort();

    this.state = State.Faulted;
    this.error = error;
  };

  private handleTaskSuccess = (requestId: number, value: O) => {
    if (this.abortedRequestId >= requestId) {
      return;
    }

    this.state = State.Succeeded;
    this.data = value;
    this.error = undefined;
  };

  private handleTaskFailure = (requestId: number, error: Error) => {
    if (this.abortedRequestId >= requestId) {
      return;
    }

    this.state = State.Faulted;
    this.error = error;
  };
}

export const Task = TaskImplementation as {
  new <I extends unknown[], O>(Action: Action<I, O>): Task<I, O>;
};
