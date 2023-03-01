export type TPhonetic = {
  text: string;
  audio: string;
};
export type TDefinition = {
  definition: string;
  example: string;
};

export type TMeaning = {
  partOfSpeech: string;
  definitions: TDefinition[];
};

export interface IResponse {
  word: string;
  phonetics: TPhonetic[];
  meanings: TMeaning[];
}
