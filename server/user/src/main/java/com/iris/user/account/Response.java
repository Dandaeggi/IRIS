package com.iris.user.account;

import com.iris.user.account.user.dto.UserResponse;
import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Map;

@Slf4j
@Builder
@Component
public class Response {

    @Getter
    @Builder
    private static class Body {
        private int state;
        private String result;
        private String message;
        private Object data;
        private Object error;
    }

    public ResponseEntity<?> success(String message, HttpStatus status) {

        log.info("이건 되니");
        Body body = Body.builder()
                .state(status.value())
                .result("success")
                .message(message)
                .data(Collections.emptyList())
                .build();
        return ResponseEntity.ok(body);
    };

    public ResponseEntity<?> success(String data, String message, HttpStatus status) {

        log.info("이건 되니");
        Body body = Body.builder()
                .state(status.value())
                .result("success")
                .message(message)
                .data(data)
                .build();
        return ResponseEntity.ok(body);
    };

//    public ResponseEntity<?> success(Map<String, ?> data, String message, HttpStatus status) {
//        Body body = Body.builder()
//                .state(status.value())
//                .result("success")
//                .message(message)
//                .data(data)
//                .build();
//        return ResponseEntity.ok(body);
//    };

    public ResponseEntity<?> success(UserResponse.LoginSuccessDto data, String message, HttpStatus status) {
        Body body = Body.builder()
                .state(status.value())
                .result("success")
                .message(message)
                .data(data)
                .build();
        return ResponseEntity.ok(body);
    };

    public ResponseEntity<?> success(UserResponse.UserDetailsDto data, String message, HttpStatus status) {
        Body body = Body.builder()
                .state(status.value())
                .result("success")
                .message(message)
                .data(data)
                .build();
        return ResponseEntity.ok(body);
    };

    public ResponseEntity<?> fail(String message, HttpStatus status) {
        Body body = Body.builder()
                .state(status.value())
                .result("fail")
                .message(message)
                .data(Collections.emptyList())
                .build();
        return ResponseEntity.ok(body);
    }
    public static Body reissue() {
        return Body.builder()
                .state(HttpStatus.UNAUTHORIZED.value())
                .message("토큰 만료")
                .error("TOKEN-0001")
                .build();
    }
}
