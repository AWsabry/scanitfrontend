import Head from "next/head";
import settings from "@data/settings";
import Layout from "@components/layout";
import EmptyProduct from "@components/ui/empty";
import Breadcrumb from "@components/ui/breadcrumb";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import ProductsTab from "../../components/product/feed/products-tab";

const SearchPage = () => {
    const router = useRouter();
    const [result, setResult] = useState([]);
    const search = router.query.param;
    useEffect(() => {
        axios.get('https://api.3dscanit.org/get_searched_products/'+search)
            .then(response => {
                const mappedResult = response.data.Names.map((item) => {
                    return {
                        ...item,
                        startFrom: item.start_from,
                        reachTo: item.reach_to,
                        image: item.image,
                    }
                });
                setResult(mappedResult);
            }).catch(error => {
            console.log(error)
        })
    }, [search]);
    return (
        <Layout>
            <Head>
                <title>{"Search: " + result?.length + " Products found " + settings?.title}</title>
                <meta name="description" content={settings?.title}/>
            </Head>

            <Breadcrumb
                py={[40, 80]}
                mb={[60, null, 100]}
                pageTitle="Search"
            />

            {result?.length ? (
                <ProductsTab products={result} hideHeader="yes" />
            ) : (
                <EmptyProduct/>
            )}
        </Layout>
    );
};

export default SearchPage;
