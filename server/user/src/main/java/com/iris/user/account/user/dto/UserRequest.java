package com.iris.user.account.user.dto;

import com.iris.user.account.auth.entity.TokenEntity;
import com.iris.user.account.user.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Email;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;


public class UserRequest {

    @Getter
    public static class SignUp {

        @NotBlank(message = "비밀번호를 입력해주세요")
        @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
        private String password;
        @NotBlank(message = "이메일을 입력해주세요")
        @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$", message = "이메일 형식이 올바르지 않습니다.")
        private String email;
        @NotBlank(message = "닉네임을 입력해주세요")
        @Pattern(regexp = "^[ㄱ-ㅎ가-힣A-Za-z0-9-_]{2,10}$", message = "닉네임은 특수문자를 제외한 2~10자리여야 합니다.")
        private String nickname;
        @NotBlank
        private String settings;

        public static UserEntity toEntity(UserRequest.SignUp signup, String password) {
            return UserEntity.builder()
                    .email(signup.getEmail())
                    .password(password)
                    .nickname(signup.getNickname())
                    .settings(signup.getSettings())
                    .build();
        };

        public UsernamePasswordAuthenticationToken toAuthentication() {
            return new UsernamePasswordAuthenticationToken(email, password);
        };
    };

    @Getter
    public static class Login {
        @NotBlank(message="이메일을 입력해주세요")
        private String email;

        @NotBlank(message="비밀번호를 입력해주세요")
        private String password;

        public UsernamePasswordAuthenticationToken toAuthentication() {
            return new UsernamePasswordAuthenticationToken(email, password);
        };
    };

    @Getter
    public static class UpdateUser {
        @NotBlank(message = "비밀번호를 입력해주세요")
        @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
        private String password;
        @NotBlank(message = "이메일을 입력해주세요")
        private String email;
        @NotBlank(message = "닉네임을 입력해주세요")
        @Pattern(regexp = "^[ㄱ-ㅎ가-힣A-Za-z0-9-_]{2,10}$", message = "닉네임은 특수문자를 제외한 2~10자리여야 합니다.")
        private String nickname;
        @NotBlank
        private String settings;

        public static UserEntity toEntity(UserRequest.UpdateUser updateUser, String password) {
            return UserEntity.builder()
                    .email(updateUser.getEmail())
                    .password(password)
                    .nickname(updateUser.getNickname())
                    .settings(updateUser.getSettings())
                    .build();
        }
    }

    @Getter
    public static class TokenSave {

        @NotBlank
        private String email;
        @NotBlank
        private String accessToken;
        @NotBlank
        private String refreshToken;

        public static TokenEntity toEntity(String email, String accessToken, String refreshToken) {
            return TokenEntity.builder()
                    .email(email)
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .build();
        }
    };

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class SaveSettingsDto {
        private String newSettings;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class EmailDto {
        @NotBlank(message = "이메일을 입력해주세요")
        @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$", message = "이메일 형식이 올바르지 않습니다.")
        private String email;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PasswordDto {
        @NotBlank(message = "비밀번호를 입력해주세요")
        @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
        private String password;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PWModifyDto {
        @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
        private String password;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class NickModifyDto {
        @Pattern(regexp = "^[ㄱ-ㅎ가-힣A-Za-z0-9-_]{2,10}$", message = "닉네임은 특수문자를 제외한 2~10자리여야 합니다.")
        private String nickname;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public class EmailCheck {
        private String email;
        private String code;
    }
}
