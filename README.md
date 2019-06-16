# Udacity Blockchain Developer Nanodegree Program - Project 3: Connect Private Blockchain to Front-End Client via APIs

## Getting started

1. Clone the repository

2. Install all required Node.js packages:

```
npm install
```

3. Initialize the blockchain:

```
node SimpleChain.js -i
```

4. Test that the blockchain has been initialized correctly:

```
node SimpleChain.js -t
```

5. Now you can start the Express.js server:

```
node app.js
```

## Accessing the API

Use Curl to access the API.

1. Send a GET request with a block height parameter to receive the block object in JSON format:

```
# Get genesis block
curl -v -X GET http://localhost:8000/block/0

# Get the 5th block
curl -v -X GET http://localhost:8000/block/5

# Trying to get non-exsting block will return an error
curl -v -X GET http://localhost:8000/block/foobar
```

2. Post a new block with data payload option to add data to the block body. The block body supports a string of text and the response for the endpoint provides the block object in JSON format:

```
# Add new block to the blockchain
curl -d '{"body": "New (kid) on the block!"}' -H "Content-Type: application/json" -X POST http://localhost:8000/block

# Get newly added block
curl -v -X GET http://localhost:8000/block/11

# Trying to create a block without data will return an error
curl -d '{"body": ""}' -H "Content-Type: application/json" -X POST http://localhost:8000/block
```

## Requirements

Graded according to the [Project Rubric](https://review.udacity.com/#!/rubrics/1707/view).

## License

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2019 © <a href="https://github.com/thom" target="_blank">Thomas Weibel</a>.
