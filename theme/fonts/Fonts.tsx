import { Global } from "@emotion/react";
const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Gotham-logo';
        src: url(../fonts/Gotham-Font/Gotham-Bold.otf);
        font-style: normal;
        font-weight: 700;
      }
    @font-face {
       font-family: 'Gotham-text';
        src: url(../public/fonts/Gotham-Font/GothamBook.ttf);
       font-style: normal;
        font-weight: 400;
    }
      `}
  />
);
export default Fonts;
