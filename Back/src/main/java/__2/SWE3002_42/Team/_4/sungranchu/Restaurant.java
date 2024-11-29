package __2.SWE3002_42.Team._4.sungranchu;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    String name;
    Double lat;
    Double lng;
    String category;

    public Restaurant(String name, double lat, double lng, String category) {
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.category = category;
    }

    public Restaurant() {

    }
}
