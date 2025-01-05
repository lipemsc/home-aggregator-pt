import { JSDOM } from 'jsdom';
import Listing from '../types/listing';
import axios, { AxiosResponse } from 'axios';


const parseIdealista = (html: string) => {
    const dom = new JSDOM(html);
    const data: Array<Listing> = [];
    dom.window.document.querySelectorAll('article.item').forEach((item) => {
        data.push({
            website: 'idealista',
            id: parseInt(item.getAttribute('data-element-id') || "", 10),
            url: `https://www.idealista.pt${item.querySelector('a.item-link')?.getAttribute('href') || ""}`,
            price: item.querySelector('span.item-price')?.textContent || "",
            title: item.querySelector('a.item-link')?.innerHTML.replace(/\n/g, '').trim() || "",
            rooms: parseInt(item.querySelectorAll('span.item-detail')[0].innerHTML.trim().slice(1) || ""),
            size: parseInt(item.querySelectorAll('span.item-detail')[1].innerHTML || "0", 10)
        } as Listing);
    });

    return data;
}


const fetchIdealista = async (url: string) : Promise<AxiosResponse> => {
    return axios.get(url, {
        headers: {
            "accept":                       'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            "accept-encoding":              'gzip, deflate, br, zstd',
            "accept-language":              'pt-PT,pt;q=0.5',
            "cache-control":                'max-age=0',
            "dnt":                          '1',
            "priority":                     'u=0, i',
            "sec-ch-ua":                    '"Brave";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            "sec-ch-ua-mobile":             '?0',
            "sec-ch-ua-platform":           '"Linux"',
            "sec-fetch-dest":               'document',
            "sec-fetch-mode":               'navigate',
            "sec-fetch-site":               'same-origin',
            "sec-fetch-user":               '?1',
            "sec-gpc":                      '1',
            "upgrade-insecure-requests":    '1',
            "user-agent":                   'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
        }})
}

export { parseIdealista, fetchIdealista };