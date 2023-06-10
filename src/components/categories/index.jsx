import cn from "classnames";
import PropTypes from "prop-types";
import {Container} from "@bootstrap";
import Category from "@components/category";
import {CategoriesWrap} from "./categories.style";
import Slider, {Slide} from "@components/ui/swiper";
import EmptyProduct from "@components/ui/empty";

const Categories = ({categories, className, ...props}) => {
    const settings = {
        loop: false,
        slidesPerView: 2,
        spaceBetween: 5,
        autoplay: false,
        pagination: false,
        navigation: false,
        breakpoints: {
            420: {
                spaceBetween: 10
            },
            500: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4
            },
            1200: {
                slidesPerView: 5,
                spaceBetween: 30
            }
        }
    }

    return (
        <CategoriesWrap
            py={[60, 60, 100]}
            className={cn(className)}
            {...props}
        >
            <Container>
                <h2 style={{textAlign:'center', fontSize: 30}}>Categories</h2>
                {categories.length ? (
                    <Slider
                        settings={settings}
                    >
                        {categories?.map((category) => {
                            return (
                            <Slide key={category?.id}>
                                <Category
                                    category={category.CategoryName}
                                    icon={`http://api.3dscanit.org/uploads/${category.image}`}
                                    slug={`/categories/${category.categorySlug}`}
                                />
                            </Slide>
                        )}
                        )}
                    </Slider>
                ) : (
                    <EmptyProduct className="mt-0" message="Categories not found!"/>
                )}
            </Container>
        </CategoriesWrap>
    );
};

Categories.propTypes = {
    categories: PropTypes.array.isRequired,
};


export default Categories;