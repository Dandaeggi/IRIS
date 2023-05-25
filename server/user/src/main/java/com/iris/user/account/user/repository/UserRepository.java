package com.iris.user.account.user.repository;

import com.iris.user.account.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {


    Optional<UserEntity> findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByNickname(String nickname);

}
