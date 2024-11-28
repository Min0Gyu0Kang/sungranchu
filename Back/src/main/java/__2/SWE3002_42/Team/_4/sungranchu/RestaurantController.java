package __2.SWE3002_42.Team._4.sungranchu;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
public class RestaurantController {
    private final RestaurantRepository restaurantRepository;

    //시험용
    @GetMapping("/rrr")
    public String rrr(){
        return "rrr";
    }
    //시험용
    @PostMapping("/addRestaurant")
    public String addRestaurant(@RequestParam String name, @RequestParam Double lat, @RequestParam Double lng, @RequestParam String category) {
        Restaurant restaurant = new Restaurant();
        restaurant.setName(name);
        restaurant.setLat(lat);
        restaurant.setLng(lng);
        restaurant.setCategory(category);
        System.out.println(restaurant);
        restaurantRepository.save(restaurant);
        return "redirect:/rrr";
    }
}
