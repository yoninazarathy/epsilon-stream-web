import axios from 'axios'
import React, { Component } from 'react'
import {youtubeIdToEpsilonID} from './src/redux/managers/video-manager'


export default {
  siteRoot: 'https://epsilonstream.com',
  getSiteData: () => ({
    title: 'Epsilon Stream',
  }),
  getRoutes: async () => {
    const { data: db} = await axios.get('https://s3.amazonaws.com/oneonepsilon-database/database.json')
  
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
      return {
        name: item.hashTag.substring(1) // Strips hashtag character
      }
    })

    const { data: blog} = await axios.get('https://es-app.com/repo/blog-post-list.json')
    var i;
    var postList = blog["curious"].concat(blog["news"]).concat("picks")
    console.log("Getting markdown posts:")
    for (i = 0; i < postList.length; i++) { 
      let url = postList[i]["url"]
      if(url !== undefined && url !== ""){
        console.log(url)
        const { data: post} = await axios.get(postList[i]["url"])//.then((response) =>{
                                                    // console.log("got response")
                                                    // }).catch((error) =>{
                                                    //     console.log("got error: " + error)
                                                    //   })
        postList[i]["markDown"] = post
      }
    }

    postList = postList.filter((ps)=>{return ps["markDown"] !== undefined})
    // console.log("number of posts: " + postList.length)


    return [
      {
        path: '/',
        component: 'src/containers/Home',
      },
      {
        path: '/snippet',
        component: 'src/containers/Snippets',
        getData: () => ({
          snippets,
        }),
        children: snippets.map(snippet => ({
          path: `${snippet.hashTags[0].substring(1).toLowerCase()}`,
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
          path: `${youtubeIdToEpsilonID(video.youtubeVideoId)}`,
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
          path: `${topic.name.toLowerCase()}`,
          component: 'src/containers/constructed/TopicPage',
          getData: () => ({
            topic
          }),
        })),
      },
      {
        path: '/blog',
        component: 'src/containers/Blog',
        getData: () => ({
          postList,
        }),
        children: postList.map(post => ({
          path: `${post.handle.toLowerCase()}`,
          component: 'src/containers/constructed/EpsilonBlogPage',
          getData: () => ({
            post
          }),
        })),
      },
      {
        path: '/search',
        component: 'src/containers/Search',
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
  Document: class CustomHtml extends Component {
    render () {
      const {
        Html, Head, Body, children, renderMeta,link
      } = this.props

      return (
        <Html>
          <Head>
            <link href="data:image/x-icon;base64,R0lGODlhPwA9APZxAEE0KU01K0E9MEFFNk1BNkFOPXFnX4g7NKw+Of83G/84Hv86I/87JsRAPdBC
P/9AIP9JJP9SKf9CO/9DPv9QOKBIRNtDQcRYVPNFRP9EQf9GRv9SUv9dXf9paf90dEGTOkGWQEGY
RWWdQkGgVlmhU3GgRWWnX0GBZUGaeUGqbUGtcpSqTJStVri0VImAev+AQP+SSdu+XP+kUv+tVvPF
Yf/IZP/Lbv/Pd0GjgEG0jUG8lHG5gk3Am1nEoWXJqHHNr33RtqCZlJS/h/+AgP+MjP+Xl/+nm8O/
vP+hoP+iov+0qf+5uYnVvKzQqLfWtf/Sgf/Wi8/Bvv/At//Vsv/gqP/jsf/nu5TZw6DVw6Ddyazi
0Lfm18PdwcPZ0NvZ1//Fxf/R0f/c3Nvr2v/qxf/uzv/x2M/u5Nvy6//o6P/14v/47Of38vPy8v/z
8/P48//89fP7+P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5
BAEAAHIALAAAAAA/AD0AAAf+gHKCg4SFhoRxiYqLioeOj5CRcoyUlY2SmJmWm5aZnoecoZ2fnqKm
o6SPp6uoqYissIyur7BmZmexcbOTp3BbQDw6wsI9V2asrqtZwcPNwz/Hp6SnZz7O181Xq6WmZ8zY
4D9w0pLU3+DgQNuQvefo4FnrjqdM7/bCuKaqpmv39+rkCq2qh64Hkyw/7K2RN2iVu2ZaFq1JCC5i
QEGrzKDbUskath/IGp7SEs5SP2w8QmI8lUVYDhQwhXG05PGaSlZYThQAwBPAABzRKv1IEeLDBxAj
VOiAtdJUkgo9owrosmmH0atGQ4wJaapNBw0IokZ1YckN1rM1oLwhJyrMBg3+GhyI7WnAEpezV0vU
qGEjjT5RbTjAhTuXZ91KTfAaXbGXr5pclDwMhnugMNlKYhR/iNG4xhPIi5ZMhmuhsJdNJvDq7Vyj
CuhEgkdraBCgJ4EjnMSQwCqCBmu+ayF/kT0Yw4UgUdiIcuNECIsWvxtvhUyEONwkud5Uib4XCujY
sou83s4dtPUNbV7HucG9DGTrHtTHodL+PfEh8sn/dp/Leof89W3CSyXWaYCGJUtQkEACFEixyRMB
VtJUZPBVosSCGCZgRCVjcFdDcBIOSEkSBQ5xoCJJKJAhhlMw0iF3nwkoIiNoFAiXB0kQsYEEK2II
ww1VkFEFhB66JuOMi0jDZuNgPPaYwAse/vZYK5uEseRgEziZgAxRdkYFJ7RUUsSVcDHQIwRdNnYD
iCGKZMlXV2agIoYPzJAmX34d6WYlXpE5wZx13mnDdHruKaafC0RgZ5o35FlomJWAoWSBGyRRhQ1p
UsFmm6CIAgYR4MG1wRBLKPKGFUSydgMVU4YSCSthgAEGJ2+UMUYVY5TRqiiYyOcrN75CNk2wsSRD
LEPDHuvqLkgquwizhjqbCLQCSasLtZ0Si+2r8m2ribDepqIPtYEAADs=" rel="icon" type="image/x-icon" />

            <meta name="apple-itunes-app" content="app-id=1200152358"/>
            <meta name="google-play-app" content="app-id=com.oneonepsilon.epsilonstream"/>

            {/*<link rel="apple-touch-icon" href="assets/icon.png">*/}
            {/*<link rel="android-touch-icon" href="assets/icon.png">*/}

            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-84756717-6"></script>
            <script dangerouslySetInnerHTML={{__html: "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-84756717-6');"}} />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css" />
          </Head>
          <Body>{children}</Body>
        </Html>
      )
    }
  },

}
