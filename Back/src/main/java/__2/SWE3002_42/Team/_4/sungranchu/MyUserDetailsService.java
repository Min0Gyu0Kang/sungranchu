package __2.SWE3002_42.Team._4.sungranchu;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class MyUserDetailsService implements UserDetailsService {
    private final MemberRepository memberRepository; // 반드시 final로 선언
    @Override
    public UserDetails loadUserByUsername(String nickname) throws UsernameNotFoundException {
        var result = memberRepository.findByNickname(nickname);
        if (result.isEmpty()) {
            throw new UsernameNotFoundException("그런 아이디 없음");
        }
        var user = result.get();
        List<GrantedAuthority> 권한목록 = new ArrayList<>();
        if ("ehdehd123".equals(user.getNickname())) { // 문자열 비교는 equals로
            권한목록.add(new SimpleGrantedAuthority("관리자"));
        } else {
            권한목록.add(new SimpleGrantedAuthority("일반유저"));
        }
        return new User(user.getNickname(), user.getPassword(), 권한목록);
    }
}
