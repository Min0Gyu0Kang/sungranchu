package __2.SWE3002_42.Team._4.sungranchu;

import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class RandomFoodControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void testGetRandomFoodWithValidInput() {
        // Given
        List<Map<String, String>> foods = List.of(
                Map.of("id", "한식"),
                Map.of("id", "일식"),
                Map.of("id", "중식"),
                Map.of("id", "양식"),
                Map.of("id", "아시안")
        );

        // When
        ResponseEntity<Map> response = restTemplate.postForEntity("/getRandom", foods, Map.class);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(foods.stream().anyMatch(food -> food.get("id").equals(response.getBody().get("id"))));
    }

    @Test
    void testGetRandomFoodWithEmptyInput() {
        // Given
        List<Map<String, String>> emptyFoods = List.of();

        // When
        ResponseEntity<Map> response = restTemplate.postForEntity("/getRandom", emptyFoods, Map.class);

        // Then
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Food list is empty", response.getBody().get("error"));
    }
}
