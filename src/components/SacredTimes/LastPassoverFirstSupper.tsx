import { Verse } from '../../types/BibleBook';
import { ScripturePassage } from './ScripturePassage';
import { ScriptureVerse } from './ScriptureVerse';

// Matthew 26:26-28 with Strong's references
const matthew26_26: Verse = {
  verse: "26",
  text: "And as they were eating, Jesus took bread, and blessed it, and brake it, and gave it to the disciples, and said, Take, eat; this is my body.",
  k: 24107,
  v: [
    ["And", ["G1161"]],
    ["as they were eating,", ["G2068"]],
    ["Jesus", ["G2424"]],
    ["took", ["G2983"]],
    ["bread,", ["G740"]],
    ["and", ["G2532"]],
    ["blessed", ["G2127"]],
    ["it, and brake", ["G2806"]],
    ["it, and gave", ["G1325"]],
    ["it to the disciples,", ["G3101"]],
    ["and", ["G2532"]],
    ["said,", ["G2036"]],
    ["Take,", ["G2983"]],
    ["eat;", ["G5315"]],
    ["this", ["G5124"]],
    ["is", ["G2076"]],
    ["my", ["G3450"]],
    ["body.", ["G4983"]]
  ]
};

const matthew26_27: Verse = {
  verse: "27",
  text: "And he took the cup, and gave thanks, and gave it to them, saying, Drink ye all of it;",
  k: 24108,
  v: [
    ["And", ["G2532"]],
    ["he took", ["G2983"]],
    ["the cup,", ["G4221"]],
    ["and", ["G2532"]],
    ["gave thanks,", ["G2168"]],
    ["and gave", ["G1325"]],
    ["it to them,", ["G846"]],
    ["saying,", ["G3004"]],
    ["Drink", ["G4095"]],
    ["ye", ["G846"]],
    ["all", ["G3956"]],
    ["of it;", []]
  ]
};

const matthew26_28: Verse = {
  verse: "28",
  text: "For this is my blood of the new testament, which is shed for many for the remission of sins.",
  k: 24109,
  v: [
    ["For", ["G1063"]],
    ["this", ["G5124"]],
    ["is", ["G2076"]],
    ["my", ["G3450"]],
    ["blood", ["G129"]],
    ["of the new", ["G2537"]],
    ["testament,", ["G1242"]],
    ["which", ["G3588"]],
    ["is shed", ["G1632"]],
    ["for", ["G4012"]],
    ["many", ["G4183"]],
    ["for", ["G1519"]],
    ["the remission", ["G859"]],
    ["of sins.", ["G266"]]
  ]
};

// John 6:51 with Strong's references
const john6_51: Verse = {
  verse: "51",
  text: "I am the living bread which came down from heaven: if any man eat of this bread, he shall live for ever: and the bread that I will give is my flesh, which I will give for the life of the world.",
  k: 26295,
  v: [
    ["I", ["G1473"]],
    ["am", ["G1510"]],
    ["the living", ["G2198"]],
    ["bread", ["G740"]],
    ["which came down", ["G2597"]],
    ["from", ["G1537"]],
    ["heaven:", ["G3772"]],
    ["if", ["G1437"]],
    ["any man", ["G5100"]],
    ["eat", ["G5315"]],
    ["of", ["G1537"]],
    ["this", ["G5127"]],
    ["bread,", ["G740"]],
    ["he shall live", ["G2198"]],
    ["for", ["G1519"]],
    ["ever:", ["G165"]],
    ["and", ["G1161"]],
    ["the bread", ["G740"]],
    ["that", ["G3739"]],
    ["I", ["G1473"]],
    ["will give", ["G1325"]],
    ["is", ["G2076"]],
    ["my", ["G3450"]],
    ["flesh,", ["G4561"]],
    ["which", ["G3739"]],
    ["I", ["G1473"]],
    ["will give", ["G1325"]],
    ["for", ["G5228"]],
    ["the life", ["G2222"]],
    ["of the world.", ["G2889"]]
  ]
};

export const LastPassoverFirstSupper: React.FC = () => {
  return (
    <>
      <ScripturePassage
        book="Matthew"
        chapter={26}
        verses={[matthew26_26, matthew26_27, matthew26_28]}
        displayReference="Matthew 26:26-28"
        linkToVerse={26}
      />
      <ScriptureVerse
        book="John"
        chapter={6}
        verse={john6_51}
        displayReference="John 6:51"
      />
    </>
  );
};
