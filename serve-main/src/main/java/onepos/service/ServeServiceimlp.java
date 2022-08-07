package onepos.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.retry.support.RetrySimulation.SleepSequence;
import org.springframework.stereotype.Service;

import onepos.domain.Serve;
import onepos.domain.ServeRepository;


@Service

public class ServeServiceimlp implements ServeService{

  @Autowired
  ServeRepository serveRepository;
  @Override
   //서빙목록 조회
  public List<Serve> getServeList() {
    return serveRepository.findAll();

  }

  //서빙 목록 생성 policy로 구현
  //서빙 단건 상세조회
  @Override
  public Optional<Serve> getServeDetail(int serveId) {
    return serveRepository.findById(serveId);
  }
  //서빙 로봇 서빙요청

  @Override
  public void requestServingStart(int serveId) {
    Optional<Serve> optional = serveRepository.findById(serveId);
    Serve serve = optional.get();
    serve.setStatus("ServingStart"); //ENUM으로 변경
    serveRepository.save(serve);

    try {
      Thread.sleep(10000);
    } catch (InterruptedException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }

    serve.setStatus("Finished"); //로봇 포장 기기 리턴 별도 ㅜㅜ ..
    serveRepository.save(serve);


  }
  //서빙 로봇 서빙완료 policy


  //포장 기기 시작요청
  @Override
  public void requestWrapStart(int serveId)  {
    Optional<Serve> optional = serveRepository.findById(serveId);
    Serve serve = optional.get();
    serve.setStatus("WrapStart"); //ENUM으로 변경
    serveRepository.save(serve);

    try {
      Thread.sleep(10000);
    } catch (InterruptedException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }

    serve.setStatus("Finished"); //로봇 포장 기기 리턴 별도 ㅜㅜ ..
    serveRepository.save(serve);



  }

  //포장 기기 포장 완료 Policy
  //서빙완료
  @Override
  public void finishedServeService(int serveId) {

  }

}
