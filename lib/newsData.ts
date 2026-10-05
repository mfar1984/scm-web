export type NewsSection = { heading: string; body: string[] };
export type NewsArticle = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;        // display date
  readTime: string;    // e.g. "5 min read"
  image: string;
  intro: string;       // blockquote intro
  sections: NewsSection[];
  gallery: string[];
  tags: string[];
};

export const newsCategories = ['Company News', 'Maritime Safety', 'Industry Updates', 'Events'];

export const news: NewsArticle[] = [
  {
    slug: 'iso-9001-recertification-2026',
    category: 'Company News',
    title: 'SCM Achieves ISO 9001:2015 Recertification',
    excerpt: 'Ships Classification Malaysia has successfully renewed its ISO 9001:2015 Quality Management System certification, reaffirming our commitment to service excellence.',
    author: 'SCM Communications',
    date: '18 Feb 2026',
    readTime: '4 min read',
    image: '/image/quality-policy.jpg',
    intro: 'SCM has successfully completed its ISO 9001:2015 recertification audit, reaffirming our dedication to delivering quality classification and statutory services to the maritime industry.',
    sections: [
      {
        heading: 'Overview',
        body: [
          'Ships Classification Malaysia (SCM) is pleased to announce the successful renewal of its ISO 9001:2015 Quality Management System (QMS) certification. The recertification follows a comprehensive audit of our processes across survey, plan approval, certification and administrative functions.',
          'This milestone reflects SCM\u2019s continued commitment to maintaining the highest standards of quality and consistency in every service we provide to shipowners, operators and government agencies.',
        ],
      },
      {
        heading: 'What This Means for Our Clients',
        body: [
          'The ISO 9001:2015 certification assures our clients that SCM operates a documented, continuously improving quality system \u2014 from the way we plan surveys to how we handle certification and client feedback.',
          'Our clients can expect consistent, reliable and transparent service delivery aligned with international best practices and R.O. Code requirements.',
        ],
      },
    ],
    gallery: ['/image/quality-policy.jpg', '/image/core-value.jpg', '/image/survey-inspection-min.png'],
    tags: ['ISO 9001', 'Quality', 'Certification', 'Company News'],
  },
  {
    slug: 'ballast-water-management-guidance',
    category: 'Maritime Safety',
    title: 'New Guidance on Ballast Water Management Compliance',
    excerpt: 'SCM issues updated guidance to help shipowners meet Ballast Water Management Convention requirements and BWMS commissioning testing.',
    author: 'Technical Department',
    date: '02 Feb 2026',
    readTime: '5 min read',
    image: '/image/bg-compromise-on.jpg',
    intro: 'To support shipowners in meeting the IMO Ballast Water Management (BWM) Convention, SCM has released updated guidance covering compliance, BWMS installation and commissioning testing.',
    sections: [
      {
        heading: 'Overview',
        body: [
          'The Ballast Water Management Convention aims to prevent the spread of harmful aquatic organisms from one region to another. Vessels are required to manage their ballast water to remove, render harmless, or avoid the uptake or discharge of such organisms.',
          'SCM\u2019s updated guidance clarifies the survey, documentation and commissioning testing requirements for Malaysian-registered vessels fitting Ballast Water Management Systems (BWMS).',
        ],
      },
      {
        heading: 'Commissioning Testing',
        body: [
          'Commissioning testing validates the correct installation and operation of a BWMS. SCM works with approved service suppliers to witness and verify testing in line with IMO guidelines.',
          'Owners are encouraged to plan commissioning testing early to avoid delays during scheduled surveys.',
        ],
      },
    ],
    gallery: ['/image/bg-compromise-on.jpg', '/image/Slider1.jpg', '/image/Slider2.jpg'],
    tags: ['BWMS', 'Maritime Safety', 'IMO', 'Compliance'],
  },
  {
    slug: 'east-malaysia-survey-expansion',
    category: 'Company News',
    title: 'SCM Expands Survey Operations in East Malaysia',
    excerpt: 'To better serve clients in Sabah and Sarawak, SCM strengthens its survey presence and response capabilities across East Malaysia.',
    author: 'SCM Communications',
    date: '20 Jan 2026',
    readTime: '3 min read',
    image: '/image/Slider2.jpg',
    intro: 'SCM is expanding its survey operations in East Malaysia to provide faster, more responsive classification and statutory services to shipowners in Sabah and Sarawak.',
    sections: [
      {
        heading: 'Overview',
        body: [
          'As part of our commitment to serving the nation, SCM continues to grow its operational footprint. The expansion in East Malaysia enhances our ability to attend vessels promptly at ports and shipyards across the region.',
          'This initiative reduces waiting times and supports the growing maritime activity between East Malaysia, West Malaysia and the ASEAN region.',
        ],
      },
    ],
    gallery: ['/image/Slider2.jpg', '/image/survey-inspection-min.png', '/image/core-value.jpg'],
    tags: ['Company News', 'East Malaysia', 'Surveys'],
  },
  {
    slug: 'understanding-eexi-cii',
    category: 'Industry Updates',
    title: 'Understanding EEXI and CII: What Shipowners Need to Know',
    excerpt: 'A practical look at the Energy Efficiency Existing Ship Index (EEXI) and Carbon Intensity Indicator (CII) and their impact on the fleet.',
    author: 'Technical Department',
    date: '08 Jan 2026',
    readTime: '6 min read',
    image: '/image/Plan-Approval-Newbuilding-min.png',
    intro: 'The EEXI and CII regulations are reshaping how the maritime industry approaches energy efficiency and decarbonisation. Here is what shipowners need to understand.',
    sections: [
      {
        heading: 'Overview',
        body: [
          'The Energy Efficiency Existing Ship Index (EEXI) and the Carbon Intensity Indicator (CII) are key measures introduced by the IMO to reduce greenhouse gas emissions from international shipping.',
          'EEXI applies a technical efficiency requirement to existing ships, while CII rates a ship\u2019s operational carbon intensity on an annual basis.',
        ],
      },
      {
        heading: 'How SCM Supports Compliance',
        body: [
          'SCM provides EEXI and EEXI verification, SEEMP review, and advisory services to help owners understand and meet these requirements.',
          'Our technical team assists with calculations, documentation and verification to keep your fleet compliant with evolving regulations.',
        ],
      },
    ],
    gallery: ['/image/Plan-Approval-Newbuilding-min.png', '/image/Slider1.jpg'],
    tags: ['EEXI', 'CII', 'Decarbonisation', 'Industry Updates'],
  },
  {
    slug: 'asian-classification-society-forum',
    category: 'Events',
    title: 'SCM Participates in Asian Classification Society Forum',
    excerpt: 'SCM joined fellow members of the Asian Classification Society (ACS) to discuss regional maritime safety and technical cooperation.',
    author: 'SCM Communications',
    date: '12 Dec 2025',
    readTime: '3 min read',
    image: '/image/banner-about.jpg',
    intro: 'As a member of the Asian Classification Society (ACS), SCM participated in the latest ACS forum to strengthen regional cooperation on maritime safety and technical standards.',
    sections: [
      {
        heading: 'Overview',
        body: [
          'The forum brought together classification societies across Asia to share knowledge, harmonise technical approaches and discuss emerging challenges in the maritime sector.',
          'SCM contributed insights on classification of Malaysian-registered vessels and reaffirmed its commitment to regional collaboration.',
        ],
      },
    ],
    gallery: ['/image/banner-about.jpg', '/image/core-value.jpg'],
    tags: ['Events', 'ACS', 'Collaboration'],
  },
  {
    slug: 'digital-surveys-maritime-safety',
    category: 'Industry Updates',
    title: 'Enhancing Maritime Safety Through Digital Surveys',
    excerpt: 'SCM embraces digital tools and remote survey techniques to improve efficiency while maintaining rigorous safety standards.',
    author: 'Technical Department',
    date: '28 Nov 2025',
    readTime: '5 min read',
    image: '/image/survey-inspection-min.png',
    intro: 'Digital transformation is changing how surveys are conducted. SCM is adopting modern tools to enhance efficiency without compromising on safety.',
    sections: [
      {
        heading: 'Overview',
        body: [
          'SCM is keeping pace with the latest technologies and developments in the digital revolution, incorporating digital tools and remote survey techniques where appropriate.',
          'These innovations improve turnaround times and data accuracy while upholding the highest safety and quality standards.',
        ],
      },
    ],
    gallery: ['/image/survey-inspection-min.png', '/image/Slider1.jpg', '/image/quality-policy.jpg'],
    tags: ['Digital', 'Surveys', 'Innovation', 'Industry Updates'],
  },
];

export const getArticle = (slug: string) => news.find(n => n.slug === slug);
