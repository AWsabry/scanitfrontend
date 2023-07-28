import cn from "classnames";
import {useState} from "react";
import PropTypes from 'prop-types';
import Loader from "@components/ui/loader";
import EmptyProduct from "@components/ui/empty";
import ProductCard from "@components/product/card";
import SectionTitle from "@components/ui/section-title";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import {Col, Container, Row} from "@bootstrap-styled/v4";
import {ProductNav} from "@components/product/feed/style";
import {getFeaturedProducts, getSaleProducts, getTendingProducts} from "@utils/product";

const ProductsTab = ({products, limit = 8, className, hideHeader="no"}) => {
    const [data, setData] = useState(products);
    return (
        <div className={cn(className)}>
            <Container>
                {
                    hideHeader === "no" && (
                        <Row>
                            <Col xs={12}>
                                <SectionTitle
                                    mb={42}
                                    align="center"
                                    title="Our Products"
                                    content="Lorem ipsum dolor sit amet, consectetur adipisicing elitsed do eiusmo tempor incididunt ut labore"
                                />
                            </Col>
                        </Row>
                    )
                }
                {(!data) && <Loader/>}
                <Tabs>
                    {data.map(item => (
                        <TabPanel key={item?.key}>
                            <Row className="products-grid-mobile mtn-30">
                                {data?.length > 0 ? (
                                    data?.slice(0, limit)?.map(product => (
                                        <Col xs={6} md={4} lg={3} key={product?.id}>
                                            <ProductCard product={product}/>
                                        </Col>
                                    ))
                                ) : (
                                    <div className="w-100">
                                        <EmptyProduct/>
                                    </div>
                                )}
                            </Row>
                        </TabPanel>
                    ))}
                </Tabs>

            </Container>
        </div>
    );
}

ProductsTab.propTypes = {
    products: PropTypes.array.isRequired,
};


export default ProductsTab;
