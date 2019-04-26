import {
  resolve
} from 'path';

const fs = require('fs');
const axios = require('axios')

var glob = require("glob")

const typeDefs = []

glob.sync(resolve(__dirname, '', '**/*.graphql'))
  .forEach(path => {
    const content = fs.readFileSync(
      path, {
        encoding: 'utf-8'
      }
    );
    typeDefs.push(content)
  })

export default typeDefs