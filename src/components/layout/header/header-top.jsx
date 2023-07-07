import cn from "classnames";
import PropTypes from "prop-types";
import {Col, Container, DropdownItem, Row} from "@bootstrap";
import {HeaderTopWrap, HeaderTopMessage, HeaderTopSetLanCurr} from "@components/layout/header/header.style";

const HeaderTop = ({className}) => {
    return (
        <HeaderTopWrap className={cn(className)}>
            <Container>
                <Row>
                    <Col md={12} lg={12}>
                        <HeaderTopMessage className="text-center">
                            Welcome to ScanIt
                        </HeaderTopMessage>
                    </Col>
                </Row>
            </Container>
        </HeaderTopWrap>
    );
};

HeaderTop.propTypes = {
    bg: PropTypes.string,
    className: PropTypes.string
};


export default HeaderTop;