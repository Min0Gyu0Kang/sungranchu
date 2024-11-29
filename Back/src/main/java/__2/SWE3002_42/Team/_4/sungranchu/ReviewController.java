package __2.SWE3002_42.Team._4.sungranchu;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewRepository reviewRepository;
    private final VisitRepository visitRepository;
    private final MemberRepository memberRepository;
    private final RestaurantRepository restaurantRepository;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/mypage/review/write/{restaurantId}/add")
    public ResponseEntity<?> addReview(@PathVariable Long restaurantId, @RequestParam Map<String, Object> payload, Authentication auth){
        String nickname = auth.getName();
        Member member = memberRepository.findByNickname(nickname).orElseThrow(() -> new IllegalArgumentException(""));

        Restaurant restaurant = restaurantRepository.findById(restaurantId).orElseThrow(() -> new IllegalArgumentException(""));

        String content = (String) payload.get("content");
        Double rating = Double.valueOf(payload.get("rating").toString());

        Review review = new Review();
        review.setMember(member);
        review.setRestaurant(restaurant);
        review.setContent(content);
        review.setRating(rating);
        reviewRepository.save(review);

        Visit visit = visitRepository.findByMemberAndRestaurant(member, restaurant).orElseThrow(() -> new IllegalArgumentException(""));
        visit.setHasReview(true);
        visitRepository.save(visit);

        return ResponseEntity.ok("리뷰 저장 성공");
    }

}
