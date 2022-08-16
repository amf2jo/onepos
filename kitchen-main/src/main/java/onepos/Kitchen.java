package onepos;

import javax.persistence.*;

import com.esotericsoftware.kryo.util.IntArray;
import org.springframework.beans.BeanUtils;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name="Kitchen_table")
public class Kitchen {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id; 
    private int orderId;
    private String status;
    private OrderStatus orderStatus;
    @Embedded
    OrderItem orderItems = new OrderItem();

    @PostPersist
    public void onPostPersist(){
        Kitchen kitchen = new Kitchen();
        System.out.println("kitechen " + kitchen);
        System.out.println("kitechen " + kitchen.toString());

        kitchen.setStatus(kitchen.getStatus());
        System.out.println("##### Status chk : " + status);

        if (Objects.equals(status, "Order")) {

            Ordered ordered = new Ordered();
            BeanUtils.copyProperties(this, ordered);
            ordered.publishAfterCommit();

            System.out.println("##### Status chk : " + status);
            Delivered delivered = new Delivered();
            delivered.publishAfterCommit();
        }
        if (Objects.equals(status, "Return")){
            Returned returned = new Returned();
            BeanUtils.copyProperties(this, returned);
            returned.publishAfterCommit();
        }
        //조리시작
        if (Objects.equals(status, "Start")){
            Started started = new Started();
            BeanUtils.copyProperties(this, started);
            started.publishAfterCommit();
        }
        //조리중
        if (Objects.equals(status, "Cooking")){
        	Cooking cooking = new Cooking();
            BeanUtils.copyProperties(this, cooking);
            cooking.publishAfterCommit();
        }
        //조리완료
        if (Objects.equals(status, "Cooked")){
        	Cooked cooked = new Cooked();
            BeanUtils.copyProperties(this, cooked);
            cooked.publishAfterCommit();
        }
        //조리취소
        if (Objects.equals(status,"Canceled")){
        	Canceled canceled = new Canceled();
            BeanUtils.copyProperties(this, canceled);
            canceled.publishAfterCommit();
        }
    }

    /* 서킷브레이크 테스트 시 주석 해제할 것
    @PostUpdate
    public void onPostUpdate(){
        System.out.println("################# Order Status Updated and Update Event raised..!!");
        OrdereCancelled ordereCancelled = new OrdereCancelled();
        BeanUtils.copyProperties(this, ordereCancelled);
        ordereCancelled.publishAfterCommit();

        //Following code causes dependency to external APIs
        // it is NOT A GOOD PRACTICE. instead, Event-Policy mapping is recommended.

        clothrental.external.Cancellation cancellation = new clothrental.external.Cancellation();
        // mappings goes here
        // 아래 this는 Order 어그리게이트
        cancellation.setOrderId(this.getId());
        cancellation.setStatus("Delivery Cancelled");
        OrderApplication.applicationContext.getBean(clothrental.external.CancellationService.class)
                .cancelship(cancellation);

    }
*/
    @PreRemove
    public void onPreRemove(){
        KitchenCancelled ordereCancelled = new KitchenCancelled();
        BeanUtils.copyProperties(this, ordereCancelled);
        ordereCancelled.publishAfterCommit();

        //Following code causes dependency to external APIs
        // it is NOT A GOOD PRACTICE. instead, Event-Policy mapping is recommended.

        onepos.external.Cancellation cancellation = new onepos.external.Cancellation();
        // mappings goes here
        // 아래 this는 Order 어그리게이트
        cancellation.setOrderId(this.getId());
        cancellation.setStatus("Delivery Cancelled");
        KitchenApplication.applicationContext.getBean(onepos.external.CancellationService.class)
            .cancelship(cancellation);


    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

	public int getOrderId() {
		return orderId;
	}

	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}

	public OrderStatus getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(OrderStatus orderStatus) {
		this.orderStatus = orderStatus;
	}
	 public OrderItem getOrderItems() {
	        return orderItems;
	    }
	    public void setOrderItems(OrderItem orderItems) {
	        this.orderItems = orderItems;
	    }




}
