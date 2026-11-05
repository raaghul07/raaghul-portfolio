import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft, Github, Linkedin, Mail, MapPin, Database, BrainCircuit, Sparkles, Layers, Menu, X, CheckCircle2, Download, Cloud, House, Users, Server, MessageSquareText } from 'lucide-react';
import './style.css';

const CONTACT = {
  email: 'raaghuln03@gmail.com', // Professional email from resume
  linkedin: '', // Add your full LinkedIn profile URL
  github: 'https://github.com/raaghul07',
};

const projects = [
  {
    slug: 'minirag', num: '01', type: 'RETRIEVAL SYSTEMS', name: 'MiniRAG Engine',
    desc: 'A modular retrieval pipeline combining dense vector search, BM25, reciprocal rank fusion, and cross-encoder reranking for stronger document search.',
    tags: ['Python', 'FAISS', 'BM25', 'SentenceTransformers'],
    icon: Database, repo: '',
    overview: 'MiniRAG Engine is a document-retrieval project designed to make relevant information easier to find across unstructured text. It combines semantic and keyword retrieval rather than relying on either approach alone.',
    challenge: 'A semantic-only retriever can miss exact identifiers and technical terms, while keyword-only search can miss paraphrases. The goal was to combine both signals and improve result ordering.',
    architecture: ['Extract text with PyMuPDF', 'Split documents into retrievable chunks', 'Create dense embeddings with all-MiniLM-L6-v2', 'Search with FAISS and BM25', 'Fuse rankings using reciprocal rank fusion', 'Rerank candidates using a CrossEncoder'],
    decisions: ['Hybrid retrieval balances semantic similarity with exact-term matching.', 'Reciprocal rank fusion combines independently ranked result lists.', 'Cross-encoder reranking provides a more detailed relevance comparison for shortlisted chunks.'],
    outcome: 'Implemented a modular hybrid-retrieval workflow. Quantitative retrieval benchmarks have not been added to this case study yet.',
    next: 'Add Recall@k, MRR, latency benchmarks, and a reproducible evaluation dataset.'
  },
  {
    slug: 'kg-rag', num: '02', type: 'KNOWLEDGE GRAPHS', name: 'KG-RAG + Consistency Checking',
    desc: 'Hybrid knowledge-graph and vector retrieval over financial filings, with a consistency checker designed to reduce unsupported LLM answers.',
    tags: ['Neo4j', 'FAISS', 'spaCy', 'LLMs'], icon: BrainCircuit, repo: '',
    overview: 'An academic project exploring how structured knowledge graphs and vector retrieval can complement each other when answering questions about company financial filings.',
    challenge: 'Vector retrieval can provide relevant passages without reliably representing relationships between entities. The project investigated whether graph-based context and consistency checks could reduce unsupported answers.',
    architecture: ['Process 10-K filings for AAPL, MSFT, AMZN, and NVDA (2019–2024)', 'Extract entities using spaCy', 'Represent entities and relationships in Neo4j', 'Index text for FAISS vector retrieval', 'Combine graph and vector evidence', 'Generate an answer and run a consistency check'],
    decisions: ['Knowledge graphs represent explicit entity relationships.', 'Vector search helps retrieve semantically related narrative passages.', 'Consistency checking examines whether the answer is supported by retrieved evidence.'],
    outcome: 'In the project evaluation, vector-only retrieval showed approximately 20% hallucination, while the tested graph-only and hybrid configurations showed 0%. These are dataset-specific results, not general performance guarantees.',
    next: 'Publish evaluation prompts, sample sizes, and the scoring rubric alongside the code.'
  },
  {
    slug: 'javaapex', num: '03', type: 'GENAI ENGINEERING', name: 'JavaAPEX — AI-Assisted Migration',
    desc: 'Exploring evidence-grounded GenAI explanations for Java migration discovery and strategy, including dependency analysis and risk assessment.',
    tags: ['FastAPI', 'React', 'Docker', 'GenAI'], icon: Layers, repo: '',
    overview: 'JavaAPEX is a Java modernization workflow. My work focuses on exploring where GenAI can help explain migration risks, dependency findings, and Java-version recommendations.',
    challenge: 'Migration reports can contain dependency and vulnerability findings that require technical interpretation. AI explanations are useful only when they remain grounded in the underlying analysis.',
    architecture: ['Analyze a public Java repository during discovery', 'Collect dependency and vulnerability evidence', 'Classify migration risks', 'Use GenAI to draft evidence-based explanations', 'Validate explanations against source findings', 'Present recommendations in the strategy workflow'],
    decisions: ['Treat deterministic scan results as the source of truth.', 'Keep risk classification and AI-generated explanation conceptually separate.', 'Validate suggested Java upgrades against actual dependency compatibility.'],
    outcome: 'Local Docker-based development environment and relevant backend integration points were identified. AI-assisted explanation and validation work is presented as ongoing, not as a completed production feature.',
    next: 'Complete end-to-end tests on public repositories and document validated migration examples.'
  },
  {
    slug: 'satellite', num: '04', type: 'COMPUTER VISION', name: 'Satellite Disaster Assessment',
    desc: 'Led a five-person ASU capstone team studying before/after disaster satellite imagery and building-level damage classification.',
    tags: ['PyTorch', 'ResNet-18', 'xView2', 'Computer Vision'], icon: Sparkles, repo: '',
    overview: 'ASU graduate team capstone investigating building damage from paired pre- and post-disaster satellite imagery. The shared research notebook implements a six-channel ResNet-18 that combines RGB images from both time points to predict four building-damage classes.',
    challenge: 'Building-level labels and satellite imagery must be matched accurately across disaster scenes. Data imbalance, differences in annotation quality, and scene leakage can distort evaluation.',
    architecture: ['Pair before/after satellite images and building polygons', 'Crop building regions and prepare four-class labels', 'Stack pre/post RGB inputs into six-channel tensors', 'Train a modified ResNet-18 with class-weighted loss', 'Evaluate on a scene-disjoint holdout set', 'Review confusion matrix and example building imagery'],
    decisions: ['Use paired RGB imagery to expose changes between the two observation dates.', 'Modify the first ResNet-18 convolution for six input channels.', 'Use scene-disjoint holdout evaluation and class-aware loss to make the experiment more meaningful.'],
    outcome: 'The shared notebook reports 84.6% holdout accuracy and 0.738 macro-F1 across 53,137 evaluated buildings. These are notebook-reported building-level results from the team experiment, not independently reproduced metrics.',
    next: 'Extend evaluation across disaster types and compare additional architectures with documented, reproducible splits.'

  }
];

