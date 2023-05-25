package com.iris.log.repository;

import com.iris.log.entity.LogEntity;
import org.springframework.data.repository.CrudRepository;

public interface LogRepository extends CrudRepository<LogEntity,Integer> {

    @Override
    LogEntity save(LogEntity entity);


    //select * from log where log_no = logNo
    LogEntity findByLogNo(int logNo);
}
