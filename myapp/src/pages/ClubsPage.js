import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function ClubsPage() {
  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h2 className="fw-bold mb-4 text-center">Những đội bóng nổi bật</h2>
          <Row className="g-4">
            <Col md={6}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title>Manchester United</Card.Title>
                  <Card.Text>
                    CLB giàu thành tích nhất Premier League, với nhiều chức vô
                    địch dưới thời Sir Alex Ferguson.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title>Liverpool</Card.Title>
                  <Card.Text>
                    Đội bóng giàu truyền thống, nổi bật với lối đá pressing mạnh
                    mẽ dưới thời HLV Jürgen Klopp.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title>Manchester City</Card.Title>
                  <Card.Text>
                    Đội bóng thống trị gần đây với Pep Guardiola và lối đá tiki-taka
                    hiện đại.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title>Chelsea</Card.Title>
                  <Card.Text>
                    CLB London nổi bật với nhiều danh hiệu trong thập kỷ qua, đặc
                    biệt ở Champions League.
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

export default ClubsPage;