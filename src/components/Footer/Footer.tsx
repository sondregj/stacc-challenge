import React from 'react'

import FeatherIcon from 'feather-icons-react'

import styles from './Footer.module.css'

const Footer: React.FC = () => (
    <footer className={styles.footer}>
        <div className={styles.socialLinks}>
            <a
                className={`${styles.socialLink} ${styles.gitHubIcon}`}
                href="https://github.com/sondregj"
            >
                <FeatherIcon className={styles.socialIcon} size="48px" icon="github" />
            </a>

            <a
                className={`${styles.socialLink} ${styles.twitterIcon}`}
                href="https://twitter.com/sondregj"
            >
                <FeatherIcon className={styles.socialIcon} size="48px" icon="twitter" />
            </a>

            <a
                className={`${styles.socialLink} ${styles.facebookIcon}`}
                href="https://facebook.com/sondregj"
            >
                <FeatherIcon
                    className={styles.socialIcon}
                    size="48px"
                    icon="facebook"
                />
            </a>

            <a
                className={`${styles.socialLink} ${styles.codePenIcon}`}
                href="https://codepen.com/sondregj"
            >
                <FeatherIcon className={styles.socialIcon} size="48px" icon="codepen" />
            </a>

            <a
                className={`${styles.socialLink} ${styles.webPageIcon}`}
                href="https://sondregjellestad.space"
            >
                <FeatherIcon className={styles.socialIcon} size="48px" icon="globe" />
            </a>
        </div>
        <span className={styles.copyright}>Sondre Gjellestad | 2019</span>
    </footer>
)

export default Footer
