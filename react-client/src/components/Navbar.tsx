function Nav() {
  return (
    <header className="header border-b-[1px] border-slate-700" data-header>
      <div className="container max-h-[25px]">
        <a href="/#">
          {" "}
          <img
            src="/images/logo.svg"
            alt=""
            height={25}
            className="mr-[10px] h-[30px] sm:visible"
          />{" "}
        </a>
        <h1 className=" gradient marginlogo text-xxl text-brandGreen font-semibold">
          LaunchPad
        </h1>

        <nav className="navbar" data-navbar>
          <ul className="navbar-list">
            {/* {isConnected && ( */}
            <li>
              <a
                href="/dashboard"
                className="navbar-link label-lg link:hover cursor-pointer"
              >
                Dashboard
              </a>
            </li>
            {/* )} */}

            <li>
              <a
                href="/host"
                className="navbar-link label-lg link:hover cursor-pointer"
              >
                Host
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
