/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

function Home() {
  return (
    <>
      <div className="content">
        <Row>
          <Card color="warning">
            <CardHeader>
              <CardTitle tag="h5">이 편한 Talk & Pay 세상 !! </CardTitle>
              <CardTitle tag="h6">EZTalk은 ...
              <p>기존의 오픈톡, 카페 등과 다르게 회원관리, 채팅, 통장 관리를 통합적으로 관리하는 차별화된 아파트 재건축 커뮤니티 전용 플랫폼입니다. 
              </p>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <p> 아파트 재건축 사업을 추진하고자 하는 회원들의 편의를 위한 채팅 및 뱅킹 기능을 제공하여 <br />
              EZTalk을 통하여 같은 목적을 가진 회원들 간에 편리한 소통이 가능하며, <br /> 
              커뮤니티 회원간 간편한 송금 및 통장 내역 조회 기능을 제공하여 투명한 회계 관리를 할 수 있습니다.
              </p>
            </CardBody>
          </Card>
        </Row>
        <hr />
        <Row><p className="">이 시스템을 개발한 h.e.a 팀을 소개합니다. 😀
          </p>
        </Row>
        <Row>
          <Col >
            <Card className="card-user">
              <div className="image">
                <img
                  alt="..."
                  src="img/bg1.png"
                />
              </div>
              <CardBody>
                <div className="author">
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src="img/noname-user.png"
                    />
                    <h5 className="title">Steven</h5>
                  </a>
                  <p className="eztalk_profile">@chetfaker</p>
                </div>
                <p className="eztalk_profile text-center">
                  "I like the way you work it <br />
                  No diggity <br />I wanna bag it up"
                </p>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="button-container">
                  <Row>
                    <h5>
                        Scrum Master
                    </h5>

                  </Row>
                </div>
              </CardFooter>
            </Card>
          </Col>  
 
          <Col>
            <Card className="card-user">
              <div className="image">
                <img
                  alt="..."
                  src="img/bg2.png"
                />
              </div>
              <CardBody>
                <div className="author">
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src="img/noname-user.png"
                    />
                    <h5 className="title">Stella</h5>
                  </a>
                  <p className="eztalk_profile">@Stella</p>
                </div>
                <p className="eztalk_profile text-center">
                  "git 연결연결 <br />
                  No diggity <br />I wanna bag it up"
                </p>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="button-container">
                  <Row>
                    <h5>
                        Speaker
                    </h5>
                   </Row>
                </div>
              </CardFooter>
            </Card>
          </Col>  

          <Col>
            <Card className="card-user">
              <div className="image">
                <img
                  alt="..."
                  src="img/bg3.png"
                />
              </div>
              <CardBody>
                <div className="author">
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src="img/noname-user.png"
                    />
                    <h5 className="title">Sunny</h5>
                  </a>
                  <p className="eztalk_profile">@chetfaker</p>
                </div>
                <p className="eztalk_profile text-center">
                  "I like the way you work it <br />
                  No diggity <br />I wanna bag it up"
                </p>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="button-container">
                  <Row>
                    <h5>
                        Writer
                    </h5>

                  </Row>
                </div>
              </CardFooter>
            </Card>
          </Col> 

          <Col>
            <Card className="card-user">
              <div className="image">
                <img
                  alt="..."
                  src="img/bg4.png"
                />
              </div>
              <CardBody>
                <div className="author">
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src="img/noname-user.png"
                    />
                    <h5 className="title">Curry</h5>
                  </a>
                  <p className="eztalk_profile">@chetfaker</p>
                </div>
                <p className="eztalk_profile text-center">
                  "I like the way you work it <br />
                  No diggity <br />I wanna bag it up"
                </p>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="button-container">
                  <Row>
                    <h5>
                        Action Captain
                    </h5>

                  </Row>
                </div>
              </CardFooter>
            </Card>
          </Col>  

          <Col>
            <Card className="card-user">
              <div className="image">
                <img
                  alt="..."
                  src="img/bg5.png"
                />
              </div>
              <CardBody>
                <div className="author">
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src="img/magaretjo-voila.png"
                    />
                    <h5 className="title">Magaret</h5>
                  </a>
                  <p className="eztalk_profile">
                    magaret@sk.com<br/>
                    조은숙
                  </p>
                  
                </div>
                <p className="eztalk_profile text-center">
                  배워서 남주자 !
                  <br />ㅎㅎㅎ
                </p>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="button-container">
                  <Row>
                      <h5>
                        Product Owner
                      </h5>
                    </Row>
                </div>
              </CardFooter>
            </Card>
           </Col>
        </Row>
      </div>
    </>
  );
}

export default Home;
