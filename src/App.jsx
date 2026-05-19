import React, { useEffect, useMemo, useState } from "react";

/** When selected, every item passes the category filter (default state). */
const FILTER_ALL_ID = "all";

const CAREER_FILTER_OPTIONS = [
  { id: "llms", label: "LLMs" },
  { id: "product", label: "Product" },
  { id: "policy", label: "Policy" },
  { id: "software-engineering", label: "Software Engineering" },
];

const PROJECT_FILTER_OPTIONS = [
  { id: "llms", label: "LLMs" },
  { id: "product", label: "Product" },
  { id: "tech-policy-ethics", label: "Tech Policy and Ethics" },
  { id: "strategy-research", label: "Strategy Research" },
];

const PROJECT_CATEGORY_LABEL = Object.fromEntries(PROJECT_FILTER_OPTIONS.map((o) => [o.id, o.label]));

const CAREER_FILTER_BAR_OPTIONS = [{ id: FILTER_ALL_ID, label: "All" }, ...CAREER_FILTER_OPTIONS];
const PROJECT_FILTER_BAR_OPTIONS = [{ id: FILTER_ALL_ID, label: "All" }, ...PROJECT_FILTER_OPTIONS];

/** OR filter: "All" or empty selection = show everything; otherwise item matches if it has any selected category. Items with no categories only show when "All" is on. */
function matchesCategoryFilter(selectedIds, itemCategoryIds) {
  if (selectedIds.size === 0 || selectedIds.has(FILTER_ALL_ID)) return true;
  const cats = itemCategoryIds ?? [];
  if (cats.length === 0) return false;
  return cats.some((id) => selectedIds.has(id));
}

function toggleFilterSelectionWithAll(prev, id) {
  if (id === FILTER_ALL_ID) return new Set([FILTER_ALL_ID]);
  const next = new Set(prev);
  next.delete(FILTER_ALL_ID);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  if (next.size === 0) return new Set([FILTER_ALL_ID]);
  return next;
}

function CategoryFilterBar({ options, selectedIds, onToggle, onClear, groupLabel }) {
  return (
    <div className="category-filter-bar" role="group" aria-label={groupLabel}>
      <div className="category-filter-chips">
        {options.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`category-filter-chip${selectedIds.has(id) ? " category-filter-chip--active" : ""}`}
            aria-pressed={selectedIds.has(id)}
            onClick={() => onToggle(id)}
          >
            {label}
          </button>
        ))}
      </div>
      {selectedIds.has(FILTER_ALL_ID) && selectedIds.size === 1 ? null : (
        <button type="button" className="category-filter-clear" onClick={onClear}>
          Clear filters
        </button>
      )}
    </div>
  );
}

function CareerFilteredBlock({ selectedIds, categories, children }) {
  if (!matchesCategoryFilter(selectedIds, categories)) return null;
  return children;
}

