package onepos;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="Order_table")
public class Order {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    private int storeId; 
    private int tableNo;
    private OrderStatus status;

    @ElementCollection
    @CollectionTable(
        name = "ORDER_ITEM",
        joinColumns = @JoinColumn(name="id")
    )
    List<OrderItem> orderItems = new ArrayList<OrderItem>();

    // 주문했을 때 
    @PostPersist
    public void onPostPersist(){
        Ordered ordered = new Ordered();
        ordered.setId(this.getId());
        ordered.setOrderItems(this.getOrderItems());
        ordered.setStatus(this.getStatus());
        // ordered.publishAfterCommit(); -- kafka 발행
    }

    //손님이 주문취소했을 때
    @PostUpdate
    public void onPostUpdate(){
        OrderCancelled ordercancelled = new OrderCancelled();
        ordercancelled.setId(this.getId());
        ordercancelled.setStatus(this.getStatus());
        //ordercancelled.publishAfterCommit();
    }

    public long getId(){
        return id;
    }
    public List<OrderItem> getOrderItems() {
        return orderItems;
    }
    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }
    public int getTableNo() {
        return tableNo;
    }
    public void setTableNo(int tableNo) {
        this.tableNo = tableNo;
    }
    public int getStoreId() {
        return storeId;
    }
    public void setStoreId(int storeId) {
        this.storeId = storeId;
    }
    public OrderStatus getStatus() {
        return status;
    }
    public void setStatus(OrderStatus status) {
        this.status = status;
    }

}