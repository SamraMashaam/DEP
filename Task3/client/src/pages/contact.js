import React from "react";
import Layout from "./../components/layout/layout";

const Contact = () => {
  return (
    <Layout title={"Contact us"}>
     
        <div className="col-ms-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify ms-2">
               Have any suggestions or complaints?
          </p>
          <p className="ms-3">
               www.help@canking.com
          </p>
          <p className="ms-3">
                012-3456789
          </p>
          <p className="ms-3">
               8700-0000-0000 (toll free)
          </p>
        </div>
     
    </Layout>
  );
};

export default Contact;