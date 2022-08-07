package onepos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.esotericsoftware.kryo.serializers.FieldSerializer.Optional;

import onepos.service.ServeService;
import onepos.service.ServeServiceimlp;
import onepos.domain.Serve;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;




 @RestController
//  @RequestMapping("/serves")
 public class ServeController {

    ServeService serveService;

    @Autowired
    public ServeController(ServeService serveService){
      this.serveService = serveService;
    }

    //서빙목록 조회
    @GetMapping("/serves/lists")
    public List<Serve> getServeList() {
      return serveService.getServeList();
    }

    //서빙 단건 상세조회
    @GetMapping("/serves/lists/{serveId}")
    public  java.util.Optional<Serve> getServeDetail(@PathVariable("serveId") int serveId) {
      return serveService.getServeDetail(serveId);
    }


    // //서빙 로봇 서빙요청
    // @PatchMapping("/lists/{serveId}")
    // void requestServingStart(int serveId);
    // public







 }
