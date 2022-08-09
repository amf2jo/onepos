package onepos;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Integer>{

    Optional<Order> findById(Integer itemNo);
}
