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
    // @StreamListener(KafkaProcessor.INPUT)
    // public void onStringEventListener(@Payload String eventString){

    // }

    @Autowired
    saleRepository SaleRepository ;



    @StreamListener(KafkaProcessor.INPUT)  //Test . 서빙 완료시 저장되도록 변경 
    public void whenOrderCreated(@Payload Ordered ordered){


        /*아래 kafka 내부 오류 발생하여 저장이 되지 않음. 저장 test 를 위해 try ~catch 주석처리 .  */
        //o.s.kafka.listener.LoggingErrorHandler   : Error while processing: ConsumerRecord
        // try {
                System.out.println("##### listener UpdateStatus: " + ordered.toJson());

                Sale sale = new Sale();
                sale.setOrderNumber(ordered.getQty()); // MSA 간 전달 파리미터/유형 협의 필요!!!!!!!!!!. Test 를 위해 임의값 대신 저장/
                sale.setStoreId(1111);
                sale.setStoreName(ordered.getProductId());
                sale.setSaleMenuId (1234);
                sale.setSaleAmt("1234");
                sale.setSaleQty(ordered.getQty());
                SaleRepository.save(sale);
            // }catch (Exception e){
            //     e.printStackTrace();
            // } 

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
