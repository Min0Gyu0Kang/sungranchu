package __2.SWE3002_42.Team._4.sungranchu;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MapController {

    @Value("${kakao.api.key}")
    private String kakaoApiKey;

    @GetMapping("/map")
    public String homePage(Model model) {
        model.addAttribute("kakaoApiKey", kakaoApiKey);
        return "MapSearch";  // Returns index.html (Thymeleaf template)
    }
}