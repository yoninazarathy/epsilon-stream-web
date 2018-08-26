import axios from 'axios'

export default {
  getSiteData: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => {
    const { data: db} = await axios.get('https://es-app.com/repo/database.json')
    var snippets = db["snippets"]
    var featuredURLS = db["featuredURLs"]
    var videos = db["videos"]

    var curious = featuredURLS.filter(obj => {return obj["hashTags"].includes("#oneOnEpsilonBlog")})
    var picks = featuredURLS.filter(obj => {return obj["hashTags"].includes("#editorsPicks")})
    var news = featuredURLS.filter(obj => {return obj["hashTags"].includes("#oneOnEpsilonNews")})
    var iosApps = featuredURLS.filter(obj => {return obj["featureType"] === 'Game'})
    var channels = featuredURLS.filter(obj => {return obj["provider"] === 'Youtube'})
    return [
      {
        path: '/',
        component: 'src/containers/Home',
      },
      {
        path: '/about',
        component: 'src/containers/About',
      },
      {
        path: '/snippets',
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
        path: '/videos',
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
        path: '/curious',
        component: 'src/containers/Curious',
        getData: () => ({
          curious,
        }),
      },
      {
        path: '/picks',
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
        path: '/iosapps',
        component: 'src/containers/IosApps',
        getData: () => ({
          iosApps,
        }),
      },
      {
        path: '/channels',
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
