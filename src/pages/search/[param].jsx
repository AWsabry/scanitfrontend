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
    useEffect(() => {
        axios.get('http://api.3dscanit.org/get_searched_products/'+router.query.param)
            .then(response => {
                const mappedResult = response.data.Names.map((item) => {
                    return {
                        ...item,
                        startFrom: item.start_from,
                        reachTo: item.reach_to,
                        image: item.image,
                    }
                });
                console.log(mappedResult)
                setResult(mappedResult);
            }).catch(error => {
            console.log(error)
        })
    }, []);
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

export const getServerSideProps = async ({params, query}) => {
    return {
        props: {
            products: []
        }
    };
};

export default SearchPage;
