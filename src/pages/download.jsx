import Head from "next/head";
import settings from "@data/settings";
import Layout from "@components/layout";
import DownloadForm from "@components/download/download-form";
import Breadcrumb from "@components/ui/breadcrumb";

const DownloadPage = () => {
    return (
        <Layout>
            <Head>
                <title>{"Download :: " + settings?.title}</title>
                <meta name="description" content={settings?.title}/>
            </Head>

            <Breadcrumb
                py={[40, 80]}
                mb={[60, null, 100]}
                pageTitle="Download Page"
            />

            <DownloadForm/>
        </Layout>
    );
};

export default DownloadPage;
