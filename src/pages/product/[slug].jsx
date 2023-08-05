import Head from "next/head";
import settings from "@data/settings";
import {useRouter} from "next/router";
import Layout from "@components/layout";
import Loader from "@components/ui/loader";
import Breadcrumb from "@components/ui/breadcrumb";
import {Fragment, useState, useEffect} from "react";
import {client, productsQuery, productQuery} from "@graphql";
import ProductDetailsContent from "@components/product/details";
const ProductDetailsPage = () => {
    const router = useRouter();
    const slug = router.query.slug;
    const [productObject, setProductObject] = useState({});
    useEffect(() => {
        client(productQuery(slug),'getProductById/')
            .then((response) => {
                setProductObject(response.getProduct);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [slug]);
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


export default ProductDetailsPage;
