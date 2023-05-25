// import { useAtom } from "jotai";
// import { keyWordAtom } from "../helper/atom/global";
// import { get } from "../helper/fetchers"

const retrieve = () => {
    return console.log("retrieve-asset");
}

const search = (keyWord: string) => {
    console.log(keyWord)
    // return console.log("search-asset")
}

const Service = {
    retrieve,
    search
}

export default Service;