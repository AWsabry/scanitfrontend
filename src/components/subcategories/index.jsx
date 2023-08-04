import cn from "classnames";
import PropTypes from "prop-types";
import {Container} from "@bootstrap";
import Category from "@components/category";
import {CategoriesWrap} from "../categories/categories.style";
import Slider, {Slide} from "@components/ui/swiper";
import EmptyProduct from "@components/ui/empty";

const SubCategories = ({categories, className, ...props}) => {
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
                {categories.length ? (
                    <Slider
                        settings={settings}
                    >
                        {categories?.map((category) => {
                            return (
                                <Slide key={category?.id}>
                                    <Category
                                        category={category.SubCategoryName}
                                        icon={`https://api.3dscanit.org/uploads/${category.image}`}
                                        slug={`/product/category/${category.subCategorySlug}`}
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

SubCategories.propTypes = {
    categories: PropTypes.array.isRequired,
};


export default SubCategories;