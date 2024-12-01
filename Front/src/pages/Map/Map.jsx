import React, { useEffect, useRef } from "react";
import "./Map.css";
import Footer from "../../component/footer/Footer";

export default function MapPage() {
    const containerRef = useRef(null);

    useEffect(() => {
        // Redirect by setting the src of an iframe
        if (containerRef.current) {
            containerRef.current.innerHTML = `
        <iframe
          src="https://map.kakao.com/?q="
          width="100%"
          height="100%"
          frameborder="0"
          allowfullscreen
        ></iframe>
      `;
        }
    }, []);

    return (
        <div className="container">
            <div className="map-header">
                <h2 className="map-title">지도</h2>
            </div>
            <div className="map-container">
                <div className="map-filter"></div>
                <div id="map" ref={containerRef}></div>
            </div>
            <Footer />
        </div>
    );
}
