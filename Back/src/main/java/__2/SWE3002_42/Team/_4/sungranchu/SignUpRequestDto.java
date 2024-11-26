package __2.SWE3002_42.Team._4.sungranchu;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignUpRequestDto {
    private String memberName;
    private String nickname;
    private String password;
    private String memberEmail;
    private String authCode;
}

