import Link from "next/link";
import Widget from "@components/ui/widget";
import {Container, Col, Row, Ul, Li,} from "@bootstrap";
import {WidgetWrapper, SocialIcons} from "./footer.style";
import {SiFacebook, SiTwitter, SiLinkedin, SiPinterest, SiYoutube} from "react-icons/si";

const FooterWidget = (props) => {

    return (
        <WidgetWrapper
            {...props}
            py={[60, 60, 100]}
        >
            <Container>
                <Row>
                    <Col md={6} lg={6}>
                        <Widget
                            title="ABOUT US"
                            mb={[30, null, null, 0]}
                        >
                            <p className="about-text">
                                Lorem ipsum dolor sit amet cons adipisicing elit sed do eiusm
                                tempor incididunt ut labor et dolore magna aliqua. Ut enim ad minim veniam, quis
                                nostrud.
                            </p>

                            <SocialIcons mt={15}>
                                <Li inline={true}>
                                    <a href="https://facebook.com" target="_blank" rel="noopener"><SiFacebook/></a>
                                </Li>
                                <Li inline={true}>
                                    <a href="https://twitter.com" target="_blank" rel="noopener"><SiTwitter/></a>
                                </Li>
                                <Li inline={true}>
                                    <a href="https://linkedin.com" target="_blank" rel="noopener"><SiLinkedin/></a>
                                </Li>
                                <Li inline={true}>
                                    <a href="https://youtube.com" target="_blank" rel="noopener"><SiYoutube/></a>
                                </Li>
                                <Li inline={true}>
                                    <a href="https://pinterest.com" target="_blank" rel="noopener"><SiPinterest/></a>
                                </Li>
                            </SocialIcons>
                        </Widget>
                    </Col>

                    <Col sm={6} lg={3}>
                        <Widget
                            title="INFORMATION"
                            mb={[30, null, null, 0]}
                        >
                            <Ul className="widget-list">
                                <Li><Link href="/about">About Us</Link></Li>
                            </Ul>
                        </Widget>
                    </Col>

                    <Col sm={6} lg={3}>
                        <Widget
                            title="MY ACCOUNT"
                            mb={[30, null, null, 0]}
                        >
                            <Ul className="widget-list">
                                <Li><Link href="/signin">Login</Link></Li>
                            </Ul>
                        </Widget>
                    </Col>
                </Row>
            </Container>
        </WidgetWrapper>
    );
};
export default FooterWidget;