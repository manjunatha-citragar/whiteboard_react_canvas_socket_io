import React, { useRef, useEffect } from "react";
import Hls from "hls.js";

const VideoPlayer = ({ videoUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current.addEventListener("timeupdate", handleTimeUpdateListener);
    return () => {
      videoRef.current.removeEventListener(
        "timeupdate",
        handleTimeUpdateListener
      );
    };
  }, []);

  const handleTimeUpdateListener = (_) => {
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
    const cuesLength = metaTextTrack.cues.length;
    let cueIndex = 0;
    while (cueIndex < cuesLength) {
      const cue = metaTextTrack.cues[cueIndex];
      if (cue.fired) {
        cueIndex++;
        continue;
      }
      const metaData = cue.value.data;
      console.log("Meatadata extracted from Player:", metaData);
      cue.fired = true;
      cueIndex++;
    }
  };

  useEffect(() => {
    let hls;

    const initPlayer = () => {
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(videoRef.current);
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = videoUrl;
      }
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
