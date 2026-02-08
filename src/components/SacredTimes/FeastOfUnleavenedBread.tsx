import { Verse } from '../../types/BibleBook';
import { ScripturePassage } from './ScripturePassage';
import { ScriptureVerse } from './ScriptureVerse';

// Exodus 34:18 with Strong's references
const exodus34_18: Verse = {
  verse: "18",
  text: "The feast of unleavened bread shalt thou keep. Seven days thou shalt eat unleavened bread, as I commanded thee, in the time of the month Abib: for in the month Abib thou camest out from Egypt.",
  k: 2467,
  v: [
    ["The feast", ["H2282"]],
    ["of unleavened bread", ["H4682"]],
    ["shalt thou keep.", ["H8104"]],
    ["Seven", ["H7651"]],
    ["days", ["H3117"]],
    ["thou shalt eat", ["H398"]],
    ["unleavened bread,", ["H4682"]],
    ["as", ["H834"]],
    ["I commanded", ["H6680"]],
    ["thee, in the time", ["H4150"]],
    ["of the month", ["H2320"]],
    ["Abib:", ["H24"]],
    ["for in the month", ["H2320"]],
    ["Abib", ["H24"]],
    ["thou camest out", ["H3318"]],
    ["from Egypt.", ["H4714"]]
  ]
};

// Leviticus 23:6-8 with Strong's references
const leviticus23_6: Verse = {
  verse: "6",
  text: "And on the fifteenth day of the same month is the feast of unleavened bread unto the LORD: seven days ye must eat unleavened bread.",
  k: 3408,
  v: [
    ["And on the fifteenth", ["H2568", "H6240"]],
    ["day", ["H3117"]],
    ["of the same", ["H2088"]],
    ["month", ["H2320"]],
    ["is the feast", ["H2282"]],
    ["of unleavened bread", ["H4682"]],
    ["unto the LORD:", ["H3068"]],
    ["seven", ["H7651"]],
    ["days", ["H3117"]],
    ["ye must eat", ["H398"]],
    ["unleavened bread.", ["H4682"]]
  ]
};

const leviticus23_7: Verse = {
  verse: "7",
  text: "In the first day ye shall have an holy convocation: ye shall do no servile work therein.",
  k: 3409,
  v: [
    ["In the first", ["H7223"]],
    ["day", ["H3117"]],
    ["ye shall have", ["H1961"]],
    ["an holy", ["H6944"]],
    ["convocation:", ["H4744"]],
    ["ye shall do", ["H6213"]],
    ["no", ["H3808", "H3605"]],
    ["servile", ["H5656"]],
    ["work", ["H4399"]],
    ["therein.", []]
  ]
};

const leviticus23_8: Verse = {
  verse: "8",
  text: "But ye shall offer an offering made by fire unto the LORD seven days: in the seventh day is an holy convocation: ye shall do no servile work therein.",
  k: 3410,
  v: [
    ["But ye shall offer", ["H7126"]],
    ["an offering made by fire", ["H801"]],
    ["unto the LORD", ["H3068"]],
    ["seven", ["H7651"]],
    ["days:", ["H3117"]],
    ["in the seventh", ["H7637"]],
    ["day", ["H3117"]],
    ["is an holy", ["H6944"]],
    ["convocation:", ["H4744"]],
    ["ye shall do", ["H6213"]],
    ["no", ["H3808", "H3605"]],
    ["servile", ["H5656"]],
    ["work", ["H4399"]],
    ["therein.", []]
  ]
};

export const FeastOfUnleavenedBread: React.FC = () => {
  return (
    <>
      <ScriptureVerse
        book="Exodus"
        chapter={34}
        verse={exodus34_18}
        displayReference="Exodus 34:18"
      />
      <ScripturePassage
        book="Leviticus"
        chapter={23}
        verses={[leviticus23_6, leviticus23_7, leviticus23_8]}
        displayReference="Leviticus 23:6-8"
        linkToVerse={6}
      />
    </>
  );
};
