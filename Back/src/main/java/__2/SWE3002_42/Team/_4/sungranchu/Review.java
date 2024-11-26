package __2.SWE3002_42.Team._4.sungranchu;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    //리뷰 주인
    @ManyToOne
    @JoinColumn(name = "memberId", nullable = false)
    public Member member;

    //리뷰 내용, 별점, 작성일
    String content;
    Double rating;
    LocalDateTime createdAt;
}
