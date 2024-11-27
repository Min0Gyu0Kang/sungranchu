package __2.SWE3002_42.Team._4.sungranchu;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Allow CORS from the frontend React app (localhost:3000)
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")  // Allow React front-end from localhost:3000
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // Specify allowed HTTP methods
                .allowedHeaders("*");  // Allow any headers
    }
}
