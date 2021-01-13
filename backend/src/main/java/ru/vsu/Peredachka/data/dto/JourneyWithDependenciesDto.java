package ru.vsu.Peredachka.data.dto;

import lombok.*;
import ru.vsu.Peredachka.data.entity.Order;
import ru.vsu.Peredachka.data.entity.TravelPoint;
import ru.vsu.Peredachka.data.entity.User;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class JourneyWithDependenciesDto {
    private Long id;
    private LocalDate dispatchDate;
    private LocalDate arrivalDate;
    private Double cost;

    private UserDto owner;

    List<TravelPointDto> travelPoints;

    List<OrderDto> orders;
}
