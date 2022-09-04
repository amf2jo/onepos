package onepos.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.RequiredArgsConstructor;
import main.java.onepos.service.OrderService;
import onepos.OrderItem;


@RequiredArgsConstructor
@RestController
public class OrderController {

	OrderService orderService;

	@PostMapping("/orders/{storeId}/{tableId}") // 주문
	public String order(@PathVariable int storeId, @PathVariable int tableId, @RequestBody OrderItem orderItem)
	{
		orderService.createNewOrder(storeId, tableId, orderItem);
		System.out.println(("OrderItem = "+orderItem.toString()));
		return "OK";
	}



}
