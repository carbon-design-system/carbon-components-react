import 'carbon-components/scss/globals/scss/styles.scss';

import Link from 'next/link';
import ThemedButton from '../components/ThemedButton';

const Home = () => {
  return (
    <div className="root">
      <article>
        <h3>Carbon Components</h3>
        <Link href="/about">
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
  );
};

export default Home;
