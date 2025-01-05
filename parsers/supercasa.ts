import { JSDOM } from 'jsdom';
import Listing from '../types/listing';
import axios, { AxiosResponse } from 'axios';


const parseSupercasa = (html: string) => {
    const dom = new JSDOM(html);
    const data: Array<Listing> = [];
    dom.window.document.querySelectorAll('div.property').forEach((item) => {
        data.push({
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


const fetchSupercasa = async (url: string) : Promise<AxiosResponse> => {
    return axios.get(url, {
        headers: {
            
        }})
}



export { parseSupercasa, fetchSupercasa };