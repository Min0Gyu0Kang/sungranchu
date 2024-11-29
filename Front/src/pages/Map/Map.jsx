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
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=47367275f913452db1fe86cef05c3d38&autoload=false`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(37.293, 127.202), // initial map center
          level: 3, // zoom level
        };
        const map = new window.kakao.maps.Map(container, options);
      });
    };

    mapScript.addEventListener('load', onLoadKakaoMap);

    // Cleanup the script tag when the component unmounts
    return () => {
      mapScript.removeEventListener('load', onLoadKakaoMap);
      document.head.removeChild(mapScript);
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
