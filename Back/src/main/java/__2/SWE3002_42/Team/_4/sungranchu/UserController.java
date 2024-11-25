package __2.SWE3002_42.Team._4.sungranchu;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
public class UserController {
    private final MemberRepository memberRepository;
    private final MailService mailService;
    private String generatedCode; // 서버에서 생성한 인증번호 저장

    @GetMapping("/register")
    public String register(){
        return "register";
    }

    @PostMapping(value = "/request-sign-up")
    public ResponseEntity<?> requestSignUp(@RequestBody SignUpRequestDto signUpRequestDto) {
        String email = signUpRequestDto.getMemberEmail();

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
        System.out.println("DTO Values: " + signUpRequestDto);

        try {
            if (!generatedCode.equals(signUpRequestDto.getAuthCode())) {
                model.addAttribute("errorMessage", "인증번호가 올바르지 않습니다.");
                return "register";
            }

            saveMember(signUpRequestDto);
            return "redirect:/register";
        } catch (IllegalArgumentException e) {
            model.addAttribute("errorMessage", e.getMessage());
            return "register";
        }
    }


    private void saveMember(SignUpRequestDto signUpRequestDto) {
        System.out.println("Checking for duplicate nickname: " + signUpRequestDto.getNickname());
        if (memberRepository.findByNickname(signUpRequestDto.getNickname()).isPresent()) {
            System.out.println("Duplicate nickname found: " + signUpRequestDto.getNickname());
            throw new IllegalArgumentException("이미 존재하는 닉네임입니다.");
        }


        Member member = new Member();
        member.setMemberName(signUpRequestDto.getMemberName());
        member.setNickname(signUpRequestDto.getNickname());
        member.setPassword(new BCryptPasswordEncoder().encode(signUpRequestDto.getPassword()));
        member.setMemberEmail(signUpRequestDto.getMemberEmail());
        try {
            memberRepository.save(member);
        } catch (Exception ex) {
            Throwable cause = ex.getCause();
            System.out.println("Exception during save: " + ex.getMessage());
            if (cause != null) {
                System.out.println("Cause: " + cause.getMessage());
                cause.printStackTrace();
            }
            throw ex; // 다시 던져서 Spring이 처리하도록
        }
    }

    @GetMapping("/login")
    public String login() {
        return "login.html";
    }

    @GetMapping("/my-page")
    public String myPage(Authentication auth) {
        System.out.println(auth);
        System.out.println(auth.getName()); //아이디출력가능
        System.out.println(auth.isAuthenticated()); //로그인여부 검사가능
        System.out.println(auth.getAuthorities().contains(new SimpleGrantedAuthority("일반유저")));
        return "mypage.html";
    }


}
