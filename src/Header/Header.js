import React from 'react'
import "./Header.css"
import {Container, Image} from "react-bootstrap"
import logo from "../Images/logo.png"
import title from "../Images/title.png"

const Header = () => {
    return (
        <Container className="header">
            <Container className="header__Title">
                <Image src={logo} alt="Logo Let's get Spicy" />
            </Container>
            <Container className="header__subTitle">
                <Image src={title} alt="Title Let's get Spicy" />
            </Container>
        </Container>
    )
}

export default Header
