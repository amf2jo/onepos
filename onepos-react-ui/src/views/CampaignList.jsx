import React, { useState, useEffect, useCallback } from "react";
import CampaignService from "../hooks/campaignService";
import CommunityService from "../hooks/communityService";
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
function CampaignList(props) {

  const [campaigns, setCampaigns] = useState([]);
  const [currentCampaign, setCurrentCampaign] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const { authUser } = props;
  const [userGrade, setGrade] = useState();

  useEffect(() => {
    retrieveCampaigns();
    console.log(authUser);
    console.log(authUser.communityId);
    console.log(authUser.email);
    console.log(authUser.communityMemberGrade);
    console.log(authUser.communityName);
    setGrade(authUser.communityMemberGrade);
    getCommunityMembers();
  }, [authUser.communityId]);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };
  const retrieveCampaigns = () => {
    if (authUser.communityId != "") {
      CampaignService.getByCommunityId(authUser.communityId)
        .then(response => {
          setCampaigns(response.data.data);
          console.log(response.data.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
    else {
      CampaignService.getAll()
        .then(response => {
          setCampaigns(response.data.data);
          console.log(response.data.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  };
  const refreshList = () => {
    retrieveCampaigns();
    setCurrentCampaign(null);
    setCurrentIndex(-1);
  };
  const setActiveCampaign = (campaign, index) => {
    setCurrentCampaign(campaign);
    setCurrentIndex(index);
  };
  const removeAllCampaigns = () => {
    CampaignService.removeAll()
      .then(response => {
        console.log(response.data.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };
  const findByTitle = () => {
    CampaignService.findByTitle(searchTitle)
      .then(response => {
        setCampaigns(response.data.data);
        console.log(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getCommunityMembers = useCallback (() => {
    if (!authUser.communityId) return;

    CommunityService.getMembers(authUser.communityId)
      .then(response => {
        console.log("CONSOLE_LOG authUser.communityId ::: ", authUser.communityId);
        // setCmmtMembers(response.data.data);
        // console.log("my community", response.data.data);
      })
      .catch(e => {
        console.log("getCommunityMembers Error", e);
        setAxiosError({...e});
      });
  }, [authUser.communityId]);

  const setStatus = (status) => {
    if (status == '00')
      return (
        <p>미게시</p>
      )
    else if (status == '10')
      return (
        <p>게시됨(진행중)</p>
      )
    else if (status == '11')
      return (
        <p>캠페인 완료</p>
      )
    else if (status == '12')
      return (
        <p>캠페인 중지</p>
      )
    else if (status == '13')
      return (
        <p>캠페인 취소</p>
      )
  }

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
                      <th>캠페인명</th>
                      <th>캠페인 시작일자</th>
                      <th>캠페인 종료일자</th>
                      <th>목표금액</th>
                      <th>캠페인 상태</th>
                      <th className="text-right">상세보기</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((campaign, index) => (
                      <tr key={campaign.campaignId}>
                        <td>{campaign.campaignTitle}</td>
                        <td>{campaign.startDate}</td>
                        <td>{campaign.endDate}</td>
                        <td>{campaign.targetAmount}</td>
                        <td>{setStatus(campaign.status)}</td>
                        <td className="text-right"><Link to={"/sub-menu/campaigns/" + campaign.campaignId} className="badge badge-warning">
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
        <Link to='/sub-menu/campaigns/AddCampaign'><button className="btn-round btn btn-primary">캠페인등록</button></Link>
      </div>
    </>
  );
}

export default CampaignList;
