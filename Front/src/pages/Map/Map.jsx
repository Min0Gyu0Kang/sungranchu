import React, { useState, useEffect, useRef } from "react";
import "./Map.css";
import Footer from "../../component/footer/Footer";
import UpperNav from "../../component/upperNav/UpperNav";
import restaurantsData from "./Restaurants.json"; // Adjust the path to your actual JSON file

export default function MapPage() {
  const containerRef = useRef(null);
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);
  const [mapReady, setMapReady] = useState(false); // State to track map readiness
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
          center: new window.kakao.maps.LatLng(37.2937, 126.9743), // 수원캠 기준
          level: 5, // zoom level
        };
        const map = new window.kakao.maps.Map(container, options);
        setMap(map);
        setMapReady(true); // Set mapReady to true when map is initialized
      });
    };

    mapScript.addEventListener('load', onLoadKakaoMap);

    return () => {
      mapScript.removeEventListener('load', onLoadKakaoMap);
      document.head.removeChild(mapScript);
    };
  }, []);

  const batchMarkers = (restaurants, batchSize) => {
    let index = 0;
    const interval = setInterval(() => {
      const batch = restaurants.slice(index, index + batchSize);
      batch.forEach((place) => {
        const { lat, lng, name } = place; // Destructure lat and lng from the restaurant object
        const markerPosition = new window.kakao.maps.LatLng(lat, lng); // Set marker position using lat/lng
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        // Log the marker details (lat, lng, name) to verify marker placement
        console.log(`Adding marker for: ${name} at lat: ${lat}, lng: ${lng}`);

        // Add click listener for InfoWindow
        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:12px;">${name}</div>`,
          zIndex: 1,
        });
        window.kakao.maps.event.addListener(marker, 'click', () => {
          infowindow.open(map, marker);
        });

        marker.setMap(map); // Add the marker to the map

        // Add marker to state (optional if needed)
        setMarkers(prevMarkers => [...prevMarkers, marker]);
      });
      index += batchSize;

      if (index >= restaurants.length) {
        clearInterval(interval); // Stop after all markers are processed
      }
    }, 100); // Delay for batch processing
  };


  useEffect(() => {
    if (mapReady && map) {
      // Clear previous markers
      markers.forEach(marker => marker.setMap(null));
      setMarkers([]);  // Clear the marker state

      // Filter restaurants based on selected categories
      const filteredRestaurants = selectedCategories.includes("All")
          ? restaurantsData
          : restaurantsData.filter(restaurant =>
              selectedCategories.includes(restaurant.category)
          );

      // 식당 정보 확인
      console.log("Filtered restaurants in category:", filteredRestaurants);

      // Call the batchMarkers function to add markers in batches
      batchMarkers(filteredRestaurants, 10); // Batch size of 10 markers at a time
    }
  }, [selectedCategories, mapReady, map]); // Run when map is ready and categories change

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
