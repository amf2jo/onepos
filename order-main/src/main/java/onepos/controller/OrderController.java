package onepos.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;


import lombok.RequiredArgsConstructor;
import onepos.data.CommonRespDto;
import onepos.service.MenuService;


@RequiredArgsConstructor
@RestController
public class OrderController {


	private final OrderService menuService;

	@PostMapping("/orders/{storeId}/{tableId}") // N건 조회 . 매장ID로 조회
	public CommonRespDto<?> findAll(@PathVariable int storeId, @PathVariable int tableId){

		return new CommonRespDto<>(1,"성공",menuService.메뉴조회(id));
	}





}
