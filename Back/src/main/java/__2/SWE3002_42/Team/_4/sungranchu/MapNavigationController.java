package __2.SWE3002_42.Team._4.sungranchu;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.web.client.RestTemplate;

@RestController
@RequiredArgsConstructor
public class MapNavigationController {

    @Value("${kakao.rest-api.key}")
    private String kakaoRestApiKey;  // Kakao API Key injected from application.properties

    private static final String API_URL = "https://apis-navi.kakaomobility.com/v1/directions";

    private final MemberRepository memberRepository;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/car-direction")
    public ResponseEntity<?> getCarDirection(Authentication auth, @RequestParam Double startLng, @RequestParam Double startLat, @RequestParam Double endLng, @RequestParam Double endLat) {
        String nickname = auth.getName();
        Member member = memberRepository.findByNickname(nickname).orElseThrow(() -> new IllegalArgumentException(""));

        // Prepare query parameters for the API request
        String origin = startLng + "," + startLat;
        String destination = endLng + "," + endLat;

        // Set up headers for authentication
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "KakaoAK " + kakaoRestApiKey);  // Use injected Kakao API Key
        headers.set("Content-Type", "application/json");

        // Prepare the URL with query parameters
        String requestUrl = API_URL + "?origin=" + origin + "&destination=" + destination;

        // Create an HttpEntity with headers
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // Use RestTemplate to make the GET request
        RestTemplate restTemplate = new RestTemplate();
        try {
            ResponseEntity<String> response = restTemplate.exchange(requestUrl, HttpMethod.GET, entity, String.class);
            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}
