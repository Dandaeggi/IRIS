package com.iris.user.account.user.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Authority {

    USER("일반 사용자");

    private final String description;
}
