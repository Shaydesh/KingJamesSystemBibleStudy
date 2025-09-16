// types/BibleBook.ts

export interface BibleWord {
  word: string;
  strongs: string[];
}

export type WordEntry = [string, string[]];

export interface Verse {
  verse: string;
  text: string;
  k: number;
  v: WordEntry[];
}

export interface Chapter {
  chapter: string;
  verses: Verse[];
}

export interface BibleBook {
  book: string;
  chapters: Chapter[];
}

export interface StrongsData {
  k: string;
  v: [
    string,
    string,
    string,
    string[],
    string[],
    string[],
    string[],
    number
  ];
}

//export type StrongsDictionary = Record<string, StrongsData>;

export interface StrongsDictionary {
  dictionary: StrongsData[];
}

export interface Bookmark {
  id: number;
  book: string;
  chapter: number;
  verse: number | string;
  topic: string;
  verseId: string;
  date: Date;
}
