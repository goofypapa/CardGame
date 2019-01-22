#!/bin/bash
cocos compile -p web -m release

cp -R ./WeChatGame/* ./publish/html5/

rm -rf ./publish/html5/res
rm ./publish/html5/project.json