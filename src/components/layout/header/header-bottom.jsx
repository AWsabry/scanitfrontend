import Link from "next/link";
import { useState } from "react";
import PropTypes from "prop-types";
import { useIsLoggedIn } from "@hooks";
import Logo from "@components/ui/logo";
import { Col, Container, Row } from "@bootstrap";
import { AiOutlineMenu, AiOutlineSetting } from "react-icons/ai";
import { IoPersonOutline, IoSearchOutline } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownToggleButton,
} from "@components/ui/dropdown/dropdwon.style";
import {
  ActionItem,
  HeaderAction,
  HeaderActionBtn,
  HeaderBottomWrap,
} from "@components/layout/header/header.style";
import Cookie from "js-cookie";
import Button from "@components/ui/button";

const HeaderBottom = ({
  onConfigHandler,
  onSearchBoxHandler,
  onMobileNavHandler,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isLoggedIn = useIsLoggedIn();
  const user_name = Cookie.get("user_name");

  return (
    <HeaderBottomWrap>
      <Container>
        <Row className="align-items-center">
          <Col xs={3} lg={3} className="d-lg-none">
            <HeaderActionBtn onClick={() => onMobileNavHandler()}>
              <AiOutlineMenu />
            </HeaderActionBtn>
          </Col>

          <Col xs={5} lg={3} className="text-center text-lg-left">
            <Logo className="logo--desktop" src="/images/logo/logo.png" />

            <Logo
              width={100}
              height={30}
              className="logo--mobile"
              src="/images/logo/logo.png"
            />
          </Col>

          <Col xs={4} lg={3} className="d-lg-none text-right">
            <HeaderAction>
              <ActionItem>
                <HeaderActionBtn onClick={() => onSearchBoxHandler()}>
                  <IoSearchOutline />
                </HeaderActionBtn>
              </ActionItem>

              <ActionItem>
                <HeaderActionBtn onClick={() => onConfigHandler()}>
                  <AiOutlineSetting />
                </HeaderActionBtn>
              </ActionItem>
            </HeaderAction>
          </Col>

          <Col xs={8} lg={9} className="d-none d-lg-block">
            <HeaderAction>
              <ActionItem>
                <HeaderActionBtn onClick={() => onSearchBoxHandler()}>
                  <IoSearchOutline />
                </HeaderActionBtn>
              </ActionItem>
              <ActionItem>
                <DropdownToggleButton
                  color="#000"
                  className="header-action-btn"
                  onClick={() => setIsDropdownOpen((prevState) => !prevState)}
                >
                  <IoPersonOutline />
                  { isLoggedIn && user_name }
                </DropdownToggleButton>

                <DropdownMenu
                  align="center"
                  className={isDropdownOpen ? "show" : "hide"}
                >
                  {isLoggedIn ? (
                      <li>
                        <Link href="/logout">Logout</Link>
                      </li>
                  ) : (
                    <li>
                      <Link href="/signin">Signin</Link>
                      <Link href="/signup">Signup</Link>
                    </li>
                  )}
                </DropdownMenu>
              </ActionItem>
              {(isLoggedIn) && (
                  <Button
                      tag="button"
                      bg="primary"
                      style={{ padding: 10, fontSize: 15, marginLeft: 45 }}
                      color="white"
                      hvrBg="secondary"
                      onClick={() => {
                            window.location.href = "/download";
                          }
                      }
                  >
                    Request Code
                  </Button>
              )}
            </HeaderAction>
          </Col>
        </Row>
      </Container>
    </HeaderBottomWrap>
  );
};

HeaderBottom.propTypes = {
  onConfigHandler: PropTypes.func.isRequired,
  onSearchBoxHandler: PropTypes.func.isRequired,
  onMobileNavHandler: PropTypes.func.isRequired,
};

export default HeaderBottom;
