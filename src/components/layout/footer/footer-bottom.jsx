import Image from "next/image";
import {IoIosHeart} from "react-icons/io";
import {Container, Col, Row} from "@bootstrap";
import {CopyrightText, FooterBottomWrapper} from "./footer.style";

const FooterBottom = ({bg}) => {
    return (
        <FooterBottomWrapper
            bg={bg}
            pt={[15, null, null, 25]}
            pb={[10, null, null, 20]}
        >
            <Container>
                <Row className="flex-sm-row-reverse">
                    <Col md={12}>
                        <CopyrightText className="text-center">
                            © 2023, ScanIt | All rights received
                        </CopyrightText>
                    </Col>
                </Row>
            </Container>
        </FooterBottomWrapper>
    );
};

export default FooterBottom;
