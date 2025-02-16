export interface Pokemon {
  abilities:                Ability[];
  base_experience:          number;
  height:                   number;
  id:                       number;
  is_default:               boolean;
  location_area_encounters: string;
  name:                     string;
  order:                    number;
  species:                  Species;
  types:                    Type[];
  weight:                   number;
}

export interface Ability {
  ability:   Species;
  slot:      number;
}

export interface Species {
  name: string;
  url:  string;
}

export interface Type {
  slot: number;
  type: Species;
}
