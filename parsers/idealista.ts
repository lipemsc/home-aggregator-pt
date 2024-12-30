import { JSDOM } from 'jsdom';
import Parser from './abstract';

class Idealista extends Parser {

    // constructor
    constructor(html: string) {
        super(html);
    }

    parse () {
        this.dom.window.document.querySelectorAll('article.item').forEach((item) => {
            this.data.push({
                website: 'idealista',
                id: parseInt(item.getAttribute('data-element-id') || "", 10),
                url: `https://www.idealista.pt${item.querySelector('a.item-link')?.getAttribute('href') || ""}`,
                price: item.querySelector('span.item-price')?.textContent || "",
                title: item.querySelector('a.item-link')?.innerHTML.replace(/\n/g, '').trim() || "",
                rooms: parseInt(item.querySelectorAll('span.item-detail')[0].innerHTML.trim().slice(1) || ""),
                size: parseInt(item.querySelectorAll('span.item-detail')[1].innerHTML || "0", 10)
            });
        });
    }
}



export default Idealista;