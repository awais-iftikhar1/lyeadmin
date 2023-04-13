export interface UserDetails {
  name: string;
  privileges: string;
}

export interface AddUser {
  email: string;
  username: string;
  role: string;
}

export interface UserListing {
  userPrivileges: string;
}

export interface UserPrivileges {
  role: string;
}

export interface IOptionValue {
  key?: number;
  label: string;
  value: string;
}
