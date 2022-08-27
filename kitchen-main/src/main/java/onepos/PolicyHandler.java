package onepos;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import onepos.config.kafka.KafkaProcessor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PolicyHandler{
    @StreamListener(KafkaProcessor.INPUT)
    public void onStringEventListener(@Payload String eventString){

    }

    @Autowired
    KitchenRepository kitchenRepository;

    @StreamListener(KafkaProcessor.INPUT)
    public void wheneverShipped_UpdateStatus(@Payload Shipped shipped){

        if(shipped.isMe()){
            Optional<Kitchen> orderOptional = kitchenRepository.findById(shipped.getOrderId());
            Kitchen order = orderOptional.get();
            order.setStatus(shipped.getStatus());

            kitchenRepository.save(order);
            System.out.println("##### listener UpdateStatus : " + shipped.toJson());
        }
    }
    
    @StreamListener(KafkaProcessor.INPUT)
    public void wheneverShipped_UpdateStatusTest(@Payload Delivered delivered){

        if(delivered.isMe()){
            System.out.println("##### listener Delivered!!!!!!!!!!### : " + delivered.toJson());
        }
    }


    @StreamListener(KafkaProcessor.INPUT)
    public void wheneverReviewed_UpdateStatus(@Payload Reviewed reviewed){

        if(reviewed.isMe()){
            Optional<Kitchen> orderOptional = kitchenRepository.findById(reviewed.getId());
            Kitchen order = orderOptional.get();
            order.setStatus(reviewed.getStatus());

            kitchenRepository.save(order);
            System.out.println("##### listener UpdateStatus : " + reviewed.toJson());
        }
    }
    
    @StreamListener(KafkaProcessor.INPUT)
    public void wheneverOrderd(@Payload Ordered ordered){

        if(ordered.isMe()){
            System.out.println("##### listener UpdateStatus : " + ordered.toJson());
            System.out.println("##### listener UpdateStatus : " + ordered.getStatus());
            Kitchen order = new Kitchen();
            order.setOrderId(ordered.getId());
            if(ordered.getStatus().equals(OrderStatus.orderRequest)) {
            	System.out.println("주문요청");
            	order.setStatus("주문요청");
            	order.setNextStep("주문승인");
            }else {
            	System.out.println("확인불가");
            	order.setStatus("Request");
            	
            }
            
            order.setOrderItems(ordered.getOrderItems());
            kitchenRepository.save(order);
        }
    }


}