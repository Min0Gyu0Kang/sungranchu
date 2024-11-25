package __2.SWE3002_42.Team._4.sungranchu;

import java.util.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RandomController {
    private final Random random = new Random();

    @PostMapping("/getRandom")
    public ResponseEntity<Map<String, String>> getRandomFood(@RequestBody Map<String, String> foods) {
        if (foods.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Food list is empty"));
        }

        List<String> keys = new ArrayList<>(foods.keySet());
        String randomKey = keys.get(random.nextInt(keys.size()));
        Map<String, String> randomFoodContainer = new HashMap<>();
        randomFoodContainer.put("id", randomKey);

        return ResponseEntity.ok(randomFoodContainer);
    }
}
