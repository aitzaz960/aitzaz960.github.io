/**
 * Every word on the site lives here.
 * Components render this — they never hardcode copy.
 * To update the portfolio, edit this file and nothing else.
 */

export const profile = {
  name: ['Aitzaz', 'Ahmad'],
  title: 'Senior Full Stack Engineer',
  location: 'Islamabad, PK · UTC+5',
  availability: 'Open to senior full-stack & backend roles',
  stackLine: [
    'Node.js · NestJS · TypeScript',
    'AWS Lambda · SQS · API Gateway',
    'MySQL · Elasticsearch',
    'React · Next.js',
  ],
  // `b: true` renders the fragment emphasised
  pitch: [
    { t: 'I build products end to end, with my deepest ground behind the API. Four years of ' },
    { t: 'Node.js and NestJS services', b: true },
    { t: ', schemas designed for the load they will actually see, and event-driven architecture on ' },
    { t: 'AWS Lambda and SQS', b: true },
    { t: '. On the other side of the wire, ' },
    { t: 'typed component systems and server-rendered interfaces', b: true },
    { t: ', built with the same care about structure. Currently leading backend architecture at AIO, where that shift cut API latency by ' },
    { t: '40%', b: true },
    { t: ' and infrastructure spend by ' },
    { t: '25%', b: true },
    { t: '.' },
  ],
};

export const nav = [
  { id: 'top', label: 'Overview', mobile: false },
  { id: 'experience', label: 'Experience', mobile: true },
  { id: 'architecture', label: 'The system', mobile: true },
  { id: 'projects', label: 'Projects', mobile: true },
  { id: 'stack', label: 'Stack', mobile: true },
  { id: 'credentials', label: 'Credentials', mobile: false },
  { id: 'contact', label: 'Contact', mobile: true },
];

/**
 * The hero signature: a request walking through the stack.
 * `start` and `span` are percentages of total wall time, so the
 * bars read as a real waterfall rather than a bar chart.
 */
export const trace = {
  method: 'GET',
  path: '/v1/checkout/session',
  status: '200 OK · region ap-south-1',
  total: 182,
  caption: 'The work is knowing which bar to shrink next.',
  hops: [
    { name: 'edge',  detail: '· API Gateway',    start: 0,  span: 7,  ms: 12 },
    { name: 'auth',  detail: '· Lambda (TS)',    start: 7,  span: 13, ms: 24 },
    { name: 'api',   detail: '· Nest service',   start: 20, span: 32, ms: 58 },
    { name: 'data',  detail: '· MySQL, indexed', start: 34, span: 17, ms: 31 },
    { name: 'queue', detail: '· SQS publish',    start: 52, span: 5,  ms: 9,  external: true },
    { name: 'ext',   detail: '· Stripe intent',  start: 57, span: 26, ms: 48, external: true },
  ],
};

export const metrics = [
  { value: '4',  unit: '+',  label: 'Years shipping production systems' },
  { value: '40', unit: '%',  label: 'Lower API latency after redesign' },
  { value: '25', unit: '%',  label: 'Cut from monthly infra spend' },
  { value: '90', unit: '%+', label: 'Backend test coverage held' },
  { value: 'AWS',            label: 'Certified Cloud Practitioner' },
];

