#!/bin/bash
echo "Get genesis block"
curl -v -X GET http://localhost:8000/block/0
printf "\n\n\n"

echo "Get the first block"
curl -v -X GET http://localhost:8000/block/1
printf "\n\n\n"

echo "Trying to get non-existing block"
curl -v -X GET http://localhost:8000/block/foobar
printf "\n\n\n"

echo "Add a new block to the chain"
curl -vd '{"body": "New (kid) on the block!"}' -H "Content-Type: application/json" -X POST http://localhost:8000/block
printf "\n\n\n"

echo "Trying to create a block without data"
curl -vd '{"body": ""}' -H "Content-Type: application/json" -X POST http://localhost:8000/block
