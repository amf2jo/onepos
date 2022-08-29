package onepos;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import onepos.config.kafka.KafkaProcessor;
import onepos.data.Sale;
import onepos.data.saleRepository;
import onepos.data.menuRepository;
import onepos.datakafka.Ordered;
import onepos.datakafka.Paid;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import java.util.Optional;

@Service
public class PolicyHandler{


    /*이벤트 발생시간을 String 변환 저장시 사용*/
    final LocalDateTime localDateTimeNow = LocalDateTime.now();
    String parsedLocalDateTimeNow = localDateTimeNow.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));



    @Autowired
    saleRepository SaleRepository ;
    menuRepository MenuRepository ;


    @StreamListener(KafkaProcessor.INPUT)
    public void whenOrderCreated(@Payload Paid paid){
//  메뉴수량 차감. 모든 이벤트 넣기

                System.out.println("##### listener UpdateStatus: " + paid.toJson());


            if(paid.getPayStatus().equals("PaySucess")){
                Sale sale = new Sale();
                sale.setOrderNumber(paid.getOrderId()); // MSA 간 전달 파리미터/유형 협의 필요!!!!!!!!!!. Test 를 위해 임의값 대신 저장/
                sale.setSaleAmt(paid.getPrice());
                sale.setStoreId(paid.getStoreId());
                sale.setSaleDtm(LocalDateTime.now());
              //  sale.setSaleMenuId(paid.getMenuId());
              //  sale.setSaleMenuNm(paid.getMenuNm())
              //  sale.setSaleQty(paid.getQty());
                SaleRepository.save(sale);
            }

    }

    // @StreamListener(KafkaProcessor.INPUT)
    // public void wheneverShipped_UpdateStatusTest(@Payload Delivered delivered){

    //     if(delivered.isMe()){
    //         System.out.println("##### listener Delivered!!!!!!!!!!### : " + delivered.toJson());
    //     }
    // }


    // @StreamListener(KafkaProcessor.INPUT)
    // public void wheneverReviewed_UpdateStatus(@Payload Reviewed reviewed){

    //     if(reviewed.isMe()){
    //         Optional<Kitchen> orderOptional = kitchenRepository.findById(reviewed.getId());
    //         Kitchen order = orderOptional.get();
    //         order.setStatus(reviewed.getStatus());

    //         kitchenRepository.save(order);
    //         System.out.println("##### listener UpdateStatus : " + reviewed.toJson());
    //     }
    // }

}
