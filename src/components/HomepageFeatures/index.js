import clsx from "clsx";
import React from "react";
import AppStoreButton from "../AppStoreButton";
import styles from "./styles.module.css";

const FeatureList = [
  // {
  //   title: 'Easy to Use',
  //   Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
  //   description: (
  //     <>
  //       Docusaurus was designed from the ground up to be easily installed and
  //       used to get your website up and running quickly.
  //     </>
  //   ),
  // },
  // {
  //   title: 'Focus on What Matters',
  //   Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
  //   description: (
  //     <>
  //       Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
  //       ahead and move your docs into the <code>docs</code> directory.
  //     </>
  //   ),
  // },
  // {
  //   title: 'Powered by React',
  //   Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
  //   description: (
  //     <>
  //       Extend or customize your website layout by reusing React. Docusaurus can
  //       be extended while reusing the same header and footer.
  //     </>
  //   ),
  // },
  {
    title: "Journeycast2",
    // Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    image: "/img/jc2/JourneyCast2Logo.png",
    description: (
      <>
        Now available! The long-awaited successor to the popular Journeycast
        travel forecast app is available in the App Store now.
      </>
    ),
    cta: (
      <>
        <AppStoreButton link="https://apps.apple.com/us/app/journeycast2/id6467520223" newTab={true} />
      </>
    )
  },
  {
    title: "Two Up",
    // Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    image: "/img/twoup/TwoUpLogo.png",
    description: (
      <>
        Coming Soon! Live scoring for your buddy trip's Ryder-Cup style event.
      </>
    ),
    cta: (
      <>
        Coming Soon!
      </>
    )
  },
  {
    title: "More coming Soon",
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        The tension is building.
      </>
    )
  },
];

function Feature({ Svg, image, title, description, cta }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        {Svg && <Svg className={styles.featureSvg} role="img" />}
        {image && <img src={image} style={{borderRadius: "2em", width: "12em"}} />}

      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
        { cta }
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row" style={{ justifyContent: "center" }}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
