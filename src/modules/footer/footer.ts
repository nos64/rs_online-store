import './footer.scss';
import '../../img/rs_school_js.svg';
import '../../img/arrow-top.svg';
import { createHTMLElement } from '../types/createHTMLElement';

const footer = createHTMLElement('footer', 'footer');

const container = createHTMLElement('div', 'container', 'footer__container');

const leftDiv = createHTMLElement('div', 'footer__left');

const copySpan = createHTMLElement('span', 'footter__left-text');
copySpan.textContent = '©';

const yearSpan = createHTMLElement('span', 'footter__left-text');
yearSpan.textContent = '2022';

const gitLink = createHTMLElement('a', 'footer__left-item', 'footer__link');
if (gitLink instanceof HTMLAnchorElement) {
  gitLink.textContent = 'github';
  gitLink.href = 'https://github.com/nos64';
  gitLink.target = '_blank';
}

const courseLink = createHTMLElement('a', 'footer__link');
if (courseLink instanceof HTMLAnchorElement) {
  courseLink.href = 'https://rs.school/js/';
  courseLink.target = '_blank';
}

const courseSvg = createHTMLElement('img', 'footer__logo-course');
if (courseSvg instanceof HTMLImageElement) {
  courseSvg.src = 'img/rs_school_js.svg';
}

const topLink = createHTMLElement('a', 'topbutton');
if (topLink instanceof HTMLAnchorElement) {
  topLink.href = '#';
  topLink.title = 'Top';
}

const topSvg = createHTMLElement('img');
if (topSvg instanceof HTMLImageElement) {
  topSvg.src = 'img/arrow-top.svg';
}

topLink.append(topSvg);
courseLink.append(courseSvg);
leftDiv.append(copySpan, yearSpan, gitLink);
container.append(leftDiv, courseLink);
footer.append(container);
document.body.append(footer, topLink);
