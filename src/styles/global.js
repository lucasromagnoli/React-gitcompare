import { createGlobalStyle } from 'styled-components';
import 'font-awesome/css/font-awesome.css';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }

    body {
        background: #f7eaca;
        font-family: sans-serif;
        text-rendering: optimizeLegibility !important;
        -webkit-kit-smoothing: antialiased !important;
    }

`;

export default GlobalStyle;
