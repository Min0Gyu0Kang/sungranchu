package __2.SWE3002_42.Team._4.sungranchu;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignUpRequestDto {
    private String username;
    private String nickname;
    private String password;
    private String userEmail;
    private String authCode; // 인증번호 필드 추가
}
