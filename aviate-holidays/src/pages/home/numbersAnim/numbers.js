import React, { useEffect, useState, useRef } from 'react';
import './numbers.css';

function Numbers() {
    const [counter, setCounter] = useState(0);
    const [counter1, setCounter1] = useState(0);
    const [counter2, setCounter2] = useState(0);
    const [counter3, setCounter3] = useState(0);

    const animateCounter = (target, setCounterFunc, duration) => {
        const increment = target / duration;
        let currentNumber = 0;
        const startTime = Date.now();

        const animation = () => {
            const elapsedTime = Date.now() - startTime;
            const nextNumber = currentNumber + increment * elapsedTime;

            if (nextNumber < target) {
                setCounterFunc(Math.floor(nextNumber));
                requestAnimationFrame(animation);
            } else {
                setCounterFunc(target);
            }
        };

        requestAnimationFrame(animation);
    };

    const numbersRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounter(6, setCounter, 2000);
                animateCounter(53000, setCounter1, 2000);
                animateCounter(200000, setCounter2, 2000);
                animateCounter(700000, setCounter3, 2000);
            }
        });

        if (numbersRef.current) {
            observer.observe(numbersRef.current);
        }

        return () => {
            if (numbersRef.current) {
                observer.unobserve(numbersRef.current);
            }
        };
    }, []);

    return (
        <div className="container" ref={numbersRef}>
            <div className="mycontainers">
                <div className="row Numbersrow">
                    <div className="col-3 col-xm-6 col_3">
                        <h1><b><span id="counter">{counter}</span></b></h1>
                        <h2>STATES</h2>
                    </div>
                    <div className="col-3 col-xm-6 col_3">
                        <h1><b><span id="counter1">{counter1}</span>+</b></h1>
                        <h2>SCHOOLS</h2>
                    </div>
                    <div className="col-3 col-xm-6 col_3">
                        <h1><b><span id="counter2">{counter2}</span><span><i className="fa-solid fa-plus fa-sm"></i></span></b></h1>
                        <h2>TEACHERS</h2>
                    </div>
                    <div className="col-3 col-xm-6 col_3">
                        <h1><b><span id="counter3">{counter3}</span><span><i className="fa-solid fa-plus fa-sm"></i></span></b></h1>
                        <h2>STUDENTS</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Numbers;
