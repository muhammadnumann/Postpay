import React, { useRef, useEffect, useState } from 'react';
import useOnScreen from "../../helpers/hooks/useOnScreen";

interface ITabs {
  label: string;
  route: string;
}

interface IProps {
  tabs?: Array<ITabs>;
}

const VIDEO_WIDTH = '100%';
const VIDEO_HEIGHT = '100%';

const SaleVideo: React.FC<IProps> = () => {
  const ref = useRef()
  const isVisible = useOnScreen(ref);
  const [isMute, setMute] = useState(`&mute=1`);

  // useEffect(() => {
  //   setMute(isVisible ? '' : `&mute=1`)
  // }, [isVisible])

  return (
    <>
      <div>
        <div className="video-container" ref={ref}>
          <iframe
            width={VIDEO_WIDTH}
            height={VIDEO_HEIGHT}
            src={`https://www.youtube.com/embed/pDaU-NAkzzA?autoplay=1&controls=0${isMute}&loop=1&modestbranding=1&showinfo=0&start=0&enablejsapi=1&&widgetid=3&playlist=pDaU-NAkzzA`}
            title="YouTube video player"
            frameBorder="0"
            allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
        </div>

      </div>
      <style jsx>{`
        .video-container {
          position: relative;
          border-radius: 15px;
          overflow: hidden;
          display: flex;
          height: 500px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          margin-bottom: 50px;
        }

        .video-container iframe {
          border-radius: 15px;
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100vw;
          height: 100vh;
          transform: translate(-50%, -50%);
        }

        @media (min-aspect-ratio: 16/9) {
          .video-background iframe {
            /* height = 100 * (9 / 16) = 56.25 */
            height: 56.25vw;
          }
        }

        @media (max-aspect-ratio: 16/9) {
          .video-background iframe {
            /* width = 100 / (9 / 16) = 177.777777 */
            width: 177.78vh;
          }
        }

        .button-container {
          max-width: 800px;
        }

        @media screen and (max-width: 500px) {
          .video-container {
            height: 200px;
          }
        }
      `}</style>
    </>)
}

SaleVideo.defaultProps = {
  tabs: []
}
export default SaleVideo;