function HomePage() {
  return (
    <main className="page home-page">
      <section className="about-layout">
        <aside className="photo-column">
          <div className="about-photo-card">
            <img className="about-photo" src="/profile.jpg" alt="Priti Rangnekar" />
          </div>
          <div className="photo-links" aria-label="Social links">
            <a
              className="social-logo-link"
              href="https://www.linkedin.com/in/pritirangnekar/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="sr-only">LinkedIn</span>
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.04-1.86-3.04-1.87 0-2.16 1.45-2.16 2.95v5.67H9.31V9h3.42v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.58 0 4.24 2.35 4.24 5.41v6.33ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77A1.77 1.77 0 0 0 0 1.78v20.44C0 23.2.8 24 1.77 24h20.45c.98 0 1.78-.8 1.78-1.78V1.78C24 .8 23.2 0 22.22 0Z" />
              </svg>
            </a>
            <a
              className="social-logo-link"
              href="https://pritirangnekar.substack.com/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="sr-only">Substack</span>
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M1.5 2.25h21v2.97h-21ZM1.5 7.38h21v2.97h-21ZM1.5 12.5l10.5 6.41 10.5-6.4v9.24h-21Z" />
              </svg>
            </a>
          </div>
        </aside>

        <div className="about-content">
          <h2>Priti Rangnekar</h2>
          <div className="about-paragraphs">
            <p>
            I specialize in translating complex user, market, and technical insights
            into clear product strategy, effective communication that drives user understanding and adoption, 
            and AI solutions that are technically sound and responsibly governed.
            Previously, I cofounded Nixo (<strong>Y Combinator</strong> S25), the first ops platform for
            forward-deployed engineers, and developed software for workflow and testing automation
            at <strong>Amazon</strong> and <strong>ServiceNow</strong>.
            </p>
            <p>
              I completed my B.S. and M.S. degrees in computer science at{" "}
              <strong>Stanford University</strong>,
              where I earned the{" "}
              <a
                href="https://engineering.stanford.edu/students-academics/academics/frederick-emmons-terman-engineering-scholastic-award/terman-awards-1"
                target="_blank"
                rel="noreferrer"
              >
                Terman Award
              </a>
              , presented each year to the top undergraduate seniors in engineering. In addition to
              gaining a strong technical foundation in systems and artificial intelligence, I
              collaboratively designed, built, and launched five award-winning AI products through
              programs such as Lean Launchpad and product management consulting for{" "}
              <strong>Typeface.ai</strong>.
              I was also energized by teaching, speaking, and
              fostering community. I served as head TA for NLP and big data systems, section led
              for{" "}
              <a href="https://cs198.stanford.edu/web" target="_blank" rel="noreferrer">
                CS198
              </a>
              , hosted{" "}
              <a href="https://stanfordwomenincomputerscience.com/" target="_blank" rel="noreferrer">
                WiCS
              </a>{" "}
              industry events, and organized MSCS weekly socials.
            </p>
            <p>
              From growing up in San Jose, to studying in Palo Alto, to living in San Francisco,
              I&apos;ve seen the juxtaposition of rapid technological growth with socioeconomic
              divides, both locally and at a global scale. As a result, I&apos;ve valued approaching
              my technological endeavors holistically to analyze technology&apos;s societal impacts and
              mitigate harms. I&apos;ve designed risk assessment frameworks for generative AI
              deployments as a{" "}
              <a
                href="https://www.paragonfellowship.org/projects/use-case-guidelines-for-mitigating-genai-risk"
                target="_blank"
                rel="noreferrer"
              >
                Paragon Policy Fellow
              </a>{" "}
              for Santa Clara County, co-led Stanford{" "}
              <a
                href="https://hai.stanford.edu/news/stanford-hai-selects-12-new-student-affinity-groups"
                target="_blank"
                rel="noreferrer"
              >
                HAI&apos;s AI governance student affinity group
              </a>
              , and studied abroad at the <strong>Oxford Internet Institute</strong>.
            </p>
            <p>
              In my free time, I enjoy immersing myself in and writing on{" "}
              <a href="https://pritirangnekar.substack.com/" target="_blank" rel="noreferrer">
                Substack
              </a>{" "}
              about travel, international culture, cuisine, and media. In 2024, I journeyed across
              Vietnam on a local-led tour, experiencing nine different modes of transport in ten
              days. In 2025, I biked 300 miles from Bruges to Amsterdam, spending days on city
              streets and nights on a barge, bonding with fellow cyclists from around the world. In
              2026, I&apos;ve been exploring the San Francisco culinary scene, savoring new flavors and
              experiences without leaving home.
            </p>
            <p>
              I love meeting new people - whether it&apos;s swapping ideas, trying out new experiences, or
              getting to know each other over a meal or chat. Reach out to me at{" "}
              <a href="mailto:priti.rangnekar@gmail.com">priti.rangnekar@gmail.com</a>.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}

function CareerPage() {
  const [selectedCareerFilters, setSelectedCareerFilters] = useState(() => new Set([FILTER_ALL_ID]));
  const toggleCareerFilter = (id) => {
    setSelectedCareerFilters((prev) => toggleFilterSelectionWithAll(prev, id));
  };
  const sel = selectedCareerFilters;
  const m = (cats) => matchesCategoryFilter(sel, cats);
  const showCareerSection =
    m(["llms", "product"]) ||
    m(["llms", "product", "policy"]) ||
    m(["software-engineering"]) ||
    m(["llms", "product", "software-engineering"]) ||
    m(["product", "software-engineering"]);
  const showEducationSection =
    m(["product", "software-engineering"]) || m(["product", "policy"]) || m([]);

  return (
    <main className="page career-page">
      <CategoryFilterBar
        options={CAREER_FILTER_BAR_OPTIONS}
        selectedIds={selectedCareerFilters}
        onToggle={toggleCareerFilter}
        onClear={() => setSelectedCareerFilters(new Set([FILTER_ALL_ID]))}
        groupLabel="Filter career and education by category"
      />
      {!showCareerSection && !showEducationSection ? (
        <p className="category-filter-empty">No entries match these filters.</p>
      ) : null}
      {showCareerSection ? (
        <section className="section-card">
          <h2 className="section-title career">Career</h2>

          <CareerFilteredBlock selectedIds={selectedCareerFilters} categories={["llms", "product"]}>
            <div className="role-card">
          <div className="role-header">
            <img
              className="brand-logo"
              src="/logos/typeface.png"
              alt=""
              width={44}
              height={44}
            />
            <div className="role-header-main">
              <h3 className="role-title">Product Management Consultant</h3>
              <p className="role-company">Typeface.ai</p>
            </div>
            <p className="role-dates">Sep 2024 - Dec 2024</p>
          </div>
          <ul className="role-bullets">
            <li>
              Conducted 20+ user interviews and market research across Typeface&apos;s solution
              architects, enterprise customers, and end-user marketers.
            </li>
            <li>
              Proposed and designed a solution using AI agents to A/B test marketing campaigns,
              reducing time spent running experiments and lowering ad spend.
            </li>
            <li>
              Awarded top team in Stanford&apos;s PM program; endorsed by Typeface&apos;s Head of
              Product.
            </li>
          </ul>
            </div>
          </CareerFilteredBlock>
          <CareerFilteredBlock selectedIds={selectedCareerFilters} categories={["llms", "product", "policy"]}>
            <div className="role-card">
          <div className="role-header">
            <img
              className="brand-logo"
              src="/logos/paragon.png"
              alt=""
              width={44}
              height={44}
            />
            <div className="role-header-main">
              <h3 className="role-title">Paragon AI Policy Fellow</h3>
              <p className="role-company">County of Santa Clara</p>
            </div>
            <p className="role-dates">Sep 2024 - Dec 2024</p>
          </div>
          <ul className="role-bullets">
            <li>
              Reduced fragmentation of AI governance procedures by working directly with the Chief
              Privacy Officer to develop a scalable{" "}
              <a
                href="https://www.paragonfellowship.org/projects/use-case-guidelines-for-mitigating-genai-risk"
                target="_blank"
                rel="noreferrer"
              >
                2-tier AI use-case framework
              </a>
              .
            </li>
            <li>
              Analyzed county practices, California legislation, and NIST AI RMF to craft
              guidelines for streamlining procurement, reducing administrative overhead, and
              enabling risk assessment across generative AI deployments.
            </li>
          </ul>
            </div>
          </CareerFilteredBlock>
          <CareerFilteredBlock selectedIds={selectedCareerFilters} categories={["llms", "product", "software-engineering"]}>
            <div className="role-card">
          <div className="role-header">
            <img
              className="brand-logo"
              src="/logos/stanford.png"
              alt=""
              width={44}
              height={44}
            />
            <div className="role-header-main">
              <h3 className="role-title">Head Teaching Assistant and Section Leader</h3>
              <p className="role-company">Stanford CS Department</p>
            </div>
            <p className="role-dates">Oct 2022 - Mar 2025</p>
          </div>
          <ul className="role-bullets">
            <li>
              Led teams of 10 Teaching Assistants for Stanford CS124 (NLP) and CS145 (Big Data Systems),
              coordinating office hours, managing weekly staffing, exam administration and grading operations, 
              and curriculum development for courses serving 600+ students.
            </li>
            <li>
              Provided recommendations to course professors on long-term instructional planning and immediate
              course needs by navigating tradeoffs between student support
              requests, team bandwidth, academic rigor, accessibility, and fairness.
            </li>
            <li>
              Created and presented interactive coding walkthroughs and collaborative exercises
              for 60+ CS106A and CS106B students to enhance understanding of lecture material and prepare
              for independent assignments.
            </li>
            <li>
              Provided live debugging support and technical mentorship during high-volume office hours,
              helping students resolve implementation and conceptual challenges in real time.
            </li>
            <li>
              Developed, tested, and iteratively refined 6 assignments on fairness, privacy, and explainability with Python and SQL 
              for the inaugural &ldquo;Data: Tools, Algorithms,
              Policy, and Society&rdquo; course under the Stanford School of Engineering.
            </li>
            <li>
              Earned average student ratings of 94% across multiple quarters through strong teaching,
              mentorship, and operational leadership.
            </li>
          </ul>
            </div>
          </CareerFilteredBlock>
          <CareerFilteredBlock selectedIds={selectedCareerFilters} categories={["software-engineering"]}>
            <div className="role-card">
          <div className="role-header">
            <img
              className="brand-logo"
              src="/logos/amazon.png"
              alt=""
              width={44}
              height={44}
            />
            <div className="role-header-main">
              <h3 className="role-title">Software Development Engineer Intern</h3>
              <p className="role-company">Amazon</p>
            </div>
            <p className="role-dates">Jun 2024 - Sep 2024</p>
          </div>
          <ul className="role-bullets">
            <li>
              Built the first end-to-end automated test case framework needed for Project Kuiper,
              reducing repeated manual testing and ensuring readiness for satellite launch.
            </li>
            <li>
              Scoped requirements and authored documentation by assessing network diagrams, existing
              codebases, and testbed scheduling constraints in coordination with 3 cross-functional
              teams.
            </li>
            <li>
              Received a full-time return offer.
            </li>
          </ul>
            </div>
          </CareerFilteredBlock>
          <CareerFilteredBlock selectedIds={selectedCareerFilters} categories={["llms", "product", "software-engineering"]}>
            <div className="role-card">
          <div className="role-header">
            <img
              className="brand-logo"
              src="/logos/servicenow.png"
              alt=""
              width={44}
              height={44}
            />
            <div className="role-header-main">
              <h3 className="role-title">Software Engineer Intern</h3>
              <p className="role-company">ServiceNow</p>
            </div>
            <p className="role-dates">Jun 2023 - Sep 2023</p>
          </div>
          <ul className="role-bullets">
            <li>
              Developed an interface to allow users to simultaneously create action inputs and step
              inputs, reducing workflow creation time by 80%.
            </li>
            <li>
              Designed and tested a proof of concept for using LLMs to convert between text and
              actions.
            </li>
            <li>
              Collaborated with PM, QE, and UX teams to align product roadmap across Scrum sprints.
              Received return offer.
            </li>
          </ul>
            </div>
          </CareerFilteredBlock>
          <CareerFilteredBlock selectedIds={selectedCareerFilters} categories={["product", "software-engineering"]}>
            <div className="role-card">
          <div className="role-header">
            <img
              className="brand-logo"
              src="/logos/servicenow.png"
              alt=""
              width={44}
              height={44}
            />
            <div className="role-header-main">
              <h3 className="role-title">Software Engineer Intern</h3>
              <p className="role-company">ServiceNow</p>
            </div>
            <p className="role-dates">Jun 2022 - Sep 2022</p>
          </div>
          <ul className="role-bullets">
            <li>
              Engineered and deployed{" "}
              <a
                href="https://www.servicenow.com/docs/r/washingtondc/build-workflows/see-related-flows-for-action.html"
                target="_blank"
                rel="noreferrer"
              >
                a complete feature to production for customers
              </a>{" "}
              for determining and displaying the workflows an action is used in, reducing time for
              customers to find this information by more than 90% and lowering risk of breaking
              automation.
            </li>
          </ul>
            </div>
          </CareerFilteredBlock>
        </section>
      ) : null}
      {showEducationSection ? (
        <section className="section-card">
          <h2 className="section-title education">Education</h2>

          <CareerFilteredBlock selectedIds={selectedCareerFilters} categories={["product", "software-engineering"]}>
            <div className="edu-card">
          <div className="edu-header">
            <img
              className="brand-logo"
              src="/logos/stanford.png"
              alt=""
              width={44}
              height={44}
            />
            <div className="edu-header-body">
              <div className="edu-header-top">
                <div className="edu-header-main">
                  <h3 className="edu-degree">M.S. in Computer Science, AI Specialization</h3>
                  <p className="edu-school">Stanford University</p>
                </div>
                <p className="edu-dates">2024 - 2026</p>
              </div>
              <details className="coursework-dropdown">
            <summary>View coursework</summary>

            <p className="coursework-group-title">Product and Strategy</p>
            <ul>
              <li>EE 205 Product Management for Electrical Engineers and Computer Scientists</li>
              <li>EDUC 260 Lean Launchpad for Education</li>
              <li>CEE 242P Product Making</li>
              <li>EE 292I Insanely Great Products</li>
              <li>INTLPOL 321 Cyber Policy &amp; Security</li>
              <li>CS 309A Cloud Computing Seminar</li>
            </ul>

            <p className="coursework-group-title">Artificial Intelligence</p>
            <ul>
              <li>CS 281 Ethics of AI</li>
              <li>CS 224S Spoken Language Processing</li>
              <li>CS 204 Legal Technology</li>
              <li>CS 237B Principles of Robot Autonomy II</li>
              <li>CS 238 Decision Making under Uncertainty</li>
              <li>CS 231N Deep Learning for Computer Vision</li>
              <li>CS 205L Continuous Mathematical Methods with an Emphasis on Machine Learning</li>
            </ul>

            <p className="coursework-group-title">Software and Systems</p>
            <ul>
              <li>CS 255 Cryptography</li>
              <li>CS 249I The Modern Internet</li>
              <li>CS 144 Computer Networking</li>
              <li>CS 273C Cloud Computing for Biology and Healthcare</li>
            </ul>
              </details>
            </div>
          </div>
        </div>

        <div className="edu-card">
          <div className="edu-header">
            <img
              className="brand-logo"
              src="/logos/stanford.png"
              alt=""
              width={44}
              height={44}
            />
            <div className="edu-header-body">
              <div className="edu-header-top">
                <div className="edu-header-main">
                  <h3 className="edu-degree">B.S. in Computer Science, Information Track</h3>
                  <p className="edu-school">Stanford University</p>
                </div>
                <p className="edu-dates">2020 - 2024</p>
              </div>
              <p className="edu-meta">GPA: 4.1/4.0</p>
              <details className="coursework-dropdown">
            <summary>View coursework</summary>
            <ul>
              <li>CS 194W Software Project (Writing in the Major)</li>
              <li>CS 224N Natural Language Processing with Deep Learning</li>
              <li>CS 246 Mining Massive Data Sets</li>
              <li>CS 155 Computer and Network Security</li>
              <li>CS 151 Logic Programming</li>
              <li>CS 152 Trust &amp; Safety Engineering</li>
              <li>CS 124 From Languages to Information</li>
              <li>CS 212 Operating Systems and Systems Programming</li>
              <li>CS 145 Data Management and Data Systems</li>
              <li>CS 221 Artificial Intelligence: Principles and Techniques</li>
              <li>CS 161 Design and Analysis of Algorithms</li>
              <li>CS 110 Principles of Computer Systems</li>
              <li>CS 109 Probability for Computer Scientists</li>
              <li>CS 107 Computer Organization and Systems</li>
              <li>CS 103 Mathematical Foundations of Computing</li>
              <li>CS 106B Programming Abstractions</li>
              <li>CS 106L Standard C++ Programming Laboratory</li>
              <li>CS 198 Teaching Computer Science</li>
            </ul>
              </details>
            </div>
          </div>
        </div>

          </CareerFilteredBlock>
          <CareerFilteredBlock selectedIds={selectedCareerFilters} categories={["product", "policy"]}>
            <div className="edu-card">
          <div className="edu-header">
            <img
              className="brand-logo"
              src="/logos/oxford.png"
              alt=""
              width={44}
              height={44}
            />
            <div className="edu-header-body">
              <div className="edu-header-top">
                <div className="edu-header-main">
                  <h3 className="edu-degree">Bing Overseas Studies Program</h3>
                  <p className="edu-school">Oxford University, Oxford Internet Institute</p>
                </div>
                <p className="edu-dates">Michaelmas Term 2023</p>
              </div>
              <p className="edu-meta">
                Tutorial in Social Dynamics of the Internet through Stanford&apos;s Bing Overseas Studies
                Program.
              </p>
              <details className="coursework-dropdown">
                <summary>View essay prompts</summary>
                <ul>
                  <li>
                    Is the internet becoming more open or more closed? Who benefits most and who benefits the
                    least from this trend? Why?
                  </li>
                  <li>
                    How have technology and economic growth intersected in the web 2.0 and AI revolution?
                  </li>
                  <li>
                    How important has the role of the state
                    been in influencing technological revolutions and long-run innovation-led economic growth,
                    particularly during Perez&apos;s fifth industrial revolution? Considering the evolving
                    dynamics of the digital era and looking ahead, what role should the state assume?
                  </li>
                  <li>
                    Is Silicon Valley a regional model for innovation-led growth that other regions/states
                    around the world should try to replicate?
                  </li>
                  <li>
                    How should states respond to the challenges to their
                    power and control from digital platforms?
                  </li>
                  <li>
                    In the context of
                    the digital revolution, what should be the scope of the role of the state in addressing
                    emergent digital inequalities?
                  </li>
                  <li>
                    What is the impact of the growing platformization of the economy on economic actors,
                    notably at the world&apos;s margins? How might the state respond?
                  </li>
                </ul>
              </details>
            </div>
          </div>
        </div>

          </CareerFilteredBlock>
          <CareerFilteredBlock selectedIds={selectedCareerFilters} categories={[]}>
            <div className="edu-card">
          <div className="edu-header">
            <img
              className="brand-logo"
              src="/logos/basis.png"
              alt=""
              width={44}
              height={44}
            />
            <div className="edu-header-body">
              <div className="edu-header-top">
                <div className="edu-header-main">
                  <h3 className="edu-degree">High School Diploma with High Honors</h3>
                  <p className="edu-school">BASIS Independent Silicon Valley</p>
                </div>
                <p className="edu-dates">2020</p>
              </div>
            </div>
          </div>
        </div>
          </CareerFilteredBlock>
        </section>
      ) : null}
    </main>
  );
}

function ExplorationsPage() {
  return (
    <main className="page page-compact">
      <section className="section-card">
        <h2 className="section-title career">Readings</h2>
        <div className="books-grid">
          <div className="book-category">
            <h3>Philosophy and Psychology</h3>
            <ul>
              <li><strong>When Breath Becomes Air</strong> by Paul Kalanithi</li>
              <li><strong>Being Mortal</strong> by Atul Gawande</li>
              <li><strong>Man&apos;s Search for Meaning</strong> by Viktor E. Frankl</li>
              <li><strong>Tuesdays with Morrie</strong> by Mitch Albom</li>
            </ul>
          </div>

          <div className="book-category">
            <h3>Personal and Professional Growth</h3>
            <ul>
              <li><strong>Designing Your Life</strong> by Bill Burnett and Dave Evans</li>
              <li><strong>Linchpin</strong> by Seth Godin</li>
              <li><strong>The Five Dysfunctions of a Team</strong> by Patrick Lencioni</li>
              <li><strong>Finish: Give Yourself the Gift of Done</strong> by Jon Acuff</li>
              <li><strong>The Four Agreements</strong> by Don Miguel Ruiz</li>
            </ul>
          </div>

          <div className="book-category">
            <h3>History and Government</h3>
            <ul>
              <li><strong>The Republican Reversal: Conservatives and the Environment from Nixon to Trump</strong> by James Morton Turner and Andrew C. Isenberg</li>
              <li><strong>Who Is Government? The Untold Story of Public Service</strong> edited by Michael Lewis</li>
              <li><strong>Abundance</strong> by Ezra Klein and Derek Thompson</li>
            </ul>
          </div>

          <div className="book-category">
            <h3>Technology and Business</h3>
            <ul>
              <li><strong>The Entrepreneurial State</strong> by Mariana Mazzucato</li>
              <li><strong>Technological Revolutions and Financial Capital</strong> by Carlota Perez</li>
              <li><strong>The Worlds I See: Curiosity, Exploration, and Discovery at the Dawn of AI</strong> by Fei-Fei Li</li>
              <li><strong>The Design of Everyday Things</strong> by Donald A. Norman</li>
              <li><strong>System Error: Where Big Tech Went Wrong and How We Can Reboot</strong> by Jeremy Weinstein, Mehran Sahami, and Rob Reich</li>
              <li><strong>Crossing the Chasm</strong> by Geoffrey A. Moore</li>
            </ul>
          </div>

          <div className="book-category">
            <h3>Science Fiction and Mystery</h3>
            <ul>
              <li><strong>The Three-Body Problem</strong> by Cixin Liu</li>
              <li><strong>Project Hail Mary</strong> by Andy Weir</li>
              <li><strong>The Westing Game</strong> by Ellen Raskin</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-card">
        <h2 className="section-title career">Travel</h2>
        <div className="explorations-travel">
          <p>
            Over the years, I&apos;ve been fortunate to experiencing the geographical and cultural diversity of our world firsthand.
            I typically plan my own itineraries
            or collaborate with family and friends, allowing for flexibility, spontaneity, and immersion based on our unique interests. That being said,
            I've recently found organized group trips to be an amazing experience culturally, socially, and logistically. A few aspects I especially
            enjoy about these trips:
          </p>
          <ul className="explorations-travel-list">
            <li>
              <strong>Learning from locals.</strong> Most tours are led by local guides who share not
              just history and logistics, but also personal stories, cultural opinions, and street smart advice throughout
              the week-long trip.
            </li>
            <li>
              <strong>Meeting people who love travel.</strong> Over a week of traveling together, I've grown friendships with young professionals,
              families, solo travelers, couples, and even retired Stanford alumni from Europe,
              India, Australia, and Mexico. When visiting their home countries, I know I'll have a familiar face to meet up with -
              and our trip group chats remain active with everyone sharing pictures of their ongoing travels.
            </li>
            <li>
              <strong>Discovering hidden gems, guaranteed.</strong> Group travel itineraries, which include experiences and services
              hosted by a network of local experts,
              are packed with opportunities to discover hidden local spots, regional culinary specialties, and 
              adventures you likely wouldn&apos;t find - or know the best deals for - on your own.
            </li>
          </ul>
          <p className="explorations-travel-tours-lead">Some memorable tours and itineraries:</p>
          <ul className="explorations-travel-tours">
            <li>
              <a href="https://www.greenearthadventures.com/" target="_blank" rel="noreferrer">
                Green Earth Adventures - Bike and Barge from Bruges to Amsterdam
              </a>
              , June 2025
            </li>
            <li>
              <a
                href="https://www.gadventures.com/trips/classic-vietnam-hanoi-to-ho-chi-minh-city/AVCH/"
                target="_blank"
                rel="noreferrer"
              >
                G Adventures - Classic Vietnam
              </a>
              , December 2024
            </li>
            <li>
              <a
                href="https://www.gadventures.com/trips/journeys-highlights-of-costa-rica/CRNNG/"
                target="_blank"
                rel="noreferrer"
              >
                National Geographic - Journeys: Highlights of Costa Rica
              </a>
              , December 2024
            </li>
            <li>
              <a
                href="https://www.veenaworld.com/package/rajasthan-highlights-tour-package-shrj45/i"
                target="_blank"
                rel="noreferrer"
              >
                Veena World - Rajasthan Highlights
              </a>
              , December 2023
            </li>
          </ul>

          <p className="explorations-travel-subheading">Day trips:</p>
          <ul className="explorations-travel-tours">
            <li>
              <a
                href="https://www.getyourguide.com/vienna-l7/day-trips-from-vienna-hallstatt-salzburg-guided-tour-t823893/?ranking_uuid=2c8852e8-314d-4d58-b6bb-f0ba9e540a30"
                target="_blank"
                rel="noreferrer"
              >
                Hallstatt and Salzburg from Vienna
              </a>{" "}
              (GetYourGuide)
            </li>
            <li>
              <a
                href="https://www.paddywagontours.com/kilkenny-wicklow-sheepdog-tour-from-dublin"
                target="_blank"
                rel="noreferrer"
              >
                Glendalough, Wicklow Mountains, and Kilkenny from Dublin
              </a>{" "}
              (Paddywagon Tours)
            </li>
            <li>
              <a
                href="https://www.viator.com/tours/Belfast/Giants-Causeway-Day-Trip-from-Belfast/d738-5844CAUSEWAY"
                target="_blank"
                rel="noreferrer"
              >
                Giant&apos;s Causeway and Dark Hedges from Belfast
              </a>{" "}
              (Viator)
            </li>
            <li>
              <a
                href="https://www.viator.com/tours/London/Stonehenge-Windsor-Castle-and-Bath-Day-Trip-from-London/d737-3858EE021"
                target="_blank"
                rel="noreferrer"
              >
                Stonehenge, Windsor Castle, and Bath from London
              </a>{" "}
              (Viator)
            </li>
            <li>
              <a
                href="https://www.viator.com/tours/Taipei/8-hr-Private-Tour-Yehliu-Jiufen-and-Shifen-from-Taipei/d5262-62353P32"
                target="_blank"
                rel="noreferrer"
              >
                Shifen, Jiufen, and Yehliu from Taipei
              </a>{" "}
              (Viator)
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}

const LAW_LAW_LAND_DETAIL = {
  newsUrl:
    "https://law.stanford.edu/2022/06/24/interdisciplinary-work-for-social-impact-stanford-law-computer-science-and-graduate-school-of-business-students-apply-artificial-intelligence-for-socially-conscious-futures/",
  newsLabel:
    "Interdisciplinary work for social impact (Stanford Law, Computer Science & Graduate School of Business)",
  problemStatement:
    "Legal knowledge is highly consequential yet deeply inaccessible for most students. Many encounter situations involving immigration status, financial aid, employment contracts, and discrimination protections without understanding their rights, liberties, and best practices.",
  persona: {
    name: "Nabillah Haddad",
    age: "17",
    location: "Dearborn, Michigan",
    background: "First-generation immigrant family",
    role: "High school student & violinist",
    lifestyle:
      "Balances academics, violin, and extracurriculars while helping her family navigate life in the U.S. Because English is not her family's first language, she often translates documents, forms, and institutional processes for them.",
  },
  goals: [
    "Evaluate her first part-time job contract while balancing school responsibilities",
    "Understand her legal rights and responsibilities in everyday situations",
  ],
  frustrations: [
    "Legal language feels technical, intimidating, and difficult to interpret",
    "Existing resources are generic, passive, and disconnected from real-life situations students face",
    "Unsure which online information is trustworthy or applicable to her specific circumstances",
    "Has limited time and wants concise, personalized guidance relevant to her situation rather than overwhelming amounts of information",
  ],
  marketAnalysis:
    "Existing legal education tools are often constrained along two dimensions: interaction and relevance. Most rely on static multiple-choice workflows with limited personalization, while the underlying content is frequently centered on specialized legal domains rather than the everyday legal situations students are most likely to encounter in their own lives.",
  solution:
    'We designed a gamified legal learning platform where students progress through dynamic, scenario-based journeys modeled after real-world legal situations. Instead of following static lesson paths, students navigate branching "choose your own adventure" experiences spanning topics such as immigration, employment, financial aid, and civil rights. The platform creates and adapts subsequent scenarios in real time based on the semantic content of student responses, enabling more personalized and contextually relevant learning paths.',
  keyFeatures: [
    "Adaptive Content Generation: use of large language models, fine-tuned on LEGAL-BERT for Legal-QA, to decide what questions and scenarios to present next to students based on their previous responses",
    "Real-Time Learning and Feedback: Students can leverage Q&A system to gain real-time hints and feedback",
    "Speech-to-Text: Students can respond through speech instead of typing, creating a more immersive and realistic interaction experience",
    "Post-deployment platform improvement: topic modeling (LDA) across student responses to identify concepts and areas where students consistently struggle",
  ],
  legalEthicalConsiderations: [
    "FERPA and SOPIPA compliance: minimized data collection (e.g. usernames and emails only) and avoiding sensitive demographic data to reduce discrimination risk",
    "Inclusivity and Accessibility: speech-to-text support, multiple difficulty levels, and diverse avatars",
    "Autograding bias: training grading systems on diverse student response datasets, to account for varying levels of English proficiency and dialects such as AAVE",
    "Protected IP rights: original storyline and internally developed content, with credit given to any legal datasets used",
    "AI evals: developed in collaboration with lawyers to verify legal accuracy, prevent dangerous scenario generation, and continuously review new content",
    "Trust and Safety: human moderation for Q&A forum",
  ],
};

const MITIGATING_DISCORD_DETAIL = {
  variant: "discord",
  problemSectionTitle: "Problem",
  problemStatement:
    "Discord has a relatively young user base and relies on volunteer moderators to manage problematic content. In 2022 alone, Discord took action on over 27,000 instances of harassment and bullying. Existing moderation systems struggle to balance rapid enforcement with preserving freedom of expression and avoiding over-censorship. Our goal was to design both automated detection/removal systems and manual reporting workflows to minimize the prevalence of harassment behavior on Discord.",
  policyApproachParagraphs: [
    "Designed a trust and safety moderation framework for Discord combining automated harassment detection, user reporting, and human review workflows.",
    "Focused on 1) bullying, 2) hate speech, 3) doxxing, and 4) unwanted sexual content while balancing platform safety with freedom of expression.",
    "Implemented automated message flagging and removal, configurable moderator-defined banned content, and escalation pipelines for reported and automatically flagged messages.",
    "Incorporated structured enforcement policies including suspensions, bans, adversarial reporting detection, and support resources for victims.",
    "Evaluated tradeoffs surrounding sarcasm, quoted speech, reclaimed language, and context-dependent interpretation in large-scale online communities.",
  ],
  technicalApproachBullets: [
    "OpenAI APIs for harassment classification across categories such as scams, offensive content, hate speech, and leaked private information",
    "Perspective API profanity scoring and ranking as a backup moderation layer",
    "Safeguards against malicious misspellings, spacing-based circumvention attempts, and post-edit moderation evasion",
    "Moderator-defined regex-based banned content rules for server-specific policy customization",
    "Logging infrastructure to track reports, moderation outcomes, and enforcement patterns",
  ],
  evaluationHarassment: {
    main: "84.5% accuracy detecting harassment-related content",
    subBullets: [
      "Able to easily detect messages that contained direct threats of violence, hate speech, or common keywords indicating sexism and racism",
      "Less effective at catching messages that had abusive or hateful implications but did not contain keywords and phrases that seemed hateful in isolation",
    ],
  },
  evaluationHarassmentExample:
    'The bot failed to flag the message "go back to the kitchen and make me a sandwich," which out of context may not seem hateful to a bot but is commonly understood in society as a misogynist insult towards women.',
  evaluationNonHarassment: {
    main: "80.2% accuracy identifying non-harassment content",
    subBullets: [
      "Correctly categorizes messages without harassment even when they contained strong language or referenced controversial subjects",
      "Less effective at dealing with messages that contained potentially abusive keywords or referenced hateful ideology, but were clearly not in support of them",
    ],
  },
  evaluationNonHarassmentExample:
    '"If you think white people are superior, something is wrong with you" was incorrectly flagged as harassment, most likely because of the hateful phrase in the middle of the message.',
  futureImprovementBullets: [
    "Use cheaper APIs for automatic flagging as the first guard, then consider to use OpenAI APIs as the second guard. This can be generalized to detecting bottlenecks in the current implementation and improving performance.",
    "Train our model to perform better with inputs from other languages through translation, language detection, and datasets from different countries. While the United States has a plurality in Discord usage, accounting for 30% of users and 60% of revenue, this addition would enhance deployment on international servers.",
    "Embed the UI/UX for the report and review flow into Discord. This could entail using Discord embeds / buttons when a user is reporting a message or a moderator is reviewing a report. This should also help for concurrent reports / reviews to be done, without too much clutter on the main or mod channels.",
    "Further tools (Python scripts) could be made to quickly analyze the logs (i.e. most common forms of harassment, number of false reports or valid reports).",
  ],
};

const KEEPUP_DETAIL = {
  variant: "keepup",
  problemSectionTitle: "Problem",
  problemStatement:
    "Over 5 million academic papers are published annually, making it increasingly difficult for students and industry professionals to stay current in their fields. Existing research discovery tools often overwhelm users with information, provide limited personalization, and make it difficult for newcomers to identify which developments are most important or relevant to their interests.",
  approachStatement:
    "Designed and built an AI-powered platform for personalized research paper discovery and summarization. KeepUp combined LLM-generated summaries, recommendation algorithms, semantic search, and user interaction signals to surface relevant research papers in an accessible and engaging format.",
  marketPositioning:
    "Existing research platforms either surface individual papers without synthesis, require manual prompting, or rely on non-personalized human curation. KeepUp combined personalized recommendations, LLM-generated summaries, and cross-paper synthesis into a single platform, enabling students and professionals to efficiently discover and understand research tailored to their interests, goals, and limited time.",
  testingBullets: [
    "Conducted 20+ customer interviews with computer science students, professionals in the tech industry without a research background, and research scientists to prioritize use cases and roadmap features",
    "Hosted live moderated usability tests with the initial prototype for 6 students, in which users clicked through the prototype and verbalized their thoughts",
  ],
  featureBullets: [
    "Onboarding flows allowing users to specify topics, subtopics, and custom areas of interest",
    "Personalized recommendations based on user interests, goals, likes, bookmarks, and viewing behavior",
    "LLM-generated summaries and visual aids to make papers more digestible",
    "A scrollable feed designed to reduce information overload and focus attention on one paper at a time",
    "A large-scale research paper pipeline powered by Semantic Scholar and vector search infrastructure",
  ],
};

const EXPLAINAI_DETAIL = {
  variant: "explainai",
  problemSectionTitle: "Problem",
  problemStatement:
    "Students increasingly rely on tools like ChatGPT and Speechify to cope with dense reading material, but comprehension, confidence, and engagement often remain unresolved. Through 80+ interviews and experiments, we found that many students — particularly those with ADHD, dyslexia, ESL backgrounds, or demanding academic/professional workloads — struggled not only with reading speed, but with knowing where to start, maintaining focus, articulating ideas confidently, and engaging deeply with material.",
  customerSegmentsIntro: "Primary customer segments included:",
  customerSegmentsBullets: [
    "undergraduates seeking confidence and preparedness before class discussions",
    "professionals wanting to quickly grasp unfamiliar material before meetings",
    "students with ADHD or dyslexia struggling with sustained attention and comprehension",
  ],
  customerSegmentsClosing:
    'We ultimately found strongest resonance among "confidence-builders" and intellectually curious "deep-divers" rather than users simply looking for quick summaries.',
  marketPositioningIntro:
    "Existing tools focused primarily on passive summarization or text-to-speech consumption. ExplainAI positioned itself instead as a conversational learning companion centered around three core value propositions:",
  marketPositioningBullets: [
    "Embrace Curiosity — guide users through difficult material using summaries, scaffolding, and suggested questions that help them explore concepts more deeply",
    "Challenge Yourself — encourage active learning through techniques such as explaining concepts in users' own words, diving into nuances, and interacting directly with source material",
    "Feel Confident — help users articulate ideas verbally, assess their understanding, and feel more prepared for classes, discussions, and meetings",
  ],
  mvpExploredIntro:
    "Iterated through multiple MVPs, each tested through qualitative usability testing sessions and quantitative A/B tests on platform features, exploring:",
  mvpExploredBullets: [
    "suggested-question scaffolding for approaching difficult texts",
    "pane-based conversational deep dives to encourage users to go down \"rabbit holes\" for topics of interest",
    "conversational learning interfaces with combinations of voice and text modes for ExplainAI and the user",
  ],
  mvpLearningsIntro: "Key learnings from the MVP included:",
  mvpLearningBullets: [
    "passive listening alone was insufficiently engaging",
    "users strongly valued conversational scaffolding and guided questioning",
    "voice interactions felt compelling, though users preferred a mix of voice and text",
    "curiosity and confidence resonated more strongly than productivity-oriented messaging",
  ],
  gtmParagraphs: [
    "Tested distribution through direct-to-consumer channels including TikTok and Instagram ads and landing page messaging A/B tests. 80+ interviews and multiple ad-based \"pain point\" experiments to identify which messaging resonated most strongly with users.",
    "The strongest-performing themes centered around feeling confident in class, understanding difficult readings, exploring intellectual curiosity, and efficiently preparing for discussions and meetings.",
    "Initially explored both consumer and school-based distribution through teachers and support staff, particularly for students with ADHD and dyslexia. However, customer discovery suggested that school purchasing incentives, budgets, and adoption velocity were weaker than expected. As a result, we focused primarily on a direct-to-consumer subscription model targeting students, parents, and professionals seeking ongoing academic and comprehension support.",
  ],
};

const ELECTIONS_ETHICS_DETAIL = {
  variant: "electionsEthics",
  problemSectionTitle: "Problem",
  problemStatement:
    "As large language models become a major source of political information, concerns around misinformation, manipulation, and voter persuasion have grown significantly — especially during global election cycles. This project evaluates how well GPT-3.5-Turbo and Claude 3 Haiku distinguish between harmful and harmless election-related prompts using Anthropic's Elections Questions Dataset. The research focuses specifically on harmlessness, persuasion targeting, demographic fairness, and the effects of prompt engineering on model behavior.",
  relatedWork:
    "Previous research from Anthropic and other AI safety researchers has highlighted the difficulty of balancing helpfulness with harm prevention in political contexts. Existing work showed that models often either fail to refuse harmful election-related prompts or become overly cautious and refuse benign political discussion. This project builds on prior work in election safety evaluations, prompt engineering, and interpretability methods such as TokenSHAP, while providing one of the first detailed analyses of performance on Anthropic's Elections Questions Dataset itself.",
  methods:
    "The project evaluated GPT-3.5-Turbo and Claude 3 Haiku across two primary datasets: a harmlessness dataset and a persuasion-targeting dataset involving prompts with questions labeled as harmful or harmless. Questions were filtered to focus on Hispanic, African-American, and Muslim demographics to allow for fairness analysis. To improve comparability across demographic groups, prompts were augmented so that similar questions existed for each demographic. The research then tested whether prompt engineering techniques — including role prompting, clear instructions, and multi-shot examples — could improve model performance in answering harmless questions and refusing to answer harmful questions. Finally, SHAP and TokenSHAP analysis were used to identify which words most influenced whether a prompt was classified as harmful or harmless.",
  experimentsParagraphs: [
    "Claude 3 Haiku achieved the strongest baseline performance, with low false negative and false positive rates across both datasets. GPT-3.5-Turbo was more likely to answer harmful prompts without refusal. Prompt engineering substantially improved GPT's safety performance, but the same prompts caused Claude to over-refuse even benign political questions, demonstrating that prompt strategies are highly model-dependent.",
    "The research also found that persuasion-targeting questions were significantly harder for models than overtly harmful prompts. Subtle wording around influence, messaging, and voter persuasion often bypassed safety mechanisms despite underlying manipulative intent.",
    "Across demographic groups, overall disparities were limited, but questions involving Muslims were more likely to be flagged as harmful after aggressive prompting.",
    "SHAP analysis further showed that words related to political persuasion — such as \"leverage,\" \"ads,\" and \"persuade\" — influenced model behavior more strongly than demographic labels themselves.",
    "These findings highlight broader sociotechnical tradeoffs in election-related AI safety. Systems with high false negatives may enable manipulation and misinformation, while systems with high false positives risk suppressing legitimate political discussion or disproportionately over-refusing content involving certain groups.",
  ],
  conclusion:
    "This research demonstrates that election-related AI safety is not simply a technical classification problem, but a broader sociotechnical challenge involving fairness, political participation, and democratic trust. Ultimately, the work emphasizes the importance of carefully evaluating both model choice and prompting strategies when deploying LLMs in politically sensitive contexts.",
  furtherResearch:
    "Future work should move beyond simple refusal rates and examine the quality and content of refusals themselves, including whether models still provide indirect persuasive guidance after refusing a prompt. Another important direction is studying multi-turn interactions, where users may gradually pressure models into changing their stance over time. Finally, because concepts like \"harmful\" political persuasion are inherently subjective, future evaluation frameworks should incorporate perspectives from a broader range of stakeholders, including voters, policymakers, election officials, and impacted communities.",
};

const PORTFOLIO_PROJECTS = [
  {
    id: "law-law-land",
    title: "Law Law Land",
    description:
      "Best Use of AI for Social Good, Stanford CodeX Social Impact, AI, and Law Bootcamp",
    awardIcon: "/portfolio/award-ribbon.png",
    image: "/portfolio/lawlawland-group.png",
    dateLabel: "April 2022",
    showModalHero: false,
    detail: LAW_LAW_LAND_DETAIL,
    categories: ["llms", "product", "tech-policy-ethics"],
  },
  {
    id: "mitigating-discord-harassment",
    title: "Mitigating Harassment on Discord",
    description: "Top 5 Team, Stanford University Trust and Safety Engineering",
    awardIcon: "/portfolio/award-ribbon.png",
    image: "/portfolio/mitigating-discord-sio.png",
    dateLabel: "June 2023",
    showModalHero: false,
    detail: MITIGATING_DISCORD_DETAIL,
    categories: ["llms", "product", "tech-policy-ethics"],
  },
  {
    id: "keepup",
    title: "KeepUp",
    description: "Google 4th Place Award, Stanford CS194W Software Fair",
    awardIcon: "/portfolio/award-ribbon.png",
    image: "/portfolio/keepup-team.png",
    dateLabel: "June 2024",
    showModalHero: false,
    detail: KEEPUP_DETAIL,
    categories: ["llms", "product"],
  },
  {
    id: "explainai",
    title: "ExplainAI",
    description: "Selected for inaugural offering, Stanford's Lean Launchpad for Education",
    awardIcon: "/portfolio/award-ribbon.png",
    image: "/portfolio/explainai-llp.png",
    dateLabel: "September 2024",
    showModalHero: false,
    detail: EXPLAINAI_DETAIL,
    categories: ["llms", "product"],
  },
  {
    id: "ethics-elections-llm",
    title: "Ethics for Elections: Assessing and Improving LLM Performance on the Anthropic Elections Questions Dataset",
    description: "Stanford CS281 Ethics of Artificial Intelligence",
    image: "/portfolio/elections-dataset-hf.png",
    dateLabel: "June 2025",
    showModalHero: false,
    detail: ELECTIONS_ETHICS_DETAIL,
    categories: ["llms", "product", "tech-policy-ethics"],
  },
  {
    id: "charity-abroad-community-at-home",
    title: "Charity Abroad, Community at Home",
    description: "The Lunsford Award for Oral Presentation of Research, Nominee",
    awardIcon: "/portfolio/award-ribbon.png",
    image: "/portfolio/charity-abroad-select-chef.png",
    dateLabel: "March 2022",
    href: "https://pritirangnekar.substack.com/p/charity-abroad-community-at-home",
    categories: ["strategy-research"],
  },
  {
    id: "tale-two-cities-remembrance",
    title: "A Tale of Two Cities: Remembrance in Berlin and Philadelphia",
    image: "/portfolio/tale-two-cities-berlin.png",
    dateLabel: "June 2022",
    href: "https://pritirangnekar.substack.com/p/a-tale-of-two-cities-remembrance",
    categories: ["strategy-research"],
  },
  {
    id: "citizen-science-river-thames",
    title: "Citizen Science for the River Thames",
    image: "/portfolio/citizen-science-thames.png",
    dateLabel: "December 2023",
    href: "https://pritirangnekar.substack.com/p/citizen-science-for-the-river-thames",
    categories: ["strategy-research"],
  },
];

function PortfolioDetailModal({ project, onClose }) {
  if (!project?.detail) return null;
  const d = project.detail;
  const isDiscord = d.variant === "discord";
  const isKeepUp = d.variant === "keepup";
  const isExplainAI = d.variant === "explainai";
  const isElectionsEthics = d.variant === "electionsEthics";

  const personaRows = d.persona
    ? [
        ["Name", d.persona.name],
        ["Age", d.persona.age],
        ["Location", d.persona.location],
        ["Background", d.persona.background],
        ["Role", d.persona.role],
        ["Lifestyle", d.persona.lifestyle],
      ]
    : [];

  return (
    <div className="portfolio-modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="portfolio-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="portfolio-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="portfolio-modal-close" onClick={onClose} aria-label="Close dialog">
          ×
        </button>

        <h2 id="portfolio-modal-title" className="sr-only">
          {project.title}
        </h2>

        {d.newsUrl ? (
          <div className="portfolio-modal-lead">
            <div className="portfolio-modal-fact">
              <span className="portfolio-modal-chip portfolio-modal-chip--news">In the News</span>
              <div className="portfolio-modal-fact-body portfolio-modal-fact-body--link">
                <a href={d.newsUrl} target="_blank" rel="noreferrer">
                  {d.newsLabel}
                </a>
              </div>
            </div>
          </div>
        ) : null}

        {project.showModalHero !== false ? (
          <div className="portfolio-modal-hero-wrap">
            <img className="portfolio-modal-hero" src={project.image} alt="" width={720} height={450} />
          </div>
        ) : null}

        <section className="portfolio-modal-section portfolio-modal-section--first">
          <h3 className="portfolio-modal-section-heading">{d.problemSectionTitle ?? "Problem Statement"}</h3>
          <p>{d.problemStatement}</p>
        </section>

        {isDiscord ? (
          <>
            <section className="portfolio-modal-section">
              <h3 className="portfolio-modal-section-heading">Policy Approach</h3>
              {d.policyApproachParagraphs.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </section>

            <section className="portfolio-modal-section">
              <h3 className="portfolio-modal-section-heading">Technical Approach</h3>
              <ul className="portfolio-modal-list portfolio-modal-list--spaced">
                {d.technicalApproachBullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="portfolio-modal-section">
              <h3 className="portfolio-modal-section-heading">Evaluation</h3>
              <p>The automated flagging system achieved:</p>
              <ul className="portfolio-modal-list portfolio-modal-list--spaced">
                <li>
                  {d.evaluationHarassment.main}
                  <ul className="portfolio-modal-sublist">
                    {d.evaluationHarassment.subBullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </li>
              </ul>
              <p className="portfolio-modal-note">
                <strong>e.g.</strong> {d.evaluationHarassmentExample}
              </p>
              <ul className="portfolio-modal-list portfolio-modal-list--spaced portfolio-modal-list--tight-top">
                <li>
                  {d.evaluationNonHarassment.main}
                  <ul className="portfolio-modal-sublist">
                    {d.evaluationNonHarassment.subBullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </li>
              </ul>
              <p className="portfolio-modal-note">
                <strong>e.g.</strong> {d.evaluationNonHarassmentExample}
              </p>
            </section>

            <section className="portfolio-modal-section">
              <h3 className="portfolio-modal-section-heading">Future Improvements</h3>
              <ul className="portfolio-modal-list portfolio-modal-list--spaced">
                {d.futureImprovementBullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </>
        ) : isKeepUp ? (
          <>
            <section className="portfolio-modal-section">
              <h3 className="portfolio-modal-section-heading">Approach</h3>
              <p>{d.approachStatement}</p>
            </section>

            <section className="portfolio-modal-section">
              <h3 className="portfolio-modal-section-heading">Market Positioning</h3>
              <p>{d.marketPositioning}</p>
            </section>

            <section className="portfolio-modal-section">
              <h3 className="portfolio-modal-section-heading">Testing</h3>
              <ul className="portfolio-modal-list portfolio-modal-list--spaced">
                {d.testingBullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="portfolio-modal-section">
              <h3 className="portfolio-modal-section-heading">Features</h3>
              <ul className="portfolio-modal-features">
                {d.featureBullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </>
        ) : isExplainAI ? (
          <>
            <section className="portfolio-modal-section">
              <h3 className="portfolio-modal-section-heading">Customer Segments</h3>
              <p>{d.customerSegmentsIntro}</p>
              <ul className="portfolio-modal-list portfolio-modal-list--spaced">
                {d.customerSegmentsBullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>{d.customerSegmentsClosing}</p>
            </section>

            <section className="portfolio-modal-section">
              <h3 className="portfolio-modal-section-heading">Market Positioning</h3>
              <p>{d.marketPositioningIntro}</p>
              <ul className="portfolio-modal-features">
                {d.marketPositioningBullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="portfolio-modal-section">
              <h3 className="portfolio-modal-section-heading">Minimum Viable Product</h3>
              <p>{d.mvpExploredIntro}</p>
              <ul className="portfolio-modal-list portfolio-modal-list--spaced">
                {d.mvpExploredBullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="portfolio-modal-list-tight-p">{d.mvpLearningsIntro}</p>
              <ul className="portfolio-modal-list portfolio-modal-list--spaced portfolio-modal-list--tight-top">
                {d.mvpLearningBullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="portfolio-modal-section">
              <h3 className="portfolio-modal-section-heading">GTM Strategy</h3>
              {d.gtmParagraphs.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </section>
          </>
        ) : isElectionsEthics ? (
          <>
            <section className="portfolio-modal-section">
              <h3 className="portfolio-modal-section-heading">Related Work</h3>
              <p>{d.relatedWork}</p>
            </section>

            <section className="portfolio-modal-section">
              <h3 className="portfolio-modal-section-heading">Methods</h3>
              <p>{d.methods}</p>
            </section>

            <section className="portfolio-modal-section">
              <h3 className="portfolio-modal-section-heading">Experiments and Sociotechnical Analysis</h3>
              {d.experimentsParagraphs.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </section>

            <section className="portfolio-modal-section">
              <h3 className="portfolio-modal-section-heading">Conclusion</h3>
              <p>{d.conclusion}</p>
            </section>

            <section className="portfolio-modal-section">
              <h3 className="portfolio-modal-section-heading">Further Research</h3>
              <p>{d.furtherResearch}</p>
            </section>
          </>
        ) : (
          <>
            {d.persona ? (
              <section className="portfolio-modal-section">
                <h3 className="portfolio-modal-section-heading">User Persona</h3>
                <table className="portfolio-modal-persona-table">
                  <tbody>
                    {personaRows.map(([label, value]) => (
                      <tr key={label}>
                        <th scope="row">{label}</th>
                        <td>{value}</td>
                      </tr>
                    ))}
                    <tr>
                      <th scope="row">Goals</th>
                      <td>
                        <ul className="portfolio-modal-table-list">
                          {d.goals.map((g) => (
                            <li key={g}>{g}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Frustrations</th>
                      <td>
                        <ul className="portfolio-modal-table-list">
                          {d.frustrations.map((f) => (
                            <li key={f}>{f}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
            ) : null}

            <section className="portfolio-modal-section">
              <h3 className="portfolio-modal-section-heading">Market Analysis</h3>
              <p>{d.marketAnalysis}</p>
            </section>

            <section className="portfolio-modal-section">
              <h3 className="portfolio-modal-section-heading">Solution</h3>
              <p>{d.solution}</p>
            </section>

            <section className="portfolio-modal-section">
              <h3 className="portfolio-modal-section-heading">Key Features</h3>
              <ul className="portfolio-modal-features">
                {d.keyFeatures.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            {d.legalEthicalConsiderations?.length ? (
              <section className="portfolio-modal-section">
                <h3 className="portfolio-modal-section-heading">Legal and Ethical Considerations</h3>
                <ul className="portfolio-modal-features">
                  {d.legalEthicalConsiderations.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

function PortfolioCardTitle({ project }) {
  const catIds = project.categories ?? [];
  return (
    <div className="portfolio-card-title-row">
      <h2 className="portfolio-card-title">{project.title}</h2>
      {project.dateLabel ? (
        <span className="portfolio-card-date-label">{project.dateLabel}</span>
      ) : null}
      {catIds.length > 0 ? (
        <div className="portfolio-card-category-chips" aria-label="Categories">
          {catIds.map((cid) => (
            <span key={cid} className="portfolio-card-category-chip">
              {PROJECT_CATEGORY_LABEL[cid] ?? cid}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function PortfolioCardDescription({ project }) {
  const text = project.description?.trim();
  if (!text) return null;
  if (project.awardIcon) {
    return (
      <p className="portfolio-card-desc portfolio-card-desc--with-award">
        <img
          className="portfolio-card-award-icon"
          src={project.awardIcon}
          alt=""
          width={44}
          height={44}
          decoding="async"
        />
        <span>{text}</span>
      </p>
    );
  }
  return <p className="portfolio-card-desc">{text}</p>;
}

function PortfolioPage() {
  const [openProject, setOpenProject] = useState(null);
  const [selectedProjectFilters, setSelectedProjectFilters] = useState(() => new Set([FILTER_ALL_ID]));

  const toggleProjectFilter = (id) => {
    setSelectedProjectFilters((prev) => toggleFilterSelectionWithAll(prev, id));
  };

  const visibleProjects = useMemo(
    () => PORTFOLIO_PROJECTS.filter((p) => matchesCategoryFilter(selectedProjectFilters, p.categories)),
    [selectedProjectFilters],
  );

  useEffect(() => {
    if (!openProject) return;
    if (!visibleProjects.some((p) => p.id === openProject.id)) setOpenProject(null);
  }, [visibleProjects, openProject]);

  useEffect(() => {
    if (!openProject) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setOpenProject(null);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openProject]);

  return (
    <main className="page portfolio-page">
      <section className="portfolio-section" aria-label="Projects">
        <CategoryFilterBar
          options={PROJECT_FILTER_BAR_OPTIONS}
          selectedIds={selectedProjectFilters}
          onToggle={toggleProjectFilter}
          onClear={() => setSelectedProjectFilters(new Set([FILTER_ALL_ID]))}
          groupLabel="Filter projects by category"
        />
        {visibleProjects.length === 0 ? (
          <p className="category-filter-empty">No projects match these filters.</p>
        ) : (
        <div className="portfolio-grid">
          {visibleProjects.map((project) =>
            project.detail ? (
              <article
                key={project.id}
                className="portfolio-card portfolio-card--clickable"
                onClick={() => setOpenProject(project)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpenProject(project);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Open details: ${project.title}`}
              >
                <div className="portfolio-card-image-wrap">
                  <img
                    className="portfolio-card-image"
                    src={project.image}
                    alt=""
                    width={640}
                    height={400}
                    loading="lazy"
                  />
                </div>
                <div className="portfolio-card-body">
                  <PortfolioCardTitle project={project} />
                  <PortfolioCardDescription project={project} />
                  <span className="portfolio-card-more">Read More &gt;</span>
                </div>
              </article>
            ) : (
              <article key={project.id} className="portfolio-card">
                <a
                  href={project.href}
                  className="portfolio-card-image-wrap"
                  tabIndex={-1}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="portfolio-card-image"
                    src={project.image}
                    alt=""
                    width={640}
                    height={400}
                    loading="lazy"
                  />
                </a>
                <div className="portfolio-card-body">
                  <PortfolioCardTitle project={project} />
                  <PortfolioCardDescription project={project} />
                  <a className="portfolio-card-more" href={project.href} target="_blank" rel="noreferrer">
                    Read More &gt;
                  </a>
                </div>
              </article>
            ),
          )}
        </div>
        )}
      </section>

      {openProject ? (
        <PortfolioDetailModal project={openProject} onClose={() => setOpenProject(null)} />
      ) : null}
    </main>
  );
}

function TopNav({ currentPath }) {
  return (
    <header className="top-nav">
      <nav>
        <a className={`tab ${currentPath === "/" ? "active" : ""}`} href="#/">
          Home
        </a>
        <a className={`tab ${currentPath === "/career" ? "active" : ""}`} href="#/career">
          Career
        </a>
        <a className={`tab ${currentPath === "/projects" ? "active" : ""}`} href="#/projects">
          Projects
        </a>
        <a className={`tab ${currentPath === "/explorations" ? "active" : ""}`} href="#/explorations">
          Explorations
        </a>
      </nav>
    </header>
  );
}

export default function App() {
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    const readPath = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash === "/projects" || hash === "/portfolio") return setCurrentPath("/projects");
      if (hash === "/career") return setCurrentPath("/career");
      if (hash === "/explorations") return setCurrentPath("/explorations");
      return setCurrentPath("/");
    };

    readPath();
    window.addEventListener("hashchange", readPath);
    return () => window.removeEventListener("hashchange", readPath);
  }, []);

  return (
    <>
      <TopNav currentPath={currentPath} />
      {currentPath === "/career" ? <CareerPage /> : null}
      {currentPath === "/explorations" ? <ExplorationsPage /> : null}
      {currentPath === "/projects" ? <PortfolioPage /> : null}
      {currentPath === "/" ? <HomePage /> : null}
    </>
  );
}
