import React from "react";

const AppStoreButton = ({link, newTab, store}) => {
    return  <div>
    <a href={link} target={newTab ? "_blank" : "_self"}>
      <img src={store === "google" ? "/Download_Google.png"  : "/Download.svg"} height="54" />
    </a>
  </div>
}

export default AppStoreButton;