// Place your actual resume at public/resume.pdf, then change this to '/resume.pdf'.
const RESUME_FILE = '/resume.pdf';

// Additional public GitHub work. Keep the four case studies above as featured work.
const moreProjects = [
  { name: 'USA Real Estate Price Prediction', category: 'MACHINE LEARNING', description: 'Exploratory analysis and Random Forest regression on US property listings.', tags: ['Python', 'Random Forest', 'EDA'], url: 'https://github.com/raaghul07/predicting-usa-real-estate-prices', icon: House, accent: 'cyan' },
  { name: 'Telecom Customer Churn Prediction', category: 'PREDICTIVE ANALYTICS', description: 'Customer churn classification with Logistic Regression and Random Forest.', tags: ['Classification', 'Scikit-learn', 'ROC-AUC'], url: 'https://github.com/raaghul07/telecom-customer-churn-prediction', icon: Users, accent: 'lime' },
  { name: 'AWS Real Estate Data Analysis', category: 'CLOUD ANALYTICS', description: 'Serverless querying and analysis of real-estate data using S3, Athena, and SQL.', tags: ['AWS S3', 'Athena', 'SQL'], url: 'https://github.com/raaghul07/aws-real-estate-data-analysis', icon: Cloud, accent: 'violet' },
  { name: 'Serverless Real Estate API', category: 'BACKEND / CLOUD', description: 'Python REST API built with AWS Lambda and API Gateway.', tags: ['AWS Lambda', 'API Gateway', 'Python'], url: 'https://github.com/raaghul07/serverless-real-estate-api', icon: Server, accent: 'coral' },
  { name: 'Amazon Review Sentiment Analysis', category: 'NATURAL LANGUAGE PROCESSING', description: 'Sentiment modeling and text analysis using TF-IDF and transformer-based methods.', tags: ['NLP', 'TF-IDF', 'DistilBERT'], url: 'https://github.com/raaghul07/amazon-review-sentiment-analysis', icon: MessageSquareText, accent: 'cyan' }
];

