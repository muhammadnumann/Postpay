import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

// @ts-ignore
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App:any) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta
            name="facebook-domain-verification"
            content="flqroa68q0sow4fm6vz49y40twvrky"
          />
        </Head>
        <body className="notranslate">
          <Main />
          <NextScript />
          <noscript>
            <img
              height="1"
              width="1"
              src="https://www.facebook.com/tr?id=502260823922606&ev=PageView
            &noscript=1"
            />
          </noscript>

          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-KC3HZCD"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
        </body>
      </Html>
    );
  }
}
