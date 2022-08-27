import React, { useState, useEffect } from "react";
import NoticeService from "../hooks/noticeService";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

// react plugin used to create charts
function NoticeList(props) {

  const [notices, setNotices] = useState([]);
  const [currentNotice, setCurrentNotice] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const { authUser } = props;

  useEffect(() => {
    retrieveNotices();
    console.log(authUser);
    console.log(authUser.communityId);
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };
  const retrieveNotices = () => {
    NoticeService.getAll()
      .then(response => {
        setNotices(response.data.data);
        console.log(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const refreshList = () => {
    retrieveNotices();
    setCurrentNotice(null);
    setCurrentIndex(-1);
  };
  const setActiveNotice = (notice, index) => {
    setCurrentNotice(notice);
    setCurrentIndex(index);
  };
  const removeAllNotices = () => {
    NoticeService.removeAll()
      .then(response => {
        console.log(response.data.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };
  const findByTitle = () => {
    NoticeService.findByTitle(searchTitle)
      .then(response => {
        setNotices(response.data.data);
        console.log(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">캠페인 목록</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive >
                  <thead className="text-primary">
                    <tr>
                      <th>공지사항 제목</th>
                      <th>등록일</th>
                      <th className="text-right">상세보기</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notices.map((notice, index) => (
                      <tr key={notice.noticeId}>
                        <td>{notice.noticeTitle}</td>
                        <td>{notice.createdDate}</td>
                        <td className="text-right"><Link to={"/sub-menu/notices/" + notice.noticeId} className="badge badge-warning">
                          상세보기
                        </Link></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* <Link to='/sub-menu/campaigns/AddCampaign'><button className="btn-round btn btn-primary">캠페인등록</button></Link> */}
      </div>
    </>
  );
}

export default NoticeList;
