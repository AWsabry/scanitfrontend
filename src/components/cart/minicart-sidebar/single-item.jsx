import Link from "next/link";
import Image from "next/image";
import PropTypes from 'prop-types';
import {useDispatch} from "react-redux";
import {CURRENCY} from "@utils/constant";
import {getProductStock} from "@utils/product";
import {excerpt} from "@utils/method";
import {Quantity} from "@components/cart/cart.style";
import {CgMathPlus, CgMathMinus} from "react-icons/cg";
import {
    PriceAmount,
    RemoveButton,
    MiniCartProName,
    MiniCartProMeta,
    MiniCartProPrice,
    MiniCartProThumb,
    MiniCartProContent,
    MiniCartProductItem
} from "@components/cart/minicart-sidebar/style";
import {
    removeCartAction,
    incrementCartQuantityAction,
    decrementCartQuantityAction
} from "@global/actions/cartAction";

const MiniCartProduct = ({product}) => {
    const {description, image, quantity, price, variations, name,id} = product;
    let variants = product?.getProduct|| "undefined";
    
    const shortDesc = excerpt(description?description: " ",40 );
    const stock = getProductStock(product, variations);
    const dispatch = useDispatch();

    return (
        <MiniCartProductItem>
            <Link href={`/product/${id}`} passHref>
                <MiniCartProThumb>
                    <Image
                        alt={name}
                        width={110}
                        height={120}
                        src={'http://api.3dscanit.org/uploads/'+image}
                    />
                </MiniCartProThumb>
            </Link>

            <MiniCartProContent>
                <div>
                    <Link href={`/product/${id}`} passHref>
                        <MiniCartProName>{name}</MiniCartProName>
                    </Link>

                    {variants?.length > 1 && (
                        <MiniCartProMeta>
                            {variations?.name}
                        </MiniCartProMeta>
                    )}
                     <p>{shortDesc}</p>
 
                   {/*  <MiniCartProPrice>
                        {quantity} x <PriceAmount>{CURRENCY + variants?.price}</PriceAmount>
                    </MiniCartProPrice> */}

                   {/*  <Quantity>
                        <button
                            style={{pointerEvents: quantity === 1 ? "none" : "visible"}}
                            onClick={() => dispatch(decrementCartQuantityAction(product))}
                        >
                            <CgMathMinus/>
                        </button>
                        <input type="text" value={quantity} size={stock} readOnly/>
                        <button
                            style={{pointerEvents: quantity === stock ? "none" : "visible"}}
                            onClick={() => dispatch(incrementCartQuantityAction(product))}
                        >
                            <CgMathPlus/>
                        </button>
                    </Quantity> */}
                </div>

                <RemoveButton onClick={() => dispatch(removeCartAction(product))}>
                    x
                </RemoveButton>
            </MiniCartProContent>
        </MiniCartProductItem>
    );
};

MiniCartProduct.propTypes = {
    product: PropTypes.object.isRequired,
};


export default MiniCartProduct;
