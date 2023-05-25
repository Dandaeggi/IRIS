package com.iris.log.dto;


import lombok.*;

import java.time.LocalDateTime;

public class LogDto {

    @Builder
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class LogReceiveDto {
        private String command;
    }

    @Builder
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class LogInsertDto {
        private String userEmail;
        private String command;
    }

    @Builder
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class LogFindDto {
        private int logNo;
        private String userEmail;
        private String command;
        private LocalDateTime registTime;
    }
}
