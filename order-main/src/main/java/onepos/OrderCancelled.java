package onepos;
import java.util.*;

public class OrderCancelled extends AbstractEvent {

    private Long id;
    private OrderStatus status;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public OrderStatus getStatus() {
        return status;
    }
    public void setStatus(OrderStatus status) {
        this.status = status;
    }
}