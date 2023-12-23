import React from "react";
import ProductPage from "../../../components/ProductPage";

const productHuntBadge = (
  <a
    href="https://www.producthunt.com/posts/journeycast-2?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-journeycast&#0045;2"
    target="_blank"
  >
    <img
      src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=420845&theme=light"
      alt="Journeycast&#0032;2 - Your&#0032;brilliant&#0032;travel&#0032;forecast&#0032;companion | Product Hunt"
      height="54"
    />
  </a>
);

const images = [
  "/img/jc2/journeycast.PNG",
  "/img/jc2/IMG_3269_2.png",
  "/img/jc2/stops.PNG",
];

const config = {
  title: "Journeycast 2",
  appIconPath: "/img/jc2/JourneyCast2Logo.png",
  appStoreLink: "https://apps.apple.com/us/app/journeycast2/id6467520223",
  description:
    "Have you ever wanted to view the weather forecast for your multi-destination trip in one place? Do you have many cities added to your current weather app and need to toggle back and forth to check on what the weather will be in each city on each day?",
  productHuntBadge,
  images,
};

export default () => {
  return (
    <ProductPage {...config}>
      <div>
        Have you ever wanted to view the weather forecast for your
        multi-destination trip in one place? Do you have many cities added to
        your current weather app and need to toggle back and forth to check on
        what the weather will be in each city on each day?
      </div>
    </ProductPage>
  );
};
