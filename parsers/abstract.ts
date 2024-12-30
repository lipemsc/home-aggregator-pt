import { JSDOM } from 'jsdom';


abstract class Parser {
    dom: JSDOM;
    data: Array<Listing>;
    
    constructor(html: string) {
        this.dom = new JSDOM(html);
        this.data = [];

        if (this.constructor === Parser) {
            throw new Error("Cannot instantiate abstract class");
        }
    }
    abstract parse(): void;
}

export default Parser;