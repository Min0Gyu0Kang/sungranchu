import React, { useState, useEffect } from "react";
import "./Map.css";
import Footer from "../../component/footer/Footer";
import UpperNav from "../../component/upperNav/UpperNav";

export default function MapPage() {
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const categories = ["All", "korean", "chinese", "japanese"];

  const locations = [
    { id: 1, name: "서울24시 감자탕", lat: 37.293, lng: 127.202, category: "korean" },
    { id: 2, name: "스타벅스", lat: 37.292, lng: 127.203, category: "All" },
    { id: 3, name: "역전할머니맥주", lat: 37.294, lng: 127.205, category: "chinese" },
  ];

  useEffect(() => {
    // Dynamically load the Kakao Maps SDK with autoload=true to avoid document.write issue
    const script = document.createElement("script");
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY&autoload=true";  // autoload=true로 설정
    script.async = true;
    script.onload = () => {
      // Ensure the SDK is fully loaded
      if (window.kakao && window.kakao.maps) {
        initializeMap(); // SDK 로드 후 지도를 초기화
      } else {
        alert("Failed to load Kakao Maps SDK");
      }
    };
    document.body.appendChild(script);
  
    return () => {
      // Clean up the script if the component unmounts
      document.body.removeChild(script);
    };
  }, []);
  

  const initializeMap = () => {
    if (!window.kakao || !window.kakao.maps) {
      alert("Map load error");
      return;
    }

    // Check if kakao.maps.LatLng is defined before using it
    if (typeof window.kakao.maps.LatLng !== "function") {
      alert("kakao.maps.LatLng is not available");
      return;
    }

    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new window.kakao.maps.LatLng(37.293, 127.202),
      level: 3,
    };

    const map = new window.kakao.maps.Map(mapContainer, mapOption);

    const filteredLocations = selectedCategories.includes("All")
        ? locations
        : locations.filter((loc) =>
            selectedCategories.some((cat) => cat === loc.category)
        );

    filteredLocations.forEach((location) => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(location.lat, location.lng),
        map: map,
      });

      const infowindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:5px; font-size:14px;">${location.name}</div>`,
      });

      window.kakao.maps.event.addListener(marker, "mouseover", () => {
        infowindow.open(map, marker);
      });

      window.kakao.maps.event.addListener(marker, "mouseout", () => {
        infowindow.close();
      });
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
        <div id="map" className="map"></div>
        <Footer />
      </div>
  );
}
