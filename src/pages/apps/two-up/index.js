import React from "react";
import ProductPage from "../../../components/ProductPage";

const productHuntBadge = null;

const images = [
  "/img/twoup/1.png",
  "/img/twoup/2.png",
  "/img/twoup/3.png",
  "/img/twoup/4.png",
  "/img/twoup/5.png",
  "/img/twoup/6.png",
  "/img/twoup/7.png",
];

const config = {
  title: "Two Up",
  appIconPath: "/img/twoup/TwoUpLogo.png",
  appStoreLink: "https://apps.apple.com/us/app/two-up/id6474644660",
  description: "Professional scoring for amateur golfers",
  productHuntBadge,
  images,
};

export default () => {
  return (
    <ProductPage {...config}>
      Do you organize or participate in a Ryder-Cup-style golf trip? Do you
      struggle with real time scoring? Are you paying way too much for other
      tools that are clunky and don't look great? With Two Up, you can have live
      tournament scoring without the headache!
      <ul>
        <li>
          Add and invite players to your event - no signup required to
          participate!
        </li>
        <li>Create match play and stableford sessions and matches</li>
        <li>View live, hole-by-hole scoring updates</li>
        <li>Track player records</li>
      </ul>
    </ProductPage>
  );
};
