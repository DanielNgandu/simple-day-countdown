import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
  Button,
  Badge,
  CardSubtitle
} from "shards-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import { Container, Row, Col } from "shards-react";
import image from "./count.jpg"
import Appcss from "./App.css"
function App() {
  const [year] = useState(new Date().getFullYear());

  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    const difference = +new Date(`01/01/${year+1}`) - +new Date();

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;

  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
        <span>
      {timeLeft[interval]} {interval}{" "}
    </span>
    );
  });
  return (
      <Container className="dr-example-container">
        <Col sm={{ size: 8, order: 2, offset: 2 }}>

        <Card className="card">
          {/*<CardHeader>Simple Day Counter</CardHeader>*/}
          {/*<CardImg src={image}/>*/}
          <CardBody>
            <CardTitle> Countdown to {year+1} </CardTitle>
          <Badge outline theme="info">{timerComponents.length ? timerComponents : <span>Time's up!</span>}</Badge>

          </CardBody>
          <CardFooter>Made using ReactJS + ShardsUi</CardFooter>
        </Card>
        </Col>
      </Container>
  );
}

export default App;
