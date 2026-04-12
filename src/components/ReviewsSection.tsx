import * as React from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../styles/Layouts';
import ReviewItem from './ReviewItem';
import Title from './Title';

const ReviewsSection = () => {
  return (
    <ReviewsStyled>
      <Title title={'Reviews'} span={'Reviews'} />
      <InnerLayout>
        <div className='reviews'>
          <ReviewItem
            text={'Lorem ipsum dolor sit amet consectetur adipisicing elit.'}
          />
          <ReviewItem
            text={'Lorem ipsum dolor sit amet consectetur adipisicing elit.'}
          />
        </div>
      </InnerLayout>
    </ReviewsStyled>
  );
};

const ReviewsStyled = styled.div`
  .reviews {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1.5rem;
    width: 100%;
    @media screen and (max-width: 650px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;

export default ReviewsSection;
