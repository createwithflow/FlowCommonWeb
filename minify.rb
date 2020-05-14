#!/usr/bin/env ruby

puts "Minifying FlowCommonWeb files."
flowCommonWebDir = "#{__dir__}/Sources/FlowCommonWebFiles"
flowCommonWebFiles = "Track.js Animation.js player.js web-animations.min.js ToggleButton.js"
outputDir = "#{__dir__}"

abort unless system "cd #{flowCommonWebDir} && uglifyjs #{flowCommonWebFiles} --output #{outputDir}/flowCommonWeb.min.js"

puts "Successfully Minified FlowCommonWeb files!"



