import logo from "./assets/logo.jpeg";


const Header = () => {
    return (
        <header>
        <img src={logo} alt="Rick and Morty" />
        <h1>Fetch and Display Rick & Morty Characters</h1>
      </header>
    )
}

export default Header;