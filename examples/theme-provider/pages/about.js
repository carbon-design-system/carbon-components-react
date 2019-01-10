import 'carbon-components/scss/globals/scss/styles.scss';

import Link from 'next/link';
import ThemedButton from '../components/ThemedButton';

import ThemeContext from '../themes/ThemeContext';
import aboutPageTheme from '../themes/aboutPageTheme';

const About = () => {
  return (
    <ThemeContext.Provider value={aboutPageTheme}>
      <div className="root">
        <article>
          <h3>Carbon Components</h3>
          <Link href="/">
            <a>
              <ThemedButton />
            </a>
          </Link>
        </article>
        <style jsx>
          {`
            .root {
              width: 400px;
              margin: 200px auto;
            }
            article {
              text-align: center;
            }
          `}
        </style>
      </div>
    </ThemeContext.Provider>
  );
};

export default About;
