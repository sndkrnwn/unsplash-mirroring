import React from "react";
import Masonry from "react-masonry-css";
import styles from './masonry.module.css'
export const GridMasonry = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
    const breakpointColumnsObj = {
        default: 3,
        1100: 3,
        700: 2,
        500: 1
    };
    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className={styles.my_masonry_grid}
            columnClassName={styles.my_masonry_grid_column}>
                <div className={styles.my_masonry_asset}>
                {children}
                </div>
           
        </Masonry>
    )
}