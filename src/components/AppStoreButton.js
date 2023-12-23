import React from "react";

const AppStoreButton = ({link, newTab}) => {
    return  <div>
    <a href={link} target={newTab ? "_blank" : "_self"}>
      <img src="/Download.svg" height="54" />
    </a>
  </div>
}

export default AppStoreButton;