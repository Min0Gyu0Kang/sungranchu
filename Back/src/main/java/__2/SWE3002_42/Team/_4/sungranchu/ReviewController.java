package __2.SWE3002_42.Team._4.sungranchu;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewRepository reviewRepository;
    private final VisitRepository visitRepository;
    private final MemberRepository memberRepository;
    private final RestaurantRepository restaurantRepository;

    @PostMapping("/mypage/review/write/{restaurantId}")
    public ResponseEntity<?> addReview(@PathVariable Long restaurantId, @RequestParam Map<String, Object> payload, Authentication auth){
        System.out.println("qweqw");
        String membername = auth.getName();
        Member member = memberRepository.findByMemberName(membername)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 식당입니다."));

        String content = (String) payload.get("content");
        Double rating = Double.valueOf(payload.get("rating").toString());

        Review review = new Review();
        review.setMember(member);
        review.setRestaurant(restaurant);
        review.setContent(content);
        review.setRating(rating);
        reviewRepository.save(review);

        Visit visit = visitRepository.findByMemberAndRestaurant(member, restaurant)
                .orElseThrow(() -> new IllegalArgumentException("방문 기록이 없습니다."));
        visit.setHasReview(true);
        visitRepository.save(visit);

        return ResponseEntity.ok("리뷰가 성공적으로 저장되었습니다.");
    }

}
