import {useRouter} from "next/router";
import Header from "@components/layout/header";
import Footer from "@components/layout/footer";
import SearchForm from "@components/ui/search";
import {Fragment, useState, useEffect} from "react";
import {Main} from "@components/layout/header/style";
import SettingsSidebar from "@components/layout/settings";
import MobileFooter from "@components/layout/mobile-footer";
import MobileNavbar from "@components/layout/navbar/mobile-nav";

const Layout = ({children, bg, ...props}) => {
    const router = useRouter();
    const [isShowConfig, setIsShowConfig] = useState(false);
    const [isShowSearchBox, setIsShowSearchBox] = useState(false);
    const [isShowMobileNav, setIsShowMobileNav] = useState(false);

    const onSearchBoxHandler = () => {
        document.querySelector('body').classList.toggle('overflow');
        setIsShowSearchBox(prevState => !prevState)
    }

    const onMobileNavHandler = () => {
        document.querySelector('body').classList.toggle('overflow');
        setIsShowMobileNav(prevState => !prevState)
    }

    const onConfigHandler = () => {
        document.querySelector('body').classList.toggle('overflow');
        setIsShowConfig(prevState => !prevState)
    }

    useEffect(() => {
        router.events.on('routeChangeStart', () => {
            document.querySelector('body').classList.remove('overflow');
        });
    }, [])

    return (
        <Fragment>
            <Header
                bg={bg}
                onConfigHandler={onConfigHandler}
                onSearchBoxHandler={onSearchBoxHandler}
                onMobileNavHandler={onMobileNavHandler}
            />

            <MobileNavbar
                isOpen={isShowMobileNav}
                onHandler={onMobileNavHandler}
            />


            <SearchForm
                isShow={isShowSearchBox}
                onHandler={onSearchBoxHandler}
            />

            <SettingsSidebar
                isOpen={isShowConfig}
                onHandler={onConfigHandler}
            />

            <Main {...props}>
                {children}
                <Footer mt={[60, null, 100]}/>
            </Main>

            <MobileFooter />
        </Fragment>
    );
};

Layout.defaultProps = {
    bg: "secondary"
}

export default Layout;
