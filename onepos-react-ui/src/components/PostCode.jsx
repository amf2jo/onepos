import React, { useEffect, useState, useCallback } from 'react';
import DaumPostcode from 'react-daum-postcode';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

const Postcode = ({changeAddress, setAddressFocus, setOpenPost}) => {

  // const [address, setAddress] = useState(''); // 주소
  // const [addressDetail, setAddressDetail] = useState(''); // 상세주소

  
  // const [isOpenPost, setIsOpenPost] = useState(openPost);


  // const onChangeOpenPost = () => {
  //   setIsOpenPost(!isOpenPost);
  // };

  /** return data
address: "서울 노원구 동일로215길 48"
addressEnglish: "48, Dongil-ro 215-gil, Nowon-gu, Seoul, Korea"
addressType: "R"
apartment: "Y"
autoJibunAddress: "서울 노원구 상계동 737"
autoJibunAddressEnglish: "737, Sanggye-dong, Nowon-gu, Seoul, Korea"
autoRoadAddress: ""
autoRoadAddressEnglish: ""
bcode: "1135010500"
bname: "상계동"
bname1: ""
bname1English: ""
bname2: "상계동"
bname2English: "Sanggye-dong"
bnameEnglish: "Sanggye-dong"
buildingCode: "1135010500107370000000920"
buildingName: "상계주공3단지아파트"
hname: ""
jibunAddress: ""
jibunAddressEnglish: ""
noSelected: "N"
postcode: ""
postcode1: ""
postcode2: ""
postcodeSeq: ""
query: "동일로215길 48"
roadAddress: "서울 노원구 동일로215길 48"
roadAddressEnglish: "48, Dongil-ro 215-gil, Nowon-gu, Seoul, Korea"
roadname: "동일로215길"
roadnameCode: "4130208"
roadnameEnglish: "Dongil-ro 215-gil"
sido: "서울"
sidoEnglish: "Seoul"
sigungu: "노원구"
sigunguCode: "11350"
sigunguEnglish: "Nowon-gu"
userLanguageType: "K"
userSelectedType: "R"
zonecode: "01761"
   */
  const onCompletePost = useCallback((data) => {
    let fullAddr = data.address;
    let extraAddr = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddr += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
    }

    // console.log(data);
    const newAddr = {
      zipcode: data.zonecode,
      street : fullAddr,
      extra : ''
    }

    changeAddress(data.zonecode, fullAddr, '');
    closeModal();
    
    setAddressFocus();
  
  }, []);

  const clearAddress= () => {
    changeAddress('','','');
    closeModal();
  }

  const closeModal = () => {
    setOpenPost(false);
  }

  const postCodeStyle =  {
    display: 'block',
    position: 'relative',
    top: '0%',
    width: '400px',
    height: '400px',
    padding: '7px',
  };

 
  return (
    <>
      <Modal className="eztalk_modal" isOpen="true" size="lg" unmountOnClose={false}>
        <ModalHeader toggle={closeModal}>
          우편번호 검색
        </ModalHeader>
        <ModalBody>
          <DaumPostcode style={postCodeStyle} onComplete={onCompletePost } />
        </ModalBody>
        <ModalFooter>
          <Button onClick={clearAddress}
                  color="primary"> 
            Clear </Button> 
          <Button onClick={closeModal}>
            Cancel
          </Button>
      </ModalFooter>
      </Modal> 
    </>
  );
};

export default Postcode;
