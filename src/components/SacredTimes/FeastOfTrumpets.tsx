import { Verse } from '../../types/BibleBook';
import { ScripturePassage } from './ScripturePassage';

// Leviticus 23:23-25 with Strong's references
const leviticus23_23: Verse = {
  verse: "23",
  text: "And the LORD spake unto Moses, saying,",
  k: 3425,
  v: [
    ["And the LORD", ["H3068"]],
    ["spake", ["H1696"]],
    ["unto", ["H413"]],
    ["Moses,", ["H4872"]],
    ["saying,", ["H559"]]
  ]
};

const leviticus23_24: Verse = {
  verse: "24",
  text: "Speak unto the children of Israel, saying, In the seventh month, in the first day of the month, shall ye have a sabbath, a memorial of blowing of trumpets, an holy convocation.",
  k: 3426,
  v: [
    ["Speak", ["H1696"]],
    ["unto", ["H413"]],
    ["the children", ["H1121"]],
    ["of Israel,", ["H3478"]],
    ["saying,", ["H559"]],
    ["In the seventh", ["H7637"]],
    ["month,", ["H2320"]],
    ["in the first", ["H259"]],
    ["day of the month,", ["H2320"]],
    ["shall ye have", ["H1961"]],
    ["a sabbath,", ["H7677"]],
    ["a memorial", ["H2146"]],
    ["of blowing of trumpets,", ["H8643"]],
    ["an holy", ["H6944"]],
    ["convocation.", ["H4744"]]
  ]
};

const leviticus23_25: Verse = {
  verse: "25",
  text: "Ye shall do no servile work therein: but ye shall offer an offering made by fire unto the LORD.",
  k: 3427,
  v: [
    ["Ye shall do", ["H6213"]],
    ["no", ["H3808", "H3605"]],
    ["servile", ["H5656"]],
    ["work", ["H4399"]],
    ["therein: but ye shall offer", ["H7126"]],
    ["an offering made by fire", ["H801"]],
    ["unto the LORD.", ["H3068"]]
  ]
};

export const FeastOfTrumpets: React.FC = () => {
  return (
    <ScripturePassage
      book="Leviticus"
      chapter={23}
      verses={[leviticus23_23, leviticus23_24, leviticus23_25]}
      displayReference="Leviticus 23:23-25"
      linkToVerse={23}
    />
  );
};
