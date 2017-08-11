import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Video extends Component {
  constructor(props) {
    super(props);
    this.videoObj = {};
  }

  componentDidMount() {
    const {videojs} = global;
    if (!videojs) {
      return;
    }
    const {video, getWatchLive, params} = this.props;

    console.log('params', params);
    var liveID = params.liveID;
    var playbackType = params.playbackType;
    getWatchLive(liveID, playbackType);

    $(".video-live").css('display', 'none');
    $('.video-content').css('display', 'block');
  }

  componentWillReceiveProps(nextProps){
    var video = nextProps.video;
    console.log('componentWillReceiveProps_video', video);
    this.setPlayer(video);
  }

  componentWillUnmount() {
    if (this.videoObj.playerVideo) {
      this.videoObj.playerVideo.dispose()
    }
  }

  // 设置播放器
  setPlayer(video){
    console.log('setPlayer', video);
    var videoId = video.id;
    var videoPoster = video.poster;
    var videoSrc = video.src;

    var playerOptions = {
      inactivityTimeout: 0,
      bigPlayButton: false,
      controls: false,
      controlBar: {
        nativeControlsForTouch: false,
        children: [
          { name: "currentTimeDisplay" },
          { name: "progressControl" },
          { name: "durationDisplay" }
        ],
        currentTimeDisplay: true,
        progressControl: true,
        durationDisplay: true
      }
    };

    var player = null;
    if(neplayer)
    {
      player = neplayer(videoId, playerOptions, function () {
        // 视频播放器控制
        $('.vjs-play-control').css('display', 'none');
        $('.vjs-volume-menu-button').css('display', 'none');
        $('.vjs-fullscreen-control').css('display', 'none');
      });

      this.videoObj.player = player;
    }

    var playerVideo = null;
    if (videojs) {
      playerVideo = videojs(videoId);
      playerVideo.addClass('vjs-matrix');

      this.videoObj.playerVideo = playerVideo;
    }

    this.setVideoPoster(videoPoster);
    this.setDataSource(videoSrc);

    var screenw = document.body.clientWidth;
    var screenh = document.body.clientHeight;

    $('.video-wrap').css({ 'width': screenw, 'height': screenh });
    $('.video-js').css({ 'width': screenw, 'height': screenh });
    $('.vjs-tech').css({ 'width': screenw, 'height': screenh });
  }

  // 设置播放器背景图
  setVideoPoster(videoPoster){
    $('.vjs-poster').css({
      'background-image': 'url(' + videoPoster + ')',
      'display': 'block'
    });
    $('.vjs-poster').removeClass('vjs-hidden');
  }

  // 设置播放源
  setDataSource(videoSrc){
    var player = this.videoObj.player;
    var playerUrl = videoSrc;

    if (playerUrl != '')
    {
      var lowUrl = playerUrl.toLowerCase();
      var urlType = lowUrl.substring(0, 4);
      var type = '';

      switch (urlType) {
        case 'http':
          if (lowUrl.indexOf('mp4') !== -1) {
            type = 'video/mp4';
          } else if (lowUrl.indexOf('flv') !== -1) {
            type = 'video/x-flv';
          } else if (lowUrl.indexOf('m3u8') !== -1) {
            type = 'application/x-mpegURL';
          }
          break;
        case 'rtmp':
          type = 'rtmp/flv';
          break;
      }

      if (type != '' && player)
      {
        player.setDataSource({ type: type, src: playerUrl });
      }
    }
  }

  doPlayerCover(){
    console.log('doPlayerCover', this.videoObj);
    var playerVideo = this.videoObj.playerVideo;
    var playFlag = this.playFlag;

    if (playerVideo && playFlag) {
      $('.js_player').css('display', 'block');
      playerVideo.pause();
      this.playFlag = false;
    }
  }

  doPlayer(){
    console.log('doPlayer', this.videoObj);
    var playerVideo = this.videoObj.playerVideo;

    if (playerVideo) {
      $('.js_player').css('display', 'none');
      $('.vjs-poster').addClass('vjs-hidden');
      playerVideo.play();

      setTimeout(()=>{
        this.playFlag = true;
      }, 100);
    }
  }

  render() {
    const {video: {id}} = this.props
    const videoHtml = `
        <video id="${id}" class="video-js vjs-default-skin vjs-big-play-centered" 
          preload="auto" x-webkit-airplay="allow" x5-video-player-type="h5" 
          x5-video-player-fullscreen="true" x5-video-ignore-metadata="true"
          playsinline webkit-playsinline x5-playsinline>
          <p class="vjs-no-js">
            To view this video please enable JavaScript
          </p>
        </video>
    `

    return (
      <div className="erishen-video">
        <div className="video-content">
          <div className="video-wrap">
            <div className="video-player" dangerouslySetInnerHTML={{__html: videoHtml}}></div>
            <div className="video-record">
              <div className="player-center js_player_cover" onClick={()=>this.doPlayerCover()}>
                <div className="player-button js_player" onClick={()=>this.doPlayer()}></div>
              </div>
            </div>
            <div className="video-live"></div>
          </div>
        </div>
      </div>
    )
  }
}

Video.propTypes = {
  video: PropTypes.object.isRequired,
  getWatchLive: PropTypes.func.isRequired
}

export default Video
