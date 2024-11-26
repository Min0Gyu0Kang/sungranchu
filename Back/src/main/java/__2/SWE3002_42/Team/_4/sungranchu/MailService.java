package __2.SWE3002_42.Team._4.sungranchu;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class MailService {
    private static final Logger log = LoggerFactory.getLogger(MailService.class);
    private final JavaMailSender javaMailSender;

    @Value("${mail.sender.email}")
    private String senderEmail;

    private static String number;

    public MailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public static void createNumber() {
        Random random = new Random();
        StringBuilder key = new StringBuilder();
        for (int i = 0; i < 8; i++) {
            int idx = random.nextInt(3);
            switch (idx) {
                case 0 -> key.append((char) (random.nextInt(26) + 97)); // a~z
                case 1 -> key.append((char) (random.nextInt(26) + 65)); // A~Z
                case 2 -> key.append(random.nextInt(10)); // 0~9
            }
        }
        number = key.toString();
    }

    public MimeMessage createMessage(String email) {
        createNumber();
        log.info("Number: {}", number);

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);
            messageHelper.setFrom(senderEmail);
            messageHelper.setTo(email);
            messageHelper.setSubject("[성랜추] 이메일 인증 번호 발송");

            String body = "<html><body>";
            body += "<h1>성랜추 이메일 인증</h1>";
            body += "<p>인증 번호: <strong>" + number + "</strong></p>";
            body += "</body></html>";

            messageHelper.setText(body, true);
        } catch (MessagingException e) {
            log.error("메일 생성 중 오류 발생", e);
        }
        return mimeMessage;
    }

    public String sendMail(String email) {
        MimeMessage mimeMessage = createMessage(email);
        log.info("메일 전송 시작");
        javaMailSender.send(mimeMessage);
        log.info("메일 전송 완료");
        return number;
    }
}
