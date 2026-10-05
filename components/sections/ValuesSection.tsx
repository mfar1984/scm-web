import AnimatedBg from '@/components/layout/AnimatedBg';
import { Highlight } from '@/components/layout/Highlight';

interface ValueItem { icon: string; title: string; text: string }
interface ValuesBlock {
  eyebrow?: string;
  heading?: string;
  image?: string;
  items?: ValueItem[];
}

const fallbackCore: Required<ValuesBlock> = {
  eyebrow: 'We believe in',
  heading: 'Our Strong **Core Values** :',
  image: '/image/core-value.jpg',
  items: [
    { icon: 'bi-gem', title: 'Quality', text: 'We ensure the value of our work is always at the highest quality which consists of task completion, interactions and deliverables.' },
    { icon: 'bi-people-fill', title: 'Teamwork', text: 'We value the collaborative efforts of every team member to achieve a common goal efficiently.' },
    { icon: 'bi-shield-check', title: 'Integrity', text: 'We aim to always deliver our work with honesty and truthfulness in line with our corporate business ethics.' },
  ],
};

const fallbackCompromise: Required<ValuesBlock> = {
  eyebrow: 'In everything we do',
  heading: 'We Never **Compromise On** :',
  image: '/image/bg-compromise-on.jpg',
  items: [
    { icon: 'bi-hand-thumbs-up-fill', title: 'Safety', text: 'We will not compromise on safety of our people, our customers and our workplace.' },
    { icon: 'bi-heart-fill', title: 'Respect', text: 'We treat everyone honestly, fairly and courteously in our business affairs and life.' },
    { icon: 'bi-globe2', title: 'Sustainability', text: 'We act responsibly, always considering our impact on the people and environment in which we operate.' },
  ],
};

function resolve(block: ValuesBlock | undefined, fallback: Required<ValuesBlock>): Required<ValuesBlock> {
  return {
    eyebrow: block?.eyebrow || fallback.eyebrow,
    heading: block?.heading || fallback.heading,
    image: block?.image || fallback.image,
    items: block?.items && block.items.length > 0 ? block.items : fallback.items,
  };
}

export default function ValuesSection({ core, compromise }: { core?: ValuesBlock; compromise?: ValuesBlock }) {
  const cv = resolve(core, fallbackCore);
  const nc = resolve(compromise, fallbackCompromise);

  return (
    <section id="values" className="section values-section has-anim-bg">
      <AnimatedBg variant="values" />
      <div className="container">

        {/* Row 1: Core Values (text left, image right) */}
        <div className="row values-row align-items-center g-5">
          <div className="col-lg-6" data-aos="fade-right">
            <span className="values-eyebrow">{cv.eyebrow}</span>
            <h2 className="values-heading"><Highlight text={cv.heading} /></h2>
            <div className="values-list">
              {cv.items.map((v) => (
                <div className="value-item" key={v.title}>
                  <div className="value-icon"><i className={`bi ${v.icon}`}></i></div>
                  <div>
                    <h4>{v.title}</h4>
                    <p>{v.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-6" data-aos="fade-left" data-aos-delay="100">
            <div className="values-media" style={{ backgroundImage: `url('${cv.image}')` }} />
          </div>
        </div>

        {/* Row 2: Never Compromise On (image left, text right) */}
        <div className="row values-row align-items-center g-5">
          <div className="col-lg-6 order-lg-1 order-2" data-aos="fade-right" data-aos-delay="100">
            <div className="values-media" style={{ backgroundImage: `url('${nc.image}')` }} />
          </div>
          <div className="col-lg-6 order-lg-2 order-1" data-aos="fade-left">
            <span className="values-eyebrow">{nc.eyebrow}</span>
            <h2 className="values-heading"><Highlight text={nc.heading} /></h2>
            <div className="values-list">
              {nc.items.map((v) => (
                <div className="value-item" key={v.title}>
                  <div className="value-icon"><i className={`bi ${v.icon}`}></i></div>
                  <div>
                    <h4>{v.title}</h4>
                    <p>{v.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
