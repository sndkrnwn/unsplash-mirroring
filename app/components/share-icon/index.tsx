import React from "react"
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    WhatsappIcon,
    TwitterIcon,
  } from "react-share";
interface ShareIconTypes {
    url: string;
}
export const ShareIcon = ({ url }: ShareIconTypes ) => {
    return (
        <div style={{
            display: "flex"
          }}>
            <FacebookShareButton url={url} style={{marginRight: ".5rem"}}>
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <TwitterShareButton url={url} style={{marginRight: ".5rem"}}>
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
            <WhatsappShareButton url={url}>
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
          </div>
    )
}