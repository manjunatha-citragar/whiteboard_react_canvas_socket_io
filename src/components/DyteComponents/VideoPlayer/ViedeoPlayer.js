import React, { useRef, useEffect } from "react";
import Hls from "hls.js";

const VideoPlayer = ({ videoUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    let hls;

    const initPlayer = () => {
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(videoRef.current);

        hls.on(Hls.Events.FRAG_CHANGED, handleFragChanged);
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = videoUrl;
      }
    };

    const handleFragChanged = (event, data) => {
      const textTrackListCount = videoRef.current.textTracks.length;
      let metaTextTrack;
      for (let trackIndex = 0; trackIndex < textTrackListCount; trackIndex++) {
        const textTrack = videoRef.current.textTracks[trackIndex];
        if (textTrack.kind !== "metadata") {
          continue;
        }
        textTrack.mode = "showing";
        metaTextTrack = textTrack;
        break;
      }
      if (!metaTextTrack) {
        return;
      }

      metaTextTrack.oncuechange = (event) => {
        let cue = metaTextTrack.activeCues[metaTextTrack.activeCues.length - 1];
        console.log(cue.value.data);
      };
    };

    initPlayer();

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [videoUrl]);

  return <video ref={videoRef} height={400} width={400} controls autoPlay />;
};

export default VideoPlayer;
