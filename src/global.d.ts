// TIL: global.d.ts file
// https://www.typescriptlang.org/docs/handbook/declaration-files/templates/global-d-ts.html
// means you don't have to manually import types at top of the file
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
