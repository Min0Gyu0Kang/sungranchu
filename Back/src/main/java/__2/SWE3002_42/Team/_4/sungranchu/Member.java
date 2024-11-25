package __2.SWE3002_42.Team._4.sungranchu;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    String memberName;
    @Column(unique = true)
    String nickname;
    String password;

    String memberEmail;

}
