import React from 'react';

interface IText {
  title: string;
  description: string;
  content?: React.ReactElement;
}

interface IShopCarousel {
  textList?: Array<IText>;
  currentPage?: number;
  setCurrentPage?: (page: number) => void;
}

const TextCarousel: React.FC<IShopCarousel> = ({ textList, currentPage, setCurrentPage }) => {
  return (
    <>
      <div className="slider-wrapper">
        {textList.map((text, index) =>
          <div
            key={text.title}
            className={
              index == currentPage
                ? "carousel__slide carousel__slide--active"
                : "carousel__slide"
            }>
            <h4 className="title">{text.title}</h4>
            <h5 className="description">{text.description}</h5>
            {text.content && (
              <div className="content">{text.content}</div>
            )}

          </div>
        )}
      </div>
      <style jsx>{`
        .slider-wrapper {
          flex: 1;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .carousel__slide {
          position: absolute;
          opacity: 0;
          transform: scale(1);
          transition: all .3s ease-out;
        }

        .carousel__slide--active {
          opacity: 1;
          transform: scale(1);
          z-index: 100;
        }

        .title {
          position: relative;
          font-size: 3.1rem;
          font-family: var(--font-bold);
          color: #000000;
          margin-bottom: 1rem;
        }

        :global([dir='rtl']) .title {
          font-family: var(--font-medium);
        }

        .description {
          font-size: 1.75rem;
          font-family: var(--font-regular);
          color: #000000;
        }

        :global([dir='rtl']) .description {
          font-family: var(--font-light);
        }

        .content {
          margin-top: 1rem;
        }

        @media screen and (max-width: 900px) {
          .title {
            font-size: 1.6rem;
            line-height: 2.3rem;
            margin-bottom: 0;
          }

          :global([dir='rtl']) .slider-wrapper {
            padding-right: 20px;
          }

          .description {
            font-size: 1.1rem;
            margin-bottom: 0;
          }
        }
      `}</style>
    </>
  );
}

TextCarousel.defaultProps = {
  textList: []
}

export default TextCarousel;
