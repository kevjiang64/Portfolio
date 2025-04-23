const navLinks = [
  {
    name: "Projects",
    link: "#work",
  },
  {
    name: "Experience",
    link: "#experience",
  },
  {
    name: "Skills",
    link: "#skills",
  },
];

const words = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
];

// const counterItems = [
//   { value: 15, suffix: "+", label: "Years of Experience" },
//   { value: 200, suffix: "+", label: "Satisfied Clients" },
//   { value: 108, suffix: "+", label: "Completed Projects" },
//   { value: 90, suffix: "%", label: "Client Retention Rate" },
// ];

const logoIconsList = [
  {
    imgPath: "/images/logos/company-logo-1.png",
  },
  {
    imgPath: "/images/logos/company-logo-2.png",
  },
  {
    imgPath: "/images/logos/company-logo-3.png",
  },
  {
    imgPath: "/images/logos/company-logo-4.png",
  },
  {
    imgPath: "/images/logos/company-logo-5.png",
  },
  {
    imgPath: "/images/logos/company-logo-6.png",
  },
  {
    imgPath: "/images/logos/company-logo-7.png",
  },
  {
    imgPath: "/images/logos/company-logo-8.png",
  },
  {
    imgPath: "/images/logos/company-logo-9.png",
  },
  {
    imgPath: "/images/logos/company-logo-10.png",
  },
  {
    imgPath: "/images/logos/company-logo-11.png",
  },
];

const abilities = [
  {
    imgPath: "/images/seo.png",
    title: "Quality Focus",
    desc: "Delivering high-quality results while maintaining attention to every detail.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Reliable Communication",
    desc: "Keeping you updated at every step to ensure transparency and clarity.",
  },
  {
    imgPath: "/images/time.png",
    title: "On-Time Delivery",
    desc: "Making sure projects are completed on schedule, with quality & attention to detail.",
  },
];

const techStackImgs = [
  {
    name: "React.js",
    imgPath: "/images/logos/react.png",
  },
  {
    name: "C#.NET",
    imgPath: "/images/logos/csharp.png",
  },
  {
    name: "Python",
    imgPath: "/images/logos/python.svg",
  },
  {
    name: "Node.js",
    imgPath: "/images/logos/node.png",
  },
  {
    name: "Tailwind",
    imgPath: "/images/logos/tailwind.png",
  },
  {
    name: "Html",
    imgPath: "/images/logos/html.png",
  },
  {
    name: "GraphQL",
    imgPath: "/images/logos/graphql.png",
  },
  {
    name: "MongoDb",
    imgPath: "/images/logos/mongodb.png",
  },
  {
    name: "Vue.js",
    imgPath: "/images/logos/vue.png",
  },
];

const techStackIcons = [
  {
    name: "React Developer",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Python Developer",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Backend Developer",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Interactive Developer",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "Project Manager",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const expCards = [
  {
    companyName: "Matrox Electronics Systems",
    title: "Validation Specialist FPGA intern",
    date: "September 2019 - December 2019",
    responsibilities: [
      "Developed a Perl script that would dispatch Unix jobs faster, achieving a 50% time reduction in process time.",
      "Developed a command-line application with various options to launch Unix jobs remotely helping daily administrative tasks.",
    ],
  },
  {
    companyName: "Consoltec",
    title: "Web Developer Intern",
    date: "May 2020 - September 2020",
    responsibilities: [
      "Developed and maintained the front end of a language translation project management tool.",
      "Integrated a client-side feature to provide the users multiple choices to save files.",
    ],
  },
  {
    companyName: "Conova",
    title: "Web Developer",
    date: "January 2021 - January 2022",
    responsibilities: [
      "Implemented a Video on Demand System to provide a way for users to record themselves.",
      "Designed and implemented the database using GraphQL schemas to collect information throughout our application in an ordered and sophistiscated manner.",
      "Introduced Auth0, a third-party authentication service, into the application.",
      "Implemented an IP address blacklisting service to block harmful users.",
    ],
  },
  {
    companyName: "Broadsign International",
    title: "Software Developer",
    date: "January 2022 - April 2023",
    responsibilities: [
      "Developed the full stack integrations of multiple features through microservices following the TDD approach, achieving major speed improvements, including 50% reduction in time for deployments.",
      "Built and maintained robust CI/CD pipelines for new and existing applications, resulting in 20% improvement for deployment speed.",
      "Created comprehensive Datadog dashboards for front end microservices as well as monitoring real-time analytics and insights on Confluent Cloud.",
      "Demonstrated strong customer support and assistance by resolving 90% of all technical issues within a week.",
    ],
  },
  {
    companyName: "TriNmax Inc",
    title: "Full-Stack Developer",
    date: "October 2023 - December 2023",
    responsibilities: [
      "Maintaned and developed the front end of a bill management software embedded on IBM Maximo application suite.",
      "Configured Google Cloud project settings using Terraform, an infrastructure-as-code software tool.",
    ],
  },
];

const expLogos = [
  {
    name: "logo1",
    imgPath: "/images/logo1.png",
  },
  {
    name: "logo2",
    imgPath: "/images/logo2.png",
  },
  {
    name: "logo3",
    imgPath: "/images/logo3.png",
  },
];

const testimonials = [
  {
    name: "Esther Howard",
    mentions: "@estherhoward",
    review:
      "I can’t say enough good things about Adrian. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.",
    imgPath: "/images/client1.png",
  },
  {
    name: "Wade Warren",
    mentions: "@wadewarren",
    review:
      "Working with Adrian was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.",
    imgPath: "/images/client3.png",
  },
  {
    name: "Guy Hawkins",
    mentions: "@guyhawkins",
    review:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    imgPath: "/images/client2.png",
  },
  {
    name: "Marvin McKinney",
    mentions: "@marvinmckinney",
    review:
      "Adrian was a pleasure to work with. He turned our outdated website into a fresh, intuitive platform that’s both modern and easy to navigate. Fantastic work overall.",
    imgPath: "/images/client5.png",
  },
  {
    name: "Floyd Miles",
    mentions: "@floydmiles",
    review:
      "Adrian’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional!",
    imgPath: "/images/client4.png",
  },
  {
    name: "Albert Flores",
    mentions: "@albertflores",
    review:
      "Adrian was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend and backend dev are top-notch.",
    imgPath: "/images/client6.png",
  },
];

const socialImgs = [
  {
    name: "github",
    url: "https://github.com/kevjiang64",
    imgPath: "/images/git.svg",
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/kevin-jiang-6009/",
    imgPath: "/images/linkedin.png",
  },
];

export {
  words,
  abilities,
  logoIconsList,
  // counterItems,
  expCards,
  expLogos,
  testimonials,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
};
