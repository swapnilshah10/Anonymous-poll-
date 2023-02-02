import React from "react";
import './css/About.css';

const AboutPage = () => (
  <div className="about-page-container">
    <h1 className="about-page-title">About Anonymous Poll</h1>
    <div className="about-page-description-container">
      <p className="about-page-description">
        Anonymous Poll is a platform that allows you to create and participate
        in polls without revealing your identity. We believe in giving everyone
        a voice, and that means providing a safe and secure environment for you
        to share your opinions.
      </p>
      <p className="about-page-description">
        Our app is designed to be easy to use, with a user-friendly interface
        that makes it simple to create and participate in polls. Whether you're
        looking to gauge public opinion on a particular issue, or simply want
        to see what your friends and family think about a topic, Anonymous Poll
        is the perfect tool.
      </p>
      <p className="about-page-description">
        So why wait? Sign up for Anonymous Poll today, and start making your
        voice heard!
      </p>
    </div>
  </div>
);

export default AboutPage;

