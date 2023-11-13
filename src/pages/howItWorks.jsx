import Head from "next/head";
import Layout from "@components/layout";
import settings from "@data/settings.json";
import HowItWorksVideo from "@components/howItWorksVideo";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";

// axios.defaults.baseURL = "https://api.3dscanit.org/";

const How = () => {
  const [collections, setCollections] = useState([]);
  const user_email = Cookie.get("user_email");
  
  return (
    <Layout>
      <Head>
        <title>{settings?.title}</title>
      </Head>
      <HowItWorksVideo/>
    </Layout>
  );
};

export default How;
