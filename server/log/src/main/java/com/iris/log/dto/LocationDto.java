package com.iris.log.dto;

import lombok.*;

public class LocationDto
{
    @Builder
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class LevelDto {
        private String level1;
        private String level2;
        private String level3;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class LocXYDto {
        private String locX;
        private String locY;
    }
}
