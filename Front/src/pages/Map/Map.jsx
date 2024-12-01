import React, { useState, useEffect, useRef } from "react";
import "./Map.css";
import Footer from "../../component/footer/Footer";
import UpperNav from "../../component/upperNav/UpperNav";
import restaurantsData from "./Restaurants.json"; // Adjust the path to your actual JSON file
import { useLocation } from "react-router-dom"; // React Router의 useLocation 훅


export default function MapPage() {
  const containerRef = useRef(null);
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [markers, setMarkers] = useState([]);
  const [infoWindows, setInfoWindows] = useState([]);
  const [map, setMap] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const location = useLocation(); // 이전 페이지에서 전달된 데이터를 받기
  const restaurant = location.state?.restaurant; // 전달된 식당 데이터
  
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
    const mapScript = document.createElement("script");
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=47367275f913452db1fe86cef05c3d38&autoload=false`;
  
    document.head.appendChild(mapScript);
  
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: restaurant
            ? new window.kakao.maps.LatLng(restaurant.lat, restaurant.lng) // 전달받은 식당 위치로 중심 설정
            : new window.kakao.maps.LatLng(37.2937, 126.9743), // 수원캠 기준
          level: 5, // zoom level
        };
        const map = new window.kakao.maps.Map(container, options);
        setMap(map);
        setMapReady(true);
  
        if (restaurant) {
          // 전달받은 식당 위치에 마커와 InfoWindow 추가
          const markerPosition = new window.kakao.maps.LatLng(
            restaurant.lat,
            restaurant.lng
          );
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);
  
          const infoWindowContent = `
            <div class="infoWindowContainer" style="padding: 10px; font-size: 14px;">
              <strong style="font-size: 16px;">${restaurant.name}</strong><br>
              <div style="margin-top: 5px;">${restaurant.address}</div>
              <button id="getDirectionButton" style="margin-top: 10px; padding: 8px 12px; font-size: 14px;">길찾기</button>
            </div>
          `;
          const infowindow = new window.kakao.maps.InfoWindow({
            content: infoWindowContent,
          });
          infowindow.open(map, marker);
          // Add event listener to the button
          const button = document.getElementById("getDirectionButton");
          if (button) {
            button.addEventListener("click", () => {
              getDirections(restaurant.lat, restaurant.lng);
            });
          }
        }
      });
    };
  
    mapScript.addEventListener("load", onLoadKakaoMap);
  
    return () => {
      mapScript.removeEventListener("load", onLoadKakaoMap);
      document.head.removeChild(mapScript);
    };
  }, [restaurant]); // restaurant가 변경될 때마다 실행


  
  const closeAllInfoWindows = () => {
    infoWindows.forEach((infowindow) => infowindow.close());
    setInfoWindows([]);
  };

  const batchMarkers = (restaurants, batchSize) => {
    let index = 0;
    const interval = setInterval(() => {
      const batch = restaurants.slice(index, index + batchSize);
      batch.forEach((place, i) => {
        const { lat, lng, name } = place;
        const markerPosition = new window.kakao.maps.LatLng(lat, lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        // Generate a unique button ID using index or a unique property from `place`
        const uniqueButtonId = `getDirectionButton_${index}_${i}`;

        // Create InfoWindow with unique button ID
        const iwContent = `
<div style="padding:5px;font-size:12px;height:auto;">
  ${name}<br>
  <button id="${uniqueButtonId}" style="margin-top: 10px; padding: 8px 12px; font-size: 14px;">길찾기</button>
</div>`;
        const infowindow = new window.kakao.maps.InfoWindow({
          content: iwContent,
          removable: true,
        });

        // Add click listener to open the InfoWindow
        window.kakao.maps.event.addListener(marker, "click", () => {
          infowindow.open(map, marker);

          // Wait for the InfoWindow to render and then add the event listener
          setTimeout(() => {
            const button = document.getElementById(uniqueButtonId);
            if (button) {
              button.addEventListener("click", () => {
                // Call getDirections with the appropriate lat/lng
                getDirections(lat, lng).then((r) => {
                  console.log("Directions fetched successfully:", r);
                });
              });
            }
          }, 100);
        });

        marker.setMap(map);

        // Track the InfoWindow
        setInfoWindows((prev) => [...prev, infowindow]);

        // Track the marker
        setMarkers((prevMarkers) => [...prevMarkers, marker]);
      });

      index += batchSize;

      if (index >= restaurants.length) {
        clearInterval(interval);
      }
    }, 100);
  };


  useEffect(() => {
    if (mapReady && map) {
      closeAllInfoWindows();

      // Clear previous markers
      markers.forEach((marker) => marker.setMap(null));
      setMarkers([]);

      // Filter restaurants based on selected categories
      const filteredRestaurants = selectedCategories.includes("All")
        ? restaurantsData
        : restaurantsData.filter((restaurant) =>
            selectedCategories.includes(restaurant.category)
          );

      console.log("Filtered restaurants in category:", filteredRestaurants);

      // Add markers for the filtered restaurants
      batchMarkers(filteredRestaurants, 10);
    }
  }, [selectedCategories, mapReady, map]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      if (category === "All") {
        return prev.includes("All") ? [] : ["All"];
      } else {
        if (prev.includes("All")) {
          return prev.filter((cat) => cat !== "All").concat(category);
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

  const getDirections = async (endLat, endLng) => {

    try {
      const response = await fetch(
          `http://localhost:8080/car-direction?startLat=${37.2937}&startLng=${126.9743}&endLat=${endLat}&endLng=${endLng}`,
          {
            method: 'GET',
          }
      );

      const data = await response.json();  // Parse the JSON response

      const linePath = [];
      data.routes[0].sections[0].roads.forEach((router) => {
        router.vertexes.forEach((vertex, index) => {
          // Only push lat/lng pairs to linePath
          if (index % 2 === 0) {
            // vertexes array is alternating lat, lng; so, pair them correctly
            linePath.push(new window.kakao.maps.LatLng(router.vertexes[index + 1], router.vertexes[index]));
          }
        });
      });

      // Create a polyline to show the route
      const polyline = new window.kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,        // Line thickness
        strokeColor: '#000000', // Line color (black)
        strokeOpacity: 0.7,     // Line opacity
        strokeStyle: 'solid'    // Line style (solid)
      });

      // Display the polyline on the map
      polyline.setMap(map);

      console.log("Directions data:", data); // Log the directions data for reference

    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  };


  return (
    <div className="container">
      <div class="map-header">
        <h2 class="map-title">지도</h2> 
      </div>
      <div className="map-container">
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
        <div id="map" ref={containerRef}></div>
      </div>
      <Footer />
    </div>
  );
}
