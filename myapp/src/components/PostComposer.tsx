// src/components/PostComposer.tsx
import React, { useMemo, useState } from "react";
import { Card, Button, Badge, Form, Row, Col } from "react-bootstrap";
import { createPost } from "../services/post";
import { getAuth } from "../services/auth";

type Props = { onCreated: (dtoLike: any) => void };

const wordsPerMin = 200;
const readingTime = (t: string) =>
  Math.max(1, Math.round((t?.trim().split(/\s+/).length || 0) / wordsPerMin));

export default function PostComposer({ onCreated }: Props) {
  const auth = getAuth();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [fullText, setFullText] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const minutes = useMemo(() => readingTime(fullText), [fullText]);
  const disable = !auth || !title.trim() || !fullText.trim();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (disable) return;
    try {
      setLoading(true);
      setErr("");
      const data = await createPost({
        title: title.trim(),
        imageUrl: imageUrl.trim() || undefined,
        fullText: fullText.trim(),
      });
      const now = new Date().toISOString();
      const dtoLike = {
        postId: data?.postId ?? Math.random(),
        title,
        imageUrl,
        fullText,
        createdAt: data?.createdAt ?? now,
        username: auth?.user?.username ?? "You",
      };
      onCreated(dtoLike);
      setTitle("");
      setImageUrl("");
      setFullText("");
    } catch (e: any) {
      setErr(e?.response?.data || e?.message || "Create failed");
    } finally {
      setLoading(false);
    }
  }

  if (!auth) {
    return (
      <Card className="pf-composer card shadow-sm mb-4">
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h5
                className="mb-1"
                style={{ color: "#ffd34d", fontWeight: 700 }}
              >
                Share something?
              </h5>
              <div className="help">You need to sign in to post.</div>
            </div>
            <Button className="btn-auth" variant="warning" href="/login">
              Sign in
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="pf-composer card shadow-sm mb-4">
      <Card.Body>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h5 className="mb-0" style={{ color: "#ffd34d", fontWeight: 700 }}>
            Create a post
          </h5>
          <Badge bg="" className="badge-glass">
            {minutes} min read
          </Badge>
        </div>

        {err && (
          <div className="alert alert-danger py-2 mb-3">{String(err)}</div>
        )}

        <Form onSubmit={submit}>
          <Row className="g-3">
            <Col md={8}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  placeholder="Your headline"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={120}
                  required
                />
                <div className="help mt-1">{title.length}/120</div>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Image URL (optional)</Form.Label>
                <Form.Control
                  placeholder="https://..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </Form.Group>
            </Col>

            {imageUrl && (
              <Col xs={12}>
                <div className="preview">
                  <img
                    src={imageUrl}
                    alt="preview"
                    onError={() => setImageUrl("")}
                  />
                </div>
              </Col>
            )}

            <Col xs={12}>
              <Form.Group>
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Write your post…"
                  value={fullText}
                  onChange={(e) => setFullText(e.target.value)}
                  minLength={10}
                  required
                />
                <div className="help mt-1">
                  {fullText.trim().split(/\s+/).filter(Boolean).length} words •{" "}
                  {fullText.length} chars
                </div>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-2 mt-3">
            <Button
              type="submit"
              className="btn-auth"
              variant="warning"
              disabled={disable || loading}
            >
              {loading ? "Posting..." : "Publish"}
            </Button>
            <Button
              type="button"
              className="btn-auth"
              variant="outline-light"
              onClick={() => {
                setTitle("");
                setImageUrl("");
                setFullText("");
                setErr("");
              }}
              disabled={loading}
            >
              Clear
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
