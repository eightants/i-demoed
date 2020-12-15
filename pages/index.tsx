import Head from "next/head";
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import { GetStaticProps } from "next";
import { useState } from "react";
import { DOMAIN, WALL_URL_ENDPOINT } from "../functions/constants";
import wall from "./api/wall";

export default function Home({
  allPostsData,
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
  }[];
}) {
  const [devpostUsername, setDevpostUsername] = useState("");
  const [wallUrl, setWallUrl] = useState("");

  return (
    <Layout>
      <Head>
        <title>Hackathon Demo Badges</title>
      </Head>
      <section>
        <h3 className="text-gray-600 text-lg text-center mt-6 mb-8 mx-4">
          Showcase your role in the hackathon community.{" "}
        </h3>
        <div className="flex flex-row justify-center py-4 sm:block">
          <input
            className="flex-grow sm:w-full text-gray-800 font-medium flex-none leading-6 py-3 mr-4 px-4 border border-gray-300 rounded-lg flex items-center justify-center space-x-4 sm:space-x-2 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-400 focus:outline-none transition-colors duration-200"
            placeholder="Devpost username..."
            value={devpostUsername}
            onChange={(e) => setDevpostUsername(e.target.value)}
          />
          <button
            className="w-auto sm:w-full sm:mt-4 flex-none bg-gray-900 hover:bg-gray-700 text-white text-lg leading-6 font-semibold py-3 px-6 border border-transparent rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200"
            onClick={() => {
              setWallUrl(WALL_URL_ENDPOINT + devpostUsername);
              setDevpostUsername("");
            }}
          >
            Generate
          </button>
        </div>
        {wallUrl ? (
          <button className="w-full flex-none bg-gray-50 text-gray-400 hover:text-gray-900 font-mono leading-6 my-2 py-3 px-4 border border-gray-200 rounded-lg flex items-center justify-center space-x-2 sm:space-x-4 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-300 focus:outline-none transition-colors duration-200">
            <span className="inline whitespace-nowrap text-gray-500 overflow-ellipsis overflow-hidden">{DOMAIN + wallUrl}</span>
            <span className="sr-only">(click to copy to clipboard)</span>
            <img
              className="opacity-50 hover:opacity-100 duration-200"
              src="/images/copy.svg"
            />
          </button>
        ) : (
          ""
        )}
        <div className="w-full">
          <img className="w-full py-4 px-2" src={wallUrl} />
        </div>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
