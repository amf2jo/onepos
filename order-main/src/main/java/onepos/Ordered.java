package onepos;
import java.util.*;

public class Ordered extends AbstractEvent {

    private Long id;
    private OrderStatus status;
    List<OrderItem> orderItems = new ArrayList<OrderItem>();

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
    public List<OrderItem> getOrderItems(){
        return orderItems;
    }
    public void setOrderItems(List<OrderItem> orderItems){
        this.orderItems= orderItems;
    }
}