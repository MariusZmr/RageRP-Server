export interface ICharacterCreationData {
    parents: {
        father: number;
        mother: number;
        similarity: number;
        skin: number;
    };
    features: number[];
    hair: {
        style: number;
        color: number;
        highlight: number;
    };
    info: {
        firstName: string;
        lastName: string;
        age: number;
        gender: number;
    };
}