const jobs = [
  { role: 'Data Engineering Intern', org: 'Ford', detail: 'Built Python/SQL ETL pipelines processing 1M+ rows daily and improved Power BI refresh performance by 40%.' },
  { role: 'AI Engineering Intern', org: 'Tech Mahindra', detail: 'Developed a transformer-based support chatbot, achieving approximately 89% F1 and reducing manual ticket workload by 32%.' },
  { role: 'Machine Learning Engineering Intern', org: 'Flex', detail: 'Worked on predictive maintenance models and feature pipelines, improving model accuracy by 15%.' },
  { role: 'GenAI & Software Projects', org: 'Sorim Technologies', detail: 'Built LLM-powered applications and RAG workflows with FastAPI and retrieval systems.' }
];
const achievements = [
  { number: '1M+', label: 'Records processed daily', source: 'FORD / DATA ENGINEERING' },
  { number: '89%', label: 'NLP model F1 score', source: 'TECH MAHINDRA / AI ENGINEERING' },
  { number: '40%', label: 'Faster reporting refresh', source: 'FORD / POWER BI' }
];

function AIPipeline() {
  const steps = [
    { icon: Database, name: 'DATA', sub: 'Ingestion', color: 'cyan' },
    { icon: Layers, name: 'RETRIEVE', sub: 'FAISS + BM25', color: 'lime' },
    { icon: BrainCircuit, name: 'REASON', sub: 'LLM + RAG', color: 'coral' },
    { icon: Sparkles, name: 'INSIGHTS', sub: 'Grounded output', color: 'violet' }
  ];
  return <div className="hero-art pipeline-art" aria-label="AI pipeline visualization">
    <div className="pipeline-header"><span>AI SYSTEM / 001</span><span className="pipeline-live">● SYSTEM FLOW</span></div>
    <div className="pipeline-steps">{steps.map((step, i) => { const Icon = step.icon; return <div className={'pipeline-step ' + step.color} key={step.name}><div className="pipeline-icon"><Icon size={24}/></div><span className="pipeline-number">0{i + 1}</span><strong>{step.name}</strong><small>{step.sub}</small></div>; })}</div>
    <div className="pipeline-footer"><span>PYTHON / VECTOR SEARCH / GENERATIVE AI</span><span>↗</span></div>
  </div>;
}

function Header() {
  const [menu, setMenu] = React.useState(false);
  const location = useLocation();
  React.useEffect(() => setMenu(false), [location.pathname]);
  return <header className="nav wrap">
    <Link className="brand" to="/">RK<span>.</span></Link>
    <nav className={menu ? 'links open' : 'links'} aria-label="Main navigation">
      {[['About', '/#about'], ['Projects', '/#projects'], ['Experience', '/#experience'], ['Contact', '/#contact']].map(([title, href]) => <Link key={title} to={href} onClick={() => setMenu(false)}>{title}</Link>)}
    </nav>
    <a className="nav-cta" href={RESUME_FILE} download="Raaghul_Nataraj_Kannan_Resume.pdf">Download resume <Download size={15}/></a>
    <button className="mobile-menu" type="button" aria-label="Toggle navigation" aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button>
  </header>;
}

