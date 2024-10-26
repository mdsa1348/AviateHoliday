import React from 'react';
import './initiatives.css';

function Home() {
    return (
        <section className="container INITIATIVES_container">
            
            <div className="row initiativeRow">
                <div className="col-4 col-xm-12 INITIATIVES_card">
                    <div className="INITIATIVES_card_img"></div>
                    <h1>NIRNAY</h1>
                    <h5>Leveraging analytics to convert educational data into usable dashboards for informed decision making.</h5>
                    <button className="book_demo">Book Demo</button>
                    <div><a href="">view more</a></div>
                    <div className="h_line1"></div>
                </div>
                <div className="col-4 col-xm-12 INITIATIVES_card">
                    <div className="INITIATIVES_card_img"></div>
                    <h1>PRAGYAN</h1>
                    <h5>Building the capacity of in-service teachers by enhancing their technological readiness and teaching skills, for an improved learning environment</h5>
                    <button className="Download_App">Download App</button>
                    <div><a href="">view more</a></div>
                    <div className="h_line2"></div>
                </div>
                <div className="col-4 col-xm-12 INITIATIVES_card">
                    <div className="INITIATIVES_card_img"></div>
                    <h1>TEACHABLE</h1>
                    <h5>Strengthening the pre-service teacher's education in India by providing aspiring teachers with technical and implementation support to  process in the classroom</h5>
                    <button className="Join_Program">Join Program</button>
                    <div><a href="">B.Ed & D.El.Ed Student Study</a></div>
                    <div className="h_line"></div>
                </div>
            </div>
        </section>
    );
}

export default Home;
