import Layout from "@theme/Layout";
import React from "react";
import AppStoreBadge from "../../../../static/appStoreBadge.svg";

export default () => {
  return (
    <Layout title="Journeycast 2" description="Journeycast 2">
      <div className="container container-fluid margin-vert--lg">
        <div className="row mdxPageWrapper_node_modules-@docusaurus-theme-classic-lib-theme-MDXPage-styles-module">
          <div className="col col--8">
            <article>
              <h1>Journeycast2</h1>
              <p>
                Have you ever wanted to view the weather forecast for your
                multi-destination trip in one place? Do you have many cities
                added to your current weather app and need to toggle back and
                forth to check on what the weather will be in each city on each
                day?
              </p>
              <p style={{ fontWeight: "bold" }}>
                Then have we got an app for you!
              </p>
              <div style={{ display: "flex" }}>
              <div>
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
                </div>
                <div>
                  <a href="https://apps.apple.com/us/app/journeycast2/id6467520223">
                  <AppStoreBadge style={{ height: 54, width: 250 }} />
                  </a>
                  
                </div>
              </div>
              <div style={{flex: 1, display: "flex", flexWrap: "nowrap", flexDirection: "row"}}>
                <div><img src={require("../../../../static/img/jc2/journeycast.PNG").default} /></div>
                <div><img src={require("../../../../static/img/jc2/IMG_3269_2.png").default} /></div>
                <div><img src={require("../../../../static/img/jc2/stops.PNG").default} /></div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </Layout>
  );
};
