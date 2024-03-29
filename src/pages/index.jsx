import Head from "next/head";
import Layout from "@components/layout";
import settings from "@data/settings.json";
import Promotions from "@components/promotions";
import Categories from "@components/categories";
import sliderData from "@data/slider/home-1.json";
import {SliderOne as Slider} from "@components/slider";
import {client, collectionsQuery} from "@graphql";
import HomepageVideo from "@components/HomepageVideo";
import {useEffect, useState} from "react";

const Home = () => {
    const [collections, setCollections] = useState([]);
    useEffect(() => {
        client(collectionsQuery(50),'getCategories/')
        .then((response) => {
            setCollections(response.allCategories);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);
    return (
        <Layout>
            <Head>
                <title>{settings?.title}</title>
                <meta name="description" content={settings?.description}/>
            </Head>
            <Slider animate={true} data={sliderData}/>
            <HomepageVideo />
            <Categories categories={collections}/>
            <Promotions/>
        </Layout>
    );
};

export default Home;