package onepos;
import java.util.*;

public class Ordered extends AbstractEvent {

    private int id;
    private OrderStatus status;
    OrderItem orderItems = new OrderItem();

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public OrderStatus getStatus() {
        return status;
    }
    public void setStatus(OrderStatus status) {
        this.status = status;
    }
    public OrderItem getOrderItems(){
        return orderItems;
    }
    public void setOrderItems(OrderItem orderItems){
        this.orderItems= orderItems;
    }
}