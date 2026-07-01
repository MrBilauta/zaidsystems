import Link from "next/link";

export function BuildPhilosophySection() {
  return (
    <section id="sec-blog" style={{ marginTop: '48px' }}>
      <h2>✦ Philosophy</h2>
      <div className="separator"></div>
      <div className="blog-list">
        <Link href="#" className="blog-item">
          <div className="blog-meta-row">
            <span>Core Values</span>
          </div>
          <h3 className="blog-item-title">Think. Build. Ship. Repeat.</h3>
          <p className="blog-item-desc">A continuous cycle of innovation, execution, and delivery.</p>
        </Link>
      </div>
    </section>
  );
}
