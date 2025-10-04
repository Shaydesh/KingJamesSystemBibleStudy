
export interface ScriptureReference {
  Book: string;
  Chapter: number;
  Verse: number;
  DisplayVerse: string;
}

export interface Miracle {
  Id: number;
  Miracle: string;
  ObjectOrOccasion?: string;
  Place: string;
  Coordinates: [number, number];
  References: ScriptureReference[];
  Classification: string;

}
