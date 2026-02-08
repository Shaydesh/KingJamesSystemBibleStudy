import { Verse } from '../../types/BibleBook';
import { ScripturePassage } from './ScripturePassage';
import { ScriptureVerse } from './ScriptureVerse';
import styles from './TheSabbath.module.css';

// Leviticus 23:3 with Strong's references
const leviticus23_3: Verse = {
  verse: "3",
  text: "Six days shall work be done: but the seventh day is the sabbath of rest, an holy convocation; ye shall do no work therein: it is the sabbath of the LORD in all your dwellings.",
  k: 3405,
  v: [
    ["Six", ["H8337"]],
    ["days", ["H3117"]],
    ["shall work", ["H4399"]],
    ["be done:", ["H6213"]],
    ["but the seventh", ["H7637"]],
    ["day", ["H3117"]],
    ["is the sabbath", ["H7676"]],
    ["of rest,", ["H7677"]],
    ["an holy", ["H6944"]],
    ["convocation;", ["H4744"]],
    ["ye shall do", ["H6213"]],
    ["no", ["H3605", "H3808"]],
    ["work", ["H4399"]],
    ["therein: it", ["H1931"]],
    ["is the sabbath", ["H7676"]],
    ["of the LORD", ["H3068"]],
    ["in all", ["H3605"]],
    ["your dwellings.", ["H4186"]]
  ]
};

// Deuteronomy 5:12-15 with Strong's references
const deuteronomy5_12: Verse = {
  verse: "12",
  text: "Keep the sabbath day to sanctify it, as the LORD thy God hath commanded thee.",
  k: 5065,
  v: [
    ["Keep", ["H8104"]],
    ["the sabbath", ["H7676"]],
    ["day", ["H3117"]],
    ["to sanctify", ["H6942"]],
    ["it, as", ["H834"]],
    ["the LORD", ["H3068"]],
    ["thy God", ["H430"]],
    ["hath commanded", ["H6680"]],
    ["thee.", []]
  ]
};

const deuteronomy5_13: Verse = {
  verse: "13",
  text: "Six days thou shalt labour, and do all thy work:",
  k: 5066,
  v: [
    ["Six", ["H8337"]],
    ["days", ["H3117"]],
    ["thou shalt labour,", ["H5647"]],
    ["and do", ["H6213"]],
    ["all", ["H3605"]],
    ["thy work:", ["H4399"]]
  ]
};

const deuteronomy5_14: Verse = {
  verse: "14",
  text: "But the seventh day is the sabbath of the LORD thy God: in it thou shalt not do any work, thou, nor thy son, nor thy daughter, nor thy manservant, nor thy maidservant, nor thine ox, nor thine ass, nor any of thy cattle, nor thy stranger that is within thy gates; that thy manservant and thy maidservant may rest as well as thou.",
  k: 5067,
  v: [
    ["But the seventh", ["H7637"]],
    ["day", ["H3117"]],
    ["is the sabbath", ["H7676"]],
    ["of the LORD", ["H3068"]],
    ["thy God:", ["H430"]],
    ["in it thou shalt not", ["H3808"]],
    ["do", ["H6213"]],
    ["any", ["H3605"]],
    ["work,", ["H4399"]],
    ["thou,", ["H859"]],
    ["nor thy son,", ["H1121"]],
    ["nor thy daughter,", ["H1323"]],
    ["nor thy manservant,", ["H5650"]],
    ["nor thy maidservant,", ["H519"]],
    ["nor thine ox,", ["H7794"]],
    ["nor thine ass,", ["H2543"]],
    ["nor any", ["H3605"]],
    ["of thy cattle,", ["H929"]],
    ["nor thy stranger", ["H1616"]],
    ["that", ["H834"]],
    ["is within thy gates;", ["H8179"]],
    ["that", ["H4616"]],
    ["thy manservant", ["H5650"]],
    ["and thy maidservant", ["H519"]],
    ["may rest", ["H5117"]],
    ["as well as thou.", []]
  ]
};

const deuteronomy5_15: Verse = {
  verse: "15",
  text: "And remember that thou wast a servant in the land of Egypt, and that the LORD thy God brought thee out thence through a mighty hand and by a stretched out arm: therefore the LORD thy God commanded thee to keep the sabbath day.",
  k: 5068,
  v: [
    ["And remember", ["H2142"]],
    ["that", ["H3588"]],
    ["thou wast", ["H1961"]],
    ["a servant", ["H5650"]],
    ["in the land", ["H776"]],
    ["of Egypt,", ["H4714"]],
    ["and that the LORD", ["H3068"]],
    ["thy God", ["H430"]],
    ["brought thee out", ["H3318"]],
    ["thence", ["H8033"]],
    ["through a mighty", ["H2389"]],
    ["hand", ["H3027"]],
    ["and by a stretched out", ["H5186"]],
    ["arm:", ["H2220"]],
    ["therefore", ["H3651", "H5921"]],
    ["the LORD", ["H3068"]],
    ["thy God", ["H430"]],
    ["commanded", ["H6680"]],
    ["thee to keep", ["H6213"]],
    ["the sabbath", ["H7676"]],
    ["day.", ["H3117"]]
  ]
};

export const TheSabbath: React.FC = () => {
  return (
    <div className={styles.container}>
      <ScriptureVerse
        book="Leviticus"
        chapter={23}
        verse={leviticus23_3}
        displayReference="Leviticus 23:3"
      />
      <ScripturePassage
        book="Deuteronomy"
        chapter={5}
        verses={[deuteronomy5_12, deuteronomy5_13, deuteronomy5_14, deuteronomy5_15]}
        displayReference="Deuteronomy 5:12-15"
        linkToVerse={12}
      />
    </div>
  );
};
