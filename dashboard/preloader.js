let content = `

<header class="header">
        <div><img src="../Images/logo_dark.png" class="logo"></div>
        <ul class="nav">
            <li><a href="#stats">Stats</a></li>
            <li><a href="#games">Games</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>

        <div class="right-content">
          <a class="nav-btn" id="logout">Logout</a>
          <div class="bx bx-menu" id="menu-icon"></div>
      </div>
    </header>

    <section class="stats" id="stats">

    </section>

    <section class="games" id="games">
        <div class="games-container">
            <div class="games-box">
              <img src="../Images/vote_vault.png" alt="">
              <div class="games-layer">
                <h4>Vote Vault</h4>
                <p>Players lock in their guesses on vote counts, with the closest guesses winning</p>
                <a href="#" target="_blank" rel="noopener noreferrer"><i
                    class="bx bx-link-external"></i></a>
              </div>
            </div>

            <div class="games-box">
              <img src="../Images/ranking_rally.png" alt="">
              <div class="games-layer">
                <h4>Ranking Rally</h4>
                <p>Predict the final standings of each candidate in the competition</p>
                <a href="#" target="_blank" rel="noopener noreferrer"><i
                    class="bx bx-link-external"></i></a>
              </div>
            </div>

            <div class="games-box">
                <img src="../Images/question.png" alt="">
                <div class="games-layer">
                  <h4>Coming Soon</h4>
                  <p></p>
                  <a href="#games" target="_blank" rel="noopener noreferrer"><i
                      class="bx bx-link-external"></i></a>
                </div>
              </div>
        </div>
    </section>

    <section class="contact" id="contact">
      <div class="visme_d" data-title="Contact Form" data-url="x40zgyd0-contact-form" data-domain="forms" data-full-page="false" data-min-height="500px" data-form-id="101344"></div><script src="https://static-bundles.visme.co/forms/vismeforms-embed.js"></script>
  </section>

  <footer class="footer">
    <div class="footer-content">
        <h1>StudentStake</h1>
        <p>© 2024 StudentStake. All rights reserved.</p>
    </div>
  </footer>`;

document.querySelector("noscript").outerHTML = content;