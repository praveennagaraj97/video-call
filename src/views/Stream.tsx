import { FC, RefObject } from 'react';

interface SteamProps {
  myRef: RefObject<HTMLVideoElement>;
  otherRef: RefObject<HTMLVideoElement>;
}

export const Stream: FC<SteamProps> = ({ myRef, otherRef }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <div className="embed-responsive embed-responsive-16by9">
            <video
              width="430"
              height="260"
              autoPlay
              ref={myRef}
              className="embed-responsive-item"
            />
            <p>Local Video / My Video</p>
          </div>
        </div>
        <div className="col-6">
          <div className="embed-responsive embed-responsive-16by9">
            <video
              width="430"
              height="260"
              autoPlay
              ref={otherRef}
              className="embed-responsive-item"
            />
            <p>Remote Video / Reciever Video</p>
          </div>
        </div>
      </div>
    </div>
  );
};
