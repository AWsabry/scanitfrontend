import Head from "next/head";
import settings from "@data/settings.json";
import Layout from "@components/layout";
import EmptyProduct from "@components/ui/empty";
import {client, collectionQuery} from "@graphql";
import Breadcrumb from "@components/ui/breadcrumb";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import ProductsTab from "@components/product/feed/products-tab";
const ProductsPage = () => {
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
                pageTitle="Sub Category"
            />
            {products?.length ? (
                <ProductsTab products={products} limit={8}/>
            ) : (
                <EmptyProduct message="There are no categories" />
            )}
        </Layout>
    );
};
export default ProductsPage;
