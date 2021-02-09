package ru.vsu.Peredachka.data.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.vsu.Peredachka.data.dto.journey.JourneyDto;
import ru.vsu.Peredachka.data.entity.OrderSize;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JourneyCostDto {
    private Long id;
    private OrderSizeDto orderSize;
    private Double cost;

}
