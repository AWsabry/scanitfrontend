import PropTypes from 'prop-types';
import {Fragment, useState} from "react";
import {ProductThumbGallery, ProductThumbNav} from "@components/product/details/details.style";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "@components/ui/image";
const ProductDetailsThumb = ({thumbnails}) => {
    console.log(thumbnails);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <Fragment>
            <ProductThumbGallery>
                {thumbnails?.length > 0 && (
                    <Slider {...settings}>
                    {thumbnails.map((item, index) => (
                        <div>
                            <Image
                                index={index}
                                width={270}
                                height={318}
                                src={'http://api.3dscanit.org/uplodas'+item.images}
                            />
                        </div>
                        ))}
                    </Slider>
                )}
            </ProductThumbGallery>
        </Fragment>
    );
};

ProductDetailsThumb.propTypes = {
    thumbnails: PropTypes.string.isRequired,
};

export default ProductDetailsThumb;
