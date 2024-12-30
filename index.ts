// make a web request and get the html content of the page

import 'jsdom';
import process from 'process';
import axios, { Axios, AxiosHeaders } from 'axios';
import parse from './parsers/idealista';
import Idealista from './parsers/idealista';
import { URL } from 'url';
import Supercasa from './parsers/supercasa';
import Parser from './parsers/abstract';



const selectWebsite = (urlStr: string, html: string) => {
    let hostname = new URL(urlStr).hostname
    console.log(hostname);
    
    switch (new URL(urlStr).hostname) {
        case 'idealista.pt':
        case 'www.idealista.pt':
            return new Idealista(html);
        case 'supercasa.pt':
        case 'www.supercasa.pt':
            return new Supercasa(html);
        default:
            throw new Error('Website not supported');
    }
}


// get the url from the command line

if (process.argv.length < 3) {
  console.log('Usage: node index.js <url>');
  process.exit(1);
}

const url: string = process.argv[2];


// make a request to the url
axios.get(url, {
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
  .then(response => {

    let websiteParser: Parser = selectWebsite(url, response.data);
    websiteParser.parse();
    console.log(websiteParser.data);
  })
  .catch(error => {
    console.log(error);
    process.exit(1);
  });

