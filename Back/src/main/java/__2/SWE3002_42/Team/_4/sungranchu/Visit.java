package __2.SWE3002_42.Team._4.sungranchu;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Visit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    public Member member;

    @ManyToOne
    @JoinColumn(name = "restaurant_id", nullable = false)
    public Restaurant restaurant;

    Boolean hasReview;
}
