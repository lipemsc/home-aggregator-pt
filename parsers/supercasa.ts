import { JSDOM } from 'jsdom';
import Parser from './abstract';

class Supercasa extends Parser {

    // constructor
    constructor(html: string) {
        super(html);
    }

    parse () {
        this.dom.window.document.querySelectorAll('div.property').forEach((item) => {
            this.data.push({
                website: 'supercasa',
                id: parseInt(item.getAttribute('id') || "", 10),
                url: item.querySelector('a.item-link')?.getAttribute('href') || "",
                price: item.querySelector('div.property-price')?.textContent || "",
                title: item.querySelector('h2.property-list-title')?.childNodes[0].textContent?.trim()|| "",
                rooms: parseInt(item.querySelectorAll('div.property-features')[0].innerHTML.trim() || ""),
                size: parseInt(item.querySelectorAll('span.item-detail')[1].innerHTML || "0", 10)
            });
        });
    }
}



export default Supercasa;