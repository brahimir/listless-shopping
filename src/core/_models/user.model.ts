export interface User {
  email: string;
  password: string;
  settings: {
    darkMode: boolean;
  };
  profile: {
    lists: Object[];
    archived_lists: Object[];
  };
  token?: string;
}
