import cn from "classnames";
import Link from "next/link";
import {Fragment} from "react";
import {useProduct} from "@hooks";
import PropTypes from "prop-types";
import ProductActions from "./actions";
import ProductThumbnail from "./thumbnail";

import {
    Product,
    ProductMeta,
    ProductThumb,
    ProductPrice,
    ProductTitle,
    ProductActionsMobile
} from "./product.style";

const ProductCard = ({product, className}) => {
    let {name,id, startFrom, reachTo} = product;
    return (
        <Fragment>
            <Product className={cn(className)}>
                <ProductThumb>
                    <ProductThumbnail product={product}/>
                </ProductThumb>

                <ProductMeta>
                    <ProductTitle>
                        <Link href={`/product/${id}`}>{name}</Link>
                    </ProductTitle>
                    <ProductPrice>
                        <span className="price new">{startFrom} EGP - {reachTo} EGP</span>
                    </ProductPrice>
                </ProductMeta>
            </Product>
        </Fragment>
    );
};

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    className: PropTypes.string,
}

export default ProductCard;
