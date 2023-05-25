package com.iris.log.service;

import com.iris.log.dto.LocationDto;
import com.iris.log.dto.LogDto;
import com.iris.log.entity.LocationEntity;
import com.iris.log.entity.LogEntity;
import com.iris.log.repository.LocationRepository;
import com.iris.log.repository.LogRepository;
import org.springframework.stereotype.Service;

@Service
public class LogServiceImpl implements LogService
{
    private final LogRepository logRepository;
    private final LocationRepository locationRepository;

    public LogServiceImpl(LogRepository logRepository, LocationRepository locationRepository)
    {
        this.logRepository = logRepository;
        this.locationRepository = locationRepository;
    }

    @Override
    public LogEntity insertLog(LogDto.LogInsertDto logInsertDto)
    {
        LogEntity logEntity = new LogEntity();
        logEntity.setCommand(logInsertDto.getCommand());
        logEntity.setUserEmail(logInsertDto.getUserEmail());
        return logRepository.save(logEntity);
    }

    @Override
    public LogDto.LogFindDto findLog(int logNo) {
        return null;
    }

    @Override
    public LocationDto.LocXYDto getLocXY(LocationDto.LevelDto levelDto)
    {
        String level1 = levelDto.getLevel1();
        String level2 = levelDto.getLevel2();
        String level3 = levelDto.getLevel3();
        LocationDto.LocXYDto locXYDto = new LocationDto.LocXYDto();
        LocationEntity locationEntity = new LocationEntity();

        // 1
        if (!level1.equals("") && level2.equals("") && level3.equals("")) {
            locationEntity = locationRepository.findTopByLevel1OrderByHangcodeAsc(level1);
        }

        // 2
        if (level1.equals("") && !level2.equals("") && level3.equals("")) {
            locationEntity = locationRepository.findTopByLevel2OrderByHangcodeAsc(level2);
        }

        // 3
        if (level1.equals("") && level2.equals("") && !level3.equals("")) {
            locationEntity = locationRepository.findTopByLevel3OrderByHangcodeAsc(level3);
        }

        // 1, 2
        if (!level1.equals("") && !level2.equals("") && level3.equals("")) {
            locationEntity = locationRepository.findTopByLevel1AndLevel2OrderByHangcodeAsc(level1, level2);
        }

        // 2, 3
        if (level1.equals("") && !level2.equals("") && !level3.equals("")) {
            locationEntity = locationRepository.findTopByLevel2AndLevel3OrderByHangcodeAsc(level2, level3);
        }

        // 1, 3
        if (!level1.equals("") && level2.equals("") && !level3.equals("")) {
            locationEntity = locationRepository.findTopByLevel1AndLevel3OrderByHangcodeAsc(level1, level3);
        }

        // 1, 2, 3,
        if (!level1.equals("") && !level2.equals("") && !level3.equals("")) {
            locationEntity = locationRepository.findTopByLevel1AndLevel2AndLevel3OrderByHangcodeAsc(level1, level2, level3);
        }

        if (locationEntity != null) {
            locXYDto.setLocX(locationEntity.getLoc_x());
            locXYDto.setLocY(locationEntity.getLoc_y());
        } else {
            locXYDto.setLocX("요청이 잘못되었거나 없는 데이터");
            locXYDto.setLocY("요청이 잘못되었거나 없는 데이터");
        }

        return locXYDto;
    }
}
