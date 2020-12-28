import Layout from "../components/layout";
import { useRef, useState } from "react";
import { createCanvas } from "canvas";
import {
  BADGE19_DEFAULTS,
  BadgeParams,
  BADGE_CUSTOM,
  DOMAIN,
  EVENT_METADATA,
  FULL_SERVICE_URL,
  GITHUB_REPO,
  HACKATHONS_ENDPOINT_RES,
  PROJECTS_ENDPOINT_RES,
  WALL_URL_ENDPOINT,
} from "../functions/constants";
import {
  badge19,
  badge20,
  BadgeInput,
  CodeBlock,
  CodeString,
  Dropdown,
  LogoUpload,
} from "../components/shared";

function drawInlineSVG(svgElement, ctx, callback) {
  const svgURL = new XMLSerializer().serializeToString(svgElement);
  const img = new Image();
  img.onload = function () {
    ctx.drawImage(this, 0, 0);
    callback();
  };
  img.src = "data:image/svg+xml; charset=utf8, " + encodeURIComponent(svgURL);
}

export default function Home() {
  const [devpostUsername, setDevpostUsername] = useState("");
  const [wallUrl, setWallUrl] = useState("");
  const [badgeProps, setBadgeProps] = useState(BADGE19_DEFAULTS);
  const badgeRef = useRef(null);

  const downloadBadge = () => {
    const canvas = createCanvas(300, 300);
    const ctx = canvas.getContext("2d");
    drawInlineSVG(badgeRef.current.children[0], ctx, function () {
      const a = document.createElement("a");
      a.href = canvas.toDataURL();
      a.download = "hex.png";
      a.click();
    });
  };

  return (
    <Layout>
      <header className="flex items-center flex-row justify-center max-w-xl mt-12 mx-auto px-4">
        <img className="h-12 cursor-pointer" src="/images/hexagon.svg" />
        <h1 className="mx-4 text-4xl cursor-pointer">I Demoed</h1>
      </header>
      <section className="max-w-xl mx-auto p-4">
        <h3 className="text-gray-600 text-lg text-center mt-4 mb-8 mx-4">
          Showcase your participation in the hackathon community.{" "}
        </h3>
        <div className="flex flex-row justify-center py-4 sm:block">
          <input
            className="flex-grow sm:w-full text-gray-800 font-medium flex-none leading-6 py-2 mr-4 px-4 border border-gray-300 rounded-lg flex items-center justify-center space-x-4 sm:space-x-2 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-400 focus:outline-none transition-colors duration-200"
            placeholder="Devpost username..."
            value={devpostUsername}
            onChange={(e) => setDevpostUsername(e.target.value)}
          />
          <button
            className="w-auto sm:w-full sm:mt-4 flex-none bg-gray-900 hover:bg-gray-700 text-white text-lg leading-6 font-semibold pt-2 pb-3 px-6 border border-transparent rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200"
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
            className="w-full flex-none text-base bg-gray-50 text-gray-400 hover:text-gray-900 font-mono leading-6 my-2 py-3 px-4 border border-gray-200 rounded-lg flex items-center justify-between space-x-2 sm:space-x-4 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-300 focus:outline-none transition-colors duration-200"
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
      <section className="max-w-3xl mx-auto text-base sm:text-sm p-4">
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
            a user. Default: 100. Only applies when the{" "}
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
            <CodeString>badges/</CodeString>. Add {'"hdb_"'} before the name of
            the badge if referring to the <CodeString>badges/alt/</CodeString>{" "}
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
        <div className="py-2 flex sm:block">
          <div className="w-36 flex-none">placeholder</div>
          <p className="flex-grow">
            Specifies what should be done if the sticker is not matched in the
            repository. Default: Generates hexagon badge using the {"event's"}
            Devpost image. If <CodeString>placeholder=duck</CodeString> it will
            use the MLH duck demo sticker as the placeholder.
          </p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto text-base sm:text-sm p-4">
        <h2 className="text-2xl leading-5 my-5 font-semibold">
          Submit A Badge
        </h2>
        <p className="my-2">
          Want hackers to showcase your hackathon event badge or want to add
          past events you participated in? Follow the steps to add your badge to
          the GitHub repository.
        </p>
        <div className="py-2">
          <h3 className="text-lg leading-4 my-4 font-semibold">
            Devpost Hackathons
          </h3>
          <p className="mb-4">
            If your hackathon is on Devpost,{" "}
            <a href="https://github.com/eightants/i-demoed/issues">
              visit the issue page
            </a>{" "}
            and select{" "}
            <CodeString>{"New issue > Submit Devpost Badge"}</CodeString> with
            the following information.
          </p>
          <ul className="px-6">
            <li>
              <strong>Badge Image:</strong> PNG image of a hexagon sticker with
              the correct dimensions (minimum 181x209)
            </li>
            <li>
              <strong>Devpost Link:</strong> Link to event on Devpost (e.g.
              tamuhack2020.devpost.com)
            </li>
          </ul>
          <p className="my-4">
            Alternatively, you can open a Pull Request. Place your event badge
            PNG image in <CodeString>/public/badges/devpost</CodeString> with
            the image name as <CodeString>{"<event_name>.png"}</CodeString>{" "}
            corresponding to the event URL on Devpost{" "}
            <CodeString>{"<event_name>.devpost.com"}</CodeString>.
          </p>
        </div>
        <div className="py-2">
          <h3 className="text-lg leading-4 my-4 font-semibold">
            Other Hackathons/Events
          </h3>
          <p className="mb-4">
            If your hackathon does not use Devpost but would still like users to
            showcase the badge,{" "}
            <a href="https://github.com/eightants/i-demoed/issues">
              visit the issue page
            </a>{" "}
            and select{" "}
            <CodeString>{"New issue > Submit Other Badge"}</CodeString> with the
            following information. Badges added using this method will not be
            automatically matched through devpost usernames and will need to be
            manually specified in the <CodeString>events</CodeString> parameter.
          </p>
          <ul className="px-6">
            <li>
              <strong>Badge Image:</strong> PNG image of a hexagon sticker with
              the correct dimensions (minimum 181x209)
            </li>
            <li>
              <strong>Metadata:</strong> Information about your badge. <br />{" "}
              <pre className="overflow-auto text-sm text-gray-600 sm:text-xs">
                {JSON.stringify(EVENT_METADATA, null, 2)}
              </pre>
            </li>
          </ul>
          <p className="my-4">
            Alternatively, you can open a Pull Request. Place your event badge
            PNG image in <CodeString>/public/badges/alt</CodeString> with the
            image name as <CodeString>{"<id>.png"}</CodeString> and the metadata
            file as <CodeString>{"<id>.json"}</CodeString> in{" "}
            <CodeString>/public/badges/alt_meta</CodeString>. id must be unique!
          </p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto text-base sm:text-sm p-4">
        <h2
          className="text-2xl leading-5 my-5 font-semibold"
          id="badge-creator"
        >
          Badge Creator
        </h2>
        <p className="my-5">
          Have an MLH event but do not have a sticker file? Use the template to
          recreate the hexagon badge from your event. Then follow the steps
          above to add your badge to the repository.
        </p>
        <div className="flex sm:block">
          <div className="w-1/2 sm:w-full sm:mb-8">
            {BADGE_CUSTOM.map((obj: BadgeParams, ind: number) =>
              obj.inputType === "dropdown" ? (
                <Dropdown
                  key={ind}
                  {...{ ...obj, setBadgeProps, badgeProps }}
                ></Dropdown>
              ) : obj.inputType === "input" ? (
                <BadgeInput
                  key={ind}
                  {...{ ...obj, setBadgeProps, badgeProps }}
                ></BadgeInput>
              ) : (
                <LogoUpload
                  key={ind}
                  {...{ ...obj, setBadgeProps, badgeProps }}
                ></LogoUpload>
              )
            )}
            <div className="py-2 flex justify-between items-center sm:block">
              <button
                className="w-auto sm:w-full sm:mt-2 mr-2 sm:mr-0 flex-none hover:border-gray-700 hover:text-gray-700 text-md text-gray-900 leading-6 font-semibold py-2 px-6 border border-gray-900 rounded focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200"
                onClick={() => setBadgeProps(BADGE19_DEFAULTS)}
              >
                Reset
              </button>
              <button
                className="w-auto sm:w-full sm:mt-2 flex-none bg-gray-900 hover:bg-gray-700 text-white text-md leading-6 font-semibold py-2 px-6 border border-transparent rounded focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200"
                onClick={downloadBadge}
              >
                Download
              </button>
            </div>
          </div>
          <div className="w-1/2 sm:w-full">
            <div className="max-w-xs mx-auto px-6" ref={badgeRef}>
              {badgeProps.badgeType == "MLH 2019"
                ? badge19(badgeProps)
                : badge20(badgeProps)}
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-3xl mx-auto text-base sm:text-sm p-4">
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
        <div className="overflow-auto text-sm mb-10 text-gray-600 sm:text-xs">
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
        <div className="overflow-auto text-sm mb-10 text-gray-600 sm:text-xs">
          <pre>{JSON.stringify(PROJECTS_ENDPOINT_RES, null, 2)}</pre>
        </div>
      </section>
      <section className="max-w-3xl mx-auto text-base sm:text-sm p-4 text-center">
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="hover:no-underline sm:w-full sm:mt-2 sm:mr-0 flex-none hover:border-gray-700 hover:text-gray-700 text-md text-gray-900 leading-6 font-semibold py-3 px-5 border border-gray-900 rounded focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200"
          href={GITHUB_REPO}
        >
          Contribute on GitHub
        </a>
      </section>
      <section className="pt-10 pb-16 text-center">
        <div className="flex flex-row items-center justify-center text-gray-500">
          <p className="text-sm pr-2">Powered by</p>{" "}
          <img className="w-5" src="/images/vercel.svg" />
        </div>
      </section>
    </Layout>
  );
}
