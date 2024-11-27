package __2.SWE3002_42.Team._4.sungranchu;

import jakarta.servlet.http.HttpSession;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
            http.csrf((csrf) -> csrf.disable());
            http.authorizeHttpRequests((authorize) ->
                    authorize.requestMatchers("/**").permitAll()
            );
            http.formLogin((formLogin) -> formLogin.loginPage("/login")
                    .defaultSuccessUrl("/my-page")
                    .failureUrl("/fail")
            );
            http.logout(logout -> logout
                            // 로그아웃 요청을 처리할 URL 설정
                            .logoutUrl("/logout")
                            // 로그아웃 성공 시 리다이렉트할 URL 설정
                            .logoutSuccessUrl("/login")
                            // 로그아웃 핸들러 추가 (세션 무효화 처리)
                            .addLogoutHandler((request, response, authentication) -> {
                                HttpSession session = request.getSession();
                                session.invalidate();
                            })
                            // 로그아웃 성공 핸들러 추가 (리다이렉션 처리)
                            .logoutSuccessHandler((request, response, authentication) ->
                                    response.sendRedirect("/login"))
                            // 로그아웃 시 쿠키 삭제 설정 (예: "remember-me" 쿠키 삭제)
                            .deleteCookies("remember-me")
                    );
            return http.build();
        }




}
