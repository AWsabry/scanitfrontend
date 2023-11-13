import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const HowItWorksVideo = () => {
  const [video, setVideo] = useState("");
  const router = useRouter();
  
  useEffect(() => {
    axios.setVideo("https://www.youtube.com/watch?v=622vOT8A1J0".replace("watch?v=", "embed/"));
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
export default HowItWorksVideo;