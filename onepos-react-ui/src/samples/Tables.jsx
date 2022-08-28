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
import React,  { useState, useEffect } from "react";
import axios from 'axios';
import useAxios from "../hooks/useAxios";
const { http, setHeaders } = useAxios("");
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

function Tables() {
      let [kitchens, setkitchens] = useState([]);

      // 통신 메서드
      function searchApi() {
          const url = '/kitchens';
          axios.get(url)
          .then(function(response) {
            setkitchens(response.data);
              console.log("성공");
              console.log(response.data);
          })
          .catch(function(error) {
              console.log("실패");
          })

      }
      // 통신 메서드
      const statusApi = (kitchens) => {
        console.log(kitchens);
        console.log(kitchens.id);
        const url = '/kitchens/' + kitchens.id;
        axios.put(url , {
          id : kitchens.id,
          status : kitchens.status,
          nextStep : kitchens.nextStep
        })
        .then(function(response) {
            console.log("성공");
            searchApi();
            console.log(response.data);
        })
        .catch(function(error) {
            console.log("실패");
        })

    };
      useEffect(() => {
        searchApi();

      }, []);
      // 조회 데이터 존재할 경우

          // return (
          //   kitchens.map(kitchens => (
          //         (
          //             <div key={kitchens.id}>
          //                 <p>title : {kitchens.status}</p>
          //             </div>)
          //     ))
          // );



  return (
    <>

      <div className="content">
      <div>
                <button onClick={searchApi}> 불러오기 </button>
            </div>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Simple Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>메뉴명</th>
                      <th>조리상태</th>
                      <th>가격</th>
                      <th className="text-right">수량</th>
                      <th>상태변경</th>
                    </tr>
                  </thead>
                  <tbody>
                  {kitchens.map((kitchens, index) => (
                    <tr>
                    <td>{kitchens.orderItems.menuId}</td>
                    <td>{kitchens.status}</td>
                    <td>{kitchens.orderItems.price} 원 </td>
                    <td>{kitchens.orderItems.quantity}</td>
                    <td><button type ="submit" onClick={() => statusApi(kitchens)}>{kitchens.nextStep}</button></td>
                  </tr>
                  ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">Table on Plain Background</CardTitle>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Country</th>
                      <th>City</th>
                      <th className="text-right">Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Dakota Rice</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                      <td className="text-right">$36,738</td>
                    </tr>
                    <tr>
                      <td>Minerva Hooper</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                      <td className="text-right">$23,789</td>
                    </tr>
                    <tr>
                      <td>Sage Rodriguez</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                      <td className="text-right">$56,142</td>
                    </tr>
                    <tr>
                      <td>Philip Chaney</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                      <td className="text-right">$38,735</td>
                    </tr>
                    <tr>
                      <td>Doris Greene</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                      <td className="text-right">$63,542</td>
                    </tr>
                    <tr>
                      <td>Mason Porter</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                      <td className="text-right">$78,615</td>
                    </tr>
                    <tr>
                      <td>Jon Porter</td>
                      <td>Portugal</td>
                      <td>Gloucester</td>
                      <td className="text-right">$98,615</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Tables;
