import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./Map.css";
import Footer from "../../component/footer/Footer";

export default function MapPage() {
    const containerRef = useRef(null);
    const location = useLocation(); // Get the location object to access the state
    const query = new URLSearchParams(location.search); // Get the query parameters from the URL
    const name = query.get("q") || "성균관대학교 자연과학캠퍼스"; // Default to fallback name if 'q' is not present

    useEffect(() => {
        if (containerRef.current) {
            // Set iframe src dynamically based on the 'q' query parameter or default name
            containerRef.current.innerHTML = `
                <iframe
                    src="https://map.kakao.com/?q=율전+${encodeURIComponent(name)}"
                    width="100%"
                    height="100%"
                    frameborder="0"
                    allowfullscreen
                ></iframe>
            `;
        }
    }, [name]);

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
