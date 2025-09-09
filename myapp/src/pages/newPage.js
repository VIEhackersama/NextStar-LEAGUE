import React from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";

function NewsPage() {
  return (
    <Container fluid className="py-5">
      <Row>
        {/* Cột tin tức chính */}
        <Col md={8}>
          {/* Hàng tin nổi bật */}
          <Row className="g-4 mb-4">
            <Col md={4}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Img variant="top" src="image/onana.webp" alt="Onana" />
                <Card.Body>
                  <Card.Title className="fs-6 fw-bold">
                    Onana được tăng lương gấp đôi sau khi rời Man Utd
                  </Card.Title>
                  <Card.Text className="text-muted small">47 bình luận</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Img variant="top" src="image/onana2.webp" alt="Onana" />
                <Card.Body>
                  <Card.Title className="fs-6 fw-bold">
                    Man Utd muốn đẩy Onana sang Thổ Nhĩ Kỳ
                  </Card.Title>
                  <Card.Text className="text-muted small">14 bình luận</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Img variant="top" src="image/new3.webp" alt="Chuyển nhượng" />
                <Card.Body>
                  <Card.Title className="fs-6 fw-bold">
                    Ngoại hạng Anh trải qua kỳ chuyển nhượng khủng khiếp thế nào?
                  </Card.Title>
                  <Card.Text className="text-muted small">107 bình luận</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          
          <Row className="g-4">
            <Col md={12}>
              <Card className="border-0 shadow-sm">
                <Row className="g-0">
                  <Col md={4}>
                    <Card.Img src="image/Daniellevy.webp" alt="Daniel Levy" className="h-100 object-fit-cover" />
                  </Col>
                  <Col md={8}>
                    <Card.Body>
                      <Card.Title className="fw-bold">Di sản phức tạp của Daniel Levy ở Tottenham</Card.Title>
                      <Card.Text>
                        Sau gần 25 năm nắm quyền, Daniel Levy từ chức Chủ tịch Tottenham, để lại một di sản gây tranh cãi...
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col md={12}>
              <Card className="border-0 shadow-sm">
                <Row className="g-0">
                  <Col md={4}>
                    <Card.Img src="image/lamen.webp" alt="Senne Lammens" className="h-100 object-fit-cover" />
                  </Col>
                  <Col md={8}>
                    <Card.Body>
                      <Card.Title className="fw-bold">Thủ môn mới của Man Utd từng ghi bàn phút cuối</Card.Title>
                      <Card.Text>
                        Sau khi phát hiện Senne Lammens từng ghi bàn ở phút cuối giải UEFA Youth League 2019...
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col md={12}>
              <Card className="border-0 shadow-sm">
                <Row className="g-0">
                  <Col md={4}>
                    <Card.Img src="image/chutich.webp" alt="Chủ tịch Tottenham" className="h-100 object-fit-cover" />
                  </Col>
                  <Col md={8}>
                    <Card.Body>
                      <Card.Title className="fw-bold">Chủ tịch Tottenham từ chức sau gần 25 năm</Card.Title>
                      <Card.Text>
                        Ngày 4/9, Tottenham thông báo Daniel Levy từ chức Chủ tịch điều hành sau 24 năm tại vị...
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>

        
        <Col md={4}>
         
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-primary text-white fw-bold">Bảng xếp hạng</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>1. Liverpool - 9 điểm</ListGroup.Item>
              <ListGroup.Item>2. Chelsea - 7 điểm</ListGroup.Item>
              <ListGroup.Item>3. Arsenal - 6 điểm</ListGroup.Item>
              <ListGroup.Item>4. Tottenham - 6 điểm</ListGroup.Item>
              <ListGroup.Item>5. Everton - 6 điểm</ListGroup.Item>
              <ListGroup.Item>6. Sunderland - 6 điểm</ListGroup.Item>
            </ListGroup>
            <Card.Footer className="text-center text-primary small">Xem tất cả</Card.Footer>
          </Card>

          
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white fw-bold">Top câu lạc bộ</Card.Header>
            <Card.Body className="d-flex justify-content-around">
              <img src="image/manchesterunited.png" alt="MU" width="70" />
              <img src="image/manchestercity.png" alt="Man City" width="70" />
              <img src="image/arsenal.png" alt="Arsenal" width="70" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default NewsPage;

