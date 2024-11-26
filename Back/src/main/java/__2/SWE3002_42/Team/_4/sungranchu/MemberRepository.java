package __2.SWE3002_42.Team._4.sungranchu;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByMemberEmail(String userEmail);
    Optional<Member> findByNickname(String nickname);
    Optional<Member> findByMemberName(String username);
}