function ScrollManager() {
  const location = useLocation();
  React.useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const frame = requestAnimationFrame(scroll);
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname, location.hash]);
  return null;
}

function SectionLabel({ children }) { return <div className="section-label"><span>{children}</span><div/></div>; }

function Home() {
  return <main>
    <section className="hero wrap" id="home">
      <div className="eyebrow"><span className="status-dot"/> OPEN TO AI / DATA OPPORTUNITIES</div>
      <p className="intro">Hi, I'm Raaghul <span className="wave">✳</span></p>
      <h1>From raw data<br/>to <em>intelligent systems.</em></h1>
      <p className="hero-sub">AI Engineer & Data Scientist building practical machine learning systems, retrieval-augmented generation applications, and scalable data pipelines.</p>
      <div className="actions"><Link className="primary" to="/#projects">Explore my work <ArrowUpRight size={17}/></Link>{RESUME_FILE ? <a className="secondary" href={RESUME_FILE} download="Raaghul_Nataraj_Kannan_Resume.pdf">Download resume <Download size={17}/></a> : <Link className="secondary" to="/#contact">Get in touch <ArrowUpRight size={17}/></Link>}</div>
      <div className="hero-meta"><span><MapPin size={15}/> Tempe, Arizona</span><span>MS Data Science · Arizona State University</span></div>
      <AIPipeline/>
    </section>
    <section className="achievements wrap" aria-label="Professional achievements">{achievements.map(a => <div className="achievement-card" key={a.number}><strong>{a.number}</strong><span>{a.label}</span><small>{a.source}</small></div>)}</section>
    <section className="section wrap" id="about"><SectionLabel>01 / ABOUT</SectionLabel><div className="about-grid"><h2>Turning complex problems into <em>practical AI.</em></h2><div><p>I'm a Data Science master's graduate from Arizona State University with hands-on experience across data engineering, machine learning, and generative AI.</p><p>I enjoy building systems end to end — from reliable data pipelines and predictive models to retrieval systems that make LLM applications more useful and grounded.</p><div className="chips">{['Python','SQL','PyTorch','RAG / LLMs','FastAPI','Docker','AWS','Kafka','Neo4j','Power BI'].map(t => <span key={t}>{t}</span>)}</div></div></div></section>
    <section className="section wrap" id="projects"><SectionLabel>02 / SELECTED WORK</SectionLabel><div className="section-head"><h2>Projects that <em>ship ideas.</em></h2><p>Applied AI, retrieval systems, and data engineering. Select a project to explore the case study.</p></div><div className="project-grid">{projects.map((p,i) => { const Icon = p.icon; return <Link className="project case-project-link" key={p.slug} to={'/projects/' + p.slug} aria-label={'Read case study: ' + p.name}><div className={'project-visual visual-' + i}><span className="visual-label">{p.type}</span><div className="project-image-frame"><ProjectArtwork slug={p.slug} small/></div><span className="visual-num">{p.num}</span></div><div className="project-body"><span className="project-index">PROJECT / {p.num}</span><h3>{p.name}</h3><p>{p.desc}</p><div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div><span className="case-card-action">Explore case study <ArrowUpRight size={16}/></span></div></Link>; })}</div></section>
    <section className="section wrap more-work" id="more-projects"><SectionLabel>03 / MORE FROM GITHUB</SectionLabel><div className="section-head"><h2>More things I've <em>built.</em></h2><p>Additional machine learning, NLP, and cloud projects. Each card links directly to its public repository.</p></div><div className="more-grid">{moreProjects.map((p, i) => { const Icon = p.icon; return <a className={'more-card accent-' + p.accent} key={p.url} href={p.url} target="_blank" rel="noopener noreferrer" aria-label={'View GitHub repository: ' + p.name}><div className="more-card-top"><div className="more-card-art"><img src={extraArt[i]} loading="lazy" alt={"Conceptual illustration: " + p.name}/></div><ArrowUpRight size={20}/></div><span className="more-category">{p.category} / {String(i + 5).padStart(2,'0')}</span><h3>{p.name}</h3><p>{p.description}</p><div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div><span className="more-repo"><Github size={16}/> View on GitHub <ArrowUpRight size={14}/></span></a>; })}</div><div className="github-all"><a className="secondary" href={CONTACT.github} target="_blank" rel="noopener noreferrer"><Github size={18}/> Explore all repositories <ArrowUpRight size={17}/></a></div></section>
    <section className="section wrap" id="experience"><SectionLabel>04 / EXPERIENCE</SectionLabel><h2>Where I've <em>made an impact.</em></h2><div className="timeline">{jobs.map((j,i) => <div className="job" key={j.org}><span className="job-no">0{i+1}</span><div><h3>{j.role}</h3><span className="org">{j.org}</span></div><p>{j.detail}</p></div>)}</div><div className="credential"><span>EDUCATION & CERTIFICATION</span><strong>M.S. Data Science · Arizona State University</strong><strong>AWS Certified Cloud Practitioner</strong></div></section>
    <section className="contact section wrap" id="contact"><SectionLabel>05 / CONTACT</SectionLabel><div className="contact-inner"><div className="eyebrow"><span className="status-dot"/> LET'S BUILD SOMETHING MEANINGFUL</div><h2>Have an opportunity<br/>in <em>mind?</em></h2><p>I'm interested in AI engineering, data science, and data engineering opportunities. Let's connect.</p>{CONTACT.email ? <a className="primary" href={'mailto:' + CONTACT.email}>Send me an email <Mail size={17}/></a> : <p className="contact-setup">Add your email to the CONTACT settings in main.jsx to enable the email button.</p>}{RESUME_FILE && <a className="secondary resume-contact" href={RESUME_FILE} download="Raaghul_Nataraj_Kannan_Resume.pdf"><Download size={17}/> Download resume</a>}<div className="social">{CONTACT.linkedin && <a href={CONTACT.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18}/> LinkedIn</a>}{CONTACT.github && <a href={CONTACT.github} target="_blank" rel="noreferrer"><Github size={18}/> GitHub</a>}</div></div></section>
  </main>;
}


