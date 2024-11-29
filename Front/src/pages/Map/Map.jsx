import React, { useState, useEffect, useRef } from "react";
import "./Map.css";
import Footer from "../../component/footer/Footer";
import UpperNav from "../../component/upperNav/UpperNav";

export default function MapPage(){
  const containerRef = useRef(null);
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const categories = [
    "All",
    "한식",
    "일식",
    "중식",
    "양식",
    "아시안",
    "해산물",
    "고기",
    "햄버거",
    "베이커리",
    "분식",
  ];

  useEffect(() => {
    // Dynamically load Kakao Maps SDK
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=47367275f913452db1fe86cef05c3d38&autoload=false&libraries=services';
    document.body.appendChild(script);

    script.onload = () => {
      // Check if window.kakao and window.kakao.maps.LatLng are available
      if (window.kakao && window.kakao.maps && window.kakao.maps.LatLng) {
        console.log('Kakao Maps SDK loaded successfully!');
        window.kakao.maps.load(() => {
          const container = document.getElementById('map');
          const options = {
            center: new window.kakao.maps.LatLng(37.293, 127.202), // initial map center
            level: 3, // zoom level
          };
          const map = new window.kakao.maps.Map(container, options);
        });
      } else {
        console.log('Kakao Maps SDK is not available. Please check the SDK script loading.');
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [selectedCategories]);

  // Function to display markers on the map
  const displayMarker = (place, map, infowindow) => {
    const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);

    // Info window for each marker
    infowindow.setContent(`<div style="padding:5px; font-size:14px;">${place.place_name}</div>`);

    window.kakao.maps.event.addListener(marker, "mouseover", () => {
      infowindow.open(map, marker);
    });

    window.kakao.maps.event.addListener(marker, "mouseout", () => {
      infowindow.close();
    });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
        prev.includes(category)
            ? prev.filter((cat) => cat !== category)
            : [...prev, category]
    );
  };

  return (
      <div className="container">
        <UpperNav title="지도" />
        <div className="map-filter">
          <div className="filter-menu">
            {categories.map((category) => (
                <label key={category}>
                  <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                  />
                  {category}
                </label>
            ))}
          </div>
        </div>
        <div id="map" className="map" ref={containerRef}></div>
        <Footer />
      </div>
  );
}
