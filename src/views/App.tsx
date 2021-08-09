import { FC } from 'react';
import { PeerList } from './PeerList';

export const App: FC = () => {
  return (
    <div className="container mt-3">
      <h3>Video Call With Socket.io and WebRTC</h3>
      <hr />
      <PeerList />
    </div>
  );
};
