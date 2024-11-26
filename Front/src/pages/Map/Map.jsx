import React, { useState, useEffect } from "react";
import "./Map.css";
import Footer from "../../component/footer/Footer";
import UpperNav from "../../component/upperNav/UpperNav";

const { kakao } = window; // Kakao Maps API 사용

export default function MapPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "한식", "중식", "일식"];

  const locations = [
    {
      id: 1,
      name: "서울24시 감자탕",
      lat: 37.293,
      lng: 127.202,
      category: "한식",
    },
    { id: 2, name: "스타벅스", lat: 37.292, lng: 127.203, category: "All" },
    {
      id: 3,
      name: "역전할머니맥주",
      lat: 37.294,
      lng: 127.205,
      category: "All",
    },
  ];

  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(37.293, 127.202),
      level: 3, // 지도 확대 레벨
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);

    // 마커 생성
    const filteredLocations =
      selectedCategory === "All"
        ? locations
        : locations.filter((loc) => loc.category === selectedCategory);

    filteredLocations.forEach((location) => {
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(location.lat, location.lng),
        map: map,
      });

      const infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px; font-size:14px;">${location.name}</div>`,
      });

      kakao.maps.event.addListener(marker, "mouseover", () => {
        infowindow.open(map, marker);
      });

      kakao.maps.event.addListener(marker, "mouseout", () => {
        infowindow.close();
      });
    });
  }, [selectedCategory]);

  return (
    <div className="container">
      <UpperNav title="지도" />
      <div className="map-filter">
        <button className="filter-button">카테고리 필터</button>
        <div className="filter-menu">
          {categories.map((category) => (
            <label key={category}>
              <input
                type="checkbox"
                checked={selectedCategory === category}
                onChange={() => setSelectedCategory(category)}
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
