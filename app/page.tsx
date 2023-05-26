"use client"
import React from "react";
import { useAtom } from "jotai";
import "bootstrap/dist/css/bootstrap.min.css";
import Masonry from "react-masonry-css";
import "@fortawesome/fontawesome-free/css/all.min.css"
import styles from './page.module.css'
//Helper
import { get } from './helper/fetchers';
//Components
import { Header } from "./components/header"
import { Card } from "./components/card";
//Atom
import { dataSearchImageAtom } from "./helper/atom/global"

const baseURL = "https://api.unsplash.com/photos/random?count=40&client_id=BjiEafixEfsEp95wVNrDWWcNEfou3Hvw4xV8HkSWdL0";

interface dataImageType {
  location: string;
  userName: string;
  userImage: string;
  altDescription: string;
  srcImage: string;
}
export default function Home() {
  const [dataImage, setImage] = React.useState<dataImageType[]>([]);
  const [dataSearch] = useAtom(dataSearchImageAtom);

  //RETRIVIE RANDOM IMAGE
  const getData = async() => {
    const getData: dataImageType[] = [];
    const data: any[]  = await get(baseURL);
    data.map((value) => {
      getData.push({
        location: value.user.location,
        userName: value.user.name,
        userImage: value.user.profile_image.medium,
        altDescription: value.alt_description,
        srcImage: value.urls.regular
      })
    })
    setImage(getData)
  }

  React.useEffect(() => {
    getData();
  }, [])
  //RETRIVIE RANDOM IMAGE

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <main className={styles.main}>
        <Header />
        <div className={styles.content}>
          <div className="container-fluid"> 
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className={styles.my_masonry_grid}
                columnClassName={styles.my_masonry_grid_column}>
                {
                  dataImage.length > 0 && dataSearch.length == 0 ? dataImage.map((item, key) => {
                    return (
                      <div key={key} className={styles.my_masonry_asset}>
                          <Card 
                            title={item.location}
                            src={item.srcImage}
                            alt={item.altDescription}
                            userName={item.userName}
                            userImg={item.userImage}
                          />
                      </div>
                    )
                  })
                  :
                  dataSearch.map((item, key) => {
                    return (
                      <div key={key} className={styles.my_masonry_asset}>
                          <Card 
                            title={item.location}
                            src={item.srcImage}
                            alt={item.altDescription}
                            userName={item.userName}
                            userImg={item.userImage}
                          />
                      </div>
                    )
                  })
                }
            </Masonry>
          </div>
        </div>
    </main>
  )
}
