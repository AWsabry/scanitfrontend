import Head from "next/head";
import Layout from "@components/layout";
import settings from "@data/settings.json";
import Promotions from "@components/promotions";
import Categories from "@components/categories";
import sliderData from "@data/slider/home-1.json";
import { SliderOne as Slider } from "@components/slider";
import { client, collectionsQuery } from "@graphql";
import HomepageVideo from "@components/HomepageVideo";
import { useEffect, useState } from "react";
import { RelatedProducts } from "@components/product/feed";
// import { axios } from "axios";
import Cookie from "js-cookie";
import axios from "axios";

// axios.defaults.baseURL = "https://api.3dscanit.org/";

const Home = () => {
  const [collections, setCollections] = useState([]);
  const user_email = Cookie.get("user_email");

  useEffect(() => {
    client(collectionsQuery(50), "getCategories/")
      .then((response) => {
        setCollections(response.allCategories);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("https://api.3dscanit.org/update_daily_limit/" + user_email)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get("https://api.3dscanit.org/update_daily_limit/" + user_email)
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, []);

  return (
    <Layout>
      <Head>
        <title>{settings?.title}</title>
        <meta name="description" content={settings?.description} />
      </Head>
      <Slider animate={true} data={sliderData} />
      <RelatedProducts
        api_endpoint="https://api.3dscanit.org/get_mostSold_products/"
        title="Most Sold Products"
        className="mt-16"
        align="center"
      />
      <Categories categories={collections} className="mt-4" />
      <Promotions />
      <HomepageVideo />
    </Layout>
  );
};

export default Home;
