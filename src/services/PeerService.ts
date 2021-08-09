import Peer from 'peerjs';
import { RefObject } from 'react';

export class PeerService {
  constructor(
    private peerInstance: Peer,
    private localRef: RefObject<HTMLVideoElement>,
    private remoteRef: RefObject<HTMLVideoElement>
  ) {}

  showMyVideo() {
    const userMediaStream =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    userMediaStream(
      { audio: false, video: true },
      (stream) => {
        // Show Our Video to left
        if (this.localRef.current) {
          this.localRef.current.srcObject = stream;
        }
      },
      (_err) => {
        alert('Failed to create instance of MEDIA Stream');
      }
    );
  }

  showRemoteVideo(peer: Peer.MediaConnection) {
    const userMediaStream =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    userMediaStream(
      { video: true, audio: false },
      (stream) => {
        peer.answer(stream);
        if (this.remoteRef.current) {
          this.remoteRef.current.srcObject = stream;
        }
      },
      (_err) => {}
    );
  }

  // Listen to call
  listenToCall() {
    this.peerInstance.on('call', (peer) => {
      const confirmed = window.confirm(`Getting call from ${peer.peer}`);

      if (confirmed) {
        this.showRemoteVideo(peer);
      }
    });
  }

  // Call To Other User
  callUser(userId: string) {
    const userMediaStream =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    userMediaStream(
      { audio: false, video: true },
      (stream) => {
        this.peerInstance.call(userId, stream);
      },
      (_err) => {}
    );
  }
}
