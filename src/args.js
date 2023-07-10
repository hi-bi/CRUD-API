import { argv } from 'node:process';

let multi = false;

const parseArgs = () => {
    const argMulti = argv.splice(2).filter(item => item = 'multi');

    if (argMulti) {
        multi = true;
    };
};

parseArgs();

export {
    multi
}