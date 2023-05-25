package com.iris.user.account.user.service;

import com.iris.user.account.user.entity.UserEntity;
import com.iris.user.account.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService{

    private final UserRepository usersRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usersRepository.findByEmail(username)
                .map(this::createUserDetail)
                .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));
    }

    private UserDetails createUserDetail(UserEntity users) {
        return new User(users.getEmail(), users.getPassword(), users.getAuthorities());
    }
}
