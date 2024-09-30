import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/swiper-bundle.min.css';

import Category from './Category';

import styled from '@emotion/styled';

const SwiperBox = styled.div`
  margin-top: 3rem;

  @media (max-width: 768px) {
    display: none;
    /* margin-top: 1rem; */
  }
`;

function CategoryList({ categories, handleSelectedCategory, currCatSelected }) {
  const sortedCategories = categories.sort(
    (a, b) => a.orderNumber - b.orderNumber
  );
  return (
    <SwiperBox>
      <Swiper
        spaceBetween={55}
        slidesPerView={9}
        // loop={true}
        updateOnWindowResize={true}
        // breakpoints={{
        //   480: {
        //     slidesPerView: 4,
        //   },
        // }}
      >
        {sortedCategories?.map((category, idx) => (
          <SwiperSlide
            key={category.id} // It's better to use unique ids as keys
            onClick={() => handleSelectedCategory(category.title)}
          >
            <Category
              data={category}
              isSelected={category.title === currCatSelected}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperBox>
  );
}

export default CategoryList;
