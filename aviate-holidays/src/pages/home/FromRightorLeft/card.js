import React, { useEffect, useState, useRef } from 'react';
import './card.css';

const ReactPage = () => {
    const [showAnimation, setShowAnimation] = useState(false);

    const animateCards = () => {
        setShowAnimation(true);
    };

    const reactPageRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCards();
            }
        });

        if (reactPageRef.current) {
            observer.observe(reactPageRef.current);
        }

        return () => {
            if (reactPageRef.current) {
                observer.unobserve(reactPageRef.current);
            }
        };
    }, []);

    return (
        <div className={`container ${showAnimation ? 'show-animation' : ''}`} ref={reactPageRef}>
            <div className="react-page">
                <div className="left-card col-6 col-xm-12">
                    <h2>Left Card</h2>
                    <p>This is the left card content. You can add any information or components here.</p>
                </div>
                <div className="right-card col-6 col-xm-12">
                    <h2>Right Card</h2>
                    <p>This is the right card content. You can add any information or components here.</p>
                </div>
            </div>
        </div>
    );
};

export default ReactPage;