// Responsive, project-specific system illustrations. All labels represent architecture,
// not screenshots or claims of a deployed production environment.
const visualFlows = {
  minirag: { eyebrow: 'HYBRID RETRIEVAL', nodes: [
    ['DOCUMENTS', 'PyMuPDF', 'cyan'], ['CHUNK + EMBED', 'MiniLM-L6-v2', 'violet'],
    ['DENSE SEARCH', 'FAISS', 'cyan'], ['LEXICAL SEARCH', 'BM25', 'lime'],
    ['RANK FUSION', 'RRF', 'coral'], ['RERANK', 'CrossEncoder', 'violet']
  ], foot: 'SEMANTIC + KEYWORD SIGNALS' },
  'kg-rag': { eyebrow: 'EVIDENCE GRAPH', nodes: [
    ['SOURCE', '10-K filings', 'cyan'], ['ENTITY EXTRACTION', 'spaCy NER', 'violet'],
    ['GRAPH CONTEXT', 'Neo4j', 'lime'], ['VECTOR CONTEXT', 'FAISS', 'cyan'],
    ['GENERATION', 'LLM', 'coral'], ['CHECK', 'Consistency', 'lime']
  ], foot: 'GRAPH + VECTOR EVIDENCE' },
  javaapex: { eyebrow: 'MIGRATION INTELLIGENCE', nodes: [
    ['INPUT', 'Java repo', 'cyan'], ['DISCOVERY', 'Dependencies', 'violet'],
    ['EVIDENCE', 'Vulnerabilities', 'coral'], ['RISK', 'LOW / MED / HIGH', 'lime'],
    ['AI ASSIST', 'Explanation', 'violet'], ['REVIEW', 'Validate findings', 'cyan']
  ], foot: 'EXPLORATORY WORKFLOW · IN PROGRESS' },
  satellite: { eyebrow: 'VISION + LANGUAGE', nodes: [
    ['IMAGERY', 'Before / after', 'cyan'], ['DATA', 'xView2 / SpaceNet', 'violet'],
    ['PREPROCESS', 'Image + labels', 'lime'], ['MODEL', 'PyTorch', 'coral'],
    ['ANALYZE', 'Damage classes', 'violet'], ['OUTPUT', 'Structured report', 'cyan']
  ], foot: 'RESEARCH CAPSTONE WORKFLOW' }
};

