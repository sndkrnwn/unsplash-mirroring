// "use client";
import React from "react";
import { useAtom } from "jotai";
import { keyWordAtom, dataSearchImageAtom } from "../../helper/atom/global";
import { get } from '../../helper/fetchers';
import styles from './header.module.css'

const baseURL = "https://api.unsplash.com/";
const clientId = "&client_id=BjiEafixEfsEp95wVNrDWWcNEfou3Hvw4xV8HkSWdL0";

interface dataImageType {
    location: string;
    userName: string;
    userImage: string;
    altDescription: string;
    srcImage: string;
}

export const Header = () => {
    const [, setDataSearch] = useAtom(dataSearchImageAtom);
    const [keyWord, setKeyWord] = useAtom(keyWordAtom);
    const hdnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setKeyWord(event.target.value);
	};

    const hdnClick = async() => {
        const getData: dataImageType[] = [];
        const { results }: any  = await get(`${baseURL}/search/photos?page=1&query=${keyWord}${clientId}`);
        results.map((value: any) => {
            getData.push({
              location: value.user.location,
              userName: value.user.name,
              userImage: value.user.profile_image.medium,
              altDescription: value.alt_description,
              srcImage: value.urls.regular
            })
        })
        setDataSearch(getData)
    }
    
    return (
        <nav className={`navbar navbar-expand-lg fixed-top ${styles.nav}`}>
            <div className="container">
                <div className="col-2">

                </div>
                <div className="col-8">
                    <form>
                        <div className={`form-group ${styles.form_group}`}>
                            <i className={`fa-solid fa-magnifying-glass ${styles.form_icon}`} onClick={hdnClick}></i>
                            <input 
                                onChange={hdnChange}
                                className={`form-control ${styles.search}`} 
                                placeholder="Search" 
                            />
                        </div>
                    </form>
                </div>
                <div className="col-2">

                </div>
            </div>
        </nav>
    )
}