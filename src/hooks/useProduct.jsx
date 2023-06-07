import cogoToast from "cogo-toast";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addToCompareAction, removeCompareAction,} from "@global/actions/compareAction";
import {addToWishlistAction, removeWishlistAction,} from "@global/actions/wishlistAction";
import {getCartProduct, getCartProductQuantity, getWishCompareProduct} from "@utils/product";

const useProduct = (product) => {
    console.log(product,"test");
    const variants = product;
    console.log(product,"test1");

    const [sku, setSku] = useState();
    const [size, setSize] = useState();
    const [color, setColor] = useState();
    const [material, setMaterial] = useState();
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [variations, setVariations] = useState({});
    const [compareAtPrice, setCompareAtPrice] = useState(0);
    const [isDiscounted, setIsDiscounted] = useState(false);
    const [isShowQuickView, setIsShowQuickView] = useState(false);

    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.wishlist);
    const compareList = useSelector((state) => state.compareList);
    const shoppingCart = useSelector((state) => state.shoppingCart);

    const isInWishlist = Boolean(getWishCompareProduct(wishlist, product));
    const isInCart = Boolean(getCartProduct(shoppingCart, product, variations));
    const isInCompareList = Boolean(getWishCompareProduct(compareList, product));
    const cartProductQuantity = getCartProductQuantity(shoppingCart, product, variations);
    const isStock = Boolean(stock === cartProductQuantity);

    const onVariantHandler = (selectedOptions) => {
        const selectedVariantTitle = Object.values(selectedOptions).map(item => item.value).sort().toString()
        const selectedVariant = variants?.find(({node}) => node?.title.split(" / ").sort().toString() === selectedVariantTitle)?.node;

        const {id, title, sku, priceV2, quantityAvailable, compareAtPriceV2} = selectedVariant;
        setSku(sku);
        setPrice(priceV2?.amount);
        setStock(quantityAvailable);
        setVariations({id, title});
        setIsDiscounted(!!compareAtPriceV2);
        setCompareAtPrice(compareAtPriceV2 ? compareAtPriceV2?.amount : 0);
    };

    const onWishlistHandler = () => {
        !isInWishlist ? dispatch(addToWishlistAction(product)) : dispatch(removeWishlistAction(product));
        !isInWishlist ? cogoToast.success(`"${product?.title}" is successfully added.`, {
            position: "top-right",
            heading: "Added to Wishlist!",
            hideAfter: 3,
        }) : cogoToast.error(`"${product?.title}" is removed.`, {
            position: "top-right",
            heading: "Remove from Wishlist!",
            hideAfter: 3,
        });
    };

    const onCompareHandler = () => {
        !isInCompareList ? dispatch(addToCompareAction(product)) : dispatch(removeCompareAction(product));
        !isInCompareList ? cogoToast.success(`"${product?.title}" is successfully added.`, {
            position: "top-right",
            heading: "Added to Compare!",
            hideAfter: 3,
        }) : cogoToast.error(`"${product?.title}" is removed.`, {
            position: "top-right",
            heading: "Remove from Compare!",
            hideAfter: 3,
        });
    };

    const onQuickViewHandler = () => setIsShowQuickView((prevState) => !prevState);
    const onDecrementQuantity = () => setQuantity((prevState) => (prevState > 1 ? (prevState -= 1) : 1));
    const onIncrementQuantity = () => setQuantity((prevState) => prevState < stock - cartProductQuantity ? (prevState += 1) : prevState);

    useEffect(() => {
        setSku(variants[0]?.sku);
        setPrice(variants[0]?.amount);
        setStock(variants[0]?.quantityAvailable);
        setSize(variants[0]?.selectedOptions[0]?.value);
        setIsDiscounted(!!variants[0]?.compareAtPriceV2);
        setColor(variants[0]?.selectedOptions[1]?.value);
        setMaterial(variants[0]?.selectedOptions[2]?.value);
        setVariations({id: variants[0]?.id, title: variants[0]?.name, handel: variants[0]?.name});
        setCompareAtPrice(variants[0]?.compareAtPriceV2 ? variants[0]?.compareAtPriceV2?.amount : 0);
    }, []);

    return {
        sku,
        size,
        price,
        stock,
        color,
        isStock,
        material,
        isInCart,
        quantity,
        variations,
        setQuantity,
        isDiscounted,
        isInWishlist,
        compareAtPrice,
        isInCompareList,
        isShowQuickView,
        onCompareHandler,
        onVariantHandler,
        onWishlistHandler,
        onQuickViewHandler,
        cartProductQuantity,
        onDecrementQuantity,
        onIncrementQuantity,
    };
};

export default useProduct;
