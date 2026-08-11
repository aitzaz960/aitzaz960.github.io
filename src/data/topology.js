/**
 * The service topology rendered in "The system" section.
 *
 * Coordinates are in a 1000 x 540 viewBox. Each node carries its own
 * dossier, so the diagram and the writing about it are one structure
 * rather than two things kept in sync by hand.
 */

export const nodes = [
  {
    id: 'client',
    label: 'Client',
    kind: 'edge',
    x: 70,
    y: 270,
    dossier: {
      title: 'The interface',
      blurb: 'React and Next.js front ends — typed, componentised, and built against the same contracts the services expose.',
      points: [
        'Shared TypeScript component libraries: hooks, Context API, sensible defaults, so a new screen starts from something rather than nothing.',
        'Server-rendered where it earns the complexity and static where it does not.',
        'Internal operations tooling treated with the same rigour as customer-facing work — the people running the business deserve a good interface too.',
      ],
      chips: ['React', 'Next.js', 'TypeScript', 'React Hooks', 'Context API'],
    },
  },
  {
    id: 'gateway',
    label: 'API Gateway',
    kind: 'platform',
    x: 235,
    y: 270,
    dossier: {
      title: 'The front door',
      blurb: 'Every request enters through one place, so authentication, throttling and routing are decisions made once rather than in every service.',
      points: [
        'AWS API Gateway fronting Lambda-backed services, with routing and stage configuration held in version control.',
        'NGINX for the EC2 and Elastic Beanstalk deployments — hand-written configuration for load balancing and routing logic.',
        'Consistent error shapes at the boundary, so a client never has to guess which service failed.',
      ],
      chips: ['API Gateway', 'NGINX', 'Elastic Beanstalk', 'EC2'],
    },
  },
  {
    id: 'auth',
    label: 'Auth',
    sub: 'Lambda',
    kind: 'service',
    x: 405,
    y: 130,
    dossier: {
      title: 'Identity and secrets',
      blurb: 'Auth runs as its own function, and nothing it needs to do its job is baked into an image or a repo.',
      points: [
        'Secrets and per-environment configuration centralised in AWS Secrets Manager and Systems Manager Parameter Store — credentials leave the deployment path entirely.',
        'Twilio-backed OTP flows with retry handling, so a delivery failure is recoverable rather than a dead end.',
        'Validation at the boundary, typed all the way down, so a malformed token fails in one predictable place.',
      ],
      chips: ['AWS Lambda', 'Secrets Manager', 'Parameter Store', 'Twilio'],
    },
  },
  {
    id: 'api',
    label: 'Nest service',
    sub: 'TypeScript',
    kind: 'service',
    x: 405,
    y: 270,
    primary: true,
    dossier: {
      title: 'Where the logic lives',
      blurb: 'The backend architecture I own at AIO: Node.js and TypeScript on NestJS, with the structure that makes a system debuggable at 3am rather than merely functional at noon.',
      points: [
        'Layered input validation, structured logging and typed error handling — a failure arrives with the context needed to fix it, not a bare stack trace.',
        'RESTful APIs with the contract written down and enforced, so front end and service never disagree about a shape.',
        'Broke a monolithic request path into event-driven microservices: 40% lower latency, 25% lower infrastructure cost.',
      ],
      chips: ['Node.js', 'NestJS', 'TypeScript', 'REST', 'Express.js'],
    },
  },
  {
    id: 'queue',
    label: 'SQS',
    sub: 'async work',
    kind: 'platform',
    x: 405,
    y: 410,
    dossier: {
      title: 'Everything that can wait',
      blurb: 'The cheapest latency win available is not doing the work inside the request. Queues are where the slow, retryable and non-urgent goes.',
      points: [
        'SQS between services so a slow consumer creates backlog rather than timeouts.',
        'Retry queues in front of third-party calls — an outage upstream degrades a flow instead of breaking it.',
        'Idempotency keys on anything that touches money, because a retry that charges twice is worse than a failure.',
      ],
      chips: ['SQS', 'AWS Lambda', 'Async handlers'],
    },
  },
  {
    id: 'data',
    label: 'MySQL',
    sub: 'primary store',
    kind: 'data',
    x: 615,
    y: 200,
    dossier: {
      title: 'The schema',
      blurb: 'A high-throughput MySQL schema designed for the read pattern it would actually get, rather than the one that looked tidiest on a whiteboard.',
      points: [
        'Normalised structures with deliberate indexing, tuned for transactional consistency under real-time read load.',
        'Query plans checked before ship rather than after the incident.',
        'Access through Knex.js and TypeORM with validation and transformation on both sides of the wire.',
      ],
      chips: ['MySQL', 'PostgreSQL', 'DynamoDB', 'TypeORM', 'Knex.js'],
    },
  },
  {
    id: 'search',
    label: 'Elasticsearch',
    kind: 'data',
    x: 615,
    y: 340,
    dossier: {
      title: 'Indexed for questions',
      blurb: 'Some questions should never hit the primary store. Elasticsearch carries the ones that are about finding rather than transacting.',
      points: [
        'Service and API telemetry indexed for query, so investigating an incident is a search rather than an archaeology dig.',
        'Feeds the Kibana dashboards the team runs on day to day.',
        'Kept deliberately separate from the transactional path — a slow analytical query cannot take down a checkout.',
      ],
      chips: ['Elasticsearch', 'Kibana', 'ELK Stack'],
    },
  },
  {
    id: 'external',
    label: 'Stripe · Twilio',
    sub: 'third party',
    kind: 'external',
    x: 820,
    y: 130,
    dossier: {
      title: 'The parts I do not control',
      blurb: 'Third-party services are the one dependency that will fail on someone else\u2019s schedule. They get wrapped accordingly.',
      points: [
        'Stripe for payments and Twilio for OTP and messaging, both behind async handlers rather than inline calls.',
        'Retry queues and idempotency so a transient failure resolves itself without a human.',
        'Also integrated SendGrid, Firebase and Google Maps on earlier client work — added capability with no measurable cost to page performance.',
      ],
      chips: ['Stripe', 'Twilio', 'SendGrid', 'Firebase', 'Google Maps'],
    },
  },
  {
    id: 'observability',
    label: 'Kibana · CloudWatch',
    sub: 'telemetry',
    kind: 'observe',
    x: 820,
    y: 270,
    dossier: {
      title: 'How I know it works',
      blurb: 'Tests before merge and dashboards after deploy are the same job: reducing the number of things you have to take on faith.',
      points: [
        'Built the internal Elasticsearch and Kibana dashboards covering endpoint health, latency percentiles and database performance across every service.',
        'CloudWatch and the ELK stack for production incident work — locate the bottleneck, fix it under real traffic, then prove with a metric that it held.',
        'Backend endpoints held above 90% coverage with Jest, backed by Postman collections running against live staging.',
      ],
      chips: ['Kibana', 'CloudWatch', 'ELK Stack', 'Jest', 'Postman'],
    },
  },
  {
    id: 'ci',
    label: 'CI/CD',
    sub: 'ship it',
    kind: 'platform',
    x: 820,
    y: 410,
    dossier: {
      title: 'From merge to running',
      blurb: 'No manual steps between an approved pull request and something a person can click.',
      points: [
        'GitHub Actions and Jenkins pipelines: run the tests, build the Docker image, deploy to staging.',
        'Containerised services so the thing that ran on my machine is the thing that runs in production.',
        'Deployments to Lambda, Fargate, EC2 and Elastic Beanstalk depending on what the workload actually needs.',
      ],
      chips: ['GitHub Actions', 'Jenkins', 'Docker', 'Fargate'],
    },
  },
];

export const edges = [
  ['client', 'gateway'],
  ['gateway', 'auth'],
  ['gateway', 'api'],
  ['api', 'queue'],
  ['auth', 'data'],
  ['api', 'data'],
  ['api', 'search'],
  ['queue', 'search'],
  ['auth', 'external'],
  ['queue', 'external'],
  ['data', 'observability'],
  ['search', 'observability'],
  ['queue', 'ci'],
];

/** Edges that carry an animated packet, and how long each takes. */
export const flows = [
  { path: ['client', 'gateway', 'api', 'data', 'observability'], duration: 5.2, delay: 0 },
  { path: ['client', 'gateway', 'auth', 'external'], duration: 4.4, delay: 1.4 },
  { path: ['client', 'gateway', 'api', 'queue', 'ci'], duration: 5.8, delay: 2.6 },
  { path: ['client', 'gateway', 'api', 'search', 'observability'], duration: 5.0, delay: 3.8 },
];
