package com.iris.user.account.user.service;


import com.iris.user.account.Response;
import com.iris.user.account.user.entity.UserEntity;
import com.iris.user.account.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.Optional;
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender emailSender;
    private String authNum; // 인증 번호
    private final Response response;
    private final UserRepository userRepository;
    private final UserService userService;

    // 인증번호 8자리 무작위 생성
    public void createCode() {
        Random random = new Random();
        StringBuffer key = new StringBuffer();

        for(int i=0; i<8; i++) {
            int idx = random.nextInt(3);

            switch (idx) {
                case 0 :
                    key.append((char) ((int)random.nextInt(26) + 97));
                    break;
                case 1:
                    key.append((char) ((int)random.nextInt(26) + 65));
                    break;
                case 2:
                    key.append(random.nextInt(9));
                    break;
            }
        }
        authNum = key.toString();
    }

    // 메일 양식 작성
    public MimeMessage createCodeEmailForm(String email) throws MessagingException, UnsupportedEncodingException {
        createCode();
        String setFrom = "iris@gmail.com";
        String toEmail = email;
        String title = "[iris] 이메일 인증 코드";

        MimeMessage message = emailSender.createMimeMessage();
        message.addRecipients(MimeMessage.RecipientType.TO, toEmail);
        message.setSubject(title);

        // 메일 내용
        String msgOfEmail="";
        msgOfEmail += "<div style='margin:20px;'>";
        msgOfEmail += "<h1> 안녕하세요 iris 입니다. </h1>";
        msgOfEmail += "<br>";
        msgOfEmail += "<p>아래 코드를 입력해주세요<p>";
        msgOfEmail += "<br>";
        msgOfEmail += "<p>감사합니다.<p>";
        msgOfEmail += "<br>";
        msgOfEmail += "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msgOfEmail += "<h3 style='color:blue;'>회원가입 인증 코드입니다.</h3>";
        msgOfEmail += "<div style='font-size:130%'>";
        msgOfEmail += "CODE : <strong>";
        msgOfEmail += authNum + "</strong><div><br/> ";
        msgOfEmail += "</div>";

        message.setFrom(setFrom);
        message.setText(msgOfEmail, "utf-8", "html");

        return message;
    }

    // 메일 양식 작성
    public MimeMessage createPasswordEmailForm(String email) throws MessagingException, UnsupportedEncodingException {
        createCode();
        String setFrom = "iris@gmail.com";
        String toEmail = email;
        String title = "[iris] 임시비밀번호";

        MimeMessage message = emailSender.createMimeMessage();
        message.addRecipients(MimeMessage.RecipientType.TO, toEmail);
        message.setSubject(title);

        // 메일 내용
        String msgOfEmail="";
        msgOfEmail += "<div style='margin:20px;'>";
        msgOfEmail += "<h1> 안녕하세요 iris 입니다. </h1>";
        msgOfEmail += "<br>";
        msgOfEmail += "<p>임시비밀번호를 보내드립니다.<p>";
        msgOfEmail += "<br>";
        msgOfEmail += "<p>감사합니다.<p>";
        msgOfEmail += "<br>";
        msgOfEmail += "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msgOfEmail += "<h3 style='color:blue;'>임시비밀번호입니다.</h3>";
        msgOfEmail += "<div style='font-size:130%'>";
        msgOfEmail += "CODE : <strong>";
        msgOfEmail += authNum + "</strong><div><br/> ";
        msgOfEmail += "</div>";

        message.setFrom(setFrom);
        message.setText(msgOfEmail, "utf-8", "html");

        return message;
    }

    //실제 메일 전송
    public ResponseEntity<?> sendCode(String email) throws MessagingException, UnsupportedEncodingException {

        //메일전송에 필요한 정보 설정
        MimeMessage emailForm = createCodeEmailForm(email);
        //실제 메일 전송
        emailSender.send(emailForm);

        return response.success(authNum, "인증 코드 발송 성공!", HttpStatus.OK); //인증 코드 발송
    }

    //비밀번호 메일 전송
    public ResponseEntity<?> sendPassword(String email) throws MessagingException, UnsupportedEncodingException, Exception {
        if (userRepository.existsByEmail(email)) {

            //메일전송에 필요한 정보 설정
            MimeMessage emailForm = createPasswordEmailForm(email);
            //실제 메일 전송
            emailSender.send(emailForm);

            userService.updateUserPassword(email, authNum);

            return response.success("임시 비밀번호 발송 성공!", HttpStatus.OK); //인증 코드 발송
        } else {
            return response.fail("존재하지 않는 사용자입니다.", HttpStatus.BAD_REQUEST);
        }
    }
}