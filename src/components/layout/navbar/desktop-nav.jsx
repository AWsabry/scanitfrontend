import Link from "next/link";
import cn from "classnames";
import PropTypes from "prop-types";
import { IoIosArrowDown } from "react-icons/io";
import { Container, Col, Row } from "@bootstrap";
import { NavbarWrap, Nav, NavList, SubMenu } from "./desktop-nav.style";
import { client, blogsQuery, productsQuery, collectionsQuery } from "@graphql";
import { useEffect, useState } from "react";

const DesktopNav = ({ bg, className }) => {
  const [navData, setNavData] = useState([]);
  // Fetch the categories
  useEffect(async () => {
    const collectionsData = await client(
      collectionsQuery(50),
      "getCategories/"
    );
    collectionsData?.allCategories.map((item) => {
      setNavData((navData) => [
        ...navData,
        {
          text: item.CategoryName,
          link: "/categories/" + item.categorySlug,
          mega_menu: false,
        },
      ]);
    });
  }, []);
  return (
    <NavbarWrap bg={bg} className={cn(className)}>
      <Container>
        <Row>
          <Col>
            <Nav>
              <NavList>
                <li>
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>3D Models</a>
                  </Link>
                  <SubMenu>
                    {navData.map((navItem, index) => (
                      <li
                        key={index}
                        className={navItem.submenu ? "dropdown" : undefined}
                      >
                        <Link href={navItem.link}>
                          <a>
                            {navItem.text}
                            {navItem.submenu && <IoIosArrowDown />}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </SubMenu>
                </li>
                <li>
                  <Link href="/contact">
                    <a>Stores</a>
                  </Link>
                  <SubMenu>
                    <li>
                      <Link href="/">
                        <a>Add Store</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                        <a>Our Partners</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                        <a>Product Info</a>
                      </Link>
                    </li>
                  </SubMenu>
                </li>
                <li>
                  <Link href="/contact">
                    <a>Promo Code</a>
                  </Link>
                </li>

                <li>
                  <Link href="/about">
                    <a>About Us</a>
                  </Link>
                </li>

                <li>
                  <Link href="/contact">
                    <a>Contact Us</a>
                  </Link>
                </li>
              </NavList>
            </Nav>
          </Col>
        </Row>
      </Container>
    </NavbarWrap>
  );
};

DesktopNav.propTypes = {
  bg: PropTypes.string,
};

export default DesktopNav;
