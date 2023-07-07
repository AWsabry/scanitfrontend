import Head from "next/head";
import settings from "@data/settings";
import {useRouter} from "next/router";
import Layout from "@components/layout";
import Loader from "@components/ui/loader";
import Breadcrumb from "@components/ui/breadcrumb";
import {Fragment, useState, useEffect} from "react";
import {client, productsQuery, productQuery} from "@graphql";
import ProductDetailsContent from "@components/product/details";

const ProductDetailsPage = ({products, product}) => {
    const productObject = product.getProduct;
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleStart = (url) => url !== router.pathname ? setIsLoading(true) : setIsLoading(false);
        const handleComplete = () => setIsLoading(false);

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);
    }, [router]);

    return (
        <Layout>
            <Head>
                <title>{productObject.name + " :: " + settings?.title}</title>
                <meta name="description" content={settings?.title}/>
            </Head>

            <Breadcrumb
                py={[60, 80]}
                mb={[60, null, 100]}
                pageTitle={productObject.name}
            />

            {isLoading ? <Loader/> : (
                <Fragment>
                    <ProductDetailsContent product={productObject}/>
                </Fragment>
            )}
        </Layout>
    );
};

export const getServerSideProps = async ({params}) => {
    const {slug} = params;
    const product = await client(productQuery(slug),'getProductById/');
    const products = await client(productsQuery(),'getProducts/');

    if (!product) {
        throw new Error(`Product with slug '${slug}' not found`);
    }

    if (!products) {
        throw new Error(`Products fetching error!`);
    }

    return {
        props: {
            product: product|| "undefiend",
            products: products||"undefind products",
        },
    };
};

export default ProductDetailsPage;
