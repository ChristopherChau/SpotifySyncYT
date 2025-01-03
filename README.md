# Spotify to YouTube Converter 

![SpotifySyncYT](https://github.com/user-attachments/assets/efcad089-56d0-4393-8463-acfd6eead858)



## Overview
The Spotify to YouTube Converter is a tool that allows users to seamlessly transfer their Spotify playlists to YouTube playlists. By logging into their Spotify and YouTube accounts, users can easily create YouTube playlists containing the same songs as their Spotify playlists. 

## Why I Built This Project

I built this project for several reasons:

- **Interest in API Integration**: I was intrigued by the idea of integrating APIs into my projects and wanted to gain hands-on experience with them. This project provided the perfect opportunity for me to explore API usage in a practical context.

- **Personal Usefulness**: As a college student I wanted to save money on music subscriptions but still listen to music without listening to ads. I had all my playlists and songs on Spotify so creating a tool that could facilitate the transfer of playlists from Spotify to YouTube to my local device seemed like a practical solution to this problem.

- **Learning Experience**: Developing this project not only helped me achieve my goal of saving money on music subscriptions but also served as a valuable learning experience. Through building this tool, I familiarized myself with API integration, user authentication processes, and working with web services.

## Features
- **Spotify Authentication**: Users log into their Spotify account via a defined route that will grab their playlists (currently we must define the hardcode the playlist we want as our APIs have limited quotas)
- **YouTube Authentication**: Users log into their YouTube account via Google OAuth to authorize song searching, playlist retrieval, and playlist creation.
- **Playlist Conversion**: Convert Spotify playlists into YouTube playlists.
- **Local Download**: Download the converted YouTube playlists onto your local machine.

## Testing

Due to my limited experience at the time, I did not implement automated testing for this project. The nature of the tool, which involves interacting with external APIs and handling user authentication, made it challenging to set up tests as this project was an introduction to API usage for me. If I were to revisit this project, I would focus on mocking API responses to cover testing.


## Tools Used
- Spotify Web API
- YouTube Data API
- Google OAuth client library

## Disclaimer

This is my first project, and at the time of its initial development, I was still learning best practices and conventions for API integration and project structuring. While I have since revisited the code to slightly clean it up, some areas may still benefit from further refinement and optimization. I welcome any feedback to help improve this tool.

