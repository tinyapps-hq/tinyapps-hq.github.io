import Layout from "@theme/Layout";
import React, { useMemo } from "react";

const DeleteMePage = () => {
    const emailLink = useMemo(() => ["tinyappshq.net", "conner"].reverse().join("@"), []);
    const handleClick = () => {
        window.location.href = `mailto:${emailLink}?subject=Removal Request&body=Please remove me. My user Id is: <<Enter your userId here.>>`
    }
  return (
    <Layout title="Delete my data">
      <div className="container container-fluid margin-vert--lg">
        <h1>Delete my data</h1>
        <p>If you'd like to delete your account from the Two-Up system, you can do so in the app.</p>
        <p>From the profile screen, press the <span style={{color: "red"}}>Delete my account</span> button </p>
        <p>or you can email me to request removal <button onClick={handleClick}>Request removal</button></p>
        
      </div>
    </Layout>
  );
};

export default DeleteMePage;
