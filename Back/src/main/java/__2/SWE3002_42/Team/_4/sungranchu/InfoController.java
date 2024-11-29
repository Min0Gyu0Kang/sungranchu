package __2.SWE3002_42.Team._4.sungranchu;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class InfoController {
    private final MemberRepository memberRepository;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/mypage/info")
    public ResponseEntity<?> getMemberinfo(Authentication auth) {
        String nickname = auth.getName();
        Member member = memberRepository.findByNickname(nickname).orElseThrow(() -> new IllegalArgumentException(""));
        return ResponseEntity.ok(member);
    }
}
