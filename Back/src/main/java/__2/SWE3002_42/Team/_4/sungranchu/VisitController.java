package __2.SWE3002_42.Team._4.sungranchu;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class VisitController {
    private final VisitRepository visitRepository;
    private final MemberRepository memberRepository;

    @GetMapping("/mypage/review")
    public ResponseEntity<?> getUnreviewedVisits(Authentication auth) {
        String username = auth.getName();
        Member member = memberRepository.findByMemberName(username)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        Optional<Visit> unreviewedVisits = visitRepository.findByMember(member);
        List<Restaurant> restaurants = unreviewedVisits.stream()
                .map(Visit::getRestaurant)
                .collect(Collectors.toList());

        return ResponseEntity.ok(restaurants);
    }
}
