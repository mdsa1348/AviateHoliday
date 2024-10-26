import "./contents.css";

function contents() {
    return (
        <div className="container">
            <div className="contentscontainer">
                <div className="row container1">
                <div className="col-5 col-xm-12 part1">
                    <h5 className="justified-text">
                        EdIndia Foundation aims to impact the quality of education in India at scale by leveraging the power of digital technology. We have developed several new-age tools, innovative solutions and state-of-the-art frameworks to empower teachers and to improve the overall "teaching-learning" process in the classroom.
                    </h5>
                </div>
                <div className="col-5 part2" >
                <iframe width="560" height="315" src="https://www.youtube.com/embed/YJTKlAvbDo4?si=XVEyLVVBKxsnBNFn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </div>
            </div>
        </div>
    );
};

export default contents;