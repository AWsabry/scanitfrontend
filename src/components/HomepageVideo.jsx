const HomepageVideo = () => {
    return (
        <div className="text-center" style={{width: "80%", margin: "auto"}}>
            <h2 style={{textAlign:'center', fontSize: 30, marginTop: 50}}>Our Video</h2>
            <p style={{marginBottom: 50}}>lorem ipsum lorem ipsum  lorem ipsum  lorem ipsum  lorem ipsum  lorem ipsum  lorem ipsum  lorem ipsum  lorem ipsum  lorem ipsum  lorem ipsum  lorem ipsum  lorem ipsum  </p>
            <iframe className="w-100" style={{height: 700}} src="https://www.youtube.com/embed/w_TaNm6lccQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
    );
}
export default HomepageVideo;