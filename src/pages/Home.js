import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Home.css"; 


function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-quart",
      offset: 100,
      once: false,
      mirror: true,
    });
    AOS.refresh();
  }, []);

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">CareerCrafter</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="nav" className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link active" href="#">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#how">How it Works</a></li>
              <li className="nav-item"><a className="nav-link" href="#about">About Us</a></li>
              <li className="nav-item"><a className="nav-link" href="#contact">Contact Us</a></li>
              <li className="nav-item ms-2"><a className="nav-link" href="/login">Log in</a></li>
              <li className="nav-item ms-2">
                <a className="btn btn-primary rounded-pill px-3" href="/register">Register</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="py-5" style={{ background: "linear-gradient(135deg,#fff7fb,#eef4ff)" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <h1 className="display-5 fw-bold" style={{ color: "#2c3e50" }}>
                Find Your <span style={{ color: "#226BFF" }}>Dream Job</span><br /> With Your Interest & Skills
              </h1>
              <p className="text-muted mt-3">250+ jobs posted daily • 20k+ daily active users</p>
              <a href="#how" className="btn btn-primary rounded-pill px-4 mt-2">Browse Jobs</a>
            </div>
            <div className="col-lg-6 text-center" data-aos="fade-left">
              <img
                src="/images/proj1.jpg"
                alt="Hero"
                className="img-fluid"
                style={{ maxHeight: 520, objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* OUR SERVICES */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6" data-aos="fade-right">
              <img
                src="/images/proj2.jpg"
                alt="Project Two"
                className="img-fluid rounded shadow"
              />
            </div>

            {/* Right Content */}
            <div className="col-lg-6" data-aos="fade-left">
              <h2 className="fw-bold text-dark mb-3">
                Our Services Is To Help You To Get Hired By Great Company
              </h2>
              <p className="text-muted mb-4">
                We connect job seekers with leading employers. Our platform helps you apply 
                easily and companies hire faster with high satisfaction. Join thousands of 
                professionals who found their dream job using our platform.
              </p>
              <a href="#jobs" className="btn btn-primary px-4 mb-4">Get Started</a>

              {/* Stats */}
              <div className="row text-center g-4">
                <div className="col-4">
                  <h3 className="fw-bold text-primary">86K+</h3>
                  <p className="text-muted small mb-0">Jobs Created</p>
                </div>
                <div className="col-4">
                  <h3 className="fw-bold text-primary">81K+</h3>
                  <p className="text-muted small mb-0">Employees Hired</p>
                </div>
                <div className="col-4">
                  <h3 className="fw-bold text-primary">97%</h3>
                  <p className="text-muted small mb-0">Company Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="testimonial-section py-5 bg-light" data-aos="fade-up">
        <div className="container">
          <h2 className="mb-5 fw-bold text-dark text-center">What People Say About Us</h2>

          <div className="row align-items-center">
            {/* Text */}
            <div className="col-lg-8" data-aos="fade-right">
              <p className="lead">
                “I got my dream job with this platform very easily and fast. The
                process was simple, and I found top companies looking for candidates
                like me. I highly recommend this platform to anyone serious about
                their career.”
              </p>
              <h5 className="mt-3">Jonathan Trott</h5>
              <p className="text-muted">Job Seeker</p>
              <span className="text-warning">★★★★★</span>
            </div>

            {/* Image */}
            <div className="col-lg-4 text-center" data-aos="fade-left">
              <img
                src="/images/proj3.jpg"
                alt="Testimonial"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED JOBS */}
      <section id="jobs" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5" style={{ color: "#2c3e50" }}>Featured Job Offers</h2>

          {/* Categories */}
          <div className="d-flex justify-content-center gap-2 mb-4 flex-wrap">
            {["All", "Design", "Marketing", "Management", "Others"].map((cat, i) => (
              <button key={i} className={`btn ${i === 0 ? "btn-primary" : "btn-outline-primary"} rounded-pill px-3`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Jobs Grid */}
          <div className="row g-4">
            {[
              { company: "Spotify", role: "Product Designer" },
              { company: "Stripe", role: "UI Designer" },
              { company: "Slack", role: "Visual Designer" },
              { company: "Airbnb", role: "Expert Developer" },
              { company: "Amazon", role: "Product Designer" },
              { company: "Twitter", role: "Marketing Specialist" }
            ].map((job, index) => (
              <div className="col-md-6 col-lg-4" key={index} data-aos="zoom-in" data-aos-delay={index * 100}>
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body d-flex flex-column">
                    <h5 className="fw-bold text-dark">{job.company}</h5>
                    <p className="text-muted mb-4">{job.role}</p>
                    <div className="mt-auto">
                      <button className="btn btn-primary w-100">Apply Now</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* READ OUR ARTICLES */}
      <section className="py-5 bg-white" data-aos="fade-up">
        <div className="container">
          <h2 className="text-center fw-bold mb-5" style={{ color: "#2c3e50" }}>
            Read Our Articles That Will Help You To Secure A Great Job
          </h2>
          <div className="row g-4">
  {[
    {
      img: "/images/blog1.jpg",
      title: "5 Key Strategies to Boost Your Career",
      desc: "Staying competitive in today’s job market requires planning. Learn how to build new skills, expand your professional network, and set clear goals. These strategies will help you stay motivated, adaptable, and ready for new opportunities."
    },
    {
      img: "/images/blog2.jpg",
      title: "How to Write a Resume That Gets You Hired",
      desc: "Your resume is your first impression. Discover how to highlight achievements, tailor applications to job roles, and avoid common mistakes. With the right approach, your CV will stand out and attract recruiters’ attention instantly."
    },
    {
      img: "/images/blog3.jpg",
      title: "Top 10 Interview Tips for Success",
      desc: "Interviews can feel stressful, but preparation makes all the difference. Learn how to answer tricky questions, showcase your strengths, and build confidence. These proven tips will help you impress employers and secure your dream role."
    }
  ].map((article, i) => (
    <div className="col-md-4" key={i} data-aos="fade-up" data-aos-delay={i * 200}>
      <div className="card h-100 shadow-sm border-0">
        <img src={article.img} className="card-img-top" alt={article.title} />
        <div className="card-body">
          <h5 className="fw-bold text-dark">{article.title}</h5>
          <p className="text-muted small">{article.desc}</p>
          <a href="#" className="btn btn-outline-primary btn-sm mt-2">Read More</a>
        </div>
      </div>
    </div>
  ))}
</div>

        </div>
        </section>
        <section className="companies-section">
  <h2 className="text-center text-white mb-4">Top Companies Hiring</h2>
  <div className="scrolling-wrapper">
    <div className="scroll-content">
      <span>Hexaware</span>
      <span>TCS</span>
      <span>Infosys</span>
      <span>Wipro</span>
      <span>Accenture</span>
      <span>HCL Tech</span>
      <span>Mahindra</span>
      <span>Cognizant</span>
      <span>Capgemini</span>
      <span>IBM</span>
      <span>Oracle</span>
      {/* repeat again to make infinite loop look smooth */}
      <span>TCS</span>
      <span>Infosys</span>
      <span>Wipro</span>
      <span>Accenture</span>
      <span>HCL Tech</span>
      <span>Mahindra</span>
      <span>Cognizant</span>
      <span>Capgemini</span>
      <span>IBM</span>
      <span>Oracle</span>
    </div>
  </div>
</section>


      



      {/* FOOTER */}
      <footer className="py-4" style={{ background: "#1e2a44", color: "#cfd6e4" }}>
        <div className="container text-center">
          <p className="mb-0">© {new Date().getFullYear()} CareerCrafter</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
