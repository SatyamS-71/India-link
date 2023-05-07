import { JitsiMeeting } from "@jitsi/react-sdk";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageTitle from "./PageTitle";

function Interview() {
  const id = useParams();
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    async function getMedia() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setIsPermissionGranted(true);
      } catch (error) {
        console.error("Error getting media: ", error);
      }
    }

    getMedia();
  }, [isPermissionGranted]);

  if (!isPermissionGranted) {
    return <div>Waiting for permission to access camera and audio...</div>;
  }

  return (
    <>
      {id ? (
        <div>
        <PageTitle title={"Interview"} />
          {id.roomid !== `${user.id+''+user.email}` ? <h5>You are in someone's else Interview <small> Having an interview? Good luck</small></h5> : <h5>You are in your Interview Room</h5>}
          <div>
           {`${user.id+''+user.email}     ${id.roomid}`}
            <JitsiMeeting
              configOverwrite={{
                startWithAudioMuted: true,
                hiddenPremeetingButtons: ["microphone"],
              }}
              roomName={`${id.roomid}`}
              getIFrameRef={(node) => (node.style.height = "800px")}
            />
          </div>
        </div>
      ) : (
        <div>No id parameter found</div>
      )}
    </>
  );
}

export default Interview;
