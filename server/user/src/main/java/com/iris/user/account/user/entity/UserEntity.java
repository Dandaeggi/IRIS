package com.iris.user.account.user.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
//@AttributeOverride(name = "no", column = @Column(name = "user_no"))
public class UserEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String nickname;
    @Column(nullable = false, length=10000)
    private String settings;
    @Column
    @Builder.Default
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    public String getEmail() {
        return email;
    }
    public String getNickname() {
        return nickname;
    }
    public String getSettings() { return settings; }


    public void makeNewUser(String email, String password, String nickname, String settings) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.settings = settings;
    }

    public void updateUser(String email, String password, String nickname, String settings) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.settings = settings;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }

}
