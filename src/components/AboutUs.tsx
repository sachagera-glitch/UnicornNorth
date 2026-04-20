import React from "react";

const AboutUs: React.FC = () => {
  return (
    <section className="section animate-in" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div className="section-header" style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          Honoring Canada’s <span style={{ color: "var(--red)" }}>Tech Builders</span>
        </h1>
        <div className="divider" style={{ margin: "0 auto 2rem" }} />
        <p style={{ fontSize: "1.2rem", color: "var(--navy)", fontWeight: 500, margin: "0 auto" }}>
          Unicorn North is dedicated to celebrating the founders who have shaped Canada’s technology ecosystem—from its earliest pioneers to today’s generation of builders.
        </p>
      </div>

      <div className="card" style={{ padding: "3rem", background: "var(--white)", border: "1px solid var(--border-light)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--text)" }}>
            Our mission is simple: document, recognize, and share the stories behind the people and companies that have made Canada a global force in innovation.
          </p>

          <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--text)" }}>
            Canada’s tech success didn’t happen overnight. It was built over decades—through cycles of ambition, failure, reinvention, and scale. Inspired by frameworks like{" "}
            <a href="https://www.linkedin.com/in/luclalande/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--red)", fontWeight: 600, textDecoration: "underline" }}>
              Luc Lalande’s four eras of tech
            </a>
            , and works such as{" "}
            <a href="https://www.theglobeandmail.com/business/article-canadian-tech-companies-worth-100-million/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--red)", fontWeight: 600, textDecoration: "underline" }}>
              Sean Silcoff’s $100-million club
            </a>{" "}
            at the Globe & Mail,{" "}
            <a href="https://a.co/d/08gEw9oH" target="_blank" rel="noopener noreferrer" style={{ color: "var(--red)", fontWeight: 600, textDecoration: "underline" }}>
              Telecom Tornado by James Bagnell
            </a>{" "}
            and{" "}
            <a href="https://a.co/d/0a0THGc4" target="_blank" rel="noopener noreferrer" style={{ color: "var(--red)", fontWeight: 600, textDecoration: "underline" }}>
              The Shopify Story by Larry MacDonald
            </a>
            , we aim to connect the dots across generations of founders and companies.
          </p>

          <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--text)" }}>
            We also stand on the shoulders of those already telling these stories. Organizations like{" "}
            <a href="https://www.buildcanada.com/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--red)", fontWeight: 600, textDecoration: "underline" }}>
              Build Canada
            </a>
            , and storytellers like{" "}
            <a href="https://www.linkedin.com/in/lucyghargreaves/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--red)", fontWeight: 600, textDecoration: "underline" }}>
              Lucy Hargreaves
            </a>{" "}
            and her team, have played a critical role in surfacing the people and moments that define our ecosystem. Unicorn North builds on that momentum by creating a centralized, enduring record of Canada’s tech history.
          </p>

          <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--text)" }}>
            This is not just a retrospective. By understanding how Canada’s tech ecosystem was built—who built it, where, and why—we can better support the next generation of founders.
          </p>

          <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--text)" }}>
            Unicorn North is a living project. We welcome contributions, corrections, and perspectives from across the community to ensure this history is accurate, inclusive, and continuously evolving. Please reach out to us at <a href="mailto:admin@unicornnorth.com" style={{ color: "var(--red)", fontWeight: 600, textDecoration: "underline" }}>admin@unicornnorth.com</a>.
          </p>

          <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "2px solid var(--cream)", textAlign: "center" }}>
            <p style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: "1.4rem", 
              fontStyle: "italic", 
              color: "var(--navy)",
              fontWeight: 600
            }}>
              "Because the future of Canadian tech will be built by those who understand its past."
            </p>
          </div>
        </div>
      </div>
      
      <div style={{ height: "4rem" }} />
    </section>
  );
};

export default AboutUs;
