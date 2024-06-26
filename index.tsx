/** @jsx h */
import { readdirSync, readFileSync, writeFile } from "node:fs";
import { h } from "preact";
import { render } from "preact-render-to-string";

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

console.log(getSlideName());

const jsx = () => (
  <html>
    <head>
      <title>WhyK Slides</title>
      <link rel="stylesheet" href="https://fonts.xz.style/serve/inter.css" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css"
      />
    </head>
    <body>
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

writeFile("dist/index.html", `<!DOCTYPE html>${htmlString}`, "utf8", (err) => {
  console.error(err);
});
