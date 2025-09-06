import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import newsData from '../assets/data/new.json';
function NewsPage() {
return (
<Container className="py-5">
<h2 className="fw-bold mb-4 text-center">Premier League News</h2>
<Row className="g-4">
{newsData.map((news) => (
<Col md={6} lg={4} key={news.id}>
<Card className="h-100 shadow-sm">
<Card.Img variant="top" src={news.image} alt={news.title} />
<Card.Body>
<Card.Title className="fw-bold">{news.title}</Card.Title>
<Card.Text>{news.summary}</Card.Text>
<div className="text-muted small mb-2">
📅 {news.published} | 📰 {news.source}
</div>
<div>
{news.tags.map((tag, idx) => (
<span
key={idx}
className="badge bg-primary me-1"
>
{tag}
</span>
))}
</div>
</Card.Body>
</Card>
</Col>
))}
</Row>
</Container>
);
}


export default NewsPage;