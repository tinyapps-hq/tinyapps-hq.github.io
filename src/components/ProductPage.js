import Layout from "@theme/Layout";
import React from "react";
import AppStoreButton from "./AppStoreButton";

const ProductPage = ({
  title,
  appIconPath,
  description,
  appStoreLink,
  productHuntBadge,
  children,
  images,
}) => {
  return (
    <Layout title={title} description={title}>
      <div className="container container-fluid margin-vert--lg">
        <div className="row mdxPageWrapper_node_modules-@docusaurus-theme-classic-lib-theme-MDXPage-styles-module">
          <div className="col col--8">
            <article>
              <img
                src={appIconPath}
                style={{ borderRadius: "2em", width: "12em" }}
              />
              <h1>{title}</h1>
              <div style={{ marginBottom: "2em" }}>{children}</div>

              {/* <p>{description}</p> */}
              <div style={{ display: "flex" }}>
                {productHuntBadge && (
                  <div style={{ marginRight: "1em" }}>{productHuntBadge}</div>
                )}
                {appStoreLink ? (
                  <AppStoreButton link={appStoreLink} />
                ) : (
                  <div>Coming soon!</div>
                )}
              </div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {images &&
                  images.map((url) => (
                    <div style={{ flex: 1, minWidth: "33%", maxWidth: "33%" }}>
                      <img src={url} />
                    </div>
                  ))}
                {/* {children} */}
              </div>
            </article>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
