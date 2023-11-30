export interface ITodo {
  title: string;
  status: string;
  created: number;
  id: string;
}

export interface IStatus {
  name: string;
  value: string;
}

export type ILoadingState = 'creating' | 'listing' | 'deleting' | 'editing' | 'idle';
export type ErrorState = {
  hasError: boolean;
  message: string;
};

export interface IResponse<T> {
  [key: string]: T;
}

export type ITodoResponse<T> = IResponse<T> & {
  status: string;
};