function ProjectVisual({ slug, compact = false }) {
  const flow = visualFlows[slug];
  if (!flow) return null;
  return <div className={'system-visual system-' + slug + (compact ? ' system-compact' : '')} role="img" aria-label={flow.eyebrow + ' architecture illustration'}>
    <div className="system-top"><span className="system-signal">●</span><span>{flow.eyebrow}</span><span className="system-top-right">ARCH / 0{Object.keys(visualFlows).indexOf(slug) + 1}</span></div>
    <div className="system-diagram">
      <svg className="system-wires" viewBox="0 0 600 260" preserveAspectRatio="none" aria-hidden="true">
        <defs><linearGradient id={'wire-' + slug} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#4de1d4"/><stop offset=".55" stopColor="#b59aff"/><stop offset="1" stopColor="#c5f277"/></linearGradient></defs>
        <path d="M100 70 L300 70 L500 70 M100 190 L300 190 L500 190 M300 70 L300 190" fill="none" stroke={'url(#wire-' + slug + ')'} strokeWidth="1.8" strokeDasharray="5 7" opacity=".55"/>
        <circle cx="300" cy="130" r="48" fill="none" stroke="#b59aff" strokeWidth="1" strokeDasharray="3 8" opacity=".22"/>
      </svg>
      <div className="system-nodes">{flow.nodes.map(([label, detail, tone], i) => <div className={'system-node tone-' + tone} key={label}>
        <span className="system-node-number">0{i + 1}</span><strong>{label}</strong><small>{detail}</small>
      </div>)}</div>
    </div>
    <div className="system-bottom"><span>◈ SYSTEM BLUEPRINT</span><span>{flow.foot}</span></div>
  </div>;
}


