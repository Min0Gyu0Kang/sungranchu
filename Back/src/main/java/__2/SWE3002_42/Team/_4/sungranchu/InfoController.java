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
}
