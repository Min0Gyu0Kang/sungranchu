import React, { useState, useEffect, useRef } from "react";
import "./Map.css";
import Footer from "../../component/footer/Footer";
import UpperNav from "../../component/upperNav/UpperNav";

// Sample structure of restaurants.json data
import restaurantsData from "./Restaurants.json"; // Adjust the path to your actual JSON file

export default function MapPage() {
  const containerRef = useRef(null);
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [map, setMap] = useState(null);
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
        setMap(map);
      });
    };

    mapScript.addEventListener('load', onLoadKakaoMap);

    return () => {
      mapScript.removeEventListener('load', onLoadKakaoMap);
      document.head.removeChild(mapScript);
    };
  }, []);

  useEffect(() => {
    if (map) {
      // Filter restaurants based on selected categories
      const filteredRestaurants = selectedCategories.includes("All")
          ? restaurantsData
          : restaurantsData.filter(restaurant =>
              selectedCategories.includes(restaurant.category)
          );

      const bounds = new window.kakao.maps.LatLngBounds();
      const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

      // Display markers for each filtered restaurant
      filteredRestaurants.forEach((place) => {
        const markerPosition = new window.kakao.maps.LatLng(place.latitude, place.longitude);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        marker.setMap(map);

        // Set up info window when marker is clicked
        window.kakao.maps.event.addListener(marker, 'click', () => {
          infowindow.setContent(`<div style="padding:5px;font-size:12px;">${place.name}</div>`);
          infowindow.open(map, marker);
        });

        bounds.extend(markerPosition);
      });

      // Adjust map bounds to fit all markers
      map.setBounds(bounds);
    }
  }, [selectedCategories, map]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      if (category === "All") {
        return prev.includes("All") ? [] : ["All"];
      } else {
        if (prev.includes("All")) {
          return prev.filter(cat => cat !== "All").concat(category);
        }
        return prev.includes(category)
            ? prev.filter((cat) => cat !== category)
            : [...prev, category];
      }
    });
  };

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setSelectedCategories(["All"]);
    }
  }, [selectedCategories]);

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