const featuredArt = { minirag: '/visuals/minirag.svg', 'kg-rag': '/visuals/kg-rag.svg', javaapex: '/visuals/javaapex.svg', satellite: '/visuals/satellite-1.webp' };
const extraArt = ['/visuals/real-estate.svg','/visuals/churn.svg','/visuals/aws-analytics.svg','/visuals/serverless.svg','/visuals/sentiment.svg'];
function ProjectArtwork({slug,small=false}) {
  return <div className={'visual-artwork ' + (small?'visual-artwork-small':'')}><img src={featuredArt[slug]} alt={slug==='satellite'?'Actual pre-disaster, post-disaster and target-mask figure from the team xView2 notebook':'Conceptual technical visualization for '+slug} loading="lazy"/><span className="visual-artwork-caption">{slug==='satellite'?'REAL NOTEBOOK FIGURE · XVIEW2':'CONCEPTUAL SYSTEM VISUAL'}</span></div>;
}
function SatelliteGallery() {
 const captions=['Pre/post satellite scenes and ground-truth damage mask','Second satellite scene with damage mask','Building polygons over post-disaster imagery','Paired building-level crops','Notebook gallery of building crops'];
 return <section className="case-section case-wide satellite-gallery"><span className="case-kicker">04 / ACTUAL NOTEBOOK OUTPUTS</span><h2>Real satellite imagery &amp; annotations</h2><p>Figures extracted directly from the team’s xView2 Jupyter notebook. These are dataset examples and annotations, not fabricated model predictions.</p><div className="satellite-gallery-grid">{captions.map((caption,i)=><figure className={'satellite-figure satellite-figure-'+i} key={i}><img src={'/visuals/satellite-'+(i+1)+'.webp'} loading="lazy" alt={caption}/><figcaption>{String(i+1).padStart(2,'0')} / {caption}</figcaption></figure>)}</div><div className="satellite-metrics"><div><strong>84.6%</strong><span>Holdout accuracy</span></div><div><strong>0.738</strong><span>Holdout macro-F1</span></div><div><strong>53,137</strong><span>Evaluated buildings</span></div></div><p className="satellite-source-note">Source: shared team xView2 notebook. Building-level holdout metrics; team experiment, not independently reproduced.</p></section>;
}
function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);
  if (!project) return <main className="wrap case-not-found"><h1>Project not found.</h1><Link className="secondary" to="/#projects">Back to projects <ArrowLeft size={17}/></Link></main>;
  const Icon = project.icon;
  const index = projects.findIndex(p => p.slug === slug);
  const next = projects[(index + 1) % projects.length];
  return <main className="case-study wrap">
    <Link className="case-back" to="/#projects"><ArrowLeft size={17}/> All projects</Link>
    <div className="case-hero"><div><div className="eyebrow"><span className="status-dot"/> {project.type} / PROJECT {project.num}</div><h1>{project.name}</h1><p className="case-lede">{project.desc}</p><div className="tags case-tags">{project.tags.map(t => <span key={t}>{t}</span>)}</div>{project.repo && <a className="secondary case-repo" href={project.repo} target="_blank" rel="noreferrer"><Github size={17}/> {project.slug === 'satellite' ? 'View team repository' : 'View source code'} <ArrowUpRight size={16}/></a>}</div><ProjectArtwork slug={project.slug}/></div>
    <div className="case-content"><div className="case-section"><span className="case-kicker">01 / OVERVIEW</span><h2>What I built</h2><p>{project.overview}</p></div><div className="case-section"><span className="case-kicker">02 / THE CHALLENGE</span><h2>The problem</h2><p>{project.challenge}</p></div><div className="case-section case-wide"><span className="case-kicker">03 / SYSTEM ARCHITECTURE</span><h2>How it works</h2><ProjectVisual slug={project.slug}/><div className="architecture-flow architecture-compact">{project.architecture.slice(0,3).map((step,i) => <div className="architecture-step" key={step}><span>{String(i+1).padStart(2,'0')}</span><p>{step}</p></div>)}</div></div>{project.slug === 'satellite' && <SatelliteGallery/>}<div className="case-section"><span className="case-kicker">05 / ENGINEERING DECISIONS</span><h2>Why this approach</h2><ul className="case-decisions">{project.decisions.map(d => <li key={d}><CheckCircle2 size={19}/><span>{d}</span></li>)}</ul></div><div className="case-section"><span className="case-kicker">06 / OUTCOMES</span><h2>Results & learnings</h2><p>{project.outcome}</p><div className="case-next-step"><strong>Next improvement</strong><p>{project.next}</p></div></div></div>
    <div className="case-bottom"><Link className="secondary" to="/#projects"><ArrowLeft size={17}/> Back to all projects</Link><Link className="primary" to={'/projects/' + next.slug}>Next: {next.name} <ArrowUpRight size={17}/></Link></div>
  </main>;
}

function App() {
  return <BrowserRouter><ScrollManager/><div className="glow glow-one"/><div className="glow glow-two"/><Header/><Routes><Route path="/" element={<Home/>}/><Route path="/projects/:slug" element={<ProjectDetail/>}/><Route path="*" element={<main className="wrap case-not-found"><h1>Page not found.</h1><Link className="primary" to="/">Return home <ArrowUpRight size={17}/></Link></main>}/></Routes><footer className="wrap footer"><span>© {new Date().getFullYear()} Raaghul Nataraj Kannan</span><span>Built with curiosity & code.</span></footer></BrowserRouter>;
}

createRoot(document.getElementById('root')).render(<App/>);
