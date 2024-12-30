import { JSDOM } from 'jsdom';


class Idealista {
    dom: JSDOM;

    // constructor
    constructor(html: string) {
        this.dom = new JSDOM(html);
    }

    parse () {
        console.log(this.dom.window.document.querySelector('title')?.textContent);
        this.dom.window.document.querySelectorAll('article.item').forEach((item) => {
            console.log(item.querySelector('a.item-link')?.getAttribute('href'));
            console.log(item.querySelector('span.item-price')?.textContent);
            

        });
    }
}



export default Idealista;