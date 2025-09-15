const VideoPlayer = ({ src, onClose }) => {
    let videoId;
  
    try {
      const url = new URL(src);
      if (url.hostname.includes("youtube.com")) {
        videoId = url.searchParams.get("v");
      } else if (url.hostname === "youtu.be") {
        videoId = url.pathname.slice(1);
      }
    } catch (err) {
      console.error("Invalid YouTube URL", err);
      return <p className="text-red-500">Invalid YouTube URL</p>;
    }
  
    if (!videoId) return <p className="text-red-500">Could not parse video ID</p>;
  
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  
    return (
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        <iframe
          src={embedUrl}
          className="absolute top-0 left-0 w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        ></iframe>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-1"
          aria-label="Close video"
        >
          ✖
        </button>
      </div>
    );
  };
export default VideoPlayer;  