export const experience = [
  {
    company: 'AIO',
    role: 'Senior Full Stack Engineer',
    dates: 'Sep 2023 — Present',
    place: 'Pakistan',
    mode: 'Full-time',
    tenure: 'Current role',
    duties: [
      { tag: 'Architecture', text: 'Own the backend architecture — **Node.js and TypeScript services on NestJS**, with layered input validation, structured logging and typed error handling, so a failure arrives with the context needed to fix it rather than a bare stack trace.' },
      { tag: 'Platform', text: 'Broke the request path into **event-driven microservices on AWS Lambda, API Gateway and SQS**. Latency dropped 40% and infrastructure cost 25%, with slow work moved off the critical path into queues.' },
      { tag: 'Data', text: 'Designed a **high-throughput MySQL schema** — normalised, deliberately indexed and tuned for transactional consistency under real-time read load, with query plans checked before ship rather than after the incident.' },
      { tag: 'Interface', text: 'Built the **internal tooling front end** in React and TypeScript against those same services — the screens the operations team lives in, treated with the same rigour as the API underneath.' },
      { tag: 'Integrations', text: 'Integrated **Stripe** for payments and **Twilio** for OTP and messaging behind async handlers, idempotency keys and retry queues — a third-party outage degrades the flow instead of breaking it.' },
      { tag: 'Observability', text: 'Built the internal **Elasticsearch and Kibana dashboards** the team runs on: endpoint health, latency percentiles and database performance across every service, on one screen.' },
      { tag: 'Reliability', text: 'On point for **production incidents**. CloudWatch and the ELK stack to locate the bottleneck, a fix under real traffic, and a metric afterwards that proves it actually held.' },
      { tag: 'Security', text: 'Centralised secrets and per-environment configuration in **AWS Parameter Store and Secrets Manager**, taking credentials out of the deployment path entirely.' },
    ],
    chips: ['TypeScript', 'NestJS', 'Node.js', 'AWS Lambda', 'API Gateway', 'SQS', 'MySQL', 'React', 'Elasticsearch', 'Kibana', 'CloudWatch', 'Stripe', 'Twilio', 'Secrets Manager'],
  },
  {
    company: 'Devsinc',
    role: 'Software Engineer',
    dates: 'Feb 2022 — Sep 2023',
    place: 'Pakistan',
    mode: 'Full-time',
    tenure: '1 yr 8 mo',
    duties: [
      { tag: 'Product', text: 'Shipped full-stack applications for client teams on the **MERN stack** — React and Next.js front ends against Node.js and Express services, owned end to end from schema to screen.' },
      { tag: 'Frontend', text: 'Authored a shared **TypeScript component library** — hooks, Context API, sensible defaults — that became the starting point for new screens and cut UI build time roughly a third across projects.' },
      { tag: 'APIs', text: 'Built **REST APIs in Express** with MySQL access through Knex.js and TypeORM, validating and reshaping data on both sides of the wire so the client and the database never disagreed about a type.' },
      { tag: 'Delivery', text: 'Set up **CI/CD with GitHub Actions and Jenkins**: test, build the Docker image, deploy to staging. No manual steps between a merged PR and something a client could click.' },
      { tag: 'Quality', text: 'Held backend endpoints **above 90% coverage** with Jest, backed by Postman collections for integration runs against live staging.' },
      { tag: 'Infra', text: 'Deployed to **AWS EC2 and Elastic Beanstalk** behind hand-written NGINX configuration for routing and load balancing.' },
      { tag: 'Integrations', text: 'Wired in **SendGrid, Firebase and Google Maps** where they earned their weight — new capability for the client, no measurable cost to page performance.' },
    ],
    chips: ['React', 'Next.js', 'Express', 'MongoDB', 'MySQL', 'Knex.js', 'TypeORM', 'Jest', 'Docker', 'GitHub Actions', 'Jenkins', 'NGINX', 'EC2', 'Firebase'],
  },
];

