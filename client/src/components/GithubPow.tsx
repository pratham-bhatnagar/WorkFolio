import React from "react";

function GithubPow(props: any) {
  return (
    <div className="">
      <div className="flex flex-row justify-between ">
        <img
          width={680}
          src={`http://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${props.username}&theme=dark`}
        />
        {/* <div className="flex flex-wrap flex-row gap-x-5 gap-y-3 mt-3"> */}
        <img
          width={330}
          alt="stats card"
          src={`https://github-profile-summary-cards.vercel.app/api/cards/stats?username=${props.username}&theme=dark`}
        />
      </div>
      <div className="flex flex-row justify-between mt-2 gap-2">
        <img
          alt="stats card"
          src={`http://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=${props.username}&theme=dark&utcOffset=8`}
        />
        <img
          alt="stats card"
          src={`http://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=${props.username}&theme=dark`}
        />
        <img
          src={`https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=${props.username}&theme=dark`}
        />
      </div>
    </div>
  );
}

export default GithubPow;
