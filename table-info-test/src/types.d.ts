export interface Controls {
  rowcolor: boolean;
  sortbycountry: boolean;
  restoreinitial: boolean;
  filteredtext: string;
}

export interface UsersContextValue {
  usersState: User[];
  setUsersState(usersState: User[] | ((state: User[]) => User[])): void;
  controls: Controls;
  setControls(controls: Controls | ((state: Controls) => Controls)): void;
}

export interface APIResults {
  results: User[];
  info: Info;
}

export interface Info {
  seed: string;
  results: number;
  page: number;
  version: string;
}

export interface User {
  gender: string;
  name: Name;
  location: Location;
  email: string;
  login: Login;
  dob: Dob;
  registered: Dob;
  phone: string;
  cell: string;
  id: ID;
  picture: Picture;
  nat: string;
}

export interface Dob {
  date: Date;
  age: number;
}

export interface ID {
  name: string;
  value: string;
}

export interface Location {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: string;
  coordinates: Coordinates;
  timezone: Timezone;
}

export interface Coordinates {
  latitude: string;
  longitude: string;
}

export interface Street {
  number: number;
  name: string;
}

export interface Timezone {
  offset: string;
  description: string;
}

export interface Login {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

export interface Name {
  title: string;
  first: string;
  last: string;
}

export interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}
