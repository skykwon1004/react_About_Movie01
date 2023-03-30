import styled, { createGlobalStyle } from "styled-components";

const Reset = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
    box-sizing: border-box;
}

*::before,
*::after {
    box-sizing: border-box;
}

ul,
ol {
    list-style: none;
}

em,
i,
address {
    font-style: normal;
}

b,
strong {
    font-weight: normal;
}

a {
    text-decoration: none;
}

img {
    vertical-align: middle;
    max-width: 100%;
}

body {
    font-family: 'Red Hat Display', 'Roboto', 'Noto Sans KR', sans-serif;
    line-height: 1;
    color: #111;
}

`

export default Reset;

