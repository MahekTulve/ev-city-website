"use client";

import "./Visionhero.css";
import {
  Clock3,
  Leaf,
  Route,
  Users,
  ArrowRight,
} from "lucide-react";

export default function VisionHero() {
  return (
    <section className="visionHero">

      <div className="visionOverlay" />

      <div className="visionContent">

        {/* LEFT PANEL */}

        <div className="visionLeft">

          <span className="visionTag">
            THE VISION
          </span>

          <h1>
            A CITY.
            <br />
            DESIGNED
            <br />
            AROUND <span>TIME.</span>
          </h1>

          <div className="goldLine" />

          <p>
            We believe the future belongs to cities where
            life unfolds within moments, not miles.
            Inspired by the philosophy of the
            <strong> 5-Minute City</strong>,
            our vision is to create a place where luxury
            is measured not by what you own,
            but by the time it gives back to
            the people who live within it.
          </p>

          <div className="divider" />

          <div className="visionFeatures">

            <div className="feature">
              <Clock3 size={28} />
              <h4>5-MINUTE</h4>
              <span>LIVING</span>
            </div>

            <div className="feature">
              <Leaf size={28} />
              <h4>SUSTAINABLE</h4>
              <span>BY DESIGN</span>
            </div>

            <div className="feature">
              <Route size={28} />
              <h4>SEAMLESS</h4>
              <span>MOBILITY</span>
            </div>

            <div className="feature">
              <Users size={28} />
              <h4>COMMUNITY</h4>
              <span>FIRST</span>
            </div>

          </div>

          <button className="visionButton">
            EXPLORE MASTERPLAN
            <ArrowRight size={20} />
          </button>

        </div>

      </div>

    </section>
  );
}