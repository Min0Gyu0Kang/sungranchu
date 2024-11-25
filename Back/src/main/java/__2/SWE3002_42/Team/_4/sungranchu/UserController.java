package __2.SWE3002_42.Team._4.sungranchu;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;
    private final MailService mailService;
    private String generatedCode; // 서버에서 생성한 인증번호 저장

    @GetMapping("/register")
    public String register(){
        return "register";
    }

    @PostMapping(value = "/request-sign-up")
    public ResponseEntity<?> requestSignUp(@RequestBody SignUpRequestDto signUpRequestDto) {
        String email = signUpRequestDto.getUserEmail();

        // 이메일 형식 검증
        if (!email.matches("^[a-zA-Z0-9._%+-]+@g\\.skku\\.edu$")) {
            return ResponseEntity.badRequest().body("이메일 형식이 잘못되었습니다. @g.skku.edu 도메인만 사용 가능합니다.");
        }

        // 인증번호 생성 및 전송
        generatedCode = mailService.sendMail(email);
        return ResponseEntity.ok("인증번호가 전송되었습니다.");
    }

    @PostMapping("/user")
    public String registerUser(SignUpRequestDto signUpRequestDto, Model model) {
        try {
            // 인증번호 검증
            if (!generatedCode.equals(signUpRequestDto.getAuthCode())) {
                model.addAttribute("errorMessage", "인증번호가 올바르지 않습니다.");
                return "register";
            }

            // 회원가입 처리
            saveMember(signUpRequestDto);
            return "redirect:/register";
        } catch (IllegalArgumentException e) {
            model.addAttribute("errorMessage", e.getMessage());
            return "register";
        }
    }

    private void saveMember(SignUpRequestDto signUpRequestDto) {
        // 중복 확인 및 저장
        if (userRepository.findByNickname(signUpRequestDto.getNickname()).isPresent()) {
            throw new IllegalArgumentException("이미 존재하는 닉네임입니다.");
        }


        User user = new User();
        user.setUsername(signUpRequestDto.getUsername());
        user.setNickname(signUpRequestDto.getNickname());
        user.setPassword(new BCryptPasswordEncoder().encode(signUpRequestDto.getPassword()));
        user.setUserEmail(signUpRequestDto.getUserEmail());
        userRepository.save(user);
    }
}
