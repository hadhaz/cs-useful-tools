import Head from "next/head";

const seo = {
  subnet: {
    name: "subnet-calculator",
    title: "Subnet Calculator",
    url: "/subnet-calculator",
    id: "CALC1",
    keywords: "subnet calculator, subnet, calculator",
    description: "subnet calculator, subnet, calculator",
  },
  converter: {
    name: "binary-converter",
    title: "Binary Converter",
    url: "/binary-converter",
    id: "CONV1",
    keywords: "binary converter, binary, converter",
    description: "binary converter, binary, converter",
  },
  home: {
    name: "home",
    title: "Home",
    url: "/",
    id: "HOME1",
    keywords: "home, home page, home page",
    description:
      "useful tools for network engineer, subnet calculator, binary converter, computer network, computer science",
  },
};

export default function Seo(props: {
  typeInput: "subnet" | "converter" | "home";
}) {
  return (
    <Head>
      <title>{seo[props.typeInput].title}</title>
      <meta name='description' content={seo[props.typeInput].description} />
      <link rel='icon' href='/favicon.ico' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta name='theme-color' content='#ffffff' />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <meta
        name='apple-mobile-web-app-title'
        content={seo[props.typeInput].title}
      />
      <link rel='apple-touch-icon' href='/icons/icon-192x192.png' />
      <link rel='manifest' href='/manifest.json' />
      <link rel='mask-icon' href='/icons/icon-192x192.png' color='#5bbad5' />
      <link rel='shortcut icon' href='/favicon.ico' />
      <meta name='msapplication-TileColor' content='#2b5797' />
      <meta name='msapplication-config' content='/browserconfig.xml' />
      <meta name='theme-color' content='#ffffff' />
      <meta name='keyword' content={seo[props.typeInput].keywords} />
    </Head>
  );
}
