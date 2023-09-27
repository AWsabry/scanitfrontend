import { useEffect, useState } from "react";
import axios from "axios";

const HomepageVideo = () => {
  const [video, setVideo] = useState("");
  useEffect(() => {
    axios
      .get("https://api.3dscanit.org/video")
      .then((response) => {
        setVideo(response.data.Video[0].video.replace("watch?v=", "embed/"));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="text-center" style={{ width: "80%", margin: "auto" }}>
      <h2 style={{ textAlign: "center", fontSize: 30, marginTop: 50 }}>
        Our Video
      </h2>
      <p style={{ marginBottom: 50 }}>
        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
        lorem ipsum{" "}
      </p>
      <iframe
        className="w-100"
        style={{ height: 700 }}
        src={video}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};
export default HomepageVideo;
