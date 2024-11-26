package __2.SWE3002_42.Team._4.sungranchu;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewRepository reviewRepository;

    @GetMapping("/regReview")
    public String regReview(){
        return "regReview";
    }

    @PostMapping("/addReview")
    public String addReview(){
        return "redirect:/regReview";
    }
}
