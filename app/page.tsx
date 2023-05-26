"use client"
import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from 'react-bootstrap/Modal';
import Masonry from "react-masonry-css";
import "@fortawesome/fontawesome-free/css/all.min.css"
import styles from './page.module.css'
import Image from 'next/image';
import InfiniteScroll
 from 'react-infinite-scroll-component'
//Helper
import { get } from './helper/fetchers';
//Components
import { Header } from "./components/header"
import { Card } from "./components/card";
import { ShareIcon } from "./components/share-icon"
//Atom
import { keyWordAtom, dataSearchImageAtom, dataFavoriteImageAtom } from "./helper/atom/global"

const baseURL = "https://api.unsplash.com/photos?page=1&client_id=BjiEafixEfsEp95wVNrDWWcNEfou3Hvw4xV8HkSWdL0";
interface dataImageType {
  location: string;
  userName: string;
  userImage: string;
  altDescription: string;
  srcImage: string;
}
export default function Home() {
  const [dataImage, setImage] = useState<dataImageType[]>([]);
  const [dataDetail, setDetail] = useState<any>(null);
  const [dataSearch, setDataSearch] = useAtom(dataSearchImageAtom);
  const [datafavorites, setDataFavorites] = useAtom(dataFavoriteImageAtom);
  const [modalDetail, setModalDetail] = useState(false);
  const [modalFavorites, setModalFavorites] = useState(false);
  const [keyWord] = useAtom(keyWordAtom);
  const [pageParam, setParam] = useState(1);
  const [pageParamSearch, setParamSearch] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const hdnCloseModalDetail = () => setModalDetail(false);
  const hdnModalfavorites = () => {
    setModalFavorites(!modalFavorites);
  };
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

  useEffect(() => {
    getData();
  }, [])
  //RETRIVIE RANDOM IMAGE

  //INFINITE SCROLL
  useEffect(() => {
    fetchMore();
  }, []);

  const fetchMore = async() => {
    const getData: dataImageType[] = [];
    const data: any[]  = await get(`https://api.unsplash.com/photos?page=${pageParam + 1}&client_id=BjiEafixEfsEp95wVNrDWWcNEfou3Hvw4xV8HkSWdL0`);
    data.map((value) => {
      getData.push({
        location: value.user.location,
        userName: value.user.name,
        userImage: value.user.profile_image.medium,
        altDescription: value.alt_description,
        srcImage: value.urls.regular
      })
    })
    setParam(pageParam + 1);
    setImage([...dataImage, ...getData]);
  }
  //INFINITE SCROLL
  const hdnDetail = (item: dataImageType) => {
    setDetail(item);
    setModalDetail(true);;
  }

  const hdnSetFavorites = (item: dataImageType) => {
    const getDataFavorites: dataImageType[] = datafavorites;
    getDataFavorites.push(item);
    setDataFavorites(getDataFavorites);
  }
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };
  return (
    <main className={styles.main}>
        <Header hdnModalfavorites={hdnModalfavorites}/>
        <div className={styles.content}>
          <div className="container-fluid">
          <InfiniteScroll
            dataLength={dataImage.length}
            next={fetchMore}
            hasMore={hasMore}
            loader={<></>}
          >
            <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className={styles.my_masonry_grid}
                  columnClassName={styles.my_masonry_grid_column}>
                  {
                    dataImage.length > 0 && dataSearch.length == 0 ? dataImage.map((item, key) => {
                      return (
                        <div key={key} className={styles.my_masonry_asset} onClick={()=>hdnDetail(item)}>
                            <Card 
                              title={item.location}
                              src={item.srcImage}
                              alt={item.altDescription}
                              userName={item.userName}
                              userImg={item.userImage}
                              dataFavorites={datafavorites}
                              hdnSetFavorites={hdnSetFavorites}
                            />
                        </div>
                      )
                    })
                    :
                    dataSearch.map((item, key) => {
                      return (
                        <div key={key} className={styles.my_masonry_asset} onClick={()=>hdnDetail(item)}>
                            <Card 
                              title={item.location}
                              src={item.srcImage}
                              alt={item.altDescription}
                              userName={item.userName}
                              userImg={item.userImage}
                              dataFavorites={datafavorites}
                              hdnSetFavorites={hdnSetFavorites}
                            />
                        </div>
                      )
                    })
                  }
              </Masonry>
          </InfiniteScroll>
           
          </div>

          {/* Detail Image */}
          {
            dataDetail !== null ?
            <Modal show={modalDetail} onHide={hdnCloseModalDetail} size="lg" centered={true}>
              <Modal.Body>
                <div className="row">
                  <div className="col-6" style={{position: "relative"}}>
                    <Image
                        src={dataDetail.srcImage ?? ""}
                        alt={dataDetail.altDescription ?? ""} 
                        width="0"
                        height="0"
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto', borderRadius: "10px" }}
                    />
                      <i className="fa-sharp fa-solid fa-heart" 
                        style={{ fontSize: "30px", 
                        cursor: "pointer",
                        position: "absolute",
                        right: "1.5rem",
                        top: ".75rem",
                        color: `${datafavorites.find(val => val.srcImage === dataDetail.srcImage) ? "red" : "white"}`
                      }} 
                      onClick={() => hdnSetFavorites(dataDetail)}
                      />
                  </div>
                  <div className="col-6">
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "1rem"
                    }}>
                       <Image
                        src={dataDetail.userImage ?? ""}
                        alt={dataDetail.altDescription ?? ""} 
                        width="0"
                        height="0"
                        sizes="100vw"
                        style={{ width: '50px', height: 'auto', borderRadius: "50%", marginRight: "1rem" }}
                    />
                      <p style={{
                        marginBottom: "0",
                        fontWeight: "700"
                      }}>{dataDetail.userName}</p>
                    </div>
                    <div>
                      <p>{dataDetail.altDescription}</p>
                    </div>
                    <ShareIcon url={dataDetail.srcImage ?? ""}/>
                  </div>
                </div>
              
              </Modal.Body>
            </Modal>
            :
            null
          }


          {/* Favorites Image */}
          <Modal show={modalFavorites} onHide={hdnModalfavorites} size="xl" centered={true}>
              <Modal.Body style={{
                minHeight: "500px"
              }}>
                <h2>Favorites</h2>
                {
                  datafavorites.length === 0 ?  <div
                  style={{
                    height: "400px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}><p style={{fontSize: "1.25rem", color: "rgba(0,0,0,.75)"}}>Favorites not found</p></div> : null
                }
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className={styles.my_masonry_grid}
                  columnClassName={styles.my_masonry_grid_column}>
                {
                  datafavorites.length > 0 ? datafavorites.map((item, key) => {
                      return (
                        <div key={key} className={styles.my_masonry_asset} onClick={()=>hdnDetail(item)}>
                            <Card 
                              title={item.location}
                              src={item.srcImage}
                              alt={item.altDescription}
                              userName={item.userName}
                              userImg={item.userImage}
                              dataFavorites={datafavorites}
                              hdnSetFavorites={hdnSetFavorites}
                            />
                        </div>
                      )
                    })
                    :
                    null
                  }
              </Masonry>
              </Modal.Body>
            </Modal>
        </div>
    </main>
  )
}
