#!/usr/bin/env ruby

puts "Minifying FlowCommonWeb files."

flowCommonWebDir = "#{__dir__}/Sources/FlowCommonWebFiles"
waapi = "web-animations.min.js"
flowCommonWebFiles = [
    "Track.js",
    "Animation.js",
    "player.js",
    "ToggleButton.js"
]

outputDir = "#{__dir__}/generated"
system "mkdir #{outputDir}"

flowcommon = "flowcommon.js"
flowcommonMin = "flowcommon.min.js"
flowcommonWaapiMin = "flowcommon-waapi.min.js"

puts "Creating flowcommon.js"
abort unless system "cd #{flowCommonWebDir} && uglifyjs #{flowCommonWebFiles.join(' ')} --beautify --output #{outputDir}/#{flowcommon}"

puts "Creating flowcommon.min.js"
abort unless system "cd #{flowCommonWebDir} && uglifyjs #{flowCommonWebFiles.join(' ')} --compress --output #{outputDir}/#{flowcommonMin}"

puts "Creating flowcommon-waapi.min.js"
abort unless system "cd #{flowCommonWebDir} && uglifyjs #{flowCommonWebFiles.join(' ')} #{waapi} --compress --output #{outputDir}/#{flowcommonWaapiMin}"

puts "Successfully Minified FlowCommonWeb files!"
