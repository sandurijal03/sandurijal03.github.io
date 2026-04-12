import * as React from 'react';
import styled from 'styled-components';
import Title from '../components/Title';

import blogs from '../data/blogs';
import { InnerLayout, MainLayout } from '../styles/Layouts';

const BlogsPage = () => {
  return (
    <MainLayout>
      <BlogStyled>
        <Title title={'Blogs'} span={'Blogs'} />
        <InnerLayout className={'blog'}>
          {blogs.map(({ id, image, title, link }) => (
            <div key={id} className={'blog-item'}>
              <div className='image'>
                <img src={image} alt='' />
              </div>
              <div className='title'>
                <a href={link}>{title}</a>
              </div>
            </div>
          ))}
        </InnerLayout>
      </BlogStyled>
    </MainLayout>
  );
};

const BlogStyled = styled.div`
  .blog {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 2rem;
    grid-row-gap: 3rem;
    @media screen and (max-width: 770px) {
      grid-template-columns: repeat(1, 1fr);
    }
    .blog-item {
      background-color: var(--background-dark-grey);
      padding: 1rem 1rem;
    }
    .image {
      width: 100%;
      overflow: hidden;
      padding-bottom: 0.5rem;
      img {
        width: 100%;
        height: 90%;
        object-fit: cover;
        transition: all 0.4s ease-in-out;
        &:hover {
          cursor: pointer;
          transform: rotate(3deg) scale(1.1);
        }
      }
    }
    .title {
      a {
        font-size: 1.8rem;
        padding: 2rem 0;
        color: var(--white-color);
        cursor: pointer;
        transition: all 0.4s ease-in-out;
        &:hover {
          color: var(--primary-color);
        }
      }
    }
  }
`;

export default BlogsPage;
