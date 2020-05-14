#!/usr/bin/env ruby

fix = ARGV.include? '--fix'

sourcesPath = "Sources/FlowCommonWebFiles"

Dir.each_child(sourcesPath) {|filename|
    #excluding minified files
    if !filename.include? ".min"
        puts "ESLinting #{filename}"
        if fix
            abort unless system "cd #{sourcesPath} && npx eslint #{filename} --fix"
        else
            abort unless system "cd #{sourcesPath} && npx eslint #{filename}"
        end
    end
}

puts "Passed!"
