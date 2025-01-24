/* eslint-disable @next/next/next-script-for-ga */
import { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import {
  DocumentHeadTags,
  DocumentHeadTagsProps,
  documentGetInitialProps,
} from "@mui/material-nextjs/v13-pagesRouter";
import Seo from "@/components/molecules/Seo";
import fetchData from "@/helper/FetchData";

export default function Document(
  props: JSX.IntrinsicAttributes & DocumentHeadTagsProps & { seoData: any }
) {
  const { seoData } = props;

  return (
    <Html lang="en" dir="ltr">
      <Head>
        <DocumentHeadTags {...props} />

        <script
          dangerouslySetInnerHTML={{
            __html: `
                (function(w,d,s,l,i) {
                  w[l] = w[l] || [];
                  w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});
                  var f = d.getElementsByTagName(s)[0],
                      j = d.createElement(s),
                      dl = l != 'dataLayer' ? '&l=' + l : '';
                  j.async = true;
                  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                  f.parentNode.insertBefore(j, f);
                })(window,document,'script','dataLayer','GTM-523WSSQC');
              `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await documentGetInitialProps(ctx);

  return {
    ...initialProps,
  };
};
