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
    OrderRepository orderRepository;

    @StreamListener(KafkaProcessor.INPUT)
    public void wheneverPaid(@Payload Paid paid){

         if(paid.isMe()){
            Optional<Order> orderOptional = orderRepository.findById(paid.getOrderId());
            Order order = orderOptional.get();
            order.setStatus(OrderStatus.조리중);

            orderRepository.save(order);
            System.out.println("##### listener order paid : " + paid.toJson());
        }
    }
    
    @StreamListener(KafkaProcessor.INPUT)
    public void wheneverRefunded(@Payload Refunded refunded){

         if(refunded.isMe()){
            Optional<Order> orderOptional = orderRepository.findById(refunded.getOrderId());
            Order order = orderOptional.get();
            order.setStatus(OrderStatus.주문취소됨);

            orderRepository.save(order);
            System.out.println("##### listener order refunded : " + refunded.toJson());
        }
    }
    
    // @StreamListener(KafkaProcessor.INPUT)
    // public void whenever(@Payload Refunded refunded){

    //      if(refunded.isMe()){
    //         Optional<Order> orderOptional = orderRepository.findById(refunded.getOrderId());
    //         Order order = orderOptional.get();
    //         order.setStatus(OrderStatus.주문취소됨);

    //         orderRepository.save(order);
    //         System.out.println("##### listener order refunded : " + refunded.toJson());
    //     }
    // }
    

}
