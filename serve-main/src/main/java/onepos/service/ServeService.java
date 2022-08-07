package onepos.service;

import java.util.List;
import java.util.Optional;

import org.bouncycastle.crypto.ec.ECElGamalDecryptor;

import onepos.domain.Serve;

public interface ServeService {

  //서빙목록 조회
  List<Serve> getServeList();

  //서빙 목록 생성 policy로 구현
  //서빙 단건 상세조회
  Optional<Serve> getServeDetail(int serveId);
  //서빙 로봇 서빙요청
  void requestServingStart(int serveId);
  //서빙 로봇 서빙완료 policy


  //포장 기기 시작요청
  void requestWrapStart(int serveId);
  //포장 기기 포장 완료 Policy
  //서빙완료
  void finishedServeService(int serveId);

  //배달 기사 앱 호출 로직..




}
