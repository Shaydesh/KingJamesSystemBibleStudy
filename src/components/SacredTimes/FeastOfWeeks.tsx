import { Verse } from '../../types/BibleBook';
import { ScripturePassage } from './ScripturePassage';

// Leviticus 23:15-21 with Strong's references
const leviticus23_15: Verse = {
  verse: "15",
  text: "And ye shall count unto you from the morrow after the sabbath, from the day that ye brought the sheaf of the wave offering; seven sabbaths shall be complete:",
  k: 3417,
  v: [
    ["And ye shall count", ["H5608"]],
    ["unto you from the morrow after", ["H4283"]],
    ["the sabbath,", ["H7676"]],
    ["from the day", ["H3117"]],
    ["that ye brought", ["H935"]],
    ["the sheaf", ["H6016"]],
    ["of the wave offering;", ["H8573"]],
    ["seven", ["H7651"]],
    ["sabbaths", ["H7676"]],
    ["shall be", ["H1961"]],
    ["complete:", ["H8549"]]
  ]
};

const leviticus23_16: Verse = {
  verse: "16",
  text: "Even unto the morrow after the seventh sabbath shall ye number fifty days; and ye shall offer a new meat offering unto the LORD.",
  k: 3418,
  v: [
    ["Even unto", ["H5704"]],
    ["the morrow after", ["H4283"]],
    ["the seventh", ["H7637"]],
    ["sabbath", ["H7676"]],
    ["shall ye number", ["H5608"]],
    ["fifty", ["H2572"]],
    ["days;", ["H3117"]],
    ["and ye shall offer", ["H7126"]],
    ["a new", ["H2319"]],
    ["meat offering", ["H4503"]],
    ["unto the LORD.", ["H3068"]]
  ]
};

const leviticus23_17: Verse = {
  verse: "17",
  text: "Ye shall bring out of your habitations two wave loaves of two tenth deals: they shall be of fine flour; they shall be baken with leaven; they are the firstfruits unto the LORD.",
  k: 3419,
  v: [
    ["Ye shall bring", ["H935"]],
    ["out of your habitations", ["H4186"]],
    ["two", ["H8147"]],
    ["wave", ["H8573"]],
    ["loaves", ["H3899"]],
    ["of two", ["H8147"]],
    ["tenth deals:", ["H6241"]],
    ["they shall be", ["H1961"]],
    ["of fine flour;", ["H5560"]],
    ["they shall be baken", ["H644"]],
    ["with leaven;", ["H2557"]],
    ["they are the firstfruits", ["H1061"]],
    ["unto the LORD.", ["H3068"]]
  ]
};

const leviticus23_18: Verse = {
  verse: "18",
  text: "And ye shall offer with the bread seven lambs without blemish of the first year, and one young bullock, and two rams: they shall be for a burnt offering unto the LORD, with their meat offering, and their drink offerings, even an offering made by fire, of sweet savour unto the LORD.",
  k: 3420,
  v: [
    ["And ye shall offer", ["H7126"]],
    ["with", ["H5921"]],
    ["the bread", ["H3899"]],
    ["seven", ["H7651"]],
    ["lambs", ["H3532"]],
    ["without blemish", ["H8549"]],
    ["of the first", ["H1121"]],
    ["year,", ["H8141"]],
    ["and one", ["H259"]],
    ["young", ["H1121", "H1241"]],
    ["bullock,", ["H6499"]],
    ["and two", ["H8147"]],
    ["rams:", ["H352"]],
    ["they shall be", ["H1961"]],
    ["for a burnt offering", ["H5930"]],
    ["unto the LORD,", ["H3068"]],
    ["with their meat offering,", ["H4503"]],
    ["and their drink offerings,", ["H5262"]],
    ["even an offering made by fire,", ["H801"]],
    ["of sweet", ["H5207"]],
    ["savour", ["H7381"]],
    ["unto the LORD.", ["H3068"]]
  ]
};

const leviticus23_19: Verse = {
  verse: "19",
  text: "Then ye shall sacrifice one kid of the goats for a sin offering, and two lambs of the first year for a sacrifice of peace offerings.",
  k: 3421,
  v: [
    ["Then ye shall sacrifice", ["H6213"]],
    ["one", ["H259"]],
    ["kid", ["H8163"]],
    ["of the goats", ["H5795"]],
    ["for a sin offering,", ["H2403"]],
    ["and two", ["H8147"]],
    ["lambs", ["H3532"]],
    ["of the first", ["H1121"]],
    ["year", ["H8141"]],
    ["for a sacrifice", ["H2077"]],
    ["of peace offerings.", ["H8002"]]
  ]
};

const leviticus23_20: Verse = {
  verse: "20",
  text: "And the priest shall wave them with the bread of the firstfruits for a wave offering before the LORD, with the two lambs: they shall be holy to the LORD for the priest.",
  k: 3422,
  v: [
    ["And the priest", ["H3548"]],
    ["shall wave", ["H5130"]],
    ["them with", ["H5921"]],
    ["the bread", ["H3899"]],
    ["of the firstfruits", ["H1061"]],
    ["for a wave offering", ["H8573"]],
    ["before", ["H6440"]],
    ["the LORD,", ["H3068"]],
    ["with", ["H5921"]],
    ["the two", ["H8147"]],
    ["lambs:", ["H3532"]],
    ["they shall be", ["H1961"]],
    ["holy", ["H6944"]],
    ["to the LORD", ["H3068"]],
    ["for the priest.", ["H3548"]]
  ]
};

const leviticus23_21: Verse = {
  verse: "21",
  text: "And ye shall proclaim on the selfsame day, that it may be an holy convocation unto you: ye shall do no servile work therein: it shall be a statute for ever in all your dwellings throughout your generations.",
  k: 3423,
  v: [
    ["And ye shall proclaim", ["H7121"]],
    ["on the selfsame", ["H6106"]],
    ["day,", ["H3117"]],
    ["that it may be an holy", ["H6944"]],
    ["convocation", ["H4744"]],
    ["unto you: ye shall do", ["H6213"]],
    ["no", ["H3808", "H3605"]],
    ["servile", ["H5656"]],
    ["work", ["H4399"]],
    ["therein: it shall be a statute", ["H2708"]],
    ["for ever", ["H5769"]],
    ["in all", ["H3605"]],
    ["your dwellings", ["H4186"]],
    ["throughout your generations.", ["H1755"]]
  ]
};

export const FeastOfWeeks: React.FC = () => {
  return (
    <ScripturePassage
      book="Leviticus"
      chapter={23}
      verses={[
        leviticus23_15,
        leviticus23_16,
        leviticus23_17,
        leviticus23_18,
        leviticus23_19,
        leviticus23_20,
        leviticus23_21
      ]}
      displayReference="Leviticus 23:15-21"
      linkToVerse={15}
    />
  );
};
