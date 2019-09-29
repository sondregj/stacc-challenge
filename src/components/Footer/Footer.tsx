import React from 'react'

import FeatherIcon from 'feather-icons-react'

import css from './Footer.module.scss'

const Footer = () => (
    <footer className={css.container}>
        <div className={css.links}>
            <a
                className={`${css.link} ${css.github}`}
                href="https://github.com/sondregj"
            >
                <FeatherIcon size="48px" icon="github" />
            </a>

            <a
                className={`${css.link} ${css.twitter}`}
                href="https://twitter.com/sondregj"
            >
                <FeatherIcon size="48px" icon="twitter" />
            </a>

            <a
                className={`${css.link} ${css.facebook}`}
                href="https://facebook.com/sondregj"
            >
                <FeatherIcon size="48px" icon="facebook" />
            </a>

            <a
                className={`${css.link} ${css.codepen}`}
                href="https://codepen.com/sondregj"
            >
                <FeatherIcon size="48px" icon="codepen" />
            </a>

            <a
                className={`${css.link} ${css.website}`}
                href="https://sondregjellestad.space"
            >
                <FeatherIcon size="48px" icon="globe" />
            </a>
        </div>

        <span className={css.copyright}>Sondre Gjellestad | 2019</span>
    </footer>
)

export default Footer
