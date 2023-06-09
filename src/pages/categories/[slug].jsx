import Head from "next/head";
import settings from "@data/settings";
import Layout from "@components/layout";
import EmptyProduct from "@components/ui/empty";
import {client} from "@graphql";
import Breadcrumb from "@components/ui/breadcrumb";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import subcategoriesQuery from "../../graphql/query/subcategories";
import SubCategories from "@components/subcategories";

const CollectionPage = () => {
    const router = useRouter()
    const slug = router.query.slug;
    const [categories, setCategories] = useState([]);
    // Fetch the products category
    useEffect(async () => {
        const subcategoriesCollection = await client(subcategoriesQuery(slug), 'get_subCategory_by_category_slug/');
        setCategories(subcategoriesCollection.getSubcategoriesByCategory)
    }, [slug]);


    return (
        <Layout>
            <Head>
                <title>Sub Categories</title>
                <meta name="description" content={settings?.title}/>
            </Head>
            <Breadcrumb
                py={[40, 80]}
                mb={[60, null, 100]}
                pageTitle="Sub Category"
            />
            {categories?.length ? (
                <SubCategories categories={categories}/>
            ) : (
                <EmptyProduct message="There are no categories" />
            )}
        </Layout>
    );
};
export default CollectionPage;
