export interface Pokemon {
  height:                   number;
  id:                       number;
  name:                     string;
  types:                    Type[];
  weight:                   number;
}

export interface Species {
  name: string;
  url:  string;
}

export interface Type {
  slot: number;
  type: Species;
}
