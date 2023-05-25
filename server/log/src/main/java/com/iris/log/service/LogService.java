package com.iris.log.service;

import com.iris.log.dto.LocationDto;
import com.iris.log.dto.LogDto;
import com.iris.log.entity.LogEntity;

public interface LogService {
    LogEntity insertLog(LogDto.LogInsertDto logInsertDto);
    LogDto.LogFindDto findLog(int logNo);
    LocationDto.LocXYDto getLocXY(LocationDto.LevelDto levelDto);
}
