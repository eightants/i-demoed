import Head from "next/head";
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import { GetStaticProps } from "next";
import { useState } from "react";
import {
  DOMAIN,
  FULL_SERVICE_URL,
  HACKATHONS_ENDPOINT_RES,
  PROJECTS_ENDPOINT_RES,
  WALL_URL_ENDPOINT,
} from "../functions/constants";
import { CodeBlock, CodeString } from "../components/shared";

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
      <header className="flex items-center flex-row justify-center max-w-xl mt-12 mx-auto px-4">
        <img className="h-12" src="/images/hexagon.svg" />
        <h1 className="mx-4 text-4xl">I Demoed</h1>
      </header>
      <section className="max-w-xl mx-auto p-4">
        <h3 className="text-gray-600 text-lg text-center mt-4 mb-8 mx-4">
          Showcase your role in the hackathon community.{" "}
        </h3>
        <div className="flex flex-row justify-center py-4 sm:block">
          <input
            className="flex-grow sm:w-full text-gray-800 font-medium flex-none leading-6 py-2 mr-4 px-4 border border-gray-300 rounded-lg flex items-center justify-center space-x-4 sm:space-x-2 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-400 focus:outline-none transition-colors duration-200"
            placeholder="Devpost username..."
            value={devpostUsername}
            onChange={(e) => setDevpostUsername(e.target.value)}
          />
          <button
            className="w-auto sm:w-full sm:mt-4 flex-none bg-gray-900 hover:bg-gray-700 text-white text-lg leading-6 font-semibold py-2 px-6 border border-transparent rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200"
            onClick={() => {
              setWallUrl(WALL_URL_ENDPOINT + devpostUsername);
              setDevpostUsername("");
            }}
          >
            Generate
          </button>
        </div>
        {wallUrl ? (
          <button
            className="w-full flex-none bg-gray-50 text-gray-400 hover:text-gray-900 font-mono leading-6 my-2 py-3 px-4 border border-gray-200 rounded-lg flex items-center justify-between space-x-2 sm:space-x-4 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-300 focus:outline-none transition-colors duration-200"
            onClick={() => navigator.clipboard.writeText(DOMAIN + wallUrl)}
          >
            <span className="inline whitespace-nowrap text-gray-500 overflow-ellipsis overflow-hidden">
              {DOMAIN + wallUrl}
            </span>
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
      <section className="max-w-3xl mx-auto text-lg sm:text-base p-4">
        <h2 className="text-2xl leading-5 my-5 font-semibold">Usage</h2>
        <CodeBlock>{FULL_SERVICE_URL}</CodeBlock>
        <div className="py-2 flex sm:block">
          <div className="w-36 flex-none">username</div>
          <p className="flex-grow">
            Devpost username of the user. Found at{" "}
            <CodeString>{`devpost.com/<username>`}</CodeString>.
          </p>
        </div>
        <div className="py-2 flex sm:block">
          <div className="w-36 flex-none">limit</div>
          <p className="flex-grow">
            Integer representing the maximum number of hackathons to return for
            a user. Default: -1. Only applies when the{" "}
            <CodeString>username</CodeString> parameter exists.
          </p>
        </div>
        <div className="py-2 flex sm:block">
          <div className="w-36 flex-none">level</div>
          <p className="flex-grow">
            Integer representing the minimum level of participation in a
            hackathon. Default: 1. Only applies when the{" "}
            <CodeString>username</CodeString> parameter exists.
            <br />
            0: All registered hackathons
            <br />
            1: Only hackathons where the user submitted a project
            <br />
            2: Only hackathons where the user won a prize
          </p>
        </div>
        <div className="py-2 flex sm:block">
          <div className="w-36 flex-none">events</div>
          <p className="flex-grow">
            Comma-separated list of event names to add to the wall. Names
            correlate to the name of the image file in{" "}
            <CodeString>badges/</CodeString>. Add "hdb_" before the name of the
            badge if referring to the <CodeString>badges/alt/</CodeString>{" "}
            directory.
            <br />
            <strong>Examples:</strong>
            <br />
            <CodeString>?events=tamuhack2020,howdyhack2020</CodeString>
            <br />
            Adds tamuhack2020.png and howdyhack2020.png from badges/devpost/ to
            the generated image.
            <br />
            <CodeString>?events=hdb_hh20,howdyhack2020</CodeString>
            <br />
            Adds hh20.png from badges/alt/ and howdyhack2020.png from
            badges/devpost/ to the generated image.
          </p>
        </div>
        <div className="py-2 flex sm:block">
          <div className="w-36 flex-none">pr</div>
          <p className="flex-grow">
            Integer for the number of badge tiles per row in the generated
            image. Default: 5.
          </p>
        </div>
        <div className="py-2 flex sm:block">
          <div className="w-36 flex-none">type</div>
          <p className="flex-grow">
            The format of the generated image, either svg or png. Default: svg.
          </p>
        </div>
        <div className="py-2 flex sm:block">
          <div className="w-36 flex-none">size</div>
          <p className="flex-grow">
            Integer representing the length of each generated badge. Default:
            100. Only applies when <CodeString>type</CodeString> is png.
          </p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto text-lg sm:text-base p-4">
        <h2 className="text-2xl leading-5 my-5 font-semibold">Devpost API</h2>
        <p className="pb-2">
          A side-benefit of this project is a providing a basic API to obtain
          devpost information for a user. There are currently two endpoints
          available.{" "}
        </p>
        <CodeBlock>{`/api/user/<devpostUsername>/hackathons`}</CodeBlock>
        <div className="py-2 flex sm:block">
          <div className="w-48 flex-none">devpostUsername</div>
          <p className="flex-grow">
            Devpost username of the user. Found at{" "}
            <CodeString>{`devpost.com/<username>`}</CodeString>.
          </p>
        </div>
        <p>Returns listing of hackathons that the user has participated in. </p>
        <div className="overflow-auto text-sm mb-6">
          <pre>{JSON.stringify(HACKATHONS_ENDPOINT_RES, null, 2)}</pre>
        </div>
        <CodeBlock>{`/api/user/<devpostUsername>/projects`}</CodeBlock>
        <div className="py-2 flex sm:block">
          <div className="w-48 flex-none">devpostUsername</div>
          <p className="flex-grow">
            Devpost username of the user. Found at{" "}
            <CodeString>{`devpost.com/<username>`}</CodeString>.
          </p>
        </div>
        <p>Returns listing of projects for a user. </p>
        <div className="overflow-auto text-sm mb-6">
          <pre>{JSON.stringify(PROJECTS_ENDPOINT_RES, null, 2)}</pre>
        </div>
      </section>
      <section className="p-8"></section>
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
