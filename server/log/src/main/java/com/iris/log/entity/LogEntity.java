package com.iris.log.entity;


import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.persistence.*;

@Entity
@Setter
@Table(name="log")
public class LogEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int logNo;
    @Column(nullable = false)
    private String userEmail;
    @Column(nullable = false)
    private String command;
}
