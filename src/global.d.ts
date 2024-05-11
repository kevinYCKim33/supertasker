// TIL: global.d.ts file
// https://www.typescriptlang.org/docs/handbook/declaration-files/templates/global-d-ts.html
// means you don't have to manually import types at top of the file

// mix of Partial and Pick
// what type are you basing this off of, and what do you want to keep
type RequireOnly<T, P extends keyof T> = Pick<T, P> & Partial<Omit<T, P>>;

type Task = {
  id: string;
  title: string;
  user?: User[id];
  column?: StatusColumn['id'];
};

type User = {
  id: string;
  realName: string;
  alterEgo: string;
  tasks: Task['id'][];
};

type StatusColumn = {
  id: string;
  tasks: Task['id'][];
  title: Status;
};

type Status =
  | 'Backburner'
  | 'Ready'
  | 'In Progress'
  | 'Verifying'
  | 'Waiting for Deployment'
  | 'Deployed';
