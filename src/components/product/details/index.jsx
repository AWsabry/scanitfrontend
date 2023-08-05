import PropTypes from 'prop-types';
import {Container, Col, Row} from "@bootstrap";
import ProductDetailsThumb from "@components/product/details/thumbnail";
import ProductDetailsContent from "@components/product/details/content";
import {ProductDetailsWrapper} from "@components/product/details/details.style";
import axios from "axios";
import {useState, useEffect} from "react";

const ProductDetails = ({product, ...props}) => {
    const [ galleryThumbs,setGalleryThumbs ] = useState([]);
    useEffect(() => {
        // Fetch gallery images
        axios.get('https://api.3dscanit.org/gallery/'+product.id)
            .then(response => {
                if(response.data.Images.length > 0){
                    setGalleryThumbs(response.data.Images);
                }else{
                    setGalleryThumbs(product.image);
                }
            }).catch(err => {
                console.log(err);
            })
    }, [product]);

    return (
        <ProductDetailsWrapper className="product-details-content" {...props}>
            <Container>
                <Row>
                    <Col md={6} lg={5}>
                        <ProductDetailsThumb
                            thumbnails={galleryThumbs}
                        />
                    </Col>

                    <Col md={6} lg={7}>
                        <ProductDetailsContent product={product} className="details-page"/>
                    </Col>
                </Row>
            </Container>
        </ProductDetailsWrapper>
    );
};

ProductDetails.propTypes = {
    product: PropTypes.object.isRequired
};


export default ProductDetails;
