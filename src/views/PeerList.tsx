import Peer from 'peerjs';
import { FC, useEffect, useRef, useState } from 'react';
import { PeerService } from '../services/PeerService';
import { Stream } from './Stream';

export const PeerList: FC = () => {
  const [instanceLoading, setInstanceLoading] = useState<boolean>(true);

  const [myInstaceId, setMyInstanceId] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const [peerService, setPeerService] = useState<PeerService | null>(null);
  const [friendId, setFriendId] = useState<string>('');

  const myVideoRef = useRef<HTMLVideoElement>(null);
  const myFriendVideoRef = useRef<HTMLVideoElement>(null);

  //   Init
  useEffect(() => {
    const peerInstance = new Peer();

    // Once Web connect to server will get an Id/ we can connect to server with our own ID
    peerInstance.on('open', (id) => {
      // Instance Created
      setInstanceLoading(false);
      // Set Current User
      setMyInstanceId(id);

      // Create an instance for peer video tags
      const peerService = new PeerService(
        peerInstance,
        myVideoRef,
        myFriendVideoRef
      );

      // By Default show UserVideo to the left
      peerService.showMyVideo();

      setPeerService(peerService);
      // Listen to calls from remote
      peerInstance.on('call', (caller) => {
        peerService?.listenToCall(caller);
      });
    });
  }, []);

  function call() {
    peerService?.callUser(friendId);
  }

  if (instanceLoading) {
    return (
      <div
        style={{ margin: 'auto', display: 'block' }}
        className="spinner-border mt-5 mb-5"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card" style={{ width: '23rem' }}>
        <div className="card-body">
          <h5 className="card-title">User Details</h5>
          <p className="card-text">Details To be fetched from API</p>
          <div className="d-flex flex-wrap">
            <input
              type="text"
              className="form-control w-auto"
              disabled={true}
              value={myInstaceId}
            />
            <button
              title={copied ? '' : ''}
              onClick={() => {
                navigator.clipboard.writeText(myInstaceId);
                setCopied(true);
              }}
              className="m-2 mt-0 mb-0 btn btn-primary"
            >
              <i className="fas fa-clipboard"></i>
            </button>
            <span style={{ fontSize: '10px' }} className="text-info">
              {copied ? `${myInstaceId} copied to clipboard` : ''}
            </span>
          </div>
          <div className="d-flex flex-wrap mt-3">
            <input
              className="form-control w-auto"
              type="text"
              placeholder="Provide friend ID"
              value={friendId}
              onChange={(e) => setFriendId(e.target.value)}
            />
            <button
              onClick={call}
              disabled={!friendId.trim() || friendId === myInstaceId}
              className="m-2 mt-0 mb-0 btn btn-primary"
            >
              <i className="fas fa-phone-volume"></i>
            </button>
            <span style={{ fontSize: '10px' }} className="text-info">
              {friendId === myInstaceId ? `You are not allowed to do this` : ''}
            </span>
          </div>
        </div>
      </div>

      <hr />
      <Stream myRef={myVideoRef} otherRef={myFriendVideoRef} />
    </div>
  );
};
