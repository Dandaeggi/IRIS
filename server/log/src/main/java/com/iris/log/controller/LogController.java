package com.iris.log.controller;

import com.iris.log.dto.LocationDto;
import com.iris.log.dto.LogDto;
import com.iris.log.service.LogService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class LogController
{
    private final LogService logService;

    public LogController(LogService logService)
    {
        this.logService = logService;
    }

    @PostMapping("/cmdLogging")
    public boolean insertCmdLog(@RequestBody LogDto.LogReceiveDto logReceiveDto, Authentication authentication)
    {
        log.info("log service : insertCmdLog 함수 실행");

        LogDto.LogInsertDto logInsertDto = LogDto.LogInsertDto.builder()
                .command(logReceiveDto.getCommand())
                .userEmail(authentication.getName())
                .build();

        return logService.insertLog(logInsertDto) != null;
    }

    @GetMapping("/getLocXY")
    public LocationDto.LocXYDto getLocXY(@RequestBody LocationDto.LevelDto levelDto)
    {
        log.info("log service : getLocXY 함수 실행");
        return logService.getLocXY(levelDto);
    }
}
