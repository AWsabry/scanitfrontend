import cn from "classnames";
import PropTypes from "prop-types";
import Loader from "@components/ui/loader";
import { Col, Container, Row } from "@bootstrap";
import EmptyProduct from "@components/ui/empty";
import { getRelatedProducts } from "@utils/product";
import ProductCard from "@components/product/card";
import SectionTitle from "@components/ui/section-title";
import { RelatedProductsWrapper } from "@components/product/feed/style";
import { useEffect, useState } from "react";
import axios from "axios";

const RelatedProducts = ({
  api_endpoint,
  title,
  align,
  products,
  categories,
  tags,
  limit,
  className,
  ...props
}) => {
  // const relatedProducts = getRelatedProducts(categories, tags, products, limit);

  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    // Fetch related products
    axios
      .get(api_endpoint)
      .then((response) => {
        console.log(response.data.Products);
        setRelatedProducts([...response.data.Products]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return relatedProducts?.length > 0 ? (
    <RelatedProductsWrapper {...props} className={cn(className)}>
      <Container>
        <Row>
          <Col xs={12}>
            <SectionTitle align={align} mb={[27, null, 47]} title={title} />
          </Col>
        </Row>

        {!relatedProducts && <Loader className="mt-5" />}

        <Row className="products-grid-mobile mtn-30">
          {relatedProducts.map((product) => (
            <Col xs={6} md={4} lg={3} key={product?.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </RelatedProductsWrapper>
  ) : (
    <div className="w-100">
      <EmptyProduct message="Related products not found!" />
    </div>
  );
};

RelatedProducts.defaultProps = {
  limit: 4,
};

RelatedProducts.propTypes = {
  className: PropTypes.string,
  tags: PropTypes.array,
  products: PropTypes.array,
  categories: PropTypes.array,
};

export default RelatedProducts;
