package __2.SWE3002_42.Team._4.sungranchu;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class VisitController {
    private final VisitRepository visitRepository;
    private final MemberRepository memberRepository;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/mypage/review")
    public ResponseEntity<?> getUnreviewedVisits(Authentication auth) {
        System.out.println("wq");
        String username = auth.getName();
        Member member = memberRepository.findByMemberName(username)
                .orElseThrow(() -> new IllegalArgumentException(""));

        List<Visit> unreviewedVisits = visitRepository.findByMember(member);
        List<Restaurant> restaurants = unreviewedVisits.stream()
                .map(Visit::getRestaurant)
                .collect(Collectors.toList());

        return ResponseEntity.ok(restaurants);
    }
}
