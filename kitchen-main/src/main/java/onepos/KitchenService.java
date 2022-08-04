package onepos;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class KitchenService {
	private final KitchenRepository kitchenRepository;
	
	public List<Kitchen> findByOrderId(int orderId){
		return  kitchenRepository.findByOrderId(orderId);
	}

	@Transactional
	public List<Kitchen> updateByOrderId(int orderId, KitchenDto requestDto) {
		 List<Kitchen> kitchenList = kitchenRepository.findByOrderId(orderId);
		 for(Kitchen kitchen : kitchenList) {
			 kitchen.setStatus(requestDto.getStatus());
		 }
		 System.out.println(kitchenList);
		 

		return kitchenRepository.saveAll(kitchenList);
	}
	
}
