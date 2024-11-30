package __2.SWE3002_42.Team._4.sungranchu;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/request-sign-up")
    public ResponseEntity<?> requestSignUp(@RequestBody SignUpRequestDto signUpRequestDto) {
        //프론트랑 형식 맞추기 미완
        String email = signUpRequestDto.getMemberEmail();
        System.out.println("email: " + email);
;
        // 이메일 형식 검증
        if (!email.matches("^[a-zA-Z0-9._%+-]+@g\\.skku\\.edu$")) {
            return ResponseEntity.badRequest().body("이메일 형식이 잘못되었습니다. @g.skku.edu 도메인만 사용 가능합니다.");
        }

        // 인증번호 생성 및 전송
        generatedCode = mailService.sendMail(email);
        return ResponseEntity.ok("인증번호가 전송되었습니다.");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/user")
    public ResponseEntity<String> registerUser(SignUpRequestDto signUpRequestDto, Model model) {
        System.out.println("DTO Values: " + signUpRequestDto);
        System.out.println("인증번호: " + signUpRequestDto.getAuthCode());

        try {
            if (!generatedCode.equals(signUpRequestDto.getAuthCode())) {
                return ResponseEntity.badRequest().body("인증번호가 올바르지 않습니다.");
            }

            saveMember(signUpRequestDto);
            return ResponseEntity.ok().body("가입 완료!");
        } catch (IllegalArgumentException e) {
            model.addAttribute("errorMessage", e.getMessage());
            return ResponseEntity.badRequest().body("알 수 없는 오류 " + e.getMessage());
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
        member.setProfile("profiles/profile.png");
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
    public ResponseEntity<?> myPage(Authentication auth) {
        System.out.println(auth);
        System.out.println(auth.getName()); //아이디출력가능
        System.out.println(auth.isAuthenticated()); //로그인여부 검사가능
        System.out.println(auth.getAuthorities().contains(new SimpleGrantedAuthority("일반유저")));
        return ResponseEntity.ok().body("로그인 성공!");
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/changeNickName/{nickname}")
    public ResponseEntity<Map<String, String>> changeNickName(Authentication auth, @PathVariable String nickname) {
        if(memberRepository.findByNickname(nickname).isPresent()){
            return ResponseEntity.badRequest().body(Map.of("error" ,"이미 존재하는 닉네임"));
        }
        memberRepository.findByNickname(auth.getName()).ifPresent(member -> {
            member.setNickname(nickname);
            memberRepository.save(member);

            UserDetails updatedUserDetails = new User(member.getNickname(), "", auth.getAuthorities());
            // 새로운 Authentication 객체 생성
            UsernamePasswordAuthenticationToken newAuth =
                    new UsernamePasswordAuthenticationToken(
                            updatedUserDetails,
                            "",
                            auth.getAuthorities()
                    );

            // SecurityContext 업데이트
            SecurityContextHolder.getContext().setAuthentication(newAuth);
        });
        return ResponseEntity.ok().body(Map.of("changedNickname" ,nickname));
    }


}
