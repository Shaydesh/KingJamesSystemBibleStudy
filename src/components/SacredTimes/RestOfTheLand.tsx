import { Verse } from '../../types/BibleBook';
import { ScripturePassage } from './ScripturePassage';

// Exodus 23:10-11 with Strong's references
const exodus23_10: Verse = {
  verse: "10",
  text: "And six years thou shalt sow thy land, and shalt gather in the fruits thereof:",
  k: 2133,
  v: [
    ["And six", ["H8337"]],
    ["years", ["H8141"]],
    ["thou shalt sow", ["H2232"]],
    ["thy land,", ["H776"]],
    ["and shalt gather in", ["H622"]],
    ["the fruits", ["H8393"]],
    ["thereof:", []]
  ]
};

const exodus23_11: Verse = {
  verse: "11",
  text: "But the seventh year thou shalt let it rest and lie still; that the poor of thy people may eat: and what they leave the beasts of the field shall eat. In like manner thou shalt deal with thy vineyard, and with thy oliveyard.",
  k: 2134,
  v: [
    ["But the seventh", ["H7637"]],
    ["year thou shalt let it rest", ["H8058"]],
    ["and lie still;", ["H5203"]],
    ["that the poor", ["H34"]],
    ["of thy people", ["H5971"]],
    ["may eat:", ["H398"]],
    ["and what they leave", ["H3499"]],
    ["the beasts", ["H2416"]],
    ["of the field", ["H7704"]],
    ["shall eat.", ["H398"]],
    ["In like manner", ["H3651"]],
    ["thou shalt deal", ["H6213"]],
    ["with thy vineyard,", ["H3754"]],
    ["and with thy oliveyard.", ["H2132"]]
  ]
};

// Deuteronomy 15:1-3 with Strong's references
const deuteronomy15_1: Verse = {
  verse: "1",
  text: "At the end of every seven years thou shalt make a release.",
  k: 5358,
  v: [
    ["At the end", ["H7093"]],
    ["of every seven", ["H7651"]],
    ["years", ["H8141"]],
    ["thou shalt make", ["H6213"]],
    ["a release.", ["H8059"]]
  ]
};

const deuteronomy15_2: Verse = {
  verse: "2",
  text: "And this is the manner of the release: Every creditor that lendeth ought unto his neighbour shall release it; he shall not exact it of his neighbour, or of his brother; because it is called the LORD's release.",
  k: 5359,
  v: [
    ["And this", ["H2088"]],
    ["is the manner", ["H1697"]],
    ["of the release:", ["H8059"]],
    ["Every", ["H3605"]],
    ["creditor", ["H1167", "H4874", "H3027"]],
    ["that lendeth", ["H5383"]],
    ["ought unto his neighbour", ["H7453"]],
    ["shall release", ["H8058"]],
    ["it; he shall not", ["H3808"]],
    ["exact", ["H5065"]],
    ["it of his neighbour,", ["H7453"]],
    ["or of his brother;", ["H251"]],
    ["because", ["H3588"]],
    ["it is called", ["H7121"]],
    ["the LORD's", ["H3068"]],
    ["release.", ["H8059"]]
  ]
};

const deuteronomy15_3: Verse = {
  verse: "3",
  text: "Of a foreigner thou mayest exact it again: but that which is thine with thy brother thine hand shall release;",
  k: 5360,
  v: [
    ["Of a foreigner", ["H5237"]],
    ["thou mayest exact it again:", ["H5065"]],
    ["but", ["H834"]],
    ["that which is", ["H1961"]],
    ["thine with thy brother", ["H251"]],
    ["thine hand", ["H3027"]],
    ["shall release;", ["H8058"]]
  ]
};

export const RestOfTheLand: React.FC = () => {
  return (
    <>
      <ScripturePassage
        book="Exodus"
        chapter={23}
        verses={[exodus23_10, exodus23_11]}
        displayReference="Exodus 23:10, 11"
        linkToVerse={10}
      />
      <ScripturePassage
        book="Deuteronomy"
        chapter={15}
        verses={[deuteronomy15_1, deuteronomy15_2, deuteronomy15_3]}
        displayReference="Deuteronomy 15:1-3"
        linkToVerse={1}
      />
    </>
  );
};
