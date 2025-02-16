import Result from "./Result";

export default interface Pokemons{
  count: number;
  next: String;
  previous: any;
  results: Result[];
}