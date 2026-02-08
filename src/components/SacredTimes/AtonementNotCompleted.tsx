import { Verse } from '../../types/BibleBook';
import { ScripturePassage } from './ScripturePassage';

// Hebrews 10:1-3 with Strong's references
const hebrews10_1: Verse = {
  verse: "1",
  text: "For the law having a shadow of good things to come, and not the very image of the things, can never with those sacrifices which they offered year by year continually make the comers thereunto perfect.",
  k: 30145,
  v: [
    ["For", ["G1063"]],
    ["the law", ["G3551"]],
    ["having", ["G2192"]],
    ["a shadow", ["G4639"]],
    ["of good things", ["G18"]],
    ["to come,", ["G3195"]],
    ["and not", ["G3756"]],
    ["the very", ["G846"]],
    ["image", ["G1504"]],
    ["of the things,", ["G4229"]],
    ["can", ["G1410"]],
    ["never", ["G3763"]],
    ["with those", ["G846"]],
    ["sacrifices", ["G2378"]],
    ["which", ["G3739"]],
    ["they offered", ["G4374"]],
    ["year", ["G1763"]],
    ["by year", ["G2596"]],
    ["continually", ["G1519", "G1336"]],
    ["make", ["G5048"]],
    ["the comers thereunto", ["G4334"]],
    ["perfect.", ["G5048"]]
  ]
};

const hebrews10_2: Verse = {
  verse: "2",
  text: "For then would they not have ceased to be offered? because that the worshippers once purged should have had no more conscience of sins.",
  k: 30146,
  v: [
    ["For then", ["G1893"]],
    ["would they not", ["G3756"]],
    ["have ceased", ["G3973"]],
    ["to be offered?", ["G4374"]],
    ["because", ["G1223"]],
    ["that the worshippers", ["G3000"]],
    ["once", ["G530"]],
    ["purged", ["G2508"]],
    ["should have had", ["G2192"]],
    ["no", ["G3367"]],
    ["more", ["G2089"]],
    ["conscience", ["G4893"]],
    ["of sins.", ["G266"]]
  ]
};

const hebrews10_3: Verse = {
  verse: "3",
  text: "But in those sacrifices there is a remembrance again made of sins every year.",
  k: 30147,
  v: [
    ["But", ["G235"]],
    ["in", ["G1722"]],
    ["those", ["G846"]],
    ["sacrifices there is a remembrance again", ["G364"]],
    ["made of sins", ["G266"]],
    ["every", ["G2596"]],
    ["year.", ["G1763"]]
  ]
};

export const AtonementNotCompleted: React.FC = () => {
  return (
    <ScripturePassage
      book="Hebrews"
      chapter={10}
      verses={[hebrews10_1, hebrews10_2, hebrews10_3]}
      displayReference="Hebrews 10:1-3"
      linkToVerse={1}
    />
  );
};
