package __2.SWE3002_42.Team._4.sungranchu;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class VisitController {
    private final VisitRepository visitRepository;
    private final MemberRepository memberRepository;
    private final RestaurantRepository restaurantRepository;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/mypage/review/info")
    public ResponseEntity<?> getUnreviewedVisits(Authentication auth) {
        String nickname = auth.getName();
        Member member = memberRepository.findByNickname(nickname).orElseThrow(() -> new IllegalArgumentException(""));

        List<Visit> unreviewedVisits = visitRepository.findByMember(member);
        List<Restaurant> restaurants = unreviewedVisits.stream()
                .map(Visit::getRestaurant)
                .collect(Collectors.toList());

        return ResponseEntity.ok(restaurants);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/{restaurantId}/visit")
    public void saveVisitHistory(@PathVariable Long restaurantId, Authentication auth){
        String nickname = auth.getName();
        Member member = memberRepository.findByNickname(nickname).orElseThrow(() -> new IllegalArgumentException(""));

        Restaurant restaurant = restaurantRepository.findById(restaurantId).orElseThrow(() -> new IllegalArgumentException(""));

        Visit newVisit = new Visit();
        newVisit.setMember(member);
        newVisit.setRestaurant(restaurant);
        newVisit.setHasReview(false);

        visitRepository.save(newVisit);
    }
}
