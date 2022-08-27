package onepos;

import java.util.List;
import java.util.Optional;

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
	public List<Kitchen> findAll(){
		return  kitchenRepository.findAll();
	}

	public List<Kitchen> updateById(int id, KitchenDto requestDto) {
		 List<Kitchen> kitchenList = kitchenRepository.findById(id);
		 for(Kitchen kitchen : kitchenList) {
			 kitchen.setStatus(requestDto.getNextStep());
		 }
		 System.out.println(kitchenList);
		 

		 return kitchenRepository.saveAll(kitchenList);
	}
}
