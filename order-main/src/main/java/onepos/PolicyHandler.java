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

    // 계산 완료되어 조리 중으로 넘어감
    @StreamListener(KafkaProcessor.INPUT)
    public void wheneverPaid(@Payload Paid paid){

         if(paid.isMe()){
            Optional<Order> orderOptional = orderRepository.findById(paid.getOrderId());
            Order order = orderOptional.get();
            order.setStatus(OrderStatus.cooking);

            orderRepository.save(order);
            System.out.println("##### listener order paid : " + paid.toJson());
        }
    }

    // 계산 취소되어 주문 취소됨
    @StreamListener(KafkaProcessor.INPUT)
    public void wheneverRefunded(@Payload Refunded refunded){

         if(refunded.isMe()){
            Optional<Order> orderOptional = orderRepository.findById(refunded.getOrderId());
            Order order = orderOptional.get();
            order.setStatus(OrderStatus.canceled);

            orderRepository.save(order);
            System.out.println("##### listener order refunded : " + refunded.toJson());
        }
    }

    // 조리실에서 조리 취소됨
    @StreamListener(KafkaProcessor.INPUT)
    public void wheneverCanceled(@Payload OrderCancelled orderCancelled){

         if(orderCancelled.isMe()){
            Optional<Order> orderOptional = orderRepository.findById(orderCancelled.getId());
            Order order = orderOptional.get();
            order.setStatus(OrderStatus.canceled);

            orderRepository.save(order);
            System.out.println("##### listener order canceled : " + orderCancelled.toJson());
        }
    }


}
