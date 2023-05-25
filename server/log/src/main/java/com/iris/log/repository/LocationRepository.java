package com.iris.log.repository;

import com.iris.log.entity.LocationEntity;
import org.springframework.data.repository.CrudRepository;

public interface LocationRepository extends CrudRepository<LocationEntity, String>
{
    LocationEntity findTopByLevel1OrderByHangcodeAsc(String level1);
    LocationEntity findTopByLevel2OrderByHangcodeAsc(String level2);
    LocationEntity findTopByLevel3OrderByHangcodeAsc(String level3);
    LocationEntity findTopByLevel1AndLevel2OrderByHangcodeAsc(String level1, String level2);
    LocationEntity findTopByLevel2AndLevel3OrderByHangcodeAsc(String level2, String level3);
    LocationEntity findTopByLevel1AndLevel3OrderByHangcodeAsc(String level1, String level3);
    LocationEntity findTopByLevel1AndLevel2AndLevel3OrderByHangcodeAsc(String level1, String level2, String level3);
}
