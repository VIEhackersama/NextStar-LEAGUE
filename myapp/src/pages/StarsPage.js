import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function StarsPage() {
  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h2 className="fw-bold mb-4 text-center">Ngôi sao Premier League</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="shadow-sm h-100 text-center">
                <Card.Body>
                  <Card.Title>Erling Haaland</Card.Title>
                  <Card.Text>
                    Tiền đạo của Man City, nổi bật với khả năng ghi bàn khủng
                    khiếp.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="shadow-sm h-100 text-center">
                <Card.Body>
                  <Card.Title>Mohamed Salah</Card.Title>
                  <Card.Text>
                    Ngôi sao Ai Cập của Liverpool, một trong những cầu thủ chạy
                    cánh xuất sắc nhất thế giới.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="shadow-sm h-100 text-center">
                <Card.Body>
                  <Card.Title>Kevin De Bruyne</Card.Title>
                  <Card.Text>
                    Nhạc trưởng của Manchester City, với khả năng chuyền bóng và
                    kiến tạo đỉnh cao.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default StarsPage;
