package ru.vsu.Peredachka.data.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Entity
@Getter @Setter
@EqualsAndHashCode
@Table(name = "journey", schema = "public")
public class Journey extends AbstractEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double cost;
    private Integer maxOrderCount;

    @ManyToOne
    @JoinColumn(name = "ownerId")
    private User owner;

    @OneToMany(mappedBy = "journey")
    List<TravelPoint> travelPoints;

    @OneToMany(mappedBy = "journey")
    List<Order> orders;

    @OneToMany(mappedBy = "journey")
    List<JourneyCost> journeyCosts;
}