package __2.SWE3002_42.Team._4.sungranchu;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Controller
public class MapController {

    @Value("${kakao.api.key}")
    private String kakaoApiKey;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/map")
    public String mapPage(Model model) {
        model.addAttribute("kakaoApiKey", kakaoApiKey);
        return "MapSearch";  // Returns MapSearch.html (Thymeleaf template)
    }
}