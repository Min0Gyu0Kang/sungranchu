package __2.SWE3002_42.Team._4.sungranchu;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VisitRepository extends JpaRepository<Visit, Long> {
    Optional<Visit> findByMember(Member member);
    Optional<Visit> findByMemberAndRestaurant (Member member, Restaurant restaurant);
}
