# APOD
Astronomy Picture of the Day, but better.

## Why?
Back in high school, my Astronomy class would always reference the [official NASA site](https://apod.nasa.gov) for the Astronomy Picture of the Day. Being a pesky web designer, I wanted to make it look as good as the pictures it presented.

## How?
Using the official APOD API (API key needed in a .env file) and a static website with some JavaScript, this is actually not too hard. It's not perfect, but a cool party trick.

## How? (Pt 2)
This could have been done differently and probably better, but it makes use of a server-hosted API using ExpressJS which keeps the API key and requests private, as well as a frontend static site that makes requests to the API.
