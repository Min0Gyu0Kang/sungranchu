package __2.SWE3002_42.Team._4.sungranchu;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @ExceptionHandler(IllegalArgumentException.class)
    public String handleException(IllegalArgumentException e, Model model) {
        model.addAttribute("errorMessage", e.getMessage());
        return "register";
    }

    @GetMapping("/register")
    public String register() {
        return "register";
    }

    @GetMapping("/")
    public String home(){
        return "redirect:/register";
    }

    @PostMapping("/user")
    public String addMember(
            String username,
            String password,
            String nickname,
            String userEmail,
            Model model
    ) {
        try {
            saveMember(username, password, nickname, userEmail);
            return "redirect:/register";
        } catch (Exception e) {
            model.addAttribute("errorMessage", e.getMessage());
            return "register";
        }
    }

    public void saveMember(String username,
                           String password,
                           String nickname,
                           String userEmail) throws Exception {
        // 닉네임 중복 검사
        if (userRepository.findByNickname(nickname).isPresent()) {
            throw new IllegalArgumentException("이미 존재하는 닉네임입니다: " + nickname);
        }

        // 유효성 검사: 아이디와 비밀번호 길이
        if (username.length() < 8 || password.length() < 8) {
            throw new IllegalArgumentException("아이디와 비밀번호는 8자 이상이어야 합니다.");
        }

        // 이메일 형식 검사
        if (!userEmail.matches("^[a-zA-Z0-9._%+-]+@g\\.skku\\.edu$")) {
            throw new IllegalArgumentException("이메일 형식이 잘못되었습니다. @g.skku.edu 도메인만 사용 가능합니다.");
        }

        // 유저 저장
        User user = new User();
        user.setUsername(username);
        user.setPassword(new BCryptPasswordEncoder().encode(password));
        user.setNickname(nickname);
        user.setUserEmail(userEmail);
        userRepository.save(user);
    }

}
