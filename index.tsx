/** @jsx h */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { h } from "preact";
import { render } from "preact-render-to-string";

const SITE_URL = "https://slides.whyk.dev";
const SITE_DESCRIPTION =
  "WhyKが登壇などに利用したスライドを掲載しています。スライドはすべてSlidevで制作されています。";

const getSlideName = () => {
  const dirents = readdirSync("./slides", { withFileTypes: true });
  const dirs = dirents.filter((dirent) => dirent.isDirectory()).map(
    (dirent) => {
      const data = readFileSync(
        `./slides/${dirent.name}/package.json`,
        "utf-8",
      );
      return {
        title: JSON.parse(data).description as string,
        slug: dirent.name,
      };
    },
  );

  return dirs;
};

const jsx = () => (
  <html>
    <head>
      <title>WhyK Slides</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={SITE_DESCRIPTION} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="WhyK Slides" />
      <meta property="og:title" content="WhyK Slides" />
      <meta property="og:description" content={SITE_DESCRIPTION} />
      <meta property="og:url" content={`${SITE_URL}/`} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="WhyK Slides" />
      <meta name="twitter:description" content={SITE_DESCRIPTION} />
      <link rel="stylesheet" href="https://fonts.xz.style/serve/inter.css" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css"
      />
    </head>
    <body style={{
      minHeight: '93vh', // new.cssのpadding分ザックリ抜いた
      display: 'grid',
      gridTemplateRows: 'auto 1fr auto',
    }}>
      <header>WhyK Slides</header>
      <main>
        <p>
          このサイトはWhyKが登壇などに利用したスライドを掲載しています。<br />スライドはすべてSlidevで制作されています。
        </p>
        <section>
          <h2>掲載されているスライド</h2>
          <ul>
            {getSlideName().map((slide) => (
              <li>
                <a href={`./${slide.slug}`}>{slide.title}</a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer>
        <small>&copy; 2024 WhyK</small>
      </footer>
    </body>
  </html>
);

const htmlString = render(jsx());

writeFileSync("dist/index.html", `<!DOCTYPE html>${htmlString}`, "utf8");
