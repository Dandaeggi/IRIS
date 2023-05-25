package com.iris.user.account.user.repository;

import com.iris.user.account.auth.entity.TokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<TokenEntity, Long> {

    Optional<TokenEntity> findByEmail(String email);
}
