package com.iris.log.auth.dto;

import com.iris.log.auth.entity.TokenEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import javax.validation.constraints.NotEmpty;


public class UserRequest {

    @Getter
    public static class TokenSave {

        @NotEmpty
        private String email;
        @NotEmpty
        private String accessToken;
        @NotEmpty
        private String refreshToken;

        public static TokenEntity toEntity(String email, String accessToken, String refreshToken) {
            return TokenEntity.builder()
                    .email(email)
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .build();
        }
    };
}
