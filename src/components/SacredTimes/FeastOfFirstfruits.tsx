import { Verse } from '../../types/BibleBook';
import { ScripturePassage } from './ScripturePassage';

// Leviticus 23:9-14 with Strong's references
const leviticus23_9: Verse = {
  verse: "9",
  text: "And the LORD spake unto Moses, saying,",
  k: 3411,
  v: [
    ["And the LORD", ["H3068"]],
    ["spake", ["H1696"]],
    ["unto", ["H413"]],
    ["Moses,", ["H4872"]],
    ["saying,", ["H559"]]
  ]
};

const leviticus23_10: Verse = {
  verse: "10",
  text: "Speak unto the children of Israel, and say unto them, When ye be come into the land which I give unto you, and shall reap the harvest thereof, then ye shall bring a sheaf of the firstfruits of your harvest unto the priest:",
  k: 3412,
  v: [
    ["Speak", ["H1696"]],
    ["unto", ["H413"]],
    ["the children", ["H1121"]],
    ["of Israel,", ["H3478"]],
    ["and say", ["H559"]],
    ["unto", ["H413"]],
    ["them, When", ["H3588"]],
    ["ye be come", ["H935"]],
    ["into", ["H413"]],
    ["the land", ["H776"]],
    ["which", ["H834"]],
    ["I", ["H589"]],
    ["give", ["H5414"]],
    ["unto you, and shall reap", ["H7114"]],
    ["the harvest", ["H7105"]],
    ["thereof, then ye shall bring", ["H935"]],
    ["a sheaf", ["H6016"]],
    ["of the firstfruits", ["H7225"]],
    ["of your harvest", ["H7105"]],
    ["unto", ["H413"]],
    ["the priest:", ["H3548"]]
  ]
};

const leviticus23_11: Verse = {
  verse: "11",
  text: "And he shall wave the sheaf before the LORD, to be accepted for you: on the morrow after the sabbath the priest shall wave it.",
  k: 3413,
  v: [
    ["And he shall wave", ["H5130"]],
    ["the sheaf", ["H6016"]],
    ["before", ["H6440"]],
    ["the LORD,", ["H3068"]],
    ["to be accepted", ["H7522"]],
    ["for you: on the morrow after", ["H4283"]],
    ["the sabbath", ["H7676"]],
    ["the priest", ["H3548"]],
    ["shall wave it.", ["H5130"]]
  ]
};

const leviticus23_12: Verse = {
  verse: "12",
  text: "And ye shall offer that day when ye wave the sheaf an he lamb without blemish of the first year for a burnt offering unto the LORD.",
  k: 3414,
  v: [
    ["And ye shall offer", ["H6213"]],
    ["that day", ["H3117"]],
    ["when ye wave", ["H5130"]],
    ["the sheaf", ["H6016"]],
    ["an he lamb", ["H3532"]],
    ["without blemish", ["H8549"]],
    ["of the first", ["H1121"]],
    ["year", ["H8141"]],
    ["for a burnt offering", ["H5930"]],
    ["unto the LORD.", ["H3068"]]
  ]
};

const leviticus23_13: Verse = {
  verse: "13",
  text: "And the meat offering thereof shall be two tenth deals of fine flour mingled with oil, an offering made by fire unto the LORD for a sweet savour: and the drink offering thereof shall be of wine, the fourth part of an hin.",
  k: 3415,
  v: [
    ["And the meat offering", ["H4503"]],
    ["thereof shall be two", ["H8147"]],
    ["tenth deals", ["H6241"]],
    ["of fine flour", ["H5560"]],
    ["mingled", ["H1101"]],
    ["with oil,", ["H8081"]],
    ["an offering made by fire", ["H801"]],
    ["unto the LORD", ["H3068"]],
    ["for a sweet", ["H5207"]],
    ["savour:", ["H7381"]],
    ["and the drink offering", ["H5262"]],
    ["thereof shall be of wine,", ["H3196"]],
    ["the fourth part", ["H7243"]],
    ["of an hin.", ["H1969"]]
  ]
};

const leviticus23_14: Verse = {
  verse: "14",
  text: "And ye shall eat neither bread, nor parched corn, nor green ears, until the selfsame day that ye have brought an offering unto your God: it shall be a statute for ever throughout your generations in all your dwellings.",
  k: 3416,
  v: [
    ["And ye shall eat", ["H398"]],
    ["neither", ["H3808"]],
    ["bread,", ["H3899"]],
    ["nor parched corn,", ["H7039"]],
    ["nor green ears,", ["H3759"]],
    ["until", ["H5704"]],
    ["the selfsame", ["H6106"]],
    ["day", ["H3117"]],
    ["that", ["H2088"]],
    ["ye have brought", ["H935"]],
    ["an offering", ["H7133"]],
    ["unto your God:", ["H430"]],
    ["it shall be a statute", ["H2708"]],
    ["for ever", ["H5769"]],
    ["throughout your generations", ["H1755"]],
    ["in all", ["H3605"]],
    ["your dwellings.", ["H4186"]]
  ]
};

export const FeastOfFirstfruits: React.FC = () => {
  return (
    <ScripturePassage
      book="Leviticus"
      chapter={23}
      verses={[
        leviticus23_9,
        leviticus23_10,
        leviticus23_11,
        leviticus23_12,
        leviticus23_13,
        leviticus23_14
      ]}
      displayReference="Leviticus 23:9-14"
      linkToVerse={9}
    />
  );
};
