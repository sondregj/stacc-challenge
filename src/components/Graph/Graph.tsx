import React from 'react'

import css from './Graph.module.scss'

const Graph: React.FC = ({ children }) => (
    <div className={css.container}>{children}</div>
)

export default Graph
