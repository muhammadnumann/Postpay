import React, { useState } from 'react';

interface IShopCarousel {
  images: Array<string>;
  currentPage?: number;
  setCurrentPage?: (page: number) => void;
}

const PhoneCarousel: React.FC<IShopCarousel> = ({ images, currentPage, setCurrentPage }) => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  function moveRight() {
    const nextPage = currentPage < images.length - 1 ? currentPage + 1 : 0;
    setCurrentPage(nextPage)
  }

  function moveLeft() {
    const nextPage = currentPage !== 0 ? currentPage - 1 : images.length - 1;
    setCurrentPage(nextPage)
  }

  return (
    <>
      <div className="container">
        <div className="carousel-container"
             onTouchStart={e => setTouchStart(e.touches[0].clientX)}
             onTouchMove={e => setTouchEnd(e.touches[0].clientX)}
             onTouchEnd={() => {
               if (touchStart > touchEnd) {
                 moveRight();
               } else {
                 moveLeft();
               }
             }}>
          <div className="carousel">
            <ul className="carousel__slides">
              {images.map((image, index) =>
                <li
                  key={image}
                  className={
                    index == currentPage
                      ? "carousel__slide carousel__slide--active"
                      : "carousel__slide"
                  }
                >
                  <img src={image} alt={image} className="carousel-slide__content" />
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          position: absolute;
          top: 20px;
          right: -60px;
        }

        :global([dir='rtl']) .container {
          left: -100px;
        }

        .carousel-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
        }

        .carousel {
          position: relative;
        }

        // Carousel slides
        .carousel__slide {
          margin-right: auto;
          margin-left: auto;
          max-width: 900px;
          list-style-type: none;
          text-align: center;
          position: absolute;
          left: 0;
          opacity: 0;
          top: 50%;
          transform: scale(1.05);
          transition: all .3s ease-out;
        }

        .carousel__slide--active {
          opacity: 1;
          transform: scale(1);
          z-index: 99;
        }

        .carousel-slide__content {
          width: 78%;
        }

        @media screen and (max-width: 900px) {
          .container {
            top: 5px;
            right: -20px;
          }

          .carousel-slide__content {
            width: 80%;
          }

          .carousel__slides {
            padding: 0;
            margin: 0;
          }
        }

        @media screen and (max-width: 500px) {
          .container {
            top: 5px;
            right: -20px;
          }

          .carousel-slide__content {
            width: 90%;
          }

          .carousel__slides {
            padding: 0;
            margin: 0;
          }
        }
      `}</style>
    </>
  );
}

PhoneCarousel.defaultProps = {
  images: []
}

export default PhoneCarousel;
