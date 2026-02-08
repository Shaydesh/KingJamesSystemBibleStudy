import { Verse } from '../../types/BibleBook';
import { ScripturePassage } from './ScripturePassage';

// 1 Corinthians 5:7-8 with Strong's references
const corinthians5_7: Verse = {
  verse: "7",
  text: "Purge out therefore the old leaven, that ye may be a new lump, as ye are unleavened. For even Christ our passover is sacrificed for us:",
  k: 28476,
  v: [
    ["Purge out", ["G1571"]],
    ["therefore", ["G3767"]],
    ["the old", ["G3820"]],
    ["leaven,", ["G2219"]],
    ["that", ["G2443"]],
    ["ye may be", ["G5600"]],
    ["a new", ["G3501"]],
    ["lump,", ["G5445"]],
    ["as", ["G2531"]],
    ["ye are", ["G2075"]],
    ["unleavened.", ["G106"]],
    ["For", ["G1063"]],
    ["even", ["G2532"]],
    ["Christ", ["G5547"]],
    ["our", ["G2257"]],
    ["passover", ["G3957"]],
    ["is sacrificed", ["G2380"]],
    ["for", ["G5228"]],
    ["us:", ["G2257"]]
  ]
};

const corinthians5_8: Verse = {
  verse: "8",
  text: "Therefore let us keep the feast, not with old leaven, neither with the leaven of malice and wickedness; but with the unleavened bread of sincerity and truth.",
  k: 28477,
  v: [
    ["Therefore", ["G5620"]],
    ["let us keep the feast,", ["G1858"]],
    ["not", ["G3361"]],
    ["with", ["G1722"]],
    ["old", ["G3820"]],
    ["leaven,", ["G2219"]],
    ["neither", ["G3366"]],
    ["with", ["G1722"]],
    ["the leaven", ["G2219"]],
    ["of malice", ["G2549"]],
    ["and", ["G2532"]],
    ["wickedness;", ["G4189"]],
    ["but", ["G235"]],
    ["with", ["G1722"]],
    ["the unleavened bread", ["G106"]],
    ["of sincerity", ["G1505"]],
    ["and", ["G2532"]],
    ["truth.", ["G225"]]
  ]
};

export const ChristOurPassover: React.FC = () => {
  return (
    <ScripturePassage
      book="I Corinthians"
      chapter={5}
      verses={[corinthians5_7, corinthians5_8]}
      displayReference="I Corinthians 5:7, 8"
      linkToVerse={7}
    />
  );
};
