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

  showRemoteVideo(stream: MediaStream) {
    if (this.remoteRef.current) {
      this.remoteRef.current.srcObject = stream;
    }
  }

  // Listen to call
  listenToCall(caller: Peer.MediaConnection) {
    const userMediaStream =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    userMediaStream(
      { audio: false, video: true },
      (stream) => {
        // eslint-disable-next-line no-restricted-globals
        const confirmed = confirm(`Getting call from ${caller.peer}`);

        if (confirmed) {
          caller.answer(stream);
          caller.on('stream', (remoteStream) => {
            this.showRemoteVideo(remoteStream);
          });
        }
      },
      (_err) => {
        alert('Failed');
      }
    );
  }

  // Call To Other User
  callUser(userId: string) {
    console.log('calling', userId);
    const userMediaStream =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    userMediaStream(
      { audio: false, video: true },
      (stream) => {
        const call = this.peerInstance.call(userId, stream);

        call.on('stream', (remoteStream) => {
          this.showRemoteVideo(remoteStream);
        });
      },
      (_err) => {}
    );
  }
}
