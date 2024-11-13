let content = `

<header class="header">
        <div><img src="Images/logo_dark.png" class="logo"></div> 
        <ul class="nav">
            <li><a href="#home">Home</a></li>
            <!-- <li><a href="#">About</a></li> -->
            <li><a href="#contact">Contact</a></li>
        </ul>

        <div class="right-content">
            <a class="nav-btn" id="login">Login</a>
            <div class="bx bx-menu" id="menu-icon"></div>
        </div>

    </header>

    <section class="home" id="home">
        <div class="home-text">
            <h5>#Risk it to Win it</h5>
            <h1>-Student<span>Stake</span></h1>
            <p>Dive into the exciting world of betting with our user-friendly platform. Perfect your skills and stake your claim!</p>
            
            <div class="home-btn">
                <a class="btn" id="register">Register now</a>
            </div>

        </div>


        <div class="home-img">
            <img src="Images/bitcoin.png" alt="Internet slow h aapka">
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