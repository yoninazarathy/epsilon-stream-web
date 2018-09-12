import axios from 'axios'

import {autoCompleteForString,cleanSearchString,displayResultsOfSearchResults,hashTagOfString} from './src/new-components/text-search-manager';
import {recordsOfHashTag} from './src/new-components/records-manager.js';

export default {
  getSiteData: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => {
    const { data: db} = await axios.get('https://es-app.com/repo/database.json')
    var snippets = db["snippets"]
    var featuredURLS = db["featuredURLs"]
    var videos = db["videos"]

    var mathObjects = db["mathObjects"]

    var curious = featuredURLS.filter(obj => {return obj["hashTags"].includes("#oneOnEpsilonBlog")})
    var picks = featuredURLS.filter(obj => {return obj["hashTags"].includes("#editorsPicks")})
    var news = featuredURLS.filter(obj => {return obj["hashTags"].includes("#oneOnEpsilonNews")})
    var iosApps = featuredURLS.filter(obj => {return obj["featureType"] === 'Game'})
    var channels = featuredURLS.filter(obj => {return obj["provider"] === 'Youtube'})

    var topics = mathObjects.map(item => {
      let searchResults = recordsOfHashTag(item.hashTag, db)
      let displayResults = displayResultsOfSearchResults(searchResults, item.hashTag)
      return {
        mathObject: item,
        displaySearchResults: displayResults,
        hashTag: item.hashTag,
        name: item.hashTag.substring(1) // Strips hashtag character
      }
    })

    return [
      {
        path: '/',
        component: 'src/containers/Home',
      },
      {
        path: '/home',
        component: 'src/containers/Home',
      },
      {
        path: '/snippet',
        component: 'src/containers/Snippets',
        getData: () => ({
          snippets,
        }),
        children: snippets.map(snippet => ({
          path: `${snippet.hashTags[0].substring(1)}`,
          component: 'src/containers/constructed/SnippetPage',
          getData: () => ({
            snippet,
          }),
        })),
      },
      {
        path: '/video',
        component: 'src/containers/Videos',
        getData: () => ({
          videos,
        }),
        children: videos.map(video => ({
          path: `${video.youtubeVideoId}`,
          component: 'src/containers/constructed/VideoPage',
          getData: () => ({
            video,
          }),
        })),
      },
      {
        path: '/topic',
        component: 'src/containers/Topic',
        getData: () => ({
          topics,
        }),
        children: topics.map(topic => ({
          path: `${topic.name}`,
          component: 'src/containers/constructed/TopicPage',
          getData: () => ({
            topic
          }),
        })),
      },
      {
        path: '/curious',
        component: 'src/containers/Curious',
        getData: () => ({
          curious,
        }),
      },
      {
        path: '/pick',
        component: 'src/containers/Picks',
        getData: () => ({
          picks,
        }),
      },
      {
        path: '/news',
        component: 'src/containers/News',
        getData: () => ({
          news,
        }),
      },
      {
        path: '/iosapp',
        component: 'src/containers/IosApps',
        getData: () => ({
          iosApps,
        }),
      },
      {
        path: '/channel',
        component: 'src/containers/Channels',
        getData: () => ({
          channels,
        }),
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
  // webpack: (config, { defaultLoaders }) => {
  //   config.module.rules = [
  //     {
  //       oneOf: [
  //         {
  //           test: /\.json$/,
  //           use: [{ loader: 'json-loader' }],
  //         },
  //         defaultLoaders.jsLoader,
  //         defaultLoaders.cssLoader,
  //         defaultLoaders.fileLoader,
  //       ],
  //     },
  //   ]
  //   return config
  // },
}
