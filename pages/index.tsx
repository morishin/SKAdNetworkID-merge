import Head from "next/head";
import AppHead from "~/app/head";
import AppHome from "~/app/page";

export default function Page() {
  return (
    <>
      <Head>
        <AppHead />
      </Head>
      <AppHome />
    </>
  );
}
