import Script from "next/script";
import { HEAD_DESCRIPTION } from "../../constants/constants";

const Scripts = () => {
  const ldJson = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Postpay",
    url: "https://postpay.io",
    description: HEAD_DESCRIPTION,
    sameAs: [
      "https://www.linkedin.com/company/postpayofficial/",
      "https://www.instagram.com/postpayofficial/",
      "https://twitter.com/postpayofficial",
      "https://www.snapchat.com/add/postpayofficial",
    ],
  };
  return (
    <>
      <Script
        async
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=UA-145850725-1"
      ></Script>
      <Script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-145850725-1');
          `,
        }}
      ></Script>
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KC3HZCD');
          `,
        }}
      ></Script>
      <Script strategy="beforeInteractive" type="application/ld+json">
        {JSON.stringify(ldJson, null, 2)}
      </Script>
      <Script
        strategy="lazyOnload"
        src="https://cdn.jsdelivr.net/npm/simple-parallax-js@5.5.1/dist/simpleParallax.min.js"
      ></Script>
      <script
        id="ze-snippet"
        src="https://static.zdassets.com/ekr/snippet.js?key=e505ebef-2ff7-4c71-ba21-cc337a395af0"
      >
        {" "}
      </script>

      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '502260823922606');
            fbq('track', 'PageView');
            `,
        }}
      ></Script>
    </>
  );
};
export default Scripts;
