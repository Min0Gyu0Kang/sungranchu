package __2.SWE3002_42.Team._4.sungranchu;

import jakarta.persistence.*;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(unique = true)
    String username;
    String nickname;
    String password;

}
