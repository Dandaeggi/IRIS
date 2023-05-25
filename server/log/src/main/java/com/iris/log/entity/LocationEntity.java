package com.iris.log.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name="location")
public class LocationEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String hangcode;

    @Column(nullable = false)
    private String level1;

    @Column(nullable = false)
    private String level2;

    @Column(nullable = false)
    private String level3;

    @Column(nullable = false)
    private String loc_x;

    @Column(nullable = false)
    private String loc_y;
}
