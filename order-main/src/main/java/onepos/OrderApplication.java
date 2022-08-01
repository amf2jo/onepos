package onepos;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import onepos.config.kafka.KafkaProcessor;

import org.springframework.cloud.stream.annotation.EnableBinding;

@SpringBootApplication
@EnableBinding(KafkaProcessor.class)
public class OrderApplication {
    protected static ApplicationContext applicationContext;
    public static void main(String[] args) {
        applicationContext = SpringApplication.run(OrderApplication.class, args);
    }
}
