import React from "react"
import styles from './card.module.css'
interface CardType {
	title: string;
	src: string;
	alt: string;
    userName: string;
    userImg: string;
}
export const Card = ({ title, src, alt, userName, userImg }: CardType) => {
    return (
        <div className={`card ${styles.card}`}>
            <div className={styles.card_image}>
                <img
                    className={styles.image}
                    src={src ?? ""}
                    alt={alt ?? ""} 
                />
                <div className={styles.overlay} />
            </div>
            <div className={styles.card_body}>
                <h2 className={styles.card_title}>{title ?? ""}</h2>
                <div className={styles.card_detail_user}>
                    <img src={userImg ?? ""} alt={title ?? ""} />
                    <p  className={styles.card_desc}>{userName ?? ""}</p>
                </div>
            </div>
        </div>
    )
}