export const projects = [
  {
    kicker: 'Security tooling · Go, React',
    title: 'Automated penetration testing platform',
    summary: 'A web application that runs all five stages of a penetration test — reconnaissance through to reporting — without an operator driving each tool by hand. Built to turn a slow, expert-only process into something a team can run on a schedule.',
    points: [
      'Automated vulnerability scanning and threat detection with **Nmap** and **VulnScan**, mapping open ports and exposed services across the target network.',
      'Chained **Metasploit** and a custom framework to carry findings from discovery into controlled exploitation, establishing how far an attacker could actually get.',
      'Streamed scan progress and results into a **React** dashboard so a run is readable while it happens, not just after it finishes.',
      'Written in **Go** for concurrent scanning — many hosts probed in parallel without the orchestration falling over.',
    ],
  },
  {
    kicker: 'Data engineering · Java',
    title: 'Real-time data warehouse, Metro Shopping Center',
    summary: 'A warehouse that answers analytical questions against data that is still arriving. Designed for a retail dataset large enough that the naive approach — batch overnight, query in the morning — was not good enough.',
    points: [
      'Designed and implemented the warehouse in **Java**, sized for continuous ingestion rather than a nightly window.',
      'Built the **ETL pipeline** end to end — extract from source, transform, load — with integrity checks so a bad batch fails loudly instead of quietly corrupting a fact table.',
      'Tuned **OLAP query performance** through indexing strategy and data partitioning, keeping aggregate queries usable as the dataset grew.',
      'Modelled the schema around the questions the business actually asked, so common reports resolved without a full scan.',
    ],
  },
];

export const stack = [
  {
    title: 'Interface',
    note: 'What the user touches. Typed, componentised, server-rendered where it helps.',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'React Hooks', 'Context API', 'HTML', 'CSS'],
  },
  {
    title: 'Services',
    note: 'Where the business logic lives. My deepest ground.',
    items: ['Node.js', 'NestJS', 'Express.js', 'REST', 'GraphQL', 'Go', 'Python', 'Java'],
  },
  {
    title: 'Data',
    note: 'Schemas, indexes and access layers built for the read pattern they will actually get.',
    items: ['MySQL', 'PostgreSQL', 'DynamoDB', 'Elasticsearch', 'MongoDB', 'SQLite', 'TypeORM', 'Knex.js'],
  },
  {
    title: 'Platform',
    note: 'Getting it deployed, configured and running without a person in the loop.',
    items: ['AWS Lambda', 'API Gateway', 'SQS', 'Fargate', 'EC2', 'Elastic Beanstalk', 'Secrets Manager', 'Parameter Store', 'Docker', 'NGINX', 'GitHub Actions', 'Jenkins'],
  },
  {
    title: 'Confidence',
    note: 'Tests before merge, dashboards after deploy. Both are the same job.',
    items: ['Jest', 'Postman', 'Kibana', 'CloudWatch', 'ELK Stack', 'Git'],
  },
];

export const credentials = [
  {
    kicker: 'Aug 2018 — May 2022',
    title: 'BS, Computer Science',
    subtitle: 'FAST National University of Computer and Emerging Sciences — Islamabad',
    meta: 'Systems, databases & network security',
  },
  {
    kicker: 'Certification',
    title: 'AWS Certified Cloud Practitioner',
    subtitle: 'Amazon Web Services — cloud architecture, services and cost fundamentals',
    meta: 'Applied daily on Lambda, SQS & Fargate',
  },
];

export const contact = {
  lead: ["Let's talk", 'shop'],
  sub: 'If you are hiring for a full-stack or backend role — or you have a system that is slower than it should be and you want a second opinion — I read every message.',
  links: [
    { kind: 'Email', value: 'aitzazahmadofficial@gmail.com', href: 'mailto:aitzazahmadofficial@gmail.com', arrow: '→' },
    { kind: 'LinkedIn', value: 'in/aitzaz-ahmad', href: 'https://www.linkedin.com/in/aitzaz-ahmad-1a518719a/', arrow: '↗', external: true },
    { kind: 'GitHub', value: '@aitzaz960', href: 'https://github.com/aitzaz960', arrow: '↗', external: true },
    { kind: 'Location', value: 'Islamabad, Pakistan — remote friendly', href: '#top', arrow: '↑' },
  ],
  colophon: ['Aitzaz Ahmad — Senior Full Stack Engineer', 'Set in Archivo, Newsreader & JetBrains Mono'],
};
