package com.iris.user.account.user.controller;

import com.iris.user.Error.ErrorHandler;
import com.iris.user.account.user.dto.UserRequest;
import com.iris.user.account.user.service.MailService;
import com.iris.user.account.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/user")
public class UserController {

    private final UserService userServices;
    private final MailService mailServices;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@Validated @RequestBody UserRequest.SignUp signUp, Errors errors) throws Exception {
        log.info("user service : signUp 메소드 시작");
        log.info("errors : " + errors);
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(ErrorHandler.refineErrors(errors));
        }
        return userServices.signUp(signUp);
    };

    @PostMapping("/login")
    public ResponseEntity<?> login(@Validated @RequestBody UserRequest.Login login, Errors errors) throws Exception {
        if(errors.hasErrors()) {
            return ResponseEntity.badRequest().body(ErrorHandler.refineErrors(errors));
        }
        return userServices.login(login);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(Authentication authentication) throws Exception {
        log.info("여기까진 나오니?");
        return userServices.logout(authentication);
    }

    @PostMapping("/checkpassword")
    public ResponseEntity<?> checkpassword(Authentication authentication, @RequestBody UserRequest.PasswordDto passwordDto) throws Exception {
        return userServices.checkPassword(authentication.getName(), passwordDto.getPassword());
    }

    @PutMapping ("/savesettings")
    public ResponseEntity<?> saveSettings(@RequestBody UserRequest.SaveSettingsDto saveSettingsDto, Authentication authentication, Errors errors) throws Exception {
        log.info("user service : savesettings 메소드 시작");
        return userServices.saveSettings(authentication, saveSettingsDto.getNewSettings());
    }

    @PostMapping("/dupli")
    public ResponseEntity<?> isDuplicatedEmail(@RequestBody UserRequest.EmailDto emailDto) throws Exception {
        return userServices.isDuplicatedEmail(emailDto.getEmail());
    }

    @PostMapping("/sendemail")
    public ResponseEntity<?> sendCode(@RequestBody UserRequest.EmailDto emailDto) throws Exception {
        return mailServices.sendCode(emailDto.getEmail());
    }

    @PostMapping("/findpassword")
    public ResponseEntity<?> findPassword(@RequestBody UserRequest.EmailDto emailDto) throws Exception {
        return mailServices.sendPassword(emailDto.getEmail());
    }

    @PutMapping("/pwmodify")
    public ResponseEntity<?> UpdateUserPassword(@RequestBody UserRequest.PWModifyDto pwModifyDto, Authentication authentication) throws Exception {
        return userServices.updateUserPassword(authentication.getName(), pwModifyDto.getPassword());
    }

    @PutMapping("/nickmodify")
    public ResponseEntity<?> UpdateUserNick(@RequestBody UserRequest.NickModifyDto nickModifyDto, Authentication authentication) throws Exception {
        return userServices.updateUserNick(authentication.getName(), nickModifyDto.getNickname());
    }

    @GetMapping("/userdetail")
    public ResponseEntity<?> UserDetailSend(Authentication authentication) throws Exception {
        return userServices.userdetailsend(authentication.getName());
    }

    @PostMapping("/withdrawal")
    public ResponseEntity<?> withdrawal(Authentication authentication) throws Exception {
        return userServices.withdrawal(authentication.getName());
    }
}
