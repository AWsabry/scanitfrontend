import Head from "next/head";
import settings from "@data/settings";
import Layout from "@components/layout";
import EmptyProduct from "@components/ui/empty";
import {client, collectionQuery} from "@graphql";
import Breadcrumb from "@components/ui/breadcrumb";
import { ProductsTab } from "@components/product/feed";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'

const CollectionPage = () => {
    const router = useRouter()
    const slug = router.query.slug;
    const [products, setProducts] = useState([]);
    // Fetch the products category
    useEffect(async () => {
        const productsCollection = await client(collectionQuery(slug), 'get_products_by_category_slug/');
        setProducts(productsCollection.getProductsByCategory)
    }, [slug]);


    return (
        <Layout>
            <Head>
                <title>Products</title>
                <meta name="description" content={settings?.title}/>
            </Head>
            <Breadcrumb
                py={[40, 80]}
                mb={[60, null, 100]}
                pageTitle="Category"
            />
            {products?.length ? (
                <ProductsTab products={products} limit={8}/>
            ) : (
                <EmptyProduct/>
            )}
        </Layout>
    );
};

// export const getServerSideProps = async ({params, query}) => {
//     const {slug} = params;
//     const {sort} = query;
//     const sortKey = sort?.split("-")[0].toUpperCase();
//     const reverse = sort?.split("-")[1] !== "ascending";
//     const collectionData = await client(collectionQuery(slug, sortKey, reverse), '/get_products_by_category_slug');
//     console.log(collectionData);
//     return {
//         props: {
//             collection: {
//                 title: collectionData?.collectionByHandle?.title,
//                 products: collectionData?.collectionByHandle?.products?.edges,
//             },
//         }
//     };
// };

export default CollectionPage;
