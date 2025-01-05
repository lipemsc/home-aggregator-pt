import 'jsdom';
import process from 'process';
import { fetchIdealista, parseIdealista } from './parsers/idealista';
import { fetchSupercasa, parseSupercasa } from './parsers/supercasa';
import { parse } from 'path';
import { fetchEra, parseEra } from './parsers/era';

const websitePicker = (urlString: string) => {
  const url = new URL(urlString);
  const hostname = url.hostname;

  switch (hostname) {
    case 'www.idealista.pt':
    case 'idealista.pt':
      return 'idealista';
    case 'www.supercasa.pt':
    case 'supercasa.pt':
      return 'supercasa';
    case 'www.era.pt':
    case 'era.pt':
      return 'era';
    default:
      throw new Error('Unsupported website');
  }
}

const websiteSelector = {
  'idealista': {
    fetch: fetchIdealista,
    parse: parseIdealista
  },
  'supercasa': {
    fetch: fetchSupercasa,
    parse: parseSupercasa
  },
  'era': {
    fetch: fetchEra,
    parse: parseEra
  }
};

// get the url from the command line

if (process.argv.length < 3) {
  console.log('Usage: node index.js <url>');
  process.exit(1);
}

const url: string = process.argv[2];

websiteSelector[websitePicker(url)].fetch(url)
  .then(response => {
    console.log(`${response.status}\n${response.data}`);
    console.log( websiteSelector[websitePicker(url)].parse(response.data));
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

