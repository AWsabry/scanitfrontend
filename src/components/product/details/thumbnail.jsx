import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import {
  ProductThumbGallery,
  ProductThumbNav,
} from "@components/product/details/details.style";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "@components/ui/image";
const ProductDetailsThumb = ({ thumbnails }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  console.log(thumbnails);
  // return null;
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
                  src={item.images}
                  key={item.id}
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
