import React, { useEffect, useState } from "react";
import {
  Comment,
  Avatar,
  Button,
  Card,
  Col,
  Row,
  Space,
  Timeline,
  Typography,
} from "antd";
import RatingComponent from "../home/RatingComponent";
import moment from "moment";
import JourneyService from "../../services/JourneyService";
import { UserOutlined } from "@ant-design/icons";
const { Text, Link } = Typography;

const JourneyCard = ({ journey }) => {
  const [isDetails, setIsDetails] = useState(false);
  const [journeyFull, setJourneyFull] = useState(null);

  const onDetailClick = () => {
    setIsDetails(!isDetails);
  };

  useEffect(() => {
    const load = async () => {
      const response = await JourneyService.getJourney(journey.id);
      setJourneyFull(response.data);
    };
    load();
  }, [journey.id]);

  const dateFormat = (date) => {
    console.log(date, moment(date).format("LLL"));
    return moment(date).format("LLL");
  };

  const resolvePointLabel = (index, point, pointsSize) => {
    if (index === 0) {
      return dateFormat(point.dispatchDate);
    } else if (index === pointsSize - 1) {
      return dateFormat(point.arrivalDate);
    } else {
      return (
        <>
          <p
            style={{
              marginBottom: 0,
              marginTop: "-10px",
            }}
          >
            {dateFormat(point.dispatchDate)}
          </p>
          <p>{dateFormat(point.arrivalDate)}</p>
        </>
      );
    }
  };

  const getUserName = () => {
    const firstName = journey.owner.firstName
      ? `${journey.owner.firstName} `
      : "";
    const lastName = journey.owner.lastName ? journey.owner.lastName : "";
    const name = `${firstName}${lastName}`;
    return name ? name : journey.owner.email;
  };

  const userName = getUserName();

  const avatar = (
    <Avatar
      size="large"
      style={{
        backgroundColor: "#7265e6",
        verticalAlign: "middle",
      }}
    >
      {journey.owner.firstName
        ? journey.owner.firstName.length < 8
          ? journey.owner.firstName
          : journey.owner.firstName.substr(0, 1)
        : journey.owner.email.substr(0, 1)}
    </Avatar>
  );

  return (
    <Card
      key={journey.id}
      title={
        journey.startTravelPoint.pointName +
        " - " +
        journey.endTravelPoint.pointName
      }
      extra={<Button onClick={onDetailClick}>Details</Button>}
    >
      <Row justify="space-between">
        <Col span={10}>
          {isDetails ? (
            <Timeline mode={"left"}>
              {journeyFull.travelPoints.map((point, index) => {
                return (
                  <Timeline.Item
                    label={resolvePointLabel(
                      index,
                      point,
                      journeyFull.travelPoints.length
                    )}
                  >
                    {point.address}
                    <Comment
                      author={<a href={`/profile/${journey.owner.id}`}>{userName}</a>}
                      avatar={
                        <Avatar
                          style={{ backgroundColor: "#7265e6" }}
                          icon={<UserOutlined />}
                        />
                      }
                      content={<p>{point.comment}</p>}
                    />
                  </Timeline.Item>
                );
              })}
            </Timeline>
          ) : (
            <Timeline mode={"left"}>
              <Timeline.Item
                label={dateFormat(journey.startTravelPoint.dispatchDate)}
              >
                {journey.startTravelPoint.address}
              </Timeline.Item>
              <Timeline.Item
                label={dateFormat(journey.endTravelPoint.arrivalDate)}
              >
                {journey.endTravelPoint.address}
              </Timeline.Item>
            </Timeline>
          )}
        </Col>
        <Col>
          <Space>
            <a href={`/profile/${journey.owner.id}`}>{avatar}</a>
            <Space direction="vertical">
              <Text strong>{journey.owner.email}</Text>
              <Text>
                {(journey.owner.firstName ? journey.owner.firstName : "") +
                  " " +
                  (journey.owner.lastName ? journey.owner.lastName : "")}
              </Text>
              <Text>
                Rating: <RatingComponent value={journey.owner.rating} />
              </Text>
            </Space>
          </Space>
        </Col>
        <Col>
          <Text>Max parcel count: {journey.maxOrderCount}</Text>
        </Col>
        <Col>
          <p>
            Small parcel:{" "}
            <Text strong>{journey.journeyCosts[0].cost} $/km</Text>
          </p>
          <p>
            Avg parcel: <Text strong>{journey.journeyCosts[1].cost} $/km</Text>
          </p>
          <p>
            Large parcel:{" "}
            <Text strong>{journey.journeyCosts[2].cost} $/km</Text>
          </p>
        </Col>
      </Row>
    </Card>
  );
};

export default JourneyCard;