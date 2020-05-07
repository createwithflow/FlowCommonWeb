#!/usr/bin/env ruby

fix = ARGV.include? '--fix'

Dir.each_child("Sources") {|filename|
    #excluding minified files
    if !filename.include? ".min"
        puts "ESLinting #{filename}"
        if fix
            abort unless system "cd Sources && npx eslint #{filename} --fix"
        else
            abort unless system "cd Sources && npx eslint #{filename}"
        end
    end
}

puts "Passed!"
