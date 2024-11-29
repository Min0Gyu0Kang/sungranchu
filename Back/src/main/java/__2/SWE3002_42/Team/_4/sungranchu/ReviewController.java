package __2.SWE3002_42.Team._4.sungranchu;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{restaurantId}/info")
    public ResponseEntity<?> getRestaurantInfo(@PathVariable Long restaurantId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId).orElseThrow(() -> new IllegalArgumentException(""));
        List<Review> reviews = reviewRepository.findByRestaurant(restaurant);
        List<Map<String, Object>> reviewDetails = new ArrayList<>();
        double ratingSum = 0.0;

        for(Review review : reviews){
            ratingSum +=  review.getRating();
            Map<String, Object> reviewDetail = new HashMap<>();
            reviewDetail.put("rating", review.getRating());
            reviewDetail.put("content", review.getContent());
            reviewDetails.add(reviewDetail);
        }
        int cntReviews = reviews.size();
        double avgRating = (cntReviews > 0) ? (ratingSum / cntReviews) : 0.0;
        Map<String, Object> response = new HashMap<>();
        response.put("restaurantName", restaurant.getName());
        response.put("avgRating", avgRating);
        response.put("reviews", reviewDetails);

        return ResponseEntity.ok(response);
    }
}
