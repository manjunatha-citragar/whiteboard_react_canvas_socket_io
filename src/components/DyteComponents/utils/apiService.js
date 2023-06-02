import axios from "axios";

const RECORDING_BASE_URL = "https://api.cluster.dyte.in/v2/recordings";

export const startRecording = ({ meetingId, setRecordingId, setRecording }) => {
  const data = {
    meeting_id: meetingId,

    interactive_config: {
      type: "ID3",
    },
  };

  const username = "a168f3c2-702c-41ed-bbb4-718e1a6d7119";
  const password = "32ea3216aaa87279f729";

  axios
    .post(RECORDING_BASE_URL, data, {
      auth: {
        username: username,
        password: password,
      },
    })
    .then((response) => {
      setRecordingId(response?.data?.data?.id);
      setRecording(true);
      console.log("Started recording with ID:", response?.data?.data?.id);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const stopRecording = ({ recordingId, setRecording }) => {
  const url = `https://api.cluster.dyte.in/v2/recordings/${recordingId}`;

  const data = {
    action: "stop",
  };

  const username = "a168f3c2-702c-41ed-bbb4-718e1a6d7119";
  const password = "32ea3216aaa87279f729";

  axios
    .put(url, data, {
      auth: {
        username: username,
        password: password,
      },
    })
    .then((_) => {
      setRecording(false);
      console.log("Stopped recording!!");
    })
    .catch((error) => {
      console.error(error);
    });
};
