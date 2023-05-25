import { atom } from "jotai";

interface dataImageType {
    location: string;
    userName: string;
    userImage: string;
    altDescription: string;
    srcImage: string;
}

export const keyWordAtom = atom<string>("");

export const dataSearchImageAtom = atom<dataImageType[]>([]);