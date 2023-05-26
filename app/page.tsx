"use client"
import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from 'react-bootstrap/Modal';
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
//Share
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
} from "react-share";

const baseURL = "https://api.unsplash.com/photos/random?count=40&client_id=BjiEafixEfsEp95wVNrDWWcNEfou3Hvw4xV8HkSWdL0";

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
  const [dataSearch] = useAtom(dataSearchImageAtom);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
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

  const hdnDetail = (item: dataImageType) => {
    setDetail(item);
    setShow(true);;
  }

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
                      <div key={key} className={styles.my_masonry_asset} onClick={()=>hdnDetail(item)}>
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
                      <div key={key} className={styles.my_masonry_asset} onClick={()=>hdnDetail(item)}>
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
          {
            dataDetail !== null ?
            <Modal show={show} onHide={handleClose} size="lg" centered={true}>
              <Modal.Body>
                <div className="row">
                  <div className="col-6">
                    <img src={dataDetail.srcImage} alt={dataDetail.altDescription} className="img-fluid" style={{borderRadius: "10px"}} />
                  </div>
                  <div className="col-6">
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "1rem"
                    }}>
                      <img src={dataDetail.userImage} alt={dataDetail.altDescription} className="img-fluid" style={{
                        width: "50px",
                        borderRadius: "50%",
                        marginRight: "1rem"
                      }}/>
                      <p style={{
                        marginBottom: "0",
                        fontWeight: "700"
                      }}>{dataDetail.userName}</p>
                    </div>
                    <div>
                      <p>{dataDetail.altDescription}</p>
                    </div>
                    <div style={{
                      display: "flex"
                    }}>
                      <FacebookShareButton url={dataDetail.srcImage} style={{marginRight: ".5rem"}}>
                        <FacebookIcon size={32} round={true} />
                      </FacebookShareButton>
                      <TwitterShareButton url={dataDetail.srcImage} style={{marginRight: ".5rem"}}>
                        <TwitterIcon size={32} round={true} />
                      </TwitterShareButton>
                      <WhatsappShareButton url={dataDetail.srcImage}>
                        <WhatsappIcon size={32} round={true} />
                      </WhatsappShareButton>
                    </div>
                  </div>
                </div>
              
              </Modal.Body>
            </Modal>
            :
            null
          }
          
        </div>
    </main>
  )
}
