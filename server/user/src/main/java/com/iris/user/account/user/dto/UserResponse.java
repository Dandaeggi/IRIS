package com.iris.user.account.user.dto;

import com.iris.user.account.auth.entity.TokenEntity;
import com.iris.user.account.auth.jwt.JwtProvider;
import lombok.Builder;
import lombok.Getter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;

import javax.validation.constraints.NotEmpty;

public class UserResponse {

    private JwtProvider jwtProvider;
    private UserDetails userDetails;

    @Getter
    @Builder
    public static class TokenDto {

        @NotEmpty
        private String type;
        @NotEmpty
        private String accessToken;
        @NotEmpty
        private String refreshToken;
        @NotEmpty
        private Long refreshTokenExpirationTime;
    };

    @Getter
    @Builder
    public static class LoginSuccessDto {

        @NotEmpty
        private TokenDto tokenDto;
        @NotEmpty
        private String settings;
        @NotEmpty
        private String email;
    };
    @Getter
    @Builder
    public static class UserDetailsDto {
        @NotEmpty
        private String email;
        @NotEmpty
        private String nickname;
        @NotEmpty
        private String settings;
    }
}
