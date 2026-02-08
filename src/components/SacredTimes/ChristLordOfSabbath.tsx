import { Verse } from '../../types/BibleBook';
import { ScripturePassage } from './ScripturePassage';

// Mark 2:27-28 with Strong's references
const mark2_27: Verse = {
  verse: "27",
  text: "And he said unto them, The sabbath was made for man, and not man for the sabbath:",
  k: 24442,
  v: [
    ["And", ["G2532"]],
    ["he said", ["G3004"]],
    ["unto them,", ["G846"]],
    ["The sabbath", ["G4521"]],
    ["was made", ["G1096"]],
    ["for", ["G1223"]],
    ["man,", ["G444"]],
    ["and not", ["G3756"]],
    ["man", ["G444"]],
    ["for", ["G1223"]],
    ["the sabbath:", ["G4521"]]
  ]
};

const mark2_28: Verse = {
  verse: "28",
  text: "Therefore the Son of man is Lord also of the sabbath.",
  k: 24443,
  v: [
    ["Therefore", ["G5620"]],
    ["the Son", ["G5207"]],
    ["of man", ["G444"]],
    ["is", ["G2076"]],
    ["Lord", ["G2962"]],
    ["also", ["G2532"]],
    ["of the sabbath.", ["G4521"]]
  ]
};

export const ChristLordOfSabbath: React.FC = () => {
  return (
    <ScripturePassage
      book="Mark"
      chapter={2}
      verses={[mark2_27, mark2_28]}
      displayReference="Mark 2:27-28"
      linkToVerse={27}
    />
  );
};
