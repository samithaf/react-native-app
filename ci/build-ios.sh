#!/bin/bash
set -e

echo "cleaning the ios workspace"

xcodebuild clean -workspace "$(pwd)/ios/MyRNApp.xcworkspace" -scheme MyRNApp

echo "archiving the ios workspace"

xcodebuild archive -workspace "$(pwd)/ios/MyRNApp.xcworkspace" -scheme "MyRNApp" -configuration Release -archivePath "$(pwd)/dist/MyRNApp.xcarchive" -sdk iphoneos

echo "creating the ios ipa"

xcodebuild -exportArchive -archivePath "$(pwd)/dist/MyRNApp.xcarchive" -exportPath "$(pwd)/dist/ipa" -exportOptionsPlist "$(pwd)/fastlane/exportOptionsTest.plist"

exit $?
