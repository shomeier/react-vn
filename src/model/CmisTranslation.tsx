export interface SimpleTranslation {
    partOfSpeech: string,
    wordVn: string,
    semantic: string,
    wordEn: string
}

export interface Translation {
    sourceVocab:Vocab;
    targetVocab:Vocab[];
}

export interface Vocab {
    classifier?:string;
    word:string;
    partOfSpeech:string;
    language:string;
}

export interface Example {
    example:string;
    translation:string;
}