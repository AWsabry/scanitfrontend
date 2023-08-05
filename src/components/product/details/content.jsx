import {useIsLoggedIn, useProduct} from "@hooks";
import PropTypes from 'prop-types';
import {useDispatch} from "react-redux";
import Button from "@components/ui/button";
import axios from "axios";
import {
    ContentWrap,
    ProductName,
    ProductPrices,
} from "@components/product/details/details.style";
import Cookie from "js-cookie";
import {useState} from "react";

const ProductDetailsContent = ({product, ...props}) => {
    let { description, name, startFrom, reachTo, file } = product;
    const dispatch = useDispatch();
    const isLoggedIn = useIsLoggedIn();
    const [downloadLimit, setDownloadLimit] = useState(Cookie.get("download_limit"));
    const {
        sku,
        stock,
        isStock,
        quantity,
        variations
    } = useProduct(product);

    const HandleDownloadFilesClick = () => {
        // Check the download limit
        if(Cookie.get("download_limit") < 1) {
            alert("You have reached your download limit!");
            return;
        }
        // Decrement the download_limit
        axios.put('https://api.3dscanit.org/update_limit/' + Cookie.get("user_email"))
            .then(res => {
                window.open(file);
                setDownloadLimit(res.data);
                Cookie.set("download_limit", res.data);
            }).catch(err => {
                alert("You have reached your download limit!");
                setDownloadLimit(0);
                Cookie.set("download_limit", 0);
            });
    }
    return (
        <ContentWrap {...props}>
            <ProductName>{name}</ProductName>
            <ProductPrices>
                <span className="price new">{startFrom} EGP - {reachTo} EGP</span>
            </ProductPrices>
             <p>{description}</p>
            <br/>
            {(isLoggedIn && downloadLimit > 0) ? (
                <>
                    <Button
                        tag="button"
                        bg="primary"
                        color="white"
                        hvrBg="secondary"
                        className="btn-cart"
                        style={{
                            opacity: isStock ? 0.6 : 1,
                            pointerEvents: isStock ? 'none' : 'visible'
                        }}
                        onClick={HandleDownloadFilesClick}
                    >
                        Download Files
                    </Button>
                    <p>Downloads remaining: {downloadLimit}</p>
                </>
            ) : (<p style={{fontWeight: "bold"}}>You have reached the download limit</p>)}
        </ContentWrap>
    );
};

ProductDetailsContent.propTypes = {
    product: PropTypes.object.isRequired,
};


export default ProductDetailsContent;
