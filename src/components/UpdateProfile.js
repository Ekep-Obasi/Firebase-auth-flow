import React, { useRef, useState } from "react";
import { Card, Button, Form, Container, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Loader from "./Loader";

const UpdateProfile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { updateEmail, updatePassword, currentUser } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const promises = [];
    let timeOutId;

    if (passwordConfirmRef.current.value !== passwordRef.current.value)
      return setError("Passwords don't match");

    if (emailRef.current.value !== currentUser?.email)
      promises.push(updateEmail(emailRef.current.value));
    if (passwordRef.current.value)
      promises.push(updatePassword(passwordRef.current.value));

    Promise.all(promises)
      .then(() => {
        setMessage("Updated Succesfully!");
        timeOutId = setTimeout(() => {
          setMessage();
          navigate("/dashboard");
        }, 3000);
      })
      .catch(() => {
        setError("Failed to Update");
      })
      .finally(() => {
        setLoading(false);
        clearTimeout(timeOutId);
      });
  };
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Container style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Update Profile</h2>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  ref={emailRef}
                  defaultValue={currentUser?.email}
                />
              </Form.Group>

              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordRef}
                  placeholder="Change Password"
                />
              </Form.Group>

              <Form.Group id="password-confirmation">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  placeholder="Change Password"
                />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-4" type="submit">
                Update
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="text-center w-100 mt-2">
          <Link to="/login">Cancel</Link>
        </div>
      </Container>
      <Loader visibility={loading} />
    </Container>
  );
};

export default UpdateProfile;
