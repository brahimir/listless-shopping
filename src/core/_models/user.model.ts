export interface User {
  email: string;
  password: string;
  settings: {
    darkMode: boolean;
  };
  profile: {
    lists: Object[];
  };
}
