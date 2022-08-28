import React, { useEffect, useState, useCallback } from 'react';
import {
  Button,
  Row,
  Col,

  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { trim } from 'lodash-es';

const bankList = [
  {bankName : '대한은행', bankCode : '001'},
  {bankName : '민국은행', bankCode : '002'},
  {bankName : '이지뱅크', bankCode : '003'},
  {bankName : '뮤직뱅크', bankCode : '004'},
];

const BankAccount = ({authUser, setOpenBank}) => {
  const [account, setAccount] = useState({
    holderName : '', birth : '', bankCode : '001', accountNumber : ''
  });
  const closeModal = () => {
    setOpenBank(false);
  }
  const confirmAccount = () => {
    alert("TBD...");
    closeModal()
  }

  return (
  <>
    <Modal className="eztalk_modal" isOpen="true" unmountOnClose={false}>
      <ModalHeader toggle={closeModal}>
        계좌 인증
      </ModalHeader>
      <ModalBody>
        <br />
        <Row>
          <Col md="5">
            <fieldset className="form-group">
              <label>이름</label>
              <input
                type="text"
                name="holderName"
                className="form-control form-control-lg"
                placeholder="예금주명"
                value={account.holderName || ""}
                onChange={(e) => { setAccount( {...account, holderName : e.target.value } )} }
              />
            </fieldset>  
          </Col>
          <Col md="7">
            <fieldset className="form-group">
              <label>생년월일</label>
              <input
                type="number"
                name="birth"
                className="form-control form-control-lg"
                placeholder="yymmdd"
                size={6}
                value={account.birth || ""}
                onChange={(e) => { setAccount( {...account, birth : e.target.value } )} }
              />
            </fieldset>  
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <fieldset className="form-group">
              <label>은행</label>
              <select className="form-control form-control-lg eztalk-select" 
                      value={account.bankCode}
                      onChange={(e) => { setAccount( {...account, bankCode : e.target.value } )} }
                      >
                <option value="">--- 은행 선택 ---</option>
                {bankList.map((bank, key) => {
                    return (
                      <option value={bank.bankCode} key={key}>
                        [{bank.bankCode}] {bank.bankName}
                      </option>
                      )
                    })
                  }
              </select>
            </fieldset>  
             
          </Col>
          <Col md="7">
            <fieldset className="form-group">
              <label>계좌번호</label>
              <input
                type="number"
                name="birth"
                className="form-control form-control-lg"
                placeholder=""
                size={20}
                value={account.accountNumber || ""}
                onChange={(e) => { setAccount( {...account, accountNumber : e.target.value } )} }
              />
            </fieldset>  
          </Col>                    
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button onClick={confirmAccount}
                color="primary"> 
          확인 </Button> 
        <Button onClick={closeModal}>
          취소
        </Button>
    </ModalFooter>
    </Modal> 
  </>
  );  
}

export default BankAccount;
