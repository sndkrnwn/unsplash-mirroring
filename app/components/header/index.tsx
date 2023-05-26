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

interface HeaderType {
    hdnModalfavorites: () => void;
}

export const Header = ({ hdnModalfavorites }:HeaderType) => {
    const [, setDataSearch] = useAtom(dataSearchImageAtom);
    const [keyWord, setKeyWord] = useAtom(keyWordAtom);
    const hdnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setKeyWord(event.target.value);
	};

    const hdnClick = async() => {
        const getData: dataImageType[] = [];
        const { results }: any  = await get(`${baseURL}/search/photos?count=40&query=${keyWord}${clientId}`);
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

    const onFormSubmit = async (e: any) => {
        e.preventDefault();
        const getData: dataImageType[] = [];
        const { results }: any  = await get(`${baseURL}/search/photos?count=40&query=${keyWord}${clientId}`);
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
        // send state to server with e.g. `window.fetch`
      }
    
    return (
        <nav className={`navbar navbar-expand-lg fixed-top ${styles.nav}`}>
            <div className="container">
                <div className="col-2">
                    <i className="fa-sharp fa-solid fa-heart" style={{ fontSize: "30px", cursor: "pointer" }} onClick={hdnModalfavorites}></i>
                </div>
                <div className="col-10">
                    <form onSubmit={onFormSubmit}>
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
            </div>
        </nav>
    )
}