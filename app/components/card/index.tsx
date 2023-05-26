import React from "react"
import styles from './card.module.css'
import Image from 'next/image';

interface dataImageType {
    location: string;
    userName: string;
    userImage: string;
    altDescription: string;
    srcImage: string;
  }

interface CardType {
	title: string;
	src: string;
	alt: string;
    userName: string;
    userImg: string;
    dataFavorites: dataImageType[];
    hdnSetFavorites: any;
}
export const Card = ({ title, src, alt, userName, userImg, dataFavorites, hdnSetFavorites  }: CardType) => {
    const item = {
        title,
        src,
        alt,
        userName,
        userImg
    }
    return (
        <div className={`card ${styles.card}`}>
            <div className={styles.card_image}>
                <Image
                    src={src ?? ""}
                    alt={alt ?? ""} 
                    width="0"
                    height="0"
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                />
                <i 
                    className="fa-sharp fa-solid fa-heart" 
                    style={{ fontSize: "30px", 
                    cursor: "pointer",
                    position: "absolute",
                    right: "1rem",
                    top: ".75rem",
                    zIndex: "9999999",
                    color: `${dataFavorites.find(val => val.srcImage === src) ? "red" : "white"}`
                    }} 
                    onClick={() => hdnSetFavorites(item)}
                />
                <div className={styles.overlay} />
            </div>
            <div className={styles.card_body}>
                <h2 className={styles.card_title}>{title ?? ""}</h2>
                <div className={styles.card_detail_user}>
                    <Image
                        src={userImg ?? ""}
                        alt={title ?? ""} 
                        width="0"
                        height="0"
                        sizes="100vw"
                        style={{ width: '40px', height: 'auto', borderRadius: "50%", marginRight: "1rem" }}
                    />
                    <p  className={styles.card_desc}>{userName ?? ""}</p>
                </div>
            </div>
        </div>
    )
}