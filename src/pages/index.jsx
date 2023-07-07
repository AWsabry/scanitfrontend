import Head from "next/head";
import Layout from "@components/layout";
import settings from "@data/settings.json";
import Promotions from "@components/promotions";
import Categories from "@components/categories";
import sliderData from "@data/slider/home-1.json";
import {SliderOne as Slider} from "@components/slider";
import {client, blogsQuery, productsQuery, collectionsQuery} from "@graphql";
import HomepageVideo from "@components/HomepageVideo";

const Home = ({blogs, products, collections}) => {
    return (
        <Layout>
            <Head>
                <title>{settings?.title}</title>
                <meta name="description" content={settings?.description}/>
            </Head>

            <Slider animate={true} data={sliderData}/>
            <HomepageVideo />
            <Categories categories={collections}/>
            {/* <ProductsTab products={products} limit={8}/> */}

            <Promotions/>

            {/* <LatestBlog posts={blogs} pt={[60, 60, 100]}/> */}
        </Layout>
    );
};

export const getStaticProps = async () => {
   // const blogsData = await client(blogsQuery(4)),
        /* blogs = blogsData?.blogs?.edges[0]?.node?.articles?.edges,
        productsData = await client(productsQuery(50)),
        products = productsData?.products?.edges,
        collectionsData = await client(collectionsQuery(5)),
        collections = collectionsData?.collections?.edges; */
        const productsData = await client(productsQuery(50),'getProducts/'),

        //products = productsData?.products?.edges,
        blogs = null,
       // productsData = null,
        products = productsData?.allProducts;
        const collectionsData = await client(collectionsQuery(50),'getCategories/');
        const collections = collectionsData?.allCategories;

    return {
        props: {
            blogs,
            products,
            collections,
        },
        revalidate: 60,
    };
};

export default Home;
