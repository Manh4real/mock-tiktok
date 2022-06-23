import React from "react";
import "./GlobalStyles.scss";

interface Props {
    children: string | number | JSX.Element | JSX.Element[]
}

function GlobalStyles({children}: Props) {
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
}

export default GlobalStyles