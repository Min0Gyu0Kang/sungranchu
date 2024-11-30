package __2.SWE3002_42.Team._4.sungranchu;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class InfoController {
    private final MemberRepository memberRepository;
    private final VisitRepository visitRepository;
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/mypage/info")
    public ResponseEntity<?> getMemberinfo(Authentication auth) {
        String nickname = auth.getName();
        Member member = memberRepository.findByNickname(nickname).orElseThrow(() -> new IllegalArgumentException(""));
        return ResponseEntity.ok(member);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/mypage/modify")
    public ResponseEntity<?> modifyProfile(@RequestParam("image") MultipartFile file, Authentication auth) {
        String nickname = auth.getName();
        Member member = memberRepository.findByNickname(nickname).orElseThrow(() -> new IllegalArgumentException(""));
        String dir = "Back/src/main/resources/profiles/";
        String filename = nickname+ "_profile.png";
        Path path = Paths.get(dir, filename);
        try {
            Files.createDirectories(path.getParent());
            file.transferTo(path);
            member.setProfile("profiles/" + filename);
            memberRepository.save(member);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("파일 저장 중 오류가 발생했습니다.");
        }
        return ResponseEntity.ok("프로필 수정 완료");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/mypage/profile-image")
    public ResponseEntity<?> getProfileImage(Authentication auth) {
        String nickname = auth.getName();
        Member member = memberRepository.findByNickname(nickname).orElseThrow(() -> new IllegalArgumentException(""));

        if (member.getProfile() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("프로필 이미지가 없습니다.");
        }

        try {
            Resource resource = new ClassPathResource(member.getProfile());
            byte[] imageBytes = Files.readAllBytes(resource.getFile().toPath());
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG) // 이미지 형식 설정
                    .body(imageBytes);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("이미지 로드 중 오류가 발생했습니다.");
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/mypage/achievement/info")
    public ResponseEntity<?> getAchievementinfo(Authentication auth) {
        String nickname = auth.getName();
        Member member = memberRepository.findByNickname(nickname).orElseThrow(() -> new IllegalArgumentException(""));
        List<Visit> VisitHistory = visitRepository.findByMember(member);
        Map<String, Object> response = new HashMap<>();
        int cnt = VisitHistory.size();
        if(cnt >= 10) {
            response.put("title", "성랜추 마니아");
            response.put("specific", "성랜추를 통해 10번 이상 식당을 방문했어요.");
        }
        else if(cnt >= 3){
            response.put("title", "성랜추 입문자");
            response.put("specific", "성랜추를 통해 3번 이상 식당을 방문했어요.");
        }
        else{
            response.put("title", "성랜추 초보");
            response.put("specific", "성랜추를 알아가는 단계에요.");
        }
        return ResponseEntity.ok(response);
    }
}
