(function(){
    var script = {
 "backgroundPreloadEnabled": true,
 "children": [
  "this.MainViewer",
  "this.Container_2840E875_39A6_6CCE_41C4_76EB85CA5A97",
  "this.Image_4E993B15_5F78_4640_41A5_D352D29A5E3A",
  "this.Image_50BE751D_5F78_C240_41CF_F7660E60F989",
  "this.Image_4E7CE695_5F78_CE41_41D4_627F11EC2B25",
  "this.Image_061C9D51_0894_5E3D_4195_3FD9D1331D66"
 ],
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "start": "this.playAudioList([this.audio_1C0988C6_3AAA_6DCA_41CA_27BB129733CE]); this.init(); this.set('mute', true)",
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Player",
 "borderSize": 0,
 "creationPolicy": "inAdvance",
 "vrPolyfillScale": 1,
 "width": "100%",
 "borderRadius": 0,
 "minHeight": 20,
 "propagateClick": false,
 "scripts": {
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "getKey": function(key){  return window[key]; },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "existsKey": function(key){  return key in window; },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "unregisterKey": function(key){  delete window[key]; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "registerKey": function(key, value){  window[key] = value; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } }
 },
 "defaultVRPointer": "laser",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 20,
 "downloadEnabled": false,
 "verticalAlign": "top",
 "layout": "absolute",
 "paddingTop": 0,
 "gap": 10,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "Player450"
 },
 "overflow": "visible",
 "mouseWheelEnabled": true,
 "scrollBarWidth": 10,
 "definitions": [{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -159.09,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_074AFE5A_089D_FA2F_419E_512592C0D1CE",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 75.55,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1B30ADC9_089D_FE2D_4188_8E934B4F0BC0",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 59.64,
   "backwardYaw": -36.33,
   "distance": 1,
   "panorama": "this.panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_635B0BD3_6CFC_3650_41D7_396302800D07"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 15.67,
   "backwardYaw": -156.8,
   "distance": 1,
   "panorama": "this.panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D",
 "thumbnailUrl": "media/panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_t.jpg",
 "label": "SFL4",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_74D7D9C0_6CC4_12AF_41CD_E48A44ADCCB8",
  "this.overlay_75F1E02A_6CC4_11F3_41D0_DB8EE0A7EFEC",
  "this.overlay_9E71C4FC_8BB6_7FDD_41C7_7D631E5BF99E"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 113.34,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_07595E4D_089D_FA25_4177_4BADCDE90935",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_0761FE6B_089D_FAED_41A0_4039CAFB40AF",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_camera",
 "automaticZoomSpeed": 10
},
{
 "label": "Rushiraj Highlands-26 Storey",
 "scaleMode": "fit_inside",
 "thumbnailUrl": "media/video_4BEEC1C2_5F78_45C3_4193_05A623EF9341_t.jpg",
 "width": 2560,
 "loop": false,
 "id": "video_4BEEC1C2_5F78_45C3_4193_05A623EF9341",
 "class": "Video",
 "height": 1440,
 "video": {
  "width": 2560,
  "class": "VideoResource",
  "height": 1440,
  "mp4Url": "media/video_4BEEC1C2_5F78_45C3_4193_05A623EF9341.mp4"
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 5.49,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1BF62B4C_089D_FA2A_4193_54DC26F33E59",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -170.21,
   "backwardYaw": 15.7,
   "distance": 1,
   "panorama": "this.panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 1.32,
   "backwardYaw": -173.78,
   "distance": 1,
   "panorama": "this.panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -83.09,
   "backwardYaw": -87.59,
   "distance": 1,
   "panorama": "this.panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_68C70D10_7CEA_898B_41B4_72F949ECE365",
 "thumbnailUrl": "media/panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_t.jpg",
 "label": "01pP2_1",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_68C77D10_7CEA_898B_41B7_4D31B57688A2",
  "this.overlay_68C7BD10_7CEA_898B_41D8_8023B111A4DB",
  "this.overlay_68D47989_7CFE_889D_41D6_A4C6B419008C"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 168.68,
   "backwardYaw": 2.86,
   "distance": 1,
   "panorama": "this.panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -148.86,
   "backwardYaw": 2.86,
   "distance": 1,
   "panorama": "this.panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -148.86,
   "backwardYaw": -104.45,
   "distance": 1,
   "panorama": "this.panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46",
 "thumbnailUrl": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_t.jpg",
 "label": "T9",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_20AC08F3_39FE_ADC9_4184_4CCB90E77C41",
  "this.overlay_20D9B807_39FB_AC49_41C9_A558F044D31B",
  "this.overlay_69D5340A_7D6E_FF9F_41DA_5F3F0860A930",
  "this.overlay_682E5B89_7D6E_889D_41D4_C67341FC9A56"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16_camera",
 "automaticZoomSpeed": 10
},
{
 "duration": 5000,
 "label": "Mini Theatre 2",
 "id": "photo_D7C46F85_C635_6C55_41DC_0A1FD0E1149E",
 "thumbnailUrl": "media/photo_D7C46F85_C635_6C55_41DC_0A1FD0E1149E_t.png",
 "width": 1440,
 "image": {
  "levels": [
   {
    "url": "media/photo_D7C46F85_C635_6C55_41DC_0A1FD0E1149E.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 959
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -11.32,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_07153BC1_089D_FA1D_41A0_16482D682A23",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_41112B09_6D3C_17B0_41DB_371D557B428F_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 115.64,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_190F6CBA_089D_FE6E_4186_73E5628B29A8",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69",
 "thumbnailUrl": "media/panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69_t.jpg",
 "label": "R11_1",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_59BD2B63_44D3_9767_41CA_A1ACCB6DDF72",
  "this.overlay_58679B3D_44D0_90E3_41CD_07170F93A693"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_42749FD9_6CCC_0E50_41D5_D5CD1FCEC452_camera",
 "automaticZoomSpeed": 10
},
{
 "duration": 5000,
 "label": "L1_1",
 "id": "album_4C459947_5F77_C2C1_41CF_68E94C9899D0_0",
 "thumbnailUrl": "media/album_4C459947_5F77_C2C1_41CF_68E94C9899D0_0_t.png",
 "width": 3840,
 "image": {
  "levels": [
   {
    "url": "media/album_4C459947_5F77_C2C1_41CF_68E94C9899D0_0.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 2557
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1B018DC9_089D_FE2D_4199_23041DCC1A89",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -174,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_19768CDA_089D_FE2E_4198_6C086DD27B21",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 20.91,
   "backwardYaw": -20.04,
   "distance": 1,
   "panorama": "this.panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -4.47,
   "backwardYaw": -20.04,
   "distance": 1,
   "panorama": "this.panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 141.99,
   "backwardYaw": 101.3,
   "distance": 1,
   "panorama": "this.panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_37243B3A_396E_ACBB_41B2_389D97DC4625",
 "thumbnailUrl": "media/panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_t.jpg",
 "label": "T3",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_2FF4CCAD_39EA_6459_41C3_8BF7E1C9EF48",
  "this.overlay_24544195_39DA_5C49_41B0_D40D8E826608",
  "this.overlay_7786BFDA_6D44_0E50_41D0_48E2B0B97B29"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -164.11,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1AA0CD09_089D_FE2D_4195_B8BE0554765E",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -137.29,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_186F3C7A_089D_FEEF_4199_ECF04F5F9B96",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 58.36,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_19F3ACAA_089D_FE6F_419D_CA275117BED7",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -3.33,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_077DAE6B_089D_FAED_419B_B4B8F9BCD175",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 154.7,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1A418D79_089D_FEED_4169_1661CFE1A756",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -165.62,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_18C7CC3A_089D_FE6F_419E_6DE67F7C771C",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 18.97,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1B4B0DDF_089D_FE26_4130_F95734342A7A",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -179.39,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1854DC6B_089D_FEEE_418D_97A266F74363",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 15.7,
   "backwardYaw": -170.21,
   "distance": 1,
   "panorama": "this.panorama_68C70D10_7CEA_898B_41B4_72F949ECE365"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C",
 "thumbnailUrl": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_t.jpg",
 "label": "01pP1_1",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_0/d/0/{row}_{column}.jpg",
      "rowCount": 11,
      "tags": "ondemand",
      "width": 5632,
      "colCount": 11,
      "class": "TiledImageResourceLevel",
      "height": 5632
     },
     {
      "url": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_0/d/1/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_0/d/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_0/d/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_0/d/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_0/f/0/{row}_{column}.jpg",
      "rowCount": 11,
      "tags": "ondemand",
      "width": 5632,
      "colCount": 11,
      "class": "TiledImageResourceLevel",
      "height": 5632
     },
     {
      "url": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_0/f/1/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_0/f/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_0/f/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_0/f/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_0/u/0/{row}_{column}.jpg",
      "rowCount": 11,
      "tags": "ondemand",
      "width": 5632,
      "colCount": 11,
      "class": "TiledImageResourceLevel",
      "height": 5632
     },
     {
      "url": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_0/u/1/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_0/u/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_0/u/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_0/u/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_0/r/0/{row}_{column}.jpg",
      "rowCount": 11,
      "tags": "ondemand",
      "width": 5632,
      "colCount": 11,
      "class": "TiledImageResourceLevel",
      "height": 5632
     },
     {
      "url": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_0/r/1/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_0/r/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_0/r/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_0/r/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_0/b/0/{row}_{column}.jpg",
      "rowCount": 11,
      "tags": "ondemand",
      "width": 5632,
      "colCount": 11,
      "class": "TiledImageResourceLevel",
      "height": 5632
     },
     {
      "url": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_0/b/1/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_0/b/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_0/b/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_0/b/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_0/l/0/{row}_{column}.jpg",
      "rowCount": 11,
      "tags": "ondemand",
      "width": 5632,
      "colCount": 11,
      "class": "TiledImageResourceLevel",
      "height": 5632
     },
     {
      "url": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_0/l/1/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_0/l/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_0/l/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_0/l/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_71E10A9C_7CB9_D3C0_41CD_822F7D5C0DB6"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2_camera",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_49E02255_44D0_90A3_41BF_327058418A88"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3",
 "thumbnailUrl": "media/panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3_t.jpg",
 "label": "R1_2",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_4B9F1E54_44D1_70A1_41AD_E876A587411E",
  "this.overlay_4BFCD7CA_44DF_7FA1_41BF_07E22B879EB3"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -178.68,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_07431E63_089D_FA1E_4195_4AC5C013695D",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 39.54,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_18719C75_089D_FEFA_4181_45BDA1A45DA6",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -66.66,
   "backwardYaw": -161.03,
   "distance": 1,
   "panorama": "this.panorama_41112B09_6D3C_17B0_41DB_371D557B428F"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0",
 "thumbnailUrl": "media/panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0_t.jpg",
 "label": "R3.2",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_4AA23E0B_6D44_11B0_416B_A968B902280F",
  "this.overlay_4AA22E0B_6D44_11B0_41C2_FA044E1CB6FF"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -8.93,
   "backwardYaw": 1.38,
   "distance": 1,
   "panorama": "this.panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_6F92A178_7CE7_987B_41DA_ED8733B68935",
 "thumbnailUrl": "media/panorama_6F92A178_7CE7_987B_41DA_ED8733B68935_t.jpg",
 "label": "03pp11",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_6F92A178_7CE7_987B_41DA_ED8733B68935_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6F92A178_7CE7_987B_41DA_ED8733B68935_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6F92A178_7CE7_987B_41DA_ED8733B68935_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6F92A178_7CE7_987B_41DA_ED8733B68935_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_6F92A178_7CE7_987B_41DA_ED8733B68935_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6F92A178_7CE7_987B_41DA_ED8733B68935_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6F92A178_7CE7_987B_41DA_ED8733B68935_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6F92A178_7CE7_987B_41DA_ED8733B68935_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_6F92A178_7CE7_987B_41DA_ED8733B68935_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6F92A178_7CE7_987B_41DA_ED8733B68935_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6F92A178_7CE7_987B_41DA_ED8733B68935_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6F92A178_7CE7_987B_41DA_ED8733B68935_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_6F92A178_7CE7_987B_41DA_ED8733B68935_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6F92A178_7CE7_987B_41DA_ED8733B68935_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6F92A178_7CE7_987B_41DA_ED8733B68935_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6F92A178_7CE7_987B_41DA_ED8733B68935_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_6F92A178_7CE7_987B_41DA_ED8733B68935_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6F92A178_7CE7_987B_41DA_ED8733B68935_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6F92A178_7CE7_987B_41DA_ED8733B68935_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6F92A178_7CE7_987B_41DA_ED8733B68935_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_6F92A178_7CE7_987B_41DA_ED8733B68935_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6F92A178_7CE7_987B_41DA_ED8733B68935_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6F92A178_7CE7_987B_41DA_ED8733B68935_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6F92A178_7CE7_987B_41DA_ED8733B68935_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_6F92A178_7CE7_987B_41DA_ED8733B68935_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6F92C178_7CE7_987B_41B9_DA31AF26E56F"
 ]
},
{
 "duration": 5000,
 "label": "R-Bed4-3",
 "id": "photo_ADF99BC7_A2B7_CDA8_41D2_071BBEEEB0EA",
 "thumbnailUrl": "media/photo_ADF99BC7_A2B7_CDA8_41D2_071BBEEEB0EA_t.png",
 "width": 3840,
 "image": {
  "levels": [
   {
    "url": "media/photo_ADF99BC7_A2B7_CDA8_41D2_071BBEEEB0EA.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 2557
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_5CFFE1DC_6CCC_1250_41C5_0D1AFA7842DF_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 22.33,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_19E2FCAA_089D_FE6F_41A0_B35A33ADC5DB",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -0.25,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_070CBBC9_089D_FA2D_4198_728CA30CC499",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 179.45,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1911DCAA_089D_FE6F_4185_2EBD397E5088",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -170.98,
   "backwardYaw": 54.13,
   "distance": 1,
   "panorama": "this.panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 139.04,
   "backwardYaw": 41.91,
   "distance": 1,
   "panorama": "this.panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 178.48,
   "backwardYaw": -129.77,
   "distance": 1,
   "panorama": "this.panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7",
 "thumbnailUrl": "media/panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_t.jpg",
 "label": "T6",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_697B8393_7D6B_988D_41D7_DF2C4AF2A7E8",
  "this.overlay_697BB393_7D6B_988D_41DE_F027B8B40045",
  "this.overlay_97E9DD0C_86F2_380E_4198_333A40366EE8"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -4.59,
  "pitch": -7.35
 },
 "class": "PanoramaCamera",
 "id": "camera_18CAFC3A_089D_FE6F_418D_9DFEDD42E61F",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -130.51,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1BD61DA9_089D_FE6D_4160_2108E4C35F55",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 3.87,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_07779E6B_089D_FAED_4152_2D82A175938A",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 9.02,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_0703FBCF_089D_FA25_4196_F61C5BB82C42",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 104.74,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_192DFCCA_089D_FE2E_4193_4F152D1614F0",
 "automaticZoomSpeed": 10
},
{
 "fieldOfViewOverlayOutsideColor": "#000000",
 "initialZoomFactor": 1,
 "maximumZoomFactor": 1.2,
 "label": "Highland Brochure Update (10)_page-0029",
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "id": "map_1B4CB28F_39BA_5C59_41C4_A42B91702CC9",
 "thumbnailUrl": "media/map_1B4CB28F_39BA_5C59_41C4_A42B91702CC9_t.jpg",
 "width": 5400,
 "scaleMode": "fit_inside",
 "image": {
  "levels": [
   {
    "url": "media/map_1B4CB28F_39BA_5C59_41C4_A42B91702CC9.jpeg",
    "width": 3200,
    "class": "ImageResourceLevel",
    "height": 2311
   },
   {
    "url": "media/map_1B4CB28F_39BA_5C59_41C4_A42B91702CC9_lq.jpeg",
    "width": 301,
    "class": "ImageResourceLevel",
    "height": 218,
    "tags": "preload"
   }
  ],
  "class": "ImageResource"
 },
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "fieldOfViewOverlayRadiusScale": 0.3,
 "class": "Map",
 "minimumZoomFactor": 0.5,
 "height": 3900,
 "fieldOfViewOverlayOutsideOpacity": 0
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 3.77,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC_camera",
 "automaticZoomSpeed": 10
},
{
 "duration": 5000,
 "label": "Mini Theatre 3",
 "id": "photo_D75911AB_C635_545D_41DB_4B46AE0A8AC9",
 "thumbnailUrl": "media/photo_D75911AB_C635_545D_41DB_4B46AE0A8AC9_t.png",
 "width": 1440,
 "image": {
  "levels": [
   {
    "url": "media/photo_D75911AB_C635_545D_41DB_4B46AE0A8AC9.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 959
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -15.13,
   "backwardYaw": -75.26,
   "distance": 1,
   "panorama": "this.panorama_4270CB46_6CCC_17B0_419B_ED875A3A3C07"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_42749FD9_6CCC_0E50_41D5_D5CD1FCEC452",
 "thumbnailUrl": "media/panorama_42749FD9_6CCC_0E50_41D5_D5CD1FCEC452_t.jpg",
 "label": "bed3Panorama_1",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_42749FD9_6CCC_0E50_41D5_D5CD1FCEC452_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_42749FD9_6CCC_0E50_41D5_D5CD1FCEC452_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_42749FD9_6CCC_0E50_41D5_D5CD1FCEC452_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_42749FD9_6CCC_0E50_41D5_D5CD1FCEC452_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_42749FD9_6CCC_0E50_41D5_D5CD1FCEC452_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_42749FD9_6CCC_0E50_41D5_D5CD1FCEC452_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_42749FD9_6CCC_0E50_41D5_D5CD1FCEC452_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_42749FD9_6CCC_0E50_41D5_D5CD1FCEC452_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_42749FD9_6CCC_0E50_41D5_D5CD1FCEC452_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_42749FD9_6CCC_0E50_41D5_D5CD1FCEC452_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_42749FD9_6CCC_0E50_41D5_D5CD1FCEC452_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_42749FD9_6CCC_0E50_41D5_D5CD1FCEC452_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_42749FD9_6CCC_0E50_41D5_D5CD1FCEC452_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_42749FD9_6CCC_0E50_41D5_D5CD1FCEC452_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_42749FD9_6CCC_0E50_41D5_D5CD1FCEC452_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_42749FD9_6CCC_0E50_41D5_D5CD1FCEC452_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_42749FD9_6CCC_0E50_41D5_D5CD1FCEC452_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_42749FD9_6CCC_0E50_41D5_D5CD1FCEC452_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_42749FD9_6CCC_0E50_41D5_D5CD1FCEC452_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_5C89BC54_6CC4_3257_41CF_44EBDEB1409D"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -163.18,
   "backwardYaw": -22.75,
   "distance": 1,
   "panorama": "this.panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 0.61,
   "backwardYaw": -174.51,
   "distance": 1,
   "panorama": "this.panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457",
 "thumbnailUrl": "media/panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457_t.jpg",
 "label": "02pp9",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6F87BC52_7CE6_8F8F_41C2_10D67CB77491",
  "this.overlay_6F87AC52_7CE6_8F8F_41D0_4C044047FB14"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_18B80C1A_089D_FE2F_4199_E7D371DF9C47",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -177.14,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1B128DBC_089D_FE6B_4180_612DACD8639E",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -161.03,
   "backwardYaw": -66.66,
   "distance": 1,
   "panorama": "this.panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_4F636E0D_6DC4_31B0_41B4_0918A4EE2E5D"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -78.63,
   "backwardYaw": 61.56,
   "distance": 1,
   "panorama": "this.panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_41112B09_6D3C_17B0_41DB_371D557B428F",
 "thumbnailUrl": "media/panorama_41112B09_6D3C_17B0_41DB_371D557B428F_t.jpg",
 "label": "R3.3",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_41112B09_6D3C_17B0_41DB_371D557B428F_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_41112B09_6D3C_17B0_41DB_371D557B428F_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_41112B09_6D3C_17B0_41DB_371D557B428F_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_41112B09_6D3C_17B0_41DB_371D557B428F_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_41112B09_6D3C_17B0_41DB_371D557B428F_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_41112B09_6D3C_17B0_41DB_371D557B428F_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_41112B09_6D3C_17B0_41DB_371D557B428F_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_41112B09_6D3C_17B0_41DB_371D557B428F_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_41112B09_6D3C_17B0_41DB_371D557B428F_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_41112B09_6D3C_17B0_41DB_371D557B428F_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_41112B09_6D3C_17B0_41DB_371D557B428F_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_41112B09_6D3C_17B0_41DB_371D557B428F_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_41112B09_6D3C_17B0_41DB_371D557B428F_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_41112B09_6D3C_17B0_41DB_371D557B428F_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_41112B09_6D3C_17B0_41DB_371D557B428F_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_41112B09_6D3C_17B0_41DB_371D557B428F_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_41112B09_6D3C_17B0_41DB_371D557B428F_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_41112B09_6D3C_17B0_41DB_371D557B428F_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_41112B09_6D3C_17B0_41DB_371D557B428F_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_41112B09_6D3C_17B0_41DB_371D557B428F_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_41112B09_6D3C_17B0_41DB_371D557B428F_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_41112B09_6D3C_17B0_41DB_371D557B428F_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_41112B09_6D3C_17B0_41DB_371D557B428F_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_41112B09_6D3C_17B0_41DB_371D557B428F_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_41112B09_6D3C_17B0_41DB_371D557B428F_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_40DECAE4_6CC4_1677_41D7_B1E67FEF4A32",
  "this.overlay_400B0A83_6CDC_16B0_41C4_887BF4907FAA",
  "this.overlay_4065513C_6CDC_F3D0_41BA_38EBE8862353"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_49E02255_44D0_90A3_41BF_327058418A88"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711",
 "thumbnailUrl": "media/panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711_t.jpg",
 "label": "R3.1",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_502B7FF9_44F1_8F63_41C5_D1F377179EC7",
  "this.overlay_501FFD9E_44F0_B3DE_41CF_0F365A84BBB1"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -20.04,
   "backwardYaw": 20.91,
   "distance": 1,
   "panorama": "this.panorama_37243B3A_396E_ACBB_41B2_389D97DC4625"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7",
 "thumbnailUrl": "media/panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7_t.jpg",
 "label": "T4",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_2E7622BA_39EB_DDBB_41C6_CC256C6127D1"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -120.36,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_19486CD4_089D_FE3B_418C_02D9498B4A10",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -141.07,
   "backwardYaw": -81.28,
   "distance": 1,
   "panorama": "this.panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -22.75,
   "backwardYaw": -163.18,
   "distance": 1,
   "panorama": "this.panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8",
 "thumbnailUrl": "media/panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8_t.jpg",
 "label": "02pp8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6E4AC1C3_7CE6_988D_41D2_C71D0EA7251A",
  "this.overlay_6E4AE1C3_7CE6_988D_41DE_174924B2E4E8"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -56.04,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_0735CE39_089D_FA6A_4192_A387B5ECDF80",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -1.52,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1B24CB76_089D_FAE7_414D_E420AF22AF22",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -40.96,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_072B2E39_089D_FA6A_418C_B8DEABF7411A",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_49E02255_44D0_90A3_41BF_327058418A88"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 61.56,
   "backwardYaw": -78.63,
   "distance": 1,
   "panorama": "this.panorama_41112B09_6D3C_17B0_41DB_371D557B428F"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16",
 "thumbnailUrl": "media/panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16_t.jpg",
 "label": "R8.1",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_4CD92A7E_6D3C_3653_41B4_444B449E34A7",
  "this.overlay_4CD93A7E_6D3C_3653_41BB_986205F870EE"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -16.85,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_19C40CA5_089D_FE65_416E_42C228F39890",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -25.3,
   "backwardYaw": 163.15,
   "distance": 1,
   "panorama": "this.panorama_427426C9_6CCC_1EB0_41D3_EDA93E539BC0"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_5CFFE1DC_6CCC_1250_41C5_0D1AFA7842DF",
 "thumbnailUrl": "media/panorama_5CFFE1DC_6CCC_1250_41C5_0D1AFA7842DF_t.jpg",
 "label": "bed2panPanorama",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5CFFE1DC_6CCC_1250_41C5_0D1AFA7842DF_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5CFFE1DC_6CCC_1250_41C5_0D1AFA7842DF_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5CFFE1DC_6CCC_1250_41C5_0D1AFA7842DF_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_5CFFE1DC_6CCC_1250_41C5_0D1AFA7842DF_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5CFFE1DC_6CCC_1250_41C5_0D1AFA7842DF_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5CFFE1DC_6CCC_1250_41C5_0D1AFA7842DF_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5CFFE1DC_6CCC_1250_41C5_0D1AFA7842DF_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5CFFE1DC_6CCC_1250_41C5_0D1AFA7842DF_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5CFFE1DC_6CCC_1250_41C5_0D1AFA7842DF_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5CFFE1DC_6CCC_1250_41C5_0D1AFA7842DF_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5CFFE1DC_6CCC_1250_41C5_0D1AFA7842DF_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5CFFE1DC_6CCC_1250_41C5_0D1AFA7842DF_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5CFFE1DC_6CCC_1250_41C5_0D1AFA7842DF_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5CFFE1DC_6CCC_1250_41C5_0D1AFA7842DF_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5CFFE1DC_6CCC_1250_41C5_0D1AFA7842DF_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_5CFFE1DC_6CCC_1250_41C5_0D1AFA7842DF_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5CFFE1DC_6CCC_1250_41C5_0D1AFA7842DF_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5CFFE1DC_6CCC_1250_41C5_0D1AFA7842DF_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5CFFE1DC_6CCC_1250_41C5_0D1AFA7842DF_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_5407A8BA_6F7C_12D0_419F_548969024ECE"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -149.48,
   "backwardYaw": -88.08,
   "distance": 1,
   "panorama": "this.panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_635B0BD3_6CFC_3650_41D7_396302800D07",
 "thumbnailUrl": "media/panorama_635B0BD3_6CFC_3650_41D7_396302800D07_t.jpg",
 "label": "SFL8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_635B0BD3_6CFC_3650_41D7_396302800D07_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_635B0BD3_6CFC_3650_41D7_396302800D07_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_635B0BD3_6CFC_3650_41D7_396302800D07_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_635B0BD3_6CFC_3650_41D7_396302800D07_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_635B0BD3_6CFC_3650_41D7_396302800D07_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_635B0BD3_6CFC_3650_41D7_396302800D07_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_635B0BD3_6CFC_3650_41D7_396302800D07_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_635B0BD3_6CFC_3650_41D7_396302800D07_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_635B0BD3_6CFC_3650_41D7_396302800D07_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_635B0BD3_6CFC_3650_41D7_396302800D07_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_635B0BD3_6CFC_3650_41D7_396302800D07_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_635B0BD3_6CFC_3650_41D7_396302800D07_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_635B0BD3_6CFC_3650_41D7_396302800D07_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_635B0BD3_6CFC_3650_41D7_396302800D07_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_635B0BD3_6CFC_3650_41D7_396302800D07_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_635B0BD3_6CFC_3650_41D7_396302800D07_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_635B0BD3_6CFC_3650_41D7_396302800D07_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_635B0BD3_6CFC_3650_41D7_396302800D07_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_635B0BD3_6CFC_3650_41D7_396302800D07_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_635B0BD3_6CFC_3650_41D7_396302800D07_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_635B0BD3_6CFC_3650_41D7_396302800D07_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_635B0BD3_6CFC_3650_41D7_396302800D07_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_635B0BD3_6CFC_3650_41D7_396302800D07_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_635B0BD3_6CFC_3650_41D7_396302800D07_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_635B0BD3_6CFC_3650_41D7_396302800D07_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_781EF110_6CCC_13D0_41D5_AD4667D99D13"
 ]
},
{
 "duration": 5000,
 "label": "L3_1",
 "id": "album_4C459947_5F77_C2C1_41CF_68E94C9899D0_2",
 "width": 3840,
 "image": {
  "levels": [
   {
    "url": "media/album_4C459947_5F77_C2C1_41CF_68E94C9899D0_2.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 2557
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980",
 "thumbnailUrl": "media/panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_t.jpg",
 "label": "R9",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_5FC8D370_44D7_9761_41CB_C0E36063F063",
  "this.overlay_58FABF98_44D0_8FA1_41C2_524462955A2B",
  "this.overlay_589B8C4D_44D1_70A3_41A1_370AFE000CB7"
 ]
},
{
 "duration": 5000,
 "label": "R-Bed3-3",
 "id": "photo_B2B8FF24_A2B4_46E8_41E3_12142F021D2F",
 "thumbnailUrl": "media/photo_B2B8FF24_A2B4_46E8_41E3_12142F021D2F_t.png",
 "width": 3840,
 "image": {
  "levels": [
   {
    "url": "media/photo_B2B8FF24_A2B4_46E8_41E3_12142F021D2F.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 2557
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -75.26,
   "backwardYaw": -15.13,
   "distance": 1,
   "panorama": "this.panorama_42749FD9_6CCC_0E50_41D5_D5CD1FCEC452"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 114.19,
   "backwardYaw": -111.68,
   "distance": 1,
   "panorama": "this.panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_4270CB46_6CCC_17B0_419B_ED875A3A3C07",
 "thumbnailUrl": "media/panorama_4270CB46_6CCC_17B0_419B_ED875A3A3C07_t.jpg",
 "label": "bed3Panorama",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_4270CB46_6CCC_17B0_419B_ED875A3A3C07_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4270CB46_6CCC_17B0_419B_ED875A3A3C07_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4270CB46_6CCC_17B0_419B_ED875A3A3C07_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_4270CB46_6CCC_17B0_419B_ED875A3A3C07_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4270CB46_6CCC_17B0_419B_ED875A3A3C07_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4270CB46_6CCC_17B0_419B_ED875A3A3C07_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_4270CB46_6CCC_17B0_419B_ED875A3A3C07_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4270CB46_6CCC_17B0_419B_ED875A3A3C07_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4270CB46_6CCC_17B0_419B_ED875A3A3C07_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_4270CB46_6CCC_17B0_419B_ED875A3A3C07_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4270CB46_6CCC_17B0_419B_ED875A3A3C07_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4270CB46_6CCC_17B0_419B_ED875A3A3C07_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_4270CB46_6CCC_17B0_419B_ED875A3A3C07_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4270CB46_6CCC_17B0_419B_ED875A3A3C07_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4270CB46_6CCC_17B0_419B_ED875A3A3C07_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_4270CB46_6CCC_17B0_419B_ED875A3A3C07_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4270CB46_6CCC_17B0_419B_ED875A3A3C07_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4270CB46_6CCC_17B0_419B_ED875A3A3C07_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_4270CB46_6CCC_17B0_419B_ED875A3A3C07_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_5CC64D0A_6CC4_13B0_41C9_32B13D0816F5",
  "this.overlay_5E78B91F_6CC4_73D0_41C8_23E655F476E5"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_075ECBEB_089D_F9ED_4174_1D764B51AAB4",
 "automaticZoomSpeed": 10
},
{
 "duration": 5000,
 "label": "R-Bed3-1",
 "id": "photo_ACD0055F_A2B4_4558_41D5_78E6263EDDEA",
 "thumbnailUrl": "media/photo_ACD0055F_A2B4_4558_41D5_78E6263EDDEA_t.png",
 "width": 3840,
 "image": {
  "levels": [
   {
    "url": "media/photo_ACD0055F_A2B4_4558_41D5_78E6263EDDEA.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 2557
},
{
 "class": "PlayList",
 "id": "playList_1B820B2F_089D_FA66_418F_EBC9819E93E1",
 "items": [
  {
   "player": "this.MainViewerPhotoAlbumPlayer",
   "media": "this.album_4C459947_5F77_C2C1_41CF_68E94C9899D0",
   "class": "PhotoAlbumPlayListItem"
  }
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -173.78,
   "backwardYaw": 1.32,
   "distance": 1,
   "panorama": "this.panorama_68C70D10_7CEA_898B_41B4_72F949ECE365"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -87.11,
   "backwardYaw": 176.67,
   "distance": 1,
   "panorama": "this.panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -1.45,
   "backwardYaw": -176.13,
   "distance": 1,
   "panorama": "this.panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD",
 "thumbnailUrl": "media/panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_t.jpg",
 "label": "01pP3_1",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_2ED68C4E_3E31_FE5A_41CE_37C45690F1E2",
  "this.overlay_2ED69C4E_3E31_FE5A_41C8_5BC3AFE5829D",
  "this.overlay_2ED6AC4E_3E31_FE5A_419D_ADCFEADC4FEC"
 ]
},
{
 "class": "PlayList",
 "id": "playList_0553A994_0894_463B_4191_19BF9C9D14A2",
 "items": [
  {
   "media": "this.video_4BEEC1C2_5F78_45C3_4193_05A623EF9341",
   "start": "this.viewer_uid1A74EB1C_089D_FA2B_419F_2524A1E0E855VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_0553A994_0894_463B_4191_19BF9C9D14A2, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_0553A994_0894_463B_4191_19BF9C9D14A2, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uid1A74EB1C_089D_FA2B_419F_2524A1E0E855VideoPlayer)",
   "player": "this.viewer_uid1A74EB1C_089D_FA2B_419F_2524A1E0E855VideoPlayer",
   "class": "VideoPlayListItem"
  }
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 23.2,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1B1DAB5B_089D_FA2D_41A0_65CE50BB8694",
 "automaticZoomSpeed": 10
},
{
 "duration": 5000,
 "label": "R-Bed4-1",
 "id": "photo_ACE0D227_A2B7_FEE8_41D6_0AA19B6B7A4B",
 "thumbnailUrl": "media/photo_ACE0D227_A2B7_FEE8_41D6_0AA19B6B7A4B_t.png",
 "width": 3840,
 "image": {
  "levels": [
   {
    "url": "media/photo_ACE0D227_A2B7_FEE8_41D6_0AA19B6B7A4B.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 2557
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 158.26,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_07301BDD_089D_FA2A_4189_C3B1C44FF320",
 "automaticZoomSpeed": 10
},
{
 "class": "PlayList",
 "id": "playList_1B82DB2F_089D_FA66_4197_739F4D6DDE39",
 "items": [
  {
   "begin": "this.MainViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_195E758A_39BA_645B_41C6_982902844137",
   "class": "MapPlayListItem",
   "player": "this.MainViewerMapPlayer"
  }
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -111.68,
   "backwardYaw": 114.19,
   "distance": 1,
   "panorama": "this.panorama_4270CB46_6CCC_17B0_419B_ED875A3A3C07"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 3.39,
   "backwardYaw": -140.46,
   "distance": 1,
   "panorama": "this.panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -157.67,
   "backwardYaw": 42.71,
   "distance": 1,
   "panorama": "this.panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 115.18,
   "backwardYaw": 5.66,
   "distance": 1,
   "panorama": "this.panorama_427426C9_6CCC_1EB0_41D3_EDA93E539BC0"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 179.75,
   "backwardYaw": 5.32,
   "distance": 1,
   "panorama": "this.panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 83.02,
   "backwardYaw": 159.77,
   "distance": 1,
   "panorama": "this.panorama_427388F5_6CCC_3250_41D3_EAFDE6541A37"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B",
 "thumbnailUrl": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_t.jpg",
 "label": "SFL2",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_64F3E5BB_7DA5_98FD_41C0_8903AA1016F6",
  "this.overlay_C4765BB5_CAA9_B861_41D9_4E1B33630165",
  "this.overlay_D8B13169_CAA8_A8E0_41B0_1D078CF16A33",
  "this.overlay_DB3075BA_CAAB_6860_41E9_2D01175A41B0",
  "this.overlay_DA0EB733_CAA9_6861_41E3_B5EA805DA84C",
  "this.overlay_DAA4BBED_CAA9_DFE1_41E4_628D3DD3E993"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 101.3,
   "backwardYaw": 141.99,
   "distance": 1,
   "panorama": "this.panorama_37243B3A_396E_ACBB_41B2_389D97DC4625"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 1.57,
   "backwardYaw": 179.73,
   "distance": 1,
   "panorama": "this.panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 175.66,
   "backwardYaw": 1.05,
   "distance": 1,
   "panorama": "this.panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -104.45,
   "backwardYaw": -148.86,
   "distance": 1,
   "panorama": "this.panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0",
 "thumbnailUrl": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_t.jpg",
 "label": "T2",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_2C7A0666_39EA_A4CB_41C7_545FB67D4348",
  "this.overlay_2C4C79FF_39E9_EFB9_41C4_C1054F059DF5",
  "this.overlay_2F99E42B_39E9_A459_41C9_3FEC2B1AC277",
  "this.overlay_2C8DA4F4_39E9_A5CF_41C6_AC8B7DB3AECA"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1A178D49_089D_FE2D_4196_166A02A4E31C",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -178.95,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1893CC15_089D_FE25_418A_30A02BD88470",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_4ED61615_6DCC_71D0_417C_348BC20174DA_camera",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 159.77,
   "backwardYaw": 83.02,
   "distance": 1,
   "panorama": "this.panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -7.16,
   "backwardYaw": 49.49,
   "distance": 1,
   "panorama": "this.panorama_42757461_6CCC_3271_41DA_1F6E4C4C5553"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_427388F5_6CCC_3250_41D3_EAFDE6541A37",
 "thumbnailUrl": "media/panorama_427388F5_6CCC_3250_41D3_EAFDE6541A37_t.jpg",
 "label": "bed4Panorama_2",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_427388F5_6CCC_3250_41D3_EAFDE6541A37_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_427388F5_6CCC_3250_41D3_EAFDE6541A37_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_427388F5_6CCC_3250_41D3_EAFDE6541A37_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_427388F5_6CCC_3250_41D3_EAFDE6541A37_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_427388F5_6CCC_3250_41D3_EAFDE6541A37_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_427388F5_6CCC_3250_41D3_EAFDE6541A37_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_427388F5_6CCC_3250_41D3_EAFDE6541A37_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_427388F5_6CCC_3250_41D3_EAFDE6541A37_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_427388F5_6CCC_3250_41D3_EAFDE6541A37_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_427388F5_6CCC_3250_41D3_EAFDE6541A37_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_427388F5_6CCC_3250_41D3_EAFDE6541A37_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_427388F5_6CCC_3250_41D3_EAFDE6541A37_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_427388F5_6CCC_3250_41D3_EAFDE6541A37_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_427388F5_6CCC_3250_41D3_EAFDE6541A37_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_427388F5_6CCC_3250_41D3_EAFDE6541A37_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_427388F5_6CCC_3250_41D3_EAFDE6541A37_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_427388F5_6CCC_3250_41D3_EAFDE6541A37_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_427388F5_6CCC_3250_41D3_EAFDE6541A37_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_427388F5_6CCC_3250_41D3_EAFDE6541A37_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_5AF9A756_6F44_7E53_41DA_B0F432BB629C",
  "this.overlay_5BAC2C4E_6F4C_31B0_41D5_D180E0069915"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -144.24,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_18EFDC4A_089D_FE2F_418A_907754C26CA0",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1A235D69_089D_FEED_415D_25BF22FE30E0",
 "automaticZoomSpeed": 10
},
{
 "duration": 5000,
 "label": "L6_1",
 "id": "album_4C459947_5F77_C2C1_41CF_68E94C9899D0_5",
 "width": 3840,
 "image": {
  "levels": [
   {
    "url": "media/album_4C459947_5F77_C2C1_41CF_68E94C9899D0_5.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 2557
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_4F636E0D_6DC4_31B0_41B4_0918A4EE2E5D",
 "thumbnailUrl": "media/panorama_4F636E0D_6DC4_31B0_41B4_0918A4EE2E5D_t.jpg",
 "label": "R12_1",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_4F636E0D_6DC4_31B0_41B4_0918A4EE2E5D_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4F636E0D_6DC4_31B0_41B4_0918A4EE2E5D_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4F636E0D_6DC4_31B0_41B4_0918A4EE2E5D_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4F636E0D_6DC4_31B0_41B4_0918A4EE2E5D_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_4F636E0D_6DC4_31B0_41B4_0918A4EE2E5D_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4F636E0D_6DC4_31B0_41B4_0918A4EE2E5D_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4F636E0D_6DC4_31B0_41B4_0918A4EE2E5D_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4F636E0D_6DC4_31B0_41B4_0918A4EE2E5D_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_4F636E0D_6DC4_31B0_41B4_0918A4EE2E5D_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4F636E0D_6DC4_31B0_41B4_0918A4EE2E5D_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4F636E0D_6DC4_31B0_41B4_0918A4EE2E5D_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4F636E0D_6DC4_31B0_41B4_0918A4EE2E5D_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_4F636E0D_6DC4_31B0_41B4_0918A4EE2E5D_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4F636E0D_6DC4_31B0_41B4_0918A4EE2E5D_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4F636E0D_6DC4_31B0_41B4_0918A4EE2E5D_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4F636E0D_6DC4_31B0_41B4_0918A4EE2E5D_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_4F636E0D_6DC4_31B0_41B4_0918A4EE2E5D_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4F636E0D_6DC4_31B0_41B4_0918A4EE2E5D_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4F636E0D_6DC4_31B0_41B4_0918A4EE2E5D_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4F636E0D_6DC4_31B0_41B4_0918A4EE2E5D_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_4F636E0D_6DC4_31B0_41B4_0918A4EE2E5D_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4F636E0D_6DC4_31B0_41B4_0918A4EE2E5D_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4F636E0D_6DC4_31B0_41B4_0918A4EE2E5D_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4F636E0D_6DC4_31B0_41B4_0918A4EE2E5D_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_4F636E0D_6DC4_31B0_41B4_0918A4EE2E5D_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_4E2FC215_6D4C_F1D1_41CB_12FBF1DD274F"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 16.82,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1B9D3D8A_089D_FE2E_4194_F503B89CBF65",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_4F636E0D_6DC4_31B0_41B4_0918A4EE2E5D_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 96.91,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1825AC5E_089D_FE26_419A_F9394ED5AF20",
 "automaticZoomSpeed": 10
},
{
 "class": "PlayList",
 "id": "playList_1B81AB2F_089D_FA66_418A_69F30CEF6A8D",
 "items": [
  {
   "begin": "this.MainViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_195E758A_39BA_645B_41C6_982902844137",
   "class": "MapPlayListItem",
   "player": "this.MainViewerMapPlayer"
  }
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_427426C9_6CCC_1EB0_41D3_EDA93E539BC0_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -138.09,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1BBADD99_089D_FE2D_4161_29291D05DABA",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -38.01,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_076D5C0B_089D_FE2E_416F_6A31B59DC0FD",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF",
 "thumbnailUrl": "media/panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF_t.jpg",
 "label": "R10",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_5F56CC42_44D1_90A1_41C3_AF11DF88BA09",
  "this.overlay_58D3A238_44DF_F0E1_41C5_D04F96DE09D3"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 91.92,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_193EBCC2_089D_FE1E_4175_22071E696004",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327_camera",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -129.77,
   "backwardYaw": -130.28,
   "distance": 1,
   "panorama": "this.panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -129.77,
   "backwardYaw": -130.28,
   "distance": 1,
   "panorama": "this.panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -129.77,
   "backwardYaw": 178.48,
   "distance": 1,
   "panorama": "this.panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -132.65,
   "backwardYaw": 178.48,
   "distance": 1,
   "panorama": "this.panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 2.86,
   "backwardYaw": 168.68,
   "distance": 1,
   "panorama": "this.panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -129.77,
   "backwardYaw": 168.68,
   "distance": 1,
   "panorama": "this.panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B",
 "thumbnailUrl": "media/panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_t.jpg",
 "label": "T8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6AABA810_7D6A_778C_41D7_E19025946123",
  "this.overlay_6AABB810_7D6A_778C_41DC_C822F7030097",
  "this.overlay_9620880F_86F2_180A_41DB_2FFAA02327BC"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 101.37,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1A343D59_089D_FE2D_4192_FED57C32B5F8",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1A709D79_089D_FEED_419F_D82195738E64",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -65.81,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_18425C6B_089D_FEEE_4133_23E0DEB88AC6",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 165.25,
   "backwardYaw": 35.76,
   "distance": 1,
   "panorama": "this.panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -156.8,
   "backwardYaw": 15.67,
   "distance": 1,
   "panorama": "this.panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -88.08,
   "backwardYaw": -149.48,
   "distance": 1,
   "panorama": "this.panorama_635B0BD3_6CFC_3650_41D7_396302800D07"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 6,
   "backwardYaw": -82.6,
   "distance": 1,
   "panorama": "this.panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF",
 "thumbnailUrl": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_t.jpg",
 "label": "SFL5",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_787ADD99_6CC4_32D0_41D3_41FF32A3007B",
  "this.overlay_260DBBF1_6FC7_F651_41B3_F188772136C6",
  "this.overlay_20DD2EFF_6FDC_0E51_41D3_DCBE2D8AB7CC",
  "this.overlay_981FB745_8BD2_5A2E_41D4_E5AD6575BFAD"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 172.84,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1AB1DD09_089D_FE2D_4181_8A816BAC73E6",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -14.75,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1947BCDA_089D_FE2E_4191_D39EE949AB49",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -125.87,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1B8C0D8A_089D_FE2E_41A0_209C7F61A7A6",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_189A2E78_089D_FAEB_4194_ADC537E5A697",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_19D6AC9A_089D_FE2F_419C_A28EA007EE32",
 "automaticZoomSpeed": 10
},
{
 "label": "Paragons Of Virtue Teasser",
 "scaleMode": "fit_inside",
 "thumbnailUrl": "media/video_4DEC725F_43B1_2B53_4163_4E5C1F47F79B_t.jpg",
 "width": 1920,
 "loop": false,
 "id": "video_4DEC725F_43B1_2B53_4163_4E5C1F47F79B",
 "class": "Video",
 "height": 1080,
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_4DEC725F_43B1_2B53_4163_4E5C1F47F79B.mp4"
 }
},
{
 "movementMode": "constrained",
 "viewerArea": "this.MainViewer",
 "class": "MapPlayer",
 "id": "MainViewerMapPlayer"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 178.55,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1AFCBD34_089D_FE7A_419E_B90ED08FCCCA",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -64.36,
   "backwardYaw": 72.55,
   "distance": 1,
   "panorama": "this.panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B",
 "thumbnailUrl": "media/panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B_t.jpg",
 "label": "bed1pano 3",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_689E0BBD_7D6A_88F5_41D8_1E1BF6A7BDCD"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_07418BFB_089D_F9EE_418A_5ED1FA3FE3DA",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 49.72,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1B38DB6C_089D_FAEA_4185_4E9E0D98032E",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -164.3,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_07022E29_089D_FA6D_4181_09EF0C154212",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_635FE1E8_6CFC_3270_41C2_F8189A455420",
 "thumbnailUrl": "media/panorama_635FE1E8_6CFC_3270_41C2_F8189A455420_t.jpg",
 "label": "SFL7",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_635FE1E8_6CFC_3270_41C2_F8189A455420_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_635FE1E8_6CFC_3270_41C2_F8189A455420_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_635FE1E8_6CFC_3270_41C2_F8189A455420_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_635FE1E8_6CFC_3270_41C2_F8189A455420_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_635FE1E8_6CFC_3270_41C2_F8189A455420_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_635FE1E8_6CFC_3270_41C2_F8189A455420_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_635FE1E8_6CFC_3270_41C2_F8189A455420_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_635FE1E8_6CFC_3270_41C2_F8189A455420_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_635FE1E8_6CFC_3270_41C2_F8189A455420_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_635FE1E8_6CFC_3270_41C2_F8189A455420_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_635FE1E8_6CFC_3270_41C2_F8189A455420_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_635FE1E8_6CFC_3270_41C2_F8189A455420_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_635FE1E8_6CFC_3270_41C2_F8189A455420_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_635FE1E8_6CFC_3270_41C2_F8189A455420_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_635FE1E8_6CFC_3270_41C2_F8189A455420_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_635FE1E8_6CFC_3270_41C2_F8189A455420_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_635FE1E8_6CFC_3270_41C2_F8189A455420_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_635FE1E8_6CFC_3270_41C2_F8189A455420_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_635FE1E8_6CFC_3270_41C2_F8189A455420_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_635FE1E8_6CFC_3270_41C2_F8189A455420_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_635FE1E8_6CFC_3270_41C2_F8189A455420_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_635FE1E8_6CFC_3270_41C2_F8189A455420_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_635FE1E8_6CFC_3270_41C2_F8189A455420_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_635FE1E8_6CFC_3270_41C2_F8189A455420_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_635FE1E8_6CFC_3270_41C2_F8189A455420_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_7727ACB2_6D3C_12D0_41C3_46936ADA0244"
 ]
},
{
 "label": "Photo Album L1_1",
 "id": "album_4C459947_5F77_C2C1_41CF_68E94C9899D0",
 "thumbnailUrl": "media/album_4C459947_5F77_C2C1_41CF_68E94C9899D0_t.png",
 "playList": "this.album_4C459947_5F77_C2C1_41CF_68E94C9899D0_AlbumPlayList",
 "class": "PhotoAlbum"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -0.55,
   "backwardYaw": -121.64,
   "distance": 1,
   "panorama": "this.panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 42.71,
   "backwardYaw": -157.67,
   "distance": 1,
   "panorama": "this.panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4",
 "thumbnailUrl": "media/panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4_t.jpg",
 "label": "bed1pano 1",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_69EFF979_7D6B_887C_41D2_5EC555338473",
  "this.overlay_69EFE979_7D6B_887C_41B7_C4965873DBE7"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -20.23,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_19BA9C8A_089D_FE2F_419A_8EA963F7F7B8",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -121.64,
   "backwardYaw": -0.55,
   "distance": 1,
   "panorama": "this.panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 72.55,
   "backwardYaw": -64.36,
   "distance": 1,
   "panorama": "this.panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB",
 "thumbnailUrl": "media/panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB_t.jpg",
 "label": "bed1pano 2",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_68A87C1B_7D6B_8FBD_41D9_C0CD33FAE4B0",
  "this.overlay_68A86C1B_7D6B_8FBD_41C7_5979D2735590"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_camera",
 "automaticZoomSpeed": 10
},
{
 "duration": 5000,
 "label": "L5_1",
 "id": "album_4C459947_5F77_C2C1_41CF_68E94C9899D0_4",
 "width": 3840,
 "image": {
  "levels": [
   {
    "url": "media/album_4C459947_5F77_C2C1_41CF_68E94C9899D0_4.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 2557
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 5.32,
   "backwardYaw": 179.75,
   "distance": 1,
   "panorama": "this.panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327",
 "thumbnailUrl": "media/panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327_t.jpg",
 "label": "SFL1",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_7DA7C1B2_6CC4_12D3_41C4_4887A70DCF6A"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 1.38,
   "backwardYaw": -8.93,
   "distance": 1,
   "panorama": "this.panorama_6F92A178_7CE7_987B_41DA_ED8733B68935"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -87.59,
   "backwardYaw": -83.09,
   "distance": 1,
   "panorama": "this.panorama_68C70D10_7CEA_898B_41B4_72F949ECE365"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -174.51,
   "backwardYaw": 0.61,
   "distance": 1,
   "panorama": "this.panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D",
 "thumbnailUrl": "media/panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_t.jpg",
 "label": "02pp10",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6FBBDE7F_7CE6_8875_41D5_3BC38C489430",
  "this.overlay_6FBBAE7F_7CE6_8875_41C4_F945894682F2",
  "this.overlay_6F162224_7CFB_FB8B_41D6_48E08606D0A2"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_49E02255_44D0_90A3_41BF_327058418A88_camera",
 "automaticZoomSpeed": 10
},
{
 "duration": 5000,
 "label": "R-Bed2-1",
 "id": "photo_ACEE2674_A2B4_C768_41DC_0D3D345FD5BE",
 "thumbnailUrl": "media/photo_ACEE2674_A2B4_C768_41DC_0D3D345FD5BE_t.png",
 "width": 3840,
 "image": {
  "levels": [
   {
    "url": "media/photo_ACEE2674_A2B4_C768_41DC_0D3D345FD5BE.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 2560
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38_camera",
 "automaticZoomSpeed": 10
},
{
 "viewerArea": "this.MainViewer",
 "class": "PhotoAlbumPlayer",
 "id": "MainViewerPhotoAlbumPlayer"
},
{
 "class": "PlayList",
 "id": "mainPlayList",
 "items": [
  {
   "media": "this.panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C",
   "camera": "this.panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_68C70D10_7CEA_898B_41B4_72F949ECE365",
   "camera": "this.panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD",
   "camera": "this.panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC",
   "camera": "this.panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45",
   "camera": "this.panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38",
   "camera": "this.panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0",
   "camera": "this.panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_37243B3A_396E_ACBB_41B2_389D97DC4625",
   "camera": "this.panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7",
   "camera": "this.panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C",
   "camera": "this.panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7",
   "camera": "this.panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE",
   "camera": "this.panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B",
   "camera": "this.panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46",
   "camera": "this.panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F",
   "camera": "this.panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF",
   "camera": "this.panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8",
   "camera": "this.panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457",
   "camera": "this.panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D",
   "camera": "this.panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6F92A178_7CE7_987B_41DA_ED8733B68935",
   "camera": "this.panorama_6F92A178_7CE7_987B_41DA_ED8733B68935_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3",
   "camera": "this.panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_49E02255_44D0_90A3_41BF_327058418A88",
   "camera": "this.panorama_49E02255_44D0_90A3_41BF_327058418A88_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711",
   "camera": "this.panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0",
   "camera": "this.panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB",
   "camera": "this.panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_4ED61615_6DCC_71D0_417C_348BC20174DA",
   "camera": "this.panorama_4ED61615_6DCC_71D0_417C_348BC20174DA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2",
   "camera": "this.panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_96CA7F23_8732_383B_41DF_3051F30EE69B",
   "camera": "this.panorama_96CA7F23_8732_383B_41DF_3051F30EE69B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 28)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16",
   "camera": "this.panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 28, 29)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980",
   "camera": "this.panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 29, 30)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF",
   "camera": "this.panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 30, 31)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69",
   "camera": "this.panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 31, 32)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327",
   "camera": "this.panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 32, 33)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B",
   "camera": "this.panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 33, 34)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2",
   "camera": "this.panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 34, 35)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D",
   "camera": "this.panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 35, 36)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF",
   "camera": "this.panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 36, 37)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26",
   "camera": "this.panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 37, 38)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_635FE1E8_6CFC_3270_41C2_F8189A455420",
   "camera": "this.panorama_635FE1E8_6CFC_3270_41C2_F8189A455420_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 38, 39)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_635B0BD3_6CFC_3650_41D7_396302800D07",
   "camera": "this.panorama_635B0BD3_6CFC_3650_41D7_396302800D07_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 39, 40)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_4F636E0D_6DC4_31B0_41B4_0918A4EE2E5D",
   "camera": "this.panorama_4F636E0D_6DC4_31B0_41B4_0918A4EE2E5D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 40, 41)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_41112B09_6D3C_17B0_41DB_371D557B428F",
   "camera": "this.panorama_41112B09_6D3C_17B0_41DB_371D557B428F_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 41, 42)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5CFFE1DC_6CCC_1250_41C5_0D1AFA7842DF",
   "camera": "this.panorama_5CFFE1DC_6CCC_1250_41C5_0D1AFA7842DF_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 42, 43)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_427426C9_6CCC_1EB0_41D3_EDA93E539BC0",
   "camera": "this.panorama_427426C9_6CCC_1EB0_41D3_EDA93E539BC0_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 43, 44)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_4270CB46_6CCC_17B0_419B_ED875A3A3C07",
   "camera": "this.panorama_4270CB46_6CCC_17B0_419B_ED875A3A3C07_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 44, 45)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_42749FD9_6CCC_0E50_41D5_D5CD1FCEC452",
   "camera": "this.panorama_42749FD9_6CCC_0E50_41D5_D5CD1FCEC452_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 45, 46)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_42757461_6CCC_3271_41DA_1F6E4C4C5553",
   "camera": "this.panorama_42757461_6CCC_3271_41DA_1F6E4C4C5553_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 46, 47)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_427388F5_6CCC_3250_41D3_EAFDE6541A37",
   "camera": "this.panorama_427388F5_6CCC_3250_41D3_EAFDE6541A37_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 47, 48)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4",
   "camera": "this.panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 48, 49)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB",
   "camera": "this.panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 49, 50)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B",
   "camera": "this.panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 50, 51)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61",
   "camera": "this.panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 51, 52)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2",
   "camera": "this.panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 52, 53)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.video_4BEEC1C2_5F78_45C3_4193_05A623EF9341",
   "end": "this.trigger('tourEnded')",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 53, 0)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 53, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 53)"
  }
 ]
},
{
 "class": "PlayList",
 "id": "playList_1B816B2F_089D_FA66_41A1_1C57FAFF305D",
 "items": [
  {
   "begin": "this.MainViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_1B9EDF2A_39BA_A45B_41B1_9372F6FCF0F6",
   "class": "MapPlayListItem",
   "player": "this.MainViewerMapPlayer"
  }
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1A18BD3E_089D_FE67_4197_65AD9473482C",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 9.79,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1BC50DA9_089D_FE6D_4192_F64B919660D8",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB_camera",
 "automaticZoomSpeed": 10
},
{
 "duration": 5000,
 "label": "L4_1",
 "id": "album_4C459947_5F77_C2C1_41CF_68E94C9899D0_3",
 "width": 3840,
 "image": {
  "levels": [
   {
    "url": "media/album_4C459947_5F77_C2C1_41CF_68E94C9899D0_3.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 2557
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -40.96,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_07221E43_089D_FA1D_413E_A615C69C791E",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PlayList",
 "id": "playList_1B813B2F_089D_FA66_4157_A71FEA1813F3",
 "items": [
  {
   "begin": "this.MainViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_1B4CB28F_39BA_5C59_41C4_A42B91702CC9",
   "class": "MapPlayListItem",
   "player": "this.MainViewerMapPlayer"
  }
 ]
},
{
 "fieldOfViewOverlayOutsideColor": "#000000",
 "initialZoomFactor": 1,
 "maximumZoomFactor": 1.2,
 "label": "Highland Brochure Update (10)_page-0030",
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "id": "map_195E758A_39BA_645B_41C6_982902844137",
 "thumbnailUrl": "media/map_195E758A_39BA_645B_41C6_982902844137_t.jpg",
 "width": 5400,
 "scaleMode": "fit_inside",
 "image": {
  "levels": [
   {
    "url": "media/map_195E758A_39BA_645B_41C6_982902844137.jpeg",
    "width": 3200,
    "class": "ImageResourceLevel",
    "height": 2311
   },
   {
    "url": "media/map_195E758A_39BA_645B_41C6_982902844137_lq.jpeg",
    "width": 301,
    "class": "ImageResourceLevel",
    "height": 218,
    "tags": "preload"
   }
  ],
  "class": "ImageResource"
 },
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "fieldOfViewOverlayRadiusScale": 0.3,
 "class": "Map",
 "minimumZoomFactor": 0.5,
 "height": 3900,
 "fieldOfViewOverlayOutsideOpacity": 0
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_427388F5_6CCC_3250_41D3_EAFDE6541A37_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -178.62,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1AE98D39_089D_FE6D_418E_7158653F1D59",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -1.52,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1B36CB6C_089D_FAEA_4188_61152A0CFE1A",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 97.4,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1838BC5E_089D_FE26_4190_2B3E7FD3BAD6",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -11.32,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_0711EBBB_089D_FA6D_4180_DD66A1A013B8",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 15.89,
   "backwardYaw": 14.38,
   "distance": 1,
   "panorama": "this.panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 176.67,
   "backwardYaw": -87.11,
   "distance": 1,
   "panorama": "this.panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC",
 "thumbnailUrl": "media/panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC_t.jpg",
 "label": "01pP5_1",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_308766B3_3E36_2ACA_419E_EDCBA6315D91",
  "this.overlay_308776B3_3E36_2ACA_41A2_63388DE002CF"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1C981DEE_089D_F9E7_4176_9DF4E421DD1A",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 86.28,
   "backwardYaw": 2.62,
   "distance": 1,
   "panorama": "this.panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF",
 "thumbnailUrl": "media/panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF_t.jpg",
 "label": "01pP6_1",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_2E04C0EC_3E3E_665E_41B5_4AE310016950"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 2.62,
   "backwardYaw": 86.28,
   "distance": 1,
   "panorama": "this.panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -81.28,
   "backwardYaw": -141.07,
   "distance": 1,
   "panorama": "this.panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -176.13,
   "backwardYaw": -1.45,
   "distance": 1,
   "panorama": "this.panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F",
 "thumbnailUrl": "media/panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_t.jpg",
 "label": "01pP4",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_2FA9ED8B_3E3E_3EDA_41B2_5B89C0E8D505",
  "this.overlay_2FA9CD8B_3E3E_3EDA_41C5_174365D4C570",
  "this.overlay_2F962D8B_3E3E_3EDA_41B1_E95BC7EC6266"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1B697DE9_089D_F9ED_4190_94A979F2FCBE",
 "automaticZoomSpeed": 10
},
{
 "duration": 5000,
 "label": "R-Bed1-1",
 "id": "photo_AC421AB5_A2B4_4FE8_41E2_96FF41791C68",
 "thumbnailUrl": "media/photo_AC421AB5_A2B4_4FE8_41E2_96FF41791C68_t.png",
 "width": 3840,
 "image": {
  "levels": [
   {
    "url": "media/photo_AC421AB5_A2B4_4FE8_41E2_96FF41791C68.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 2557
},
{
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "touchControlMode": "drag_rotation",
 "class": "PanoramaPlayer",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "mouseControlMode": "drag_acceleration"
},
{
 "change": "this.showComponentsWhileMouseOver(this.container_1A7D6B1C_089D_FA2B_4193_306AF85E26D3, [this.htmltext_1A7F5B1C_089D_FA2B_4195_8F246D356B70,this.component_1A737B1C_089D_FA2B_418B_35E008A49829,this.component_1A736B1C_089D_FA2B_417F_4B61D08EE5AD], 2000)",
 "items": [
  "this.albumitem_1A7DAB1C_089D_FA2B_4197_499091B67019"
 ],
 "class": "PlayList",
 "id": "playList_05204983_0894_461D_41A0_E205846F8AB1"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_635FE1E8_6CFC_3270_41C2_F8189A455420_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PlayList",
 "id": "playList_1B827B2F_089D_FA66_419D_B1E0C6134234",
 "items": [
  {
   "media": "this.video_4DEC725F_43B1_2B53_4163_4E5C1F47F79B",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_1B827B2F_089D_FA66_419D_B1E0C6134234, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_1B827B2F_089D_FA66_419D_B1E0C6134234, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -164.33,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_181C5C4A_089D_FE2F_4188_4317F8676CE3",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 49.49,
   "backwardYaw": -7.16,
   "distance": 1,
   "panorama": "this.panorama_427388F5_6CCC_3250_41D3_EAFDE6541A37"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_42757461_6CCC_3271_41DA_1F6E4C4C5553",
 "thumbnailUrl": "media/panorama_42757461_6CCC_3271_41DA_1F6E4C4C5553_t.jpg",
 "label": "bed4Panorama_1",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_42757461_6CCC_3271_41DA_1F6E4C4C5553_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_42757461_6CCC_3271_41DA_1F6E4C4C5553_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_42757461_6CCC_3271_41DA_1F6E4C4C5553_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_42757461_6CCC_3271_41DA_1F6E4C4C5553_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_42757461_6CCC_3271_41DA_1F6E4C4C5553_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_42757461_6CCC_3271_41DA_1F6E4C4C5553_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_42757461_6CCC_3271_41DA_1F6E4C4C5553_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_42757461_6CCC_3271_41DA_1F6E4C4C5553_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_42757461_6CCC_3271_41DA_1F6E4C4C5553_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_42757461_6CCC_3271_41DA_1F6E4C4C5553_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_42757461_6CCC_3271_41DA_1F6E4C4C5553_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_42757461_6CCC_3271_41DA_1F6E4C4C5553_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_42757461_6CCC_3271_41DA_1F6E4C4C5553_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_42757461_6CCC_3271_41DA_1F6E4C4C5553_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_42757461_6CCC_3271_41DA_1F6E4C4C5553_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_42757461_6CCC_3271_41DA_1F6E4C4C5553_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_42757461_6CCC_3271_41DA_1F6E4C4C5553_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_42757461_6CCC_3271_41DA_1F6E4C4C5553_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_42757461_6CCC_3271_41DA_1F6E4C4C5553_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_58B42D55_6F4C_1250_41D2_03AC18B4B73C"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 50.23,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_072ABBE3_089D_FA1E_419B_4F5F6E73AE39",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -118.44,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_07508E58_089D_FA2B_4104_39C84BFC7180",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_96CA7F23_8732_383B_41DF_3051F30EE69B"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_49E02255_44D0_90A3_41BF_327058418A88",
 "thumbnailUrl": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_t.jpg",
 "label": "R2",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_56396508_44D7_90A1_41CA_9B17CDE88798",
  "this.overlay_5706CF25_44D7_70E3_41BE_EC110FB1FC07",
  "this.overlay_57CF4A1D_44D1_90A3_41C5_98D71672AA66",
  "this.overlay_5774D5F1_44D1_9362_41C6_C9936041BCEE",
  "this.overlay_57E86EBB_44D0_91E7_41D0_5436A3DE925A"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 54.13,
   "backwardYaw": -170.98,
   "distance": 1,
   "panorama": "this.panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 123.96,
   "backwardYaw": -170.98,
   "distance": 1,
   "panorama": "this.panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 123.96,
   "backwardYaw": -21.74,
   "distance": 1,
   "panorama": "this.panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -130.28,
   "backwardYaw": -129.77,
   "distance": 1,
   "panorama": "this.panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 179.73,
   "backwardYaw": 1.57,
   "distance": 1,
   "panorama": "this.panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C",
 "thumbnailUrl": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_t.jpg",
 "label": "T5",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6821857A_7D6A_B87F_41B9_EE7F7FD2400E",
  "this.overlay_6821957A_7D6A_B87F_41DC_BD30B5B8044C",
  "this.overlay_6822757A_7D6A_B87F_41D4_2486089A3DA2",
  "this.overlay_6822457A_7D6A_B87F_41D4_7F2F1433F101"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -0.27,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1898CC0B_089D_FE2E_419D_963751BB93D2",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -4.34,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_07570BEB_089D_F9ED_4198_CACF2E60C37B",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -96.98,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1BA71DA4_089D_FE1A_419F_3A3100957727",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_camera",
 "automaticZoomSpeed": 10
},
{
 "fieldOfViewOverlayOutsideColor": "#000000",
 "initialZoomFactor": 1,
 "maximumZoomFactor": 1.2,
 "label": "Highland Brochure Update (10)_page-0028",
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "id": "map_1B9EDF2A_39BA_A45B_41B1_9372F6FCF0F6",
 "thumbnailUrl": "media/map_1B9EDF2A_39BA_A45B_41B1_9372F6FCF0F6_t.jpg",
 "width": 3900,
 "scaleMode": "fit_inside",
 "image": {
  "levels": [
   {
    "url": "media/map_1B9EDF2A_39BA_A45B_41B1_9372F6FCF0F6.jpeg",
    "width": 2311,
    "class": "ImageResourceLevel",
    "height": 3200
   },
   {
    "url": "media/map_1B9EDF2A_39BA_A45B_41B1_9372F6FCF0F6_lq.jpeg",
    "width": 217,
    "class": "ImageResourceLevel",
    "height": 301,
    "tags": "preload"
   }
  ],
  "class": "ImageResource"
 },
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "fieldOfViewOverlayRadiusScale": 0.3,
 "class": "Map",
 "minimumZoomFactor": 0.5,
 "height": 5400,
 "fieldOfViewOverlayOutsideOpacity": 0
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_07793BFE_089D_F9E7_4194_E01AE406BCE2",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 159.96,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1965DCDA_089D_FE2E_4187_46108FC633D3",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_42757461_6CCC_3271_41DA_1F6E4C4C5553_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 159.96,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1A937CF6_089D_FFE7_4197_37719A40667C",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_49E02255_44D0_90A3_41BF_327058418A88"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_4ED61615_6DCC_71D0_417C_348BC20174DA"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB",
 "thumbnailUrl": "media/panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_t.jpg",
 "label": "R4",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6DEF49D0_7CEB_888B_41D9_A9910FB50BBB",
  "this.overlay_6DE0F9D0_7CEB_888B_41B4_60D7DBFD2331",
  "this.overlay_6DE0D9D0_7CEB_888B_41B7_3D27F6053D1F"
 ]
},
{
 "viewerArea": "this.MainViewer",
 "class": "VideoPlayer",
 "id": "MainViewerVideoPlayer",
 "displayPlaybackBar": true
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -174.68,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_198B1C85_089D_FE1A_416D_FDF6B7034253",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 9.02,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_07392BD5_089D_FA25_419D_8EEFD83EAE40",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 164.87,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1B2FDDD4_089D_FE3A_418A_5CE3F6BA680A",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26_camera",
 "automaticZoomSpeed": 10
},
{
 "duration": 5000,
 "label": "L2_1",
 "id": "album_4C459947_5F77_C2C1_41CF_68E94C9899D0_1",
 "thumbnailUrl": "media/album_4C459947_5F77_C2C1_41CF_68E94C9899D0_1_t.png",
 "width": 3840,
 "image": {
  "levels": [
   {
    "url": "media/album_4C459947_5F77_C2C1_41CF_68E94C9899D0_1.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 2557
},
{
 "duration": 5000,
 "label": "R-Bed1-2",
 "id": "photo_AF683516_A2B4_3AA8_41D0_81582A24EFA3",
 "thumbnailUrl": "media/photo_AF683516_A2B4_3AA8_41D0_81582A24EFA3_t.png",
 "width": 3840,
 "image": {
  "levels": [
   {
    "url": "media/photo_AF683516_A2B4_3AA8_41D0_81582A24EFA3.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 2557
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457_camera",
 "automaticZoomSpeed": 10
},
{
 "duration": 5000,
 "label": "Highland Brochure Update (10)_page-0029",
 "id": "photo_1963C3D6_39BA_E3CB_41B8_F79A2911695D",
 "thumbnailUrl": "media/photo_1963C3D6_39BA_E3CB_41B8_F79A2911695D_t.jpg",
 "width": 3900,
 "image": {
  "levels": [
   {
    "url": "media/photo_1963C3D6_39BA_E3CB_41B8_F79A2911695D.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 5400
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 92.41,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_073E8E34_089D_FA7A_4193_F439D6255DE9",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_18B30C2A_089D_FE6F_4194_042DB2A7B00D",
 "automaticZoomSpeed": 10
},
{
 "shadowBlurRadius": 6,
 "id": "window_497EF4FF_5F68_C3C1_41C5_B5D9F040CA16",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "bodyPaddingRight": 0,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundColorDirection": "vertical",
 "width": 400,
 "class": "Window",
 "shadowOpacity": 0.5,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "bodyBackgroundOpacity": 0,
 "scrollBarOpacity": 0.5,
 "borderRadius": 5,
 "minHeight": 20,
 "modal": true,
 "headerVerticalAlign": "middle",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "backgroundColorRatios": [],
 "titlePaddingLeft": 5,
 "titleFontColor": "#000000",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "verticalAlign": "middle",
 "height": 600,
 "veilColorRatios": [
  0,
  1
 ],
 "titleFontSize": "1.29vmin",
 "veilColorDirection": "horizontal",
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "normal",
 "minWidth": 20,
 "bodyPaddingTop": 0,
 "title": "",
 "bodyPaddingBottom": 0,
 "backgroundColor": [],
 "headerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "closeButtonPressedIconLineWidth": 3,
 "shadow": true,
 "titlePaddingTop": 5,
 "closeButtonBackgroundColor": [],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "overflow": "scroll",
 "footerBackgroundOpacity": 0,
 "closeButtonPressedBackgroundColor": [],
 "headerPaddingRight": 0,
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "shadowSpread": 1,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uid1A74EB1C_089D_FA2B_419F_2524A1E0E855"
 ],
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 20,
 "backgroundOpacity": 1,
 "shadowColor": "#000000",
 "footerHeight": 5,
 "paddingRight": 0,
 "titleFontFamily": "Arial",
 "titleFontStyle": "normal",
 "borderSize": 0,
 "headerPaddingBottom": 5,
 "propagateClick": false,
 "closeButtonIconColor": "#B2B2B2",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "contentOpaque": false,
 "shadowHorizontalLength": 3,
 "scrollBarMargin": 2,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "headerPaddingTop": 10,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "backgroundColorDirection": "vertical",
 "closeButtonBorderRadius": 11,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "layout": "vertical",
 "gap": 10,
 "headerBackgroundOpacity": 0,
 "titleTextDecoration": "none",
 "paddingTop": 0,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 0,
 "closeButtonRollOverBackgroundColor": [],
 "closeButtonIconLineWidth": 2,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "titlePaddingBottom": 5,
 "shadowVerticalLength": 0,
 "scrollBarWidth": 10,
 "closeButtonPressedIconColor": "#FFFFFF",
 "closeButtonIconWidth": 20,
 "data": {
  "name": "Window10653"
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -107.45,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1895EE78_089D_FAEB_41A0_BAE99EB363F6",
 "automaticZoomSpeed": 10
},
{
 "shadowBlurRadius": 6,
 "id": "window_490002D3_5F68_47C0_41D3_92CF9D74666B",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "bodyPaddingRight": 0,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundColorDirection": "vertical",
 "width": 400,
 "class": "Window",
 "shadowOpacity": 0.5,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "bodyBackgroundOpacity": 0,
 "scrollBarOpacity": 0.5,
 "borderRadius": 5,
 "minHeight": 20,
 "modal": true,
 "headerVerticalAlign": "middle",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "backgroundColorRatios": [],
 "titlePaddingLeft": 5,
 "titleFontColor": "#000000",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "verticalAlign": "middle",
 "height": 600,
 "veilColorRatios": [
  0,
  1
 ],
 "titleFontSize": "1.29vmin",
 "veilColorDirection": "horizontal",
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "normal",
 "minWidth": 20,
 "bodyPaddingTop": 0,
 "title": "",
 "bodyPaddingBottom": 0,
 "backgroundColor": [],
 "headerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "closeButtonPressedIconLineWidth": 3,
 "shadow": true,
 "titlePaddingTop": 5,
 "closeButtonBackgroundColor": [],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "overflow": "scroll",
 "footerBackgroundOpacity": 0,
 "closeButtonPressedBackgroundColor": [],
 "headerPaddingRight": 0,
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "shadowSpread": 1,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.container_1A7D6B1C_089D_FA2B_4193_306AF85E26D3"
 ],
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 20,
 "backgroundOpacity": 1,
 "shadowColor": "#000000",
 "footerHeight": 5,
 "paddingRight": 0,
 "titleFontFamily": "Arial",
 "titleFontStyle": "normal",
 "borderSize": 0,
 "headerPaddingBottom": 5,
 "propagateClick": false,
 "closeButtonIconColor": "#B2B2B2",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "contentOpaque": false,
 "shadowHorizontalLength": 3,
 "scrollBarMargin": 2,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "headerPaddingTop": 10,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "backgroundColorDirection": "vertical",
 "closeButtonBorderRadius": 11,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "layout": "vertical",
 "gap": 10,
 "headerBackgroundOpacity": 0,
 "titleTextDecoration": "none",
 "paddingTop": 0,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 0,
 "closeButtonRollOverBackgroundColor": [],
 "closeButtonIconLineWidth": 2,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "titlePaddingBottom": 5,
 "shadowVerticalLength": 0,
 "scrollBarWidth": 10,
 "closeButtonPressedIconColor": "#FFFFFF",
 "closeButtonIconWidth": 20,
 "data": {
  "name": "Window8031"
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 98.72,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1A6FBD8A_089D_FE2E_419A_90EF9AAD9478",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -177.38,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_19A82C8A_089D_FE2F_4198_C36638D0A6C6",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -64.82,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1A527D69_089D_FEED_419F_393B7ACB6D22",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -178.43,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_0724FBE5_089D_FA1A_4156_A37593854DBC",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_4ED61615_6DCC_71D0_417C_348BC20174DA",
 "thumbnailUrl": "media/panorama_4ED61615_6DCC_71D0_417C_348BC20174DA_t.jpg",
 "label": "R5",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_4ED61615_6DCC_71D0_417C_348BC20174DA_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4ED61615_6DCC_71D0_417C_348BC20174DA_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4ED61615_6DCC_71D0_417C_348BC20174DA_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4ED61615_6DCC_71D0_417C_348BC20174DA_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_4ED61615_6DCC_71D0_417C_348BC20174DA_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4ED61615_6DCC_71D0_417C_348BC20174DA_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4ED61615_6DCC_71D0_417C_348BC20174DA_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4ED61615_6DCC_71D0_417C_348BC20174DA_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_4ED61615_6DCC_71D0_417C_348BC20174DA_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4ED61615_6DCC_71D0_417C_348BC20174DA_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4ED61615_6DCC_71D0_417C_348BC20174DA_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4ED61615_6DCC_71D0_417C_348BC20174DA_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_4ED61615_6DCC_71D0_417C_348BC20174DA_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4ED61615_6DCC_71D0_417C_348BC20174DA_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4ED61615_6DCC_71D0_417C_348BC20174DA_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4ED61615_6DCC_71D0_417C_348BC20174DA_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_4ED61615_6DCC_71D0_417C_348BC20174DA_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4ED61615_6DCC_71D0_417C_348BC20174DA_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4ED61615_6DCC_71D0_417C_348BC20174DA_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4ED61615_6DCC_71D0_417C_348BC20174DA_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_4ED61615_6DCC_71D0_417C_348BC20174DA_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4ED61615_6DCC_71D0_417C_348BC20174DA_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4ED61615_6DCC_71D0_417C_348BC20174DA_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4ED61615_6DCC_71D0_417C_348BC20174DA_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_4ED61615_6DCC_71D0_417C_348BC20174DA_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_4ED63615_6DCC_71D0_41D5_CD9E44B83FF5"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -93.72,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1ADE0D19_089D_FE2D_41A1_263A4936602B",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -82.6,
   "backwardYaw": 6,
   "distance": 1,
   "panorama": "this.panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_635FE1E8_6CFC_3270_41C2_F8189A455420"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26",
 "thumbnailUrl": "media/panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26_t.jpg",
 "label": "SFL6",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_7861FC38_6CC4_71D0_41CE_A04852AA4192",
  "this.overlay_6E106730_7D49_FCC9_41C1_D6919803016C"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_18DDBC37_089D_FE65_4185_08C40E626698",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_635B0BD3_6CFC_3650_41D7_396302800D07_camera",
 "automaticZoomSpeed": 10
},
{
 "duration": 5000,
 "label": "Highland Brochure Update (10)_page-0028",
 "id": "photo_1990C050_39BA_FCC7_41B9_DF823B8972C2",
 "thumbnailUrl": "media/photo_1990C050_39BA_FCC7_41B9_DF823B8972C2_t.jpg",
 "width": 3900,
 "image": {
  "levels": [
   {
    "url": "media/photo_1990C050_39BA_FCC7_41B9_DF823B8972C2.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 5400
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 38.93,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1ACD4D29_089D_FE6D_4166_47515FED8F8F",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -176.61,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_195AFCCA_089D_FE2E_419C_2A6D0FE046C7",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 50.23,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1BA81DA4_089D_FE1A_419F_F9D7C393EA5C",
 "automaticZoomSpeed": 10
},
{
 "autoplay": true,
 "audio": {
  "mp3Url": "media/audio_1C0988C6_3AAA_6DCA_41CA_27BB129733CE.mp3",
  "class": "AudioResource",
  "oggUrl": "media/audio_1C0988C6_3AAA_6DCA_41CA_27BB129733CE.ogg"
 },
 "class": "MediaAudio",
 "id": "audio_1C0988C6_3AAA_6DCA_41CA_27BB129733CE",
 "data": {
  "label": "ES_Astral Roar - Lama House"
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_6F92A178_7CE7_987B_41DA_ED8733B68935_camera",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 1.05,
   "backwardYaw": 175.66,
   "distance": 1,
   "panorama": "this.panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38",
 "thumbnailUrl": "media/panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38_t.jpg",
 "label": "T1",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_22F5D476_3E32_EECE_419B_06112C9C665E",
  "this.overlay_25849974_3E36_E6B5_41BE_07A6C82BACA4"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 6.22,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_07076E29_089D_FA6D_416B_D061F6D37739",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 92.89,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_18F2BC45_089D_FE25_4198_75AFE57C03C8",
 "automaticZoomSpeed": 10
},
{
 "duration": 5000,
 "label": "Highland Brochure Update (10)_page-0030",
 "id": "photo_19D207FF_39BA_E3B9_41A4_10FFF127B4E4",
 "thumbnailUrl": "media/photo_19D207FF_39BA_E3B9_41A4_10FFF127B4E4_t.jpg",
 "width": 3900,
 "image": {
  "levels": [
   {
    "url": "media/photo_19D207FF_39BA_E3B9_41A4_10FFF127B4E4.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 5400
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -78.7,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1A828CFA_089D_FFEE_418E_AF31BA007A75",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_4270CB46_6CCC_17B0_419B_ED875A3A3C07_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1B7A4DDF_089D_FE26_4193_58B26D4D5824",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 68.32,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1B5EEDD9_089D_FE2D_4160_A67CC414DB8C",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_camera",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2",
 "thumbnailUrl": "media/panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2_t.jpg",
 "label": "T10",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_65603CAB_7D6D_889D_41DE_D9DE97164841",
  "this.overlay_C4374B09_CAD1_E6F6_41E7_955B3D268A30"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -177.14,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1BE34DBC_089D_FE6B_4186_9F1667966653",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -21.74,
   "backwardYaw": 123.96,
   "distance": 1,
   "panorama": "this.panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 41.91,
   "backwardYaw": 139.04,
   "distance": 1,
   "panorama": "this.panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -21.74,
   "backwardYaw": 139.04,
   "distance": 1,
   "panorama": "this.panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE",
 "thumbnailUrl": "media/panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_t.jpg",
 "label": "T7",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6964F46F_7D6B_9F94_41D3_D7CA169DB6E7",
  "this.overlay_6964E46F_7D6B_9F94_41D5_5D52C36C7733",
  "this.overlay_89937C7F_86CE_780A_41D0_A9D771F40E68"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 157.25,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1BFCCB46_089D_FA27_4193_EA949E4B5B39",
 "automaticZoomSpeed": 10
},
{
 "class": "PlayList",
 "id": "playList_1B81BB2F_089D_FA66_4168_7C3FE9E782F6",
 "items": [
  {
   "begin": "this.MainViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_1B4CB28F_39BA_5C59_41C4_A42B91702CC9",
   "class": "MapPlayListItem",
   "player": "this.MainViewerMapPlayer"
  }
 ]
},
{
 "duration": 5000,
 "label": "Mini Theatre 1",
 "id": "photo_D7FFFD87_C635_6C55_41E2_EF94BC73E601",
 "thumbnailUrl": "media/photo_D7FFFD87_C635_6C55_41E2_EF94BC73E601_t.png",
 "width": 1440,
 "image": {
  "levels": [
   {
    "url": "media/photo_D7FFFD87_C635_6C55_41E2_EF94BC73E601.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 959
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61",
 "thumbnailUrl": "media/panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61_t.jpg",
 "label": "T9_1",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_68A0E10A_7D65_999C_41C0_82875F19B0D8",
  "this.overlay_8457FA62_8BB5_CAEA_41AC_F91A5AF44148"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 31.14,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_188D1C1A_089D_FE2F_4190_02137EEF867A",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -140.46,
   "backwardYaw": 3.39,
   "distance": 1,
   "panorama": "this.panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -36.33,
   "backwardYaw": 59.64,
   "distance": 1,
   "panorama": "this.panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 35.76,
   "backwardYaw": 165.25,
   "distance": 1,
   "panorama": "this.panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2",
 "thumbnailUrl": "media/panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_t.jpg",
 "label": "SFL3",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_7FF9405B_6CC4_1250_41DB_36C7A422FFA1",
  "this.overlay_5DF52BB0_6F44_16D0_41CA_B591EAEBAF92",
  "this.overlay_3CD88833_6FC4_11D1_41B5_4D8D26C97D3B"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_96CA7F23_8732_383B_41DF_3051F30EE69B_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_18A08C2A_089D_FE6F_4187_677DA903F3C6",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_07737BFE_089D_F9E7_419C_37851DD18B3A",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 14.38,
   "backwardYaw": 15.89,
   "distance": 1,
   "panorama": "this.panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45",
 "thumbnailUrl": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_t.jpg",
 "label": "01pP7",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_2E46D6A1_3E32_2AC6_41B7_F135E49D9321",
  "this.overlay_9A4A110E_895E_080A_41E0_3CDFC0D2A5D8",
  "this.overlay_9BA81483_895E_08FA_41D1_346846E4C199",
  "this.overlay_9BC1DDCD_895E_180E_41D8_7AE419A16EDD"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 49.72,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1B09AB5B_089D_FA2D_419E_4DD929281F03",
 "automaticZoomSpeed": 10
},
{
 "class": "PlayList",
 "id": "playList_1B81EB2F_089D_FA66_4197_9F4D39058C17",
 "items": [
  {
   "begin": "this.MainViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_1B9EDF2A_39BA_A45B_41B1_9372F6FCF0F6",
   "class": "MapPlayListItem",
   "player": "this.MainViewerMapPlayer"
  }
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -174.34,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_199EBC85_089D_FE1A_41A0_900BB09BCCA7",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_49E02255_44D0_90A3_41BF_327058418A88"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_96CA7F23_8732_383B_41DF_3051F30EE69B",
 "thumbnailUrl": "media/panorama_96CA7F23_8732_383B_41DF_3051F30EE69B_t.jpg",
 "label": "R7",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_96CA7F23_8732_383B_41DF_3051F30EE69B_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_96CA7F23_8732_383B_41DF_3051F30EE69B_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_96CA7F23_8732_383B_41DF_3051F30EE69B_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_96CA7F23_8732_383B_41DF_3051F30EE69B_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_96CA7F23_8732_383B_41DF_3051F30EE69B_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_96CA7F23_8732_383B_41DF_3051F30EE69B_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_96CA7F23_8732_383B_41DF_3051F30EE69B_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_96CA7F23_8732_383B_41DF_3051F30EE69B_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_96CA7F23_8732_383B_41DF_3051F30EE69B_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_96CA7F23_8732_383B_41DF_3051F30EE69B_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_96CA7F23_8732_383B_41DF_3051F30EE69B_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_96CA7F23_8732_383B_41DF_3051F30EE69B_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_96CA7F23_8732_383B_41DF_3051F30EE69B_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_96CA7F23_8732_383B_41DF_3051F30EE69B_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_96CA7F23_8732_383B_41DF_3051F30EE69B_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_96CA7F23_8732_383B_41DF_3051F30EE69B_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_96CA7F23_8732_383B_41DF_3051F30EE69B_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_96CA7F23_8732_383B_41DF_3051F30EE69B_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_96CA7F23_8732_383B_41DF_3051F30EE69B_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_96CA7F23_8732_383B_41DF_3051F30EE69B_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_96CA7F23_8732_383B_41DF_3051F30EE69B_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_96CA7F23_8732_383B_41DF_3051F30EE69B_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_96CA7F23_8732_383B_41DF_3051F30EE69B_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_96CA7F23_8732_383B_41DF_3051F30EE69B_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_96CA7F23_8732_383B_41DF_3051F30EE69B_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_96CBAF23_8732_383B_41E0_9FF6AFBC5DF3"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 171.07,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_18363C5E_089D_FE26_4192_ED557A7242B7",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 30.52,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_180AAC4A_089D_FE2F_4194_3EBE0A5298FB",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2",
 "thumbnailUrl": "media/panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2_t.jpg",
 "label": "R6",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_4F1C9613_6DC7_F1D1_41D0_542B876CD3AA"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 143.67,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1BE2EB4C_089D_FA2A_4189_15AA25D281F3",
 "automaticZoomSpeed": 10
},
{
 "duration": 5000,
 "label": "R-Bed2-2",
 "id": "photo_AD2740FC_A2B4_3B58_41D9_5A9AC4903976",
 "thumbnailUrl": "media/photo_AD2740FC_A2B4_3B58_41D9_5A9AC4903976_t.png",
 "width": 3840,
 "image": {
  "levels": [
   {
    "url": "media/photo_AD2740FC_A2B4_3B58_41D9_5A9AC4903976.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 2557
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1A06CD49_089D_FE2D_4197_0119A6B7FC01",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_1BF47DB9_089D_FE6D_415C_DE8CBEE98867",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 5.66,
   "backwardYaw": 115.18,
   "distance": 1,
   "panorama": "this.panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 163.15,
   "backwardYaw": -25.3,
   "distance": 1,
   "panorama": "this.panorama_5CFFE1DC_6CCC_1250_41C5_0D1AFA7842DF"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_427426C9_6CCC_1EB0_41D3_EDA93E539BC0",
 "thumbnailUrl": "media/panorama_427426C9_6CCC_1EB0_41D3_EDA93E539BC0_t.jpg",
 "label": "bed2panPanorama_1",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_427426C9_6CCC_1EB0_41D3_EDA93E539BC0_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_427426C9_6CCC_1EB0_41D3_EDA93E539BC0_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_427426C9_6CCC_1EB0_41D3_EDA93E539BC0_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_427426C9_6CCC_1EB0_41D3_EDA93E539BC0_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_427426C9_6CCC_1EB0_41D3_EDA93E539BC0_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_427426C9_6CCC_1EB0_41D3_EDA93E539BC0_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_427426C9_6CCC_1EB0_41D3_EDA93E539BC0_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_427426C9_6CCC_1EB0_41D3_EDA93E539BC0_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_427426C9_6CCC_1EB0_41D3_EDA93E539BC0_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_427426C9_6CCC_1EB0_41D3_EDA93E539BC0_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_427426C9_6CCC_1EB0_41D3_EDA93E539BC0_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_427426C9_6CCC_1EB0_41D3_EDA93E539BC0_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_427426C9_6CCC_1EB0_41D3_EDA93E539BC0_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_427426C9_6CCC_1EB0_41D3_EDA93E539BC0_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_427426C9_6CCC_1EB0_41D3_EDA93E539BC0_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_427426C9_6CCC_1EB0_41D3_EDA93E539BC0_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_427426C9_6CCC_1EB0_41D3_EDA93E539BC0_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_427426C9_6CCC_1EB0_41D3_EDA93E539BC0_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_427426C9_6CCC_1EB0_41D3_EDA93E539BC0_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_574024F4_6F7C_1250_41C6_B67CC4997B19",
  "this.overlay_57E90C77_6F7C_1251_41B1_0699A0D89C26"
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_19A74C8A_089D_FE2F_419D_44AACF87C4B9",
 "automaticZoomSpeed": 10
},
{
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "id": "MainViewer",
 "left": 0,
 "toolTipPaddingTop": 4,
 "paddingLeft": 0,
 "progressBorderRadius": 0,
 "toolTipPaddingLeft": 6,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "class": "ViewerArea",
 "toolTipDisplayTime": 3000,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarLeft": 0,
 "width": "100%",
 "borderRadius": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "minHeight": 50,
 "toolTipBorderRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadHeight": 15,
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 5,
 "minWidth": 100,
 "playbackBarHeadOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipOpacity": 1,
 "toolTipFontSize": "1.11vmin",
 "height": "100%",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "shadow": false,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "transitionMode": "blending",
 "toolTipShadowHorizontalLength": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "paddingRight": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "borderSize": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipShadowOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "top": 0,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "vrPointerSelectionTime": 2100,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "paddingTop": 0,
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "toolTipFontColor": "#606060",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "paddingBottom": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionDuration": 500,
 "progressBorderSize": 0,
 "data": {
  "name": "Main Viewer"
 }
},
{
 "children": [
  "this.Image_2B2DF9ED_3967_AFD9_41A0_E462C1703BD2",
  "this.Image_28EA1E13_3959_A449_41C6_24AF6374E0B2",
  "this.Image_28861083_395B_FC49_41C8_2CA278CB7B24",
  "this.Image_2B0C39FD_395A_EFB9_41C4_0108835DE30F"
 ],
 "id": "Container_2840E875_39A6_6CCE_41C4_76EB85CA5A97",
 "left": "0%",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "borderSize": 0,
 "creationPolicy": "inAdvance",
 "width": "100%",
 "borderRadius": 0,
 "minHeight": 1,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "bottom": "0.55%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "middle",
 "layout": "horizontal",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 10,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "Container6631"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "height": "5.408%"
},
{
 "maxHeight": 980,
 "id": "Image_4E993B15_5F78_4640_41A5_D352D29A5E3A",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scaleMode": "fit_inside",
 "paddingRight": 0,
 "right": "1.69%",
 "width": "3.86%",
 "class": "Image",
 "url": "skin/Image_4E993B15_5F78_4640_41A5_D352D29A5E3A.jpg",
 "borderRadius": 0,
 "propagateClick": false,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "middle",
 "bottom": "9.92%",
 "minWidth": 1,
 "click": "this.showPopupMedia(this.window_490002D3_5F68_47C0_41D3_92CF9D74666B, this.album_4C459947_5F77_C2C1_41CF_68E94C9899D0, this.playList_05204983_0894_461D_41A0_E205846F8AB1, '90%', '90%', false, false)",
 "paddingTop": 0,
 "height": "6.615%",
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "Image4447"
 },
 "maxWidth": 980
},
{
 "maxHeight": 1000,
 "id": "Image_50BE751D_5F78_C240_41CF_F7660E60F989",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scaleMode": "fit_inside",
 "paddingRight": 0,
 "right": "1.81%",
 "width": "3.619%",
 "class": "Image",
 "url": "skin/Image_50BE751D_5F78_C240_41CF_F7660E60F989.png",
 "borderRadius": 0,
 "propagateClick": false,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "middle",
 "bottom": "18.74%",
 "minWidth": 1,
 "click": "this.showPopupMedia(this.window_497EF4FF_5F68_C3C1_41C5_B5D9F040CA16, this.video_4BEEC1C2_5F78_45C3_4193_05A623EF9341, this.playList_0553A994_0894_463B_4191_19BF9C9D14A2, '100%', '100%', true, true)",
 "paddingTop": 0,
 "height": "7.613%",
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "Image4498"
 },
 "maxWidth": 1000
},
{
 "maxHeight": 360,
 "id": "Image_4E7CE695_5F78_CE41_41D4_627F11EC2B25",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scaleMode": "fit_inside",
 "paddingRight": 0,
 "right": "1.81%",
 "width": "3.679%",
 "class": "Image",
 "url": "skin/Image_4E7CE695_5F78_CE41_41D4_627F11EC2B25.jpg",
 "borderRadius": 0,
 "propagateClick": false,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "middle",
 "bottom": "28.46%",
 "minWidth": 1,
 "click": "this.openLink('files/file_47A4AF27_5F69_BE40_41CC_366C27EF93FA.pdf', '_blank')",
 "paddingTop": 0,
 "height": "7.723%",
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "Image4647"
 },
 "cursor": "hand",
 "maxWidth": 360
},
{
 "maxHeight": 406,
 "id": "Image_061C9D51_0894_5E3D_4195_3FD9D1331D66",
 "left": "45.42%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scaleMode": "fit_inside",
 "paddingRight": 0,
 "width": "8.263%",
 "class": "Image",
 "url": "skin/Image_061C9D51_0894_5E3D_4195_3FD9D1331D66.png",
 "borderRadius": 0,
 "propagateClick": false,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "middle",
 "bottom": "7.39%",
 "minWidth": 1,
 "paddingTop": 0,
 "height": "15.546%",
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "Image2272"
 },
 "maxWidth": 2698
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.85,
   "image": "this.AnimatedImageResource_77B97AD3_6CC4_1650_41D2_7604C0BF3E16",
   "yaw": -11.95,
   "pitch": -2.62,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_74D7D9C0_6CC4_12AF_41CD_E48A44ADCCB8",
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 39)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.85,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -11.95,
   "image": {
    "levels": [
     {
      "url": "media/panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.62
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.44,
   "image": "this.AnimatedImageResource_3D4F820D_6FC4_11B0_41C1_3510ABE8E966",
   "yaw": 15.67,
   "pitch": -14.43,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_75F1E02A_6CC4_11F3_41D0_DB8EE0A7EFEC",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF, this.camera_1B1DAB5B_089D_FA2D_41A0_65CE50BB8694); this.mainPlayList.set('selectedIndex', 36)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 6.44,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 15.67,
   "image": {
    "levels": [
     {
      "url": "media/panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_0_HS_2_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.43
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.31,
   "image": "this.AnimatedImageResource_9184E6D5_8BB7_BA2F_41D1_4F0ECEE33FFD",
   "yaw": 59.64,
   "pitch": -18.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_9E71C4FC_8BB6_7FDD_41C7_7D631E5BF99E",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2, this.camera_1BE2EB4C_089D_FA2A_4189_15AA25D281F3); this.mainPlayList.set('selectedIndex', 34)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 6.31,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 59.64,
   "image": {
    "levels": [
     {
      "url": "media/panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_0_HS_3_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.45
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.88,
   "image": "this.AnimatedImageResource_69359F0E_7CE6_8994_41DE_C7613A13AB64",
   "yaw": 1.32,
   "pitch": -4.65,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_68C77D10_7CEA_898B_41B7_4D31B57688A2",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD, this.camera_07076E29_089D_FA6D_416B_D061F6D37739); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 7.88,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 1.32,
   "image": {
    "levels": [
     {
      "url": "media/panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.65
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.85,
   "image": "this.AnimatedImageResource_6935FF0F_7CE6_8995_41BE_EB018D5F79B8",
   "yaw": -83.09,
   "pitch": -6.91,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_68C7BD10_7CEA_898B_41D8_8023B111A4DB",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D, this.camera_073E8E34_089D_FA7A_4193_F439D6255DE9); this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 7.85,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -83.09,
   "image": {
    "levels": [
     {
      "url": "media/panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_1_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.91
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 17.25,
   "image": "this.AnimatedImageResource_66C1FBCA_7D66_889F_41D1_1AC9500D5044",
   "yaw": -170.21,
   "pitch": -11.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_68D47989_7CFE_889D_41D6_A4C6B419008C",
 "data": {
  "label": "Circle Arrow 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C, this.camera_07022E29_089D_FA6D_4181_09EF0C154212); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 17.25,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -170.21,
   "image": {
    "levels": [
     {
      "url": "media/panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.11
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.59,
   "image": "this.AnimatedImageResource_19A34D6E_39E6_64DA_41CB_739C0940F8B3",
   "yaw": 168.68,
   "pitch": -16.24,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_20AC08F3_39FE_ADC9_4184_4CCB90E77C41",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B, this.camera_1BE34DBC_089D_FE6B_4186_9F1667966653); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View"
  }
 ],
 "maps": [
  {
   "hfov": 7.59,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 168.68,
   "image": {
    "levels": [
     {
      "url": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_0_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.24
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.6,
   "image": "this.AnimatedImageResource_19A39D6E_39E6_64DB_41A8_C90929B18B85",
   "yaw": -148.86,
   "pitch": -15.99,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_20D9B807_39FB_AC49_41C9_A558F044D31B",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0, this.camera_1B30ADC9_089D_FE2D_4188_8E934B4F0BC0); this.mainPlayList.set('selectedIndex', 12); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View"
  }
 ],
 "maps": [
  {
   "hfov": 7.6,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -148.86,
   "image": {
    "levels": [
     {
      "url": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_0_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.99
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.45,
   "image": "this.AnimatedImageResource_66F77BD2_7D66_888F_41D6_135770E88BD0",
   "yaw": 20.95,
   "pitch": -35.32,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_69D5340A_7D6E_FF9F_41DA_5F3F0860A930",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61, this.camera_1BF47DB9_089D_FE6D_415C_DE8CBEE98867); this.mainPlayList.set('selectedIndex', 51)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View"
  }
 ],
 "maps": [
  {
   "hfov": 6.45,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 20.95,
   "image": {
    "levels": [
     {
      "url": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_0_HS_3_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -35.32
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.08,
   "image": "this.AnimatedImageResource_66F7EBD2_7D66_888F_41D2_62C783E95400",
   "yaw": -72,
   "pitch": -26.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_682E5B89_7D6E_889D_41D4_C67341FC9A56",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2, this.camera_1B018DC9_089D_FE2D_4199_23041DCC1A89); this.mainPlayList.set('selectedIndex', 52)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View"
  }
 ],
 "maps": [
  {
   "hfov": 7.08,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -72,
   "image": {
    "levels": [
     {
      "url": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_0_HS_4_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -26.53
  }
 ]
},
{
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_4DEC725F_43B1_2B53_4163_4E5C1F47F79B.mp4"
 },
 "hfov": 42.2,
 "id": "overlay_59BD2B63_44D3_9767_41CA_A1ACCB6DDF72",
 "enabledInCardboard": true,
 "autoplay": false,
 "image": {
  "levels": [
   {
    "url": "media/overlay_59BD2B63_44D3_9767_41CA_A1ACCB6DDF72_t.jpg",
    "width": 1920,
    "class": "ImageResourceLevel",
    "height": 1080
   }
  ],
  "class": "ImageResource"
 },
 "pitch": 7.81,
 "useHandCursor": true,
 "yaw": -5.99,
 "rotationY": -4.73,
 "loop": false,
 "click": "if(this.overlay_59BD2B63_44D3_9767_41CA_A1ACCB6DDF72.get('state') != 'playing'){ this.overlay_59BD2B63_44D3_9767_41CA_A1ACCB6DDF72.play(); } else { this.overlay_59BD2B63_44D3_9767_41CA_A1ACCB6DDF72.stop(); }",
 "videoVisibleOnStop": false,
 "class": "VideoPanoramaOverlay",
 "rotationX": -7.81,
 "vfov": 25.49,
 "blending": 0,
 "distance": 50,
 "roll": 0.36,
 "stateChange": "if(this.overlay_59BD2B63_44D3_9767_41CA_A1ACCB6DDF72.get('state') == 'playing'){ this.pauseGlobalAudios('overlay_59BD2B63_44D3_9767_41CA_A1ACCB6DDF72', [this.overlay_59BD2B63_44D3_9767_41CA_A1ACCB6DDF72]); } else { this.resumeGlobalAudios('overlay_59BD2B63_44D3_9767_41CA_A1ACCB6DDF72'); }",
 "data": {
  "label": "Video"
 }
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.5,
   "image": "this.AnimatedImageResource_61627F36_44D1_F0E1_41CE_9B99E1CC970F",
   "yaw": -37.89,
   "pitch": -18.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_58679B3D_44D0_90E3_41CD_07170F93A693",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.setCameraSameSpotAsMedia(this.camera_1A235D69_089D_FEED_415D_25BF22FE30E0, this.panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69); this.startPanoramaWithCamera(this.panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980, this.camera_1A235D69_089D_FEED_415D_25BF22FE30E0); this.mainPlayList.set('selectedIndex', 29)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 7.5,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -37.89,
   "image": {
    "levels": [
     {
      "url": "media/panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69_0_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.53
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.28,
   "image": "this.AnimatedImageResource_19AE3D6D_39E6_64D9_41BD_8844DE8B04B4",
   "yaw": 20.91,
   "pitch": -23.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2FF4CCAD_39EA_6459_41C3_8BF7E1C9EF48",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7, this.camera_1965DCDA_089D_FE2E_4187_46108FC633D3); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 7.28,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 20.91,
   "image": {
    "levels": [
     {
      "url": "media/panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_0_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.05
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.29,
   "image": "this.AnimatedImageResource_240EDB2C_39D9_AC5F_4189_E5E07EF301C6",
   "yaw": 141.99,
   "pitch": -37.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_24544195_39DA_5C49_41B0_D40D8E826608",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0, this.camera_1A828CFA_089D_FFEE_418E_AF31BA007A75); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 6.29,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 141.99,
   "image": {
    "levels": [
     {
      "url": "media/panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_0_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -37.37
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 2.85,
   "image": "this.AnimatedImageResource_737A92E6_6D44_7670_41B2_C061D8592794",
   "yaw": -4.47,
   "pitch": -78.63,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7786BFDA_6D44_0E50_41D0_48E2B0B97B29",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7, this.camera_1A937CF6_089D_FFE7_4197_37719A40667C); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 2.85,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -4.47,
   "image": {
    "levels": [
     {
      "url": "media/panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_0_HS_2_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -78.63
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.86,
   "image": "this.AnimatedImageResource_66DD9A6E_7D5E_8B94_41D4_A4E2D0DD7FA9",
   "yaw": 15.7,
   "pitch": -6.7,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_71E10A9C_7CB9_D3C0_41CD_822F7D5C0DB6",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_68C70D10_7CEA_898B_41B4_72F949ECE365, this.camera_1BC50DA9_089D_FE6D_4192_F64B919660D8); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "go to next view."
  }
 ],
 "maps": [
  {
   "hfov": 7.86,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 15.7,
   "image": {
    "levels": [
     {
      "url": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_0_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.7
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.79,
   "image": "this.AnimatedImageResource_5003D8C9_44D0_F1A3_41CE_56276D6DB7CA",
   "yaw": -67.83,
   "pitch": -1.07,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_4B9F1E54_44D1_70A1_41AD_E876A587411E",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.setCameraSameSpotAsMedia(this.camera_0761FE6B_089D_FAED_41A0_4039CAFB40AF, this.panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3); this.startPanoramaWithCamera(this.panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980, this.camera_0761FE6B_089D_FAED_41A0_4039CAFB40AF); this.mainPlayList.set('selectedIndex', 29)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 8.79,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -67.83,
   "image": {
    "levels": [
     {
      "url": "media/panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.07
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.72,
   "image": "this.AnimatedImageResource_500378C9_44D0_F1A3_41B9_182DE7622644",
   "yaw": 2.82,
   "pitch": -12.5,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_4BFCD7CA_44DF_7FA1_41BF_07E22B879EB3",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.setCameraSameSpotAsMedia(this.camera_189A2E78_089D_FAEB_4194_ADC537E5A697, this.panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3); this.startPanoramaWithCamera(this.panorama_49E02255_44D0_90A3_41BF_327058418A88, this.camera_189A2E78_089D_FAEB_4194_ADC537E5A697); this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 7.72,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 2.82,
   "image": {
    "levels": [
     {
      "url": "media/panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3_1_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.5
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.74,
   "image": "this.AnimatedImageResource_41D81D4B_6D44_13B0_4168_C10199432DFB",
   "yaw": -66.66,
   "pitch": -5.93,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_4AA23E0B_6D44_11B0_416B_A968B902280F",
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_41112B09_6D3C_17B0_41DB_371D557B428F, this.camera_1B4B0DDF_089D_FE26_4130_F95734342A7A); this.mainPlayList.set('selectedIndex', 41)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 8.74,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -66.66,
   "image": {
    "levels": [
     {
      "url": "media/panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.93
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 11.93,
   "image": "this.AnimatedImageResource_453A845D_6D4D_F250_41D1_17532C5F205A",
   "yaw": 170.77,
   "pitch": -29.33,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_4AA22E0B_6D44_11B0_41C2_FA044E1CB6FF",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 11.93,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 170.77,
   "image": {
    "levels": [
     {
      "url": "media/panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0_0_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -29.33
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.58,
   "image": "this.AnimatedImageResource_6AC76F12_7CE6_898C_41CB_73FAB63CFC34",
   "yaw": -8.93,
   "pitch": -16.49,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6F92C178_7CE7_987B_41B9_DA31AF26E56F",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D, this.camera_1AE98D39_089D_FE6D_418E_7158653F1D59); this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View"
  }
 ],
 "maps": [
  {
   "hfov": 7.58,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -8.93,
   "image": {
    "levels": [
     {
      "url": "media/panorama_6F92A178_7CE7_987B_41DA_ED8733B68935_1_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.49
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.6,
   "image": "this.AnimatedImageResource_66CBBBD1_7D66_888D_41C5_6522E29F93C2",
   "yaw": 139.04,
   "pitch": -15.99,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_697B8393_7D6B_988D_41D7_DF2C4AF2A7E8",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE, this.camera_1BBADD99_089D_FE2D_4161_29291D05DABA); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View"
  }
 ],
 "maps": [
  {
   "hfov": 7.6,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 139.04,
   "image": {
    "levels": [
     {
      "url": "media/panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.99
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.01,
   "image": "this.AnimatedImageResource_66CBDBD1_7D66_888D_41D3_A9786679D8AC",
   "yaw": -170.98,
   "pitch": -27.55,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_697BB393_7D6B_988D_41DE_F027B8B40045",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C, this.camera_1B8C0D8A_089D_FE2E_41A0_209C7F61A7A6); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View"
  }
 ],
 "maps": [
  {
   "hfov": 7.01,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -170.98,
   "image": {
    "levels": [
     {
      "url": "media/panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_1_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -27.55
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.84,
   "image": "this.AnimatedImageResource_97613ABB_86F2_180A_41D4_9DBEEA30B68C",
   "yaw": 178.48,
   "pitch": -7.7,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_97E9DD0C_86F2_380E_4198_333A40366EE8",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B, this.camera_1BA81DA4_089D_FE1A_419F_F9D7C393EA5C); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View"
  }
 ],
 "maps": [
  {
   "hfov": 7.84,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 178.48,
   "image": {
    "levels": [
     {
      "url": "media/panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_0_HS_2_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.7
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 9.01,
   "image": "this.AnimatedImageResource_54BEC19E_6CC4_12D3_41B6_1643AFA29E81",
   "yaw": -15.13,
   "pitch": -21.25,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5C89BC54_6CC4_3257_41CF_44EBDEB1409D",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_4270CB46_6CCC_17B0_419B_ED875A3A3C07, this.camera_192DFCCA_089D_FE2E_4193_4F152D1614F0); this.mainPlayList.set('selectedIndex', 44)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 9.01,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -15.13,
   "image": {
    "levels": [
     {
      "url": "media/panorama_42749FD9_6CCC_0E50_41D5_D5CD1FCEC452_0_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -21.25
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.86,
   "image": "this.AnimatedImageResource_6AC90F12_7CE6_898F_41B0_A6794FAD1FA4",
   "yaw": 0.61,
   "pitch": -6.44,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6F87BC52_7CE6_8F8F_41C2_10D67CB77491",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D, this.camera_1BF62B4C_089D_FA2A_4193_54DC26F33E59); this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View"
  }
 ],
 "maps": [
  {
   "hfov": 7.86,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0.61,
   "image": {
    "levels": [
     {
      "url": "media/panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.44
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.67,
   "image": "this.AnimatedImageResource_6AC95F12_7CE6_898F_41C2_3F59AC1098E2",
   "yaw": -163.18,
   "pitch": -14.23,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6F87AC52_7CE6_8F8F_41D0_4C044047FB14",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8, this.camera_1BFCCB46_089D_FA27_4193_EA949E4B5B39); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View"
  }
 ],
 "maps": [
  {
   "hfov": 7.67,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -163.18,
   "image": {
    "levels": [
     {
      "url": "media/panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457_1_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.23
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.59,
   "image": "this.AnimatedImageResource_5948A463_6CDD_F270_41C6_6E020FEE7862",
   "yaw": -3.02,
   "pitch": -16.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_40DECAE4_6CC4_1677_41D7_B1E67FEF4A32",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 40)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 7.59,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -3.02,
   "image": {
    "levels": [
     {
      "url": "media/panorama_41112B09_6D3C_17B0_41DB_371D557B428F_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.37
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.27,
   "image": "this.AnimatedImageResource_432FCF00_6CDC_0FB0_41D5_7A8DB1FADBE2",
   "yaw": -78.63,
   "pitch": -23.15,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_400B0A83_6CDC_16B0_41C4_887BF4907FAA",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16, this.camera_07508E58_089D_FA2B_4104_39C84BFC7180); this.mainPlayList.set('selectedIndex', 28)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 7.27,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -78.63,
   "image": {
    "levels": [
     {
      "url": "media/panorama_41112B09_6D3C_17B0_41DB_371D557B428F_0_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.15
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.62,
   "image": "this.AnimatedImageResource_432F1F00_6CDC_0FB0_41D1_56481F04FDAD",
   "yaw": -161.03,
   "pitch": -11.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_4065513C_6CDC_F3D0_41BA_38EBE8862353",
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0, this.camera_07595E4D_089D_FA25_4177_4BADCDE90935); this.mainPlayList.set('selectedIndex', 23)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 8.62,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -161.03,
   "image": {
    "levels": [
     {
      "url": "media/panorama_41112B09_6D3C_17B0_41DB_371D557B428F_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.37
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.48,
   "image": "this.AnimatedImageResource_6CE51DA1_7CB8_D1C0_4192_0DD15EDC3EF6",
   "yaw": -45.16,
   "pitch": -19.03,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_502B7FF9_44F1_8F63_41C5_D1F377179EC7",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.setCameraSameSpotAsMedia(this.camera_1A18BD3E_089D_FE67_4197_65AD9473482C, this.panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711); this.startPanoramaWithCamera(this.panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0, this.camera_1A18BD3E_089D_FE67_4197_65AD9473482C); this.mainPlayList.set('selectedIndex', 23)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 7.48,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -45.16,
   "image": {
    "levels": [
     {
      "url": "media/panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711_0_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.03
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.21,
   "image": "this.AnimatedImageResource_6CE48DA1_7CB8_D1C0_41D6_3A2173A8B604",
   "yaw": -177.05,
   "pitch": -24.31,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_501FFD9E_44F0_B3DE_41CF_0F365A84BBB1",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.setCameraSameSpotAsMedia(this.camera_1A178D49_089D_FE2D_4196_166A02A4E31C, this.panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711); this.startPanoramaWithCamera(this.panorama_49E02255_44D0_90A3_41BF_327058418A88, this.camera_1A178D49_089D_FE2D_4196_166A02A4E31C); this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 7.21,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -177.05,
   "image": {
    "levels": [
     {
      "url": "media/panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711_0_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -24.31
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.5,
   "image": "this.AnimatedImageResource_19AE7D6D_39E6_64D9_41C1_E2DDCD58055D",
   "yaw": -20.04,
   "pitch": -18.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2E7622BA_39EB_DDBB_41C6_CC256C6127D1",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_37243B3A_396E_ACBB_41B2_389D97DC4625, this.camera_074AFE5A_089D_FA2F_419E_512592C0D1CE); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 7.5,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -20.04,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7_0_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.53
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.79,
   "image": "this.AnimatedImageResource_6ACA2F12_7CE6_898F_41D8_4D430AF735B5",
   "yaw": -141.07,
   "pitch": -9.96,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6E4AC1C3_7CE6_988D_41D2_C71D0EA7251A",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F, this.camera_1A6FBD8A_089D_FE2E_419A_90EF9AAD9478); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View"
  }
 ],
 "maps": [
  {
   "hfov": 7.79,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -141.07,
   "image": {
    "levels": [
     {
      "url": "media/panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.96
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.81,
   "image": "this.AnimatedImageResource_6ACAAF12_7CE6_898F_41D3_7F2AC5ACA060",
   "yaw": -22.75,
   "pitch": -8.96,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6E4AE1C3_7CE6_988D_41DE_174924B2E4E8",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457, this.camera_1B9D3D8A_089D_FE2E_4194_F503B89CBF65); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View"
  }
 ],
 "maps": [
  {
   "hfov": 7.81,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -22.75,
   "image": {
    "levels": [
     {
      "url": "media/panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8_1_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.96
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.67,
   "image": "this.AnimatedImageResource_4BC97ED9_6D7C_0E50_41C9_A2680FA1B95A",
   "yaw": -118.08,
   "pitch": -9.61,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_4CD92A7E_6D3C_3653_41B4_444B449E34A7",
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.setCameraSameSpotAsMedia(this.camera_1A06CD49_089D_FE2D_4197_0119A6B7FC01, this.panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16); this.startPanoramaWithCamera(this.panorama_49E02255_44D0_90A3_41BF_327058418A88, this.camera_1A06CD49_089D_FE2D_4197_0119A6B7FC01); this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 8.67,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -118.08,
   "image": {
    "levels": [
     {
      "url": "media/panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.61
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.16,
   "image": "this.AnimatedImageResource_5EF6F9F4_6D44_1250_4185_E58A0C53469C",
   "yaw": 61.56,
   "pitch": -25.16,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_4CD93A7E_6D3C_3653_41BB_986205F870EE",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_41112B09_6D3C_17B0_41DB_371D557B428F, this.camera_1A343D59_089D_FE2D_4192_FED57C32B5F8); this.mainPlayList.set('selectedIndex', 41)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 7.16,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 61.56,
   "image": {
    "levels": [
     {
      "url": "media/panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16_0_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -25.16
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.88,
   "image": "this.AnimatedImageResource_2310B04A_6F3C_11B0_41C7_A8257E7FA90B",
   "yaw": -25.3,
   "pitch": -27.86,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5407A8BA_6F7C_12D0_419F_548969024ECE",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_427426C9_6CCC_1EB0_41D3_EDA93E539BC0, this.camera_19C40CA5_089D_FE65_416E_42C228F39890); this.mainPlayList.set('selectedIndex', 43)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 8.88,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -25.3,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5CFFE1DC_6CCC_1250_41C5_0D1AFA7842DF_0_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -27.86
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.62,
   "image": "this.AnimatedImageResource_640ED899_7D49_F5FA_41CC_21BF89A71D01",
   "yaw": -149.48,
   "pitch": -11.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_781EF110_6CCC_13D0_41D5_AD4667D99D13",
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF, this.camera_193EBCC2_089D_FE1E_4175_22071E696004); this.mainPlayList.set('selectedIndex', 36)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 8.62,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -149.48,
   "image": {
    "levels": [
     {
      "url": "media/panorama_635B0BD3_6CFC_3650_41D7_396302800D07_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.11
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.79,
   "image": "this.AnimatedImageResource_756FE117_67CB_EAF4_41D2_AE5D4466D229",
   "yaw": 72.85,
   "pitch": -0.31,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5FC8D370_44D7_9761_41CB_C0E36063F063",
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.setCameraSameSpotAsMedia(this.camera_1B7A4DDF_089D_FE26_4193_58B26D4D5824, this.panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980); this.startPanoramaWithCamera(this.panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3, this.camera_1B7A4DDF_089D_FE26_4193_58B26D4D5824); this.mainPlayList.set('selectedIndex', 20)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 8.79,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 72.85,
   "image": {
    "levels": [
     {
      "url": "media/panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.31
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.66,
   "image": "this.AnimatedImageResource_61600F35_44D1_F0E3_41C5_725DFB8E2E4E",
   "yaw": -22.8,
   "pitch": -14.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_58FABF98_44D0_8FA1_41C2_524462955A2B",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.setCameraSameSpotAsMedia(this.camera_1B697DE9_089D_F9ED_4190_94A979F2FCBE, this.panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980); this.startPanoramaWithCamera(this.panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF, this.camera_1B697DE9_089D_F9ED_4190_94A979F2FCBE); this.mainPlayList.set('selectedIndex', 30)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 7.66,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -22.8,
   "image": {
    "levels": [
     {
      "url": "media/panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_0_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.51
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.59,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_0_HS_2_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 142
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.01,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": -1.68
  }
 ],
 "id": "overlay_589B8C4D_44D1_70A3_41A1_370AFE000CB7",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 31)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.59,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.68,
   "image": {
    "levels": [
     {
      "url": "media/panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_0_HS_2_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.01
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.96,
   "image": "this.AnimatedImageResource_2E724E20_6F44_31EF_41D1_D45B3CEA56EE",
   "yaw": -75.26,
   "pitch": -26.88,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5CC64D0A_6CC4_13B0_41C9_32B13D0816F5",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_42749FD9_6CCC_0E50_41D5_D5CD1FCEC452, this.camera_1B2FDDD4_089D_FE3A_418A_5CE3F6BA680A); this.mainPlayList.set('selectedIndex', 45)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 8.96,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -75.26,
   "image": {
    "levels": [
     {
      "url": "media/panorama_4270CB46_6CCC_17B0_419B_ED875A3A3C07_0_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -26.88
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.76,
   "image": "this.AnimatedImageResource_6CF72DA7_7CB8_D1C0_41D0_D739D40CA065",
   "yaw": 114.19,
   "pitch": -17.58,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5E78B91F_6CC4_73D0_41C8_23E655F476E5",
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B, this.camera_1B5EEDD9_089D_FE2D_4160_A67CC414DB8C); this.mainPlayList.set('selectedIndex', 33)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 7.76,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 114.19,
   "image": {
    "levels": [
     {
      "url": "media/panorama_4270CB46_6CCC_17B0_419B_ED875A3A3C07_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.58
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.81,
   "image": "this.AnimatedImageResource_2CC4C370_3E2E_6A46_41B0_81A0FCA84164",
   "yaw": -87.11,
   "pitch": -9.17,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2ED68C4E_3E31_FE5A_41CE_37C45690F1E2",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC, this.camera_077DAE6B_089D_FAED_419B_B4B8F9BCD175); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 7.81,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -87.11,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.17
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.87,
   "image": "this.AnimatedImageResource_2CC4A370_3E2E_6A46_41BB_54EB26FE3BDD",
   "yaw": -1.45,
   "pitch": -5.9,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2ED69C4E_3E31_FE5A_41C8_5BC3AFE5829D",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F, this.camera_07779E6B_089D_FAED_4152_2D82A175938A); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 7.87,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.45,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_1_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.9
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.81,
   "image": "this.AnimatedImageResource_2CC46370_3E2E_6A46_41A3_DA1C24435F2E",
   "yaw": -173.78,
   "pitch": -9.17,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2ED6AC4E_3E31_FE5A_419D_ADCFEADC4FEC",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_68C70D10_7CEA_898B_41B4_72F949ECE365, this.camera_07431E63_089D_FA1E_4195_4AC5C013695D); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 7.81,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -173.78,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_1_HS_2_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.17
  }
 ]
},
{
 "viewerArea": "this.viewer_uid1A74EB1C_089D_FA2B_419F_2524A1E0E855",
 "class": "VideoPlayer",
 "id": "viewer_uid1A74EB1C_089D_FA2B_419F_2524A1E0E855VideoPlayer",
 "displayPlaybackBar": true
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.3,
   "image": "this.AnimatedImageResource_605B0BA0_7DA5_888B_417D_0C787496DDFC",
   "yaw": 3.39,
   "pitch": -22.67,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_64F3E5BB_7DA5_98FD_41C0_8903AA1016F6",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2, this.camera_18719C75_089D_FEFA_4181_45BDA1A45DA6); this.mainPlayList.set('selectedIndex', 34)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 7.3,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 3.39,
   "image": {
    "levels": [
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_1_HS_3_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -22.67
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 17.64,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0_HS_5_0.png",
      "width": 411,
      "class": "ImageResourceLevel",
      "height": 388
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.75,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 115.18
  }
 ],
 "id": "overlay_C4765BB5_CAA9_B861_41D9_4E1B33630165",
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_427426C9_6CCC_1EB0_41D3_EDA93E539BC0, this.camera_199EBC85_089D_FE1A_41A0_900BB09BCCA7); this.mainPlayList.set('selectedIndex', 43)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 17.64,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 115.18,
   "image": {
    "levels": [
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.75
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 18,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0_HS_6_0.png",
      "width": 411,
      "class": "ImageResourceLevel",
      "height": 388
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.69,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": -157.67
  }
 ],
 "id": "overlay_D8B13169_CAA8_A8E0_41B0_1D078CF16A33",
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4, this.camera_186F3C7A_089D_FEEF_4199_ECF04F5F9B96); this.mainPlayList.set('selectedIndex', 48)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 18,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -157.67,
   "image": {
    "levels": [
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0_HS_6_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.69
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 17.67,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0_HS_7_0.png",
      "width": 411,
      "class": "ImageResourceLevel",
      "height": 388
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.98,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": -111.68
  }
 ],
 "id": "overlay_DB3075BA_CAAB_6860_41E9_2D01175A41B0",
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_4270CB46_6CCC_17B0_419B_ED875A3A3C07, this.camera_18425C6B_089D_FEEE_4133_23E0DEB88AC6); this.mainPlayList.set('selectedIndex', 44)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 17.67,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -111.68,
   "image": {
    "levels": [
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0_HS_7_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.98
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 17.62,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0_HS_8_0.png",
      "width": 411,
      "class": "ImageResourceLevel",
      "height": 388
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.73,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 83.02
  }
 ],
 "id": "overlay_DA0EB733_CAA9_6861_41E3_B5EA805DA84C",
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_427388F5_6CCC_3250_41D3_EAFDE6541A37, this.camera_19BA9C8A_089D_FE2F_419A_8EA963F7F7B8); this.mainPlayList.set('selectedIndex', 47)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 17.62,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 83.02,
   "image": {
    "levels": [
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0_HS_8_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.73
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.55,
   "image": "this.AnimatedImageResource_DE1EC1F0_CAA9_6BFF_41E0_B457845F8D50",
   "yaw": 179.75,
   "pitch": -17.4,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_DAA4BBED_CAA9_DFE1_41E4_628D3DD3E993",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327, this.camera_198B1C85_089D_FE1A_416D_FDF6B7034253); this.mainPlayList.set('selectedIndex', 32)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 7.55,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 179.75,
   "image": {
    "levels": [
     {
      "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0_HS_9_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.4
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.77,
   "image": "this.AnimatedImageResource_19ACED6D_39E6_64DE_41C9_AB7E016BD82C",
   "yaw": 1.57,
   "pitch": -10.74,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2C7A0666_39EA_A4CB_41C7_545FB67D4348",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C, this.camera_1898CC0B_089D_FE2E_419D_963751BB93D2); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 7.77,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 1.57,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_0_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.74
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.53,
   "image": "this.AnimatedImageResource_19AF2D6D_39E6_64D9_41C2_A2AC3BCD54FA",
   "yaw": 101.3,
   "pitch": -34.35,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2C4C79FF_39E9_EFB9_41C4_C1054F059DF5",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_37243B3A_396E_ACBB_41B2_389D97DC4625, this.camera_076D5C0B_089D_FE2E_416F_6A31B59DC0FD); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 6.53,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 101.3,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_0_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -34.35
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.53,
   "image": "this.AnimatedImageResource_19AF8D6D_39E6_64D9_41C2_A01C8D1AAA97",
   "yaw": 175.66,
   "pitch": -17.77,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2F99E42B_39E9_A459_41C9_3FEC2B1AC277",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38, this.camera_1893CC15_089D_FE25_418A_30A02BD88470); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 7.53,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 175.66,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_0_HS_2_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.77
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.28,
   "image": "this.AnimatedImageResource_7254073E_6D47_FFD0_41BD_ECB31FAEFCA3",
   "yaw": -104.45,
   "pitch": -23.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2C8DA4F4_39E9_A5CF_41C6_AC8B7DB3AECA",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46, this.camera_188D1C1A_089D_FE2F_4190_02137EEF867A); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 7.28,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -104.45,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_0_HS_3_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.05
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.49,
   "image": "this.AnimatedImageResource_2DA5A814_6F4C_11D7_41C5_4C6BA645AFD3",
   "yaw": 159.77,
   "pitch": -14.88,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5AF9A756_6F44_7E53_41DA_B0F432BB629C",
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B, this.camera_1BA71DA4_089D_FE1A_419F_3A3100957727); this.mainPlayList.set('selectedIndex', 33)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 8.49,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 159.77,
   "image": {
    "levels": [
     {
      "url": "media/panorama_427388F5_6CCC_3250_41D3_EAFDE6541A37_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.88
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.57,
   "image": "this.AnimatedImageResource_2E7C0E20_6F44_31EF_41C3_E1CF3BF3DDDE",
   "yaw": -7.16,
   "pitch": -32.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5BAC2C4E_6F4C_31B0_41D5_D180E0069915",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_42757461_6CCC_3271_41DA_1F6E4C4C5553, this.camera_1BD61DA9_089D_FE6D_4160_2108E4C35F55); this.mainPlayList.set('selectedIndex', 46)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 8.57,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -7.16,
   "image": {
    "levels": [
     {
      "url": "media/panorama_427388F5_6CCC_3250_41D3_EAFDE6541A37_0_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -32.57
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.59,
   "image": "this.AnimatedImageResource_6CFAEDA6_7CB8_D1C0_41DD_656BAB607F4C",
   "yaw": -3.26,
   "pitch": -16.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_4E2FC215_6D4C_F1D1_41CB_12FBF1DD274F",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 28)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 7.59,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -3.26,
   "image": {
    "levels": [
     {
      "url": "media/panorama_4F636E0D_6DC4_31B0_41B4_0918A4EE2E5D_0_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.37
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.49,
   "image": "this.AnimatedImageResource_61635F35_44D1_F0E3_41C6_41FD132E171F",
   "yaw": 28.2,
   "pitch": -18.78,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5F56CC42_44D1_90A1_41C3_AF11DF88BA09",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.setCameraSameSpotAsMedia(this.camera_19A74C8A_089D_FE2F_419D_44AACF87C4B9, this.panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF); this.startPanoramaWithCamera(this.panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980, this.camera_19A74C8A_089D_FE2F_419D_44AACF87C4B9); this.mainPlayList.set('selectedIndex', 29)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 7.49,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 28.2,
   "image": {
    "levels": [
     {
      "url": "media/panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF_0_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.78
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.17,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF_0_HS_1_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 142
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -22.32,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": -8.46
  }
 ],
 "id": "overlay_58D3A238_44DF_F0E1_41C5_D04F96DE09D3",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 31)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.17,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -8.46,
   "image": {
    "levels": [
     {
      "url": "media/panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF_0_HS_1_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -22.32
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.47,
   "image": "this.AnimatedImageResource_64E117C7_7D6B_B895_41DB_F5ED6CCCC4DE",
   "yaw": 2.86,
   "pitch": -19.22,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6AABA810_7D6A_778C_41D7_E19025946123",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46, this.camera_0711EBBB_089D_FA6D_4180_DD66A1A013B8); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View"
  }
 ],
 "maps": [
  {
   "hfov": 7.47,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 2.86,
   "image": {
    "levels": [
     {
      "url": "media/panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.22
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.27,
   "image": "this.AnimatedImageResource_64E287C7_7D6B_B895_41CC_076808C5AC94",
   "yaw": -129.77,
   "pitch": -23.28,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6AABB810_7D6A_778C_41DC_C822F7030097",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46, this.camera_07153BC1_089D_FA1D_41A0_16482D682A23); this.mainPlayList.set('selectedIndex', 13); this.mainPlayList.set('selectedIndex', 9); this.mainPlayList.set('selectedIndex', 10); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View"
  }
 ],
 "maps": [
  {
   "hfov": 7.27,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -129.77,
   "image": {
    "levels": [
     {
      "url": "media/panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_1_HS_3_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.28
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 5.22,
   "image": "this.AnimatedImageResource_93587A15_8732_381E_41BE_5047B86E6264",
   "yaw": -132.65,
   "pitch": -7.98,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_9620880F_86F2_180A_41DB_2FFAA02327BC",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7, this.camera_1B24CB76_089D_FAE7_414D_E420AF22AF22); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View"
  }
 ],
 "maps": [
  {
   "hfov": 5.22,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -132.65,
   "image": {
    "levels": [
     {
      "url": "media/panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_0_HS_4_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.98
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 14.69,
   "image": "this.AnimatedImageResource_64082898_7D49_F5FA_41BB_0845E9A4D8E4",
   "yaw": 6,
   "pitch": -22.9,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_787ADD99_6CC4_32D0_41D3_41FF32A3007B",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26, this.camera_1838BC5E_089D_FE26_4190_2B3E7FD3BAD6); this.mainPlayList.set('selectedIndex', 37)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 14.69,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 6,
   "image": {
    "levels": [
     {
      "url": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_0_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -22.9
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.18,
   "image": "this.AnimatedImageResource_2341E584_6FC4_12B0_41D4_D92A084ADB3F",
   "yaw": -156.8,
   "pitch": -13.48,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_260DBBF1_6FC7_F651_41B3_F188772136C6",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D, this.camera_181C5C4A_089D_FE2F_4188_4317F8676CE3); this.mainPlayList.set('selectedIndex', 35)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 8.18,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -156.8,
   "image": {
    "levels": [
     {
      "url": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_0_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.48
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.84,
   "image": "this.AnimatedImageResource_392CCA98_6FC4_76DF_41D5_7C5AC601F4A6",
   "yaw": -88.08,
   "pitch": -5.38,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_20DD2EFF_6FDC_0E51_41D3_DCBE2D8AB7CC",
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_635B0BD3_6CFC_3650_41D7_396302800D07, this.camera_180AAC4A_089D_FE2F_4194_3EBE0A5298FB); this.mainPlayList.set('selectedIndex', 39)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.84,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -88.08,
   "image": {
    "levels": [
     {
      "url": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.38
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8,
   "image": "this.AnimatedImageResource_9826FB26_8BD6_4A6D_41DE_300FF358B071",
   "yaw": 165.25,
   "pitch": -18,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_981FB745_8BD2_5A2E_41D4_E5AD6575BFAD",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2, this.camera_18EFDC4A_089D_FE2F_418A_907754C26CA0); this.mainPlayList.set('selectedIndex', 34)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 8,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 165.25,
   "image": {
    "levels": [
     {
      "url": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_0_HS_4_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.06,
   "image": "this.AnimatedImageResource_630953AF_7DBE_9894_41C0_1C72E19E991D",
   "yaw": -64.36,
   "pitch": -33.56,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_689E0BBD_7D6A_88F5_41D8_1E1BF6A7BDCD",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB, this.camera_1895EE78_089D_FAEB_41A0_BAE99EB363F6); this.mainPlayList.set('selectedIndex', 49)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 8.06,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -64.36,
   "image": {
    "levels": [
     {
      "url": "media/panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B_0_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -33.56
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 12.49,
   "image": "this.AnimatedImageResource_392FAA98_6FC4_76D0_41BC_FF8E1AFF7B35",
   "yaw": 18.63,
   "pitch": -30.14,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7727ACB2_6D3C_12D0_41C3_46936ADA0244",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 36)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 12.49,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 18.63,
   "image": {
    "levels": [
     {
      "url": "media/panorama_635FE1E8_6CFC_3270_41C2_F8189A455420_0_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -30.14
  }
 ]
},
{
 "class": "PhotoPlayList",
 "id": "album_4C459947_5F77_C2C1_41CF_68E94C9899D0_AlbumPlayList",
 "items": [
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.33",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.57"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.album_4C459947_5F77_C2C1_41CF_68E94C9899D0_0",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.36",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.66"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.album_4C459947_5F77_C2C1_41CF_68E94C9899D0_1",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.51",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.64"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.album_4C459947_5F77_C2C1_41CF_68E94C9899D0_2",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.42",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.57"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.album_4C459947_5F77_C2C1_41CF_68E94C9899D0_3",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.58",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.51"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.album_4C459947_5F77_C2C1_41CF_68E94C9899D0_4",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.67",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.63"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.album_4C459947_5F77_C2C1_41CF_68E94C9899D0_5",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.60",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.52"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.photo_AC421AB5_A2B4_4FE8_41E2_96FF41791C68",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.58",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.73"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.photo_AF683516_A2B4_3AA8_41D0_81582A24EFA3",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.73",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.51"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.photo_ACEE2674_A2B4_C768_41DC_0D3D345FD5BE",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.35",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.61"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.photo_AD2740FC_A2B4_3B58_41D9_5A9AC4903976",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.34",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.32"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.photo_ACD0055F_A2B4_4558_41D5_78E6263EDDEA",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.66",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.45"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.photo_B2B8FF24_A2B4_46E8_41E3_12142F021D2F",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.35",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.70"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.photo_ACE0D227_A2B7_FEE8_41D6_0AA19B6B7A4B",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.32",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.75"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.photo_ADF99BC7_A2B7_CDA8_41D2_071BBEEEB0EA",
   "class": "PhotoPlayListItem"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.37,
   "image": "this.AnimatedImageResource_61013A77_7D5E_8874_41A4_3B60CBF93BDA",
   "yaw": -0.55,
   "pitch": -30.04,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_69EFF979_7D6B_887C_41D2_5EC555338473",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB, this.camera_19F3ACAA_089D_FE6F_419D_CA275117BED7); this.mainPlayList.set('selectedIndex', 49)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 8.37,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.55,
   "image": {
    "levels": [
     {
      "url": "media/panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4_0_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -30.04
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.25,
   "image": "this.AnimatedImageResource_61019A77_7D5E_8874_41D5_592593616509",
   "yaw": 42.71,
   "pitch": -20.16,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_69EFE979_7D6B_887C_41B7_C4965873DBE7",
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B, this.camera_19E2FCAA_089D_FE6F_41A0_B35A33ADC5DB); this.mainPlayList.set('selectedIndex', 33)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 8.25,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 42.71,
   "image": {
    "levels": [
     {
      "url": "media/panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.16
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.45,
   "image": "this.AnimatedImageResource_61002A77_7D5E_8874_41CB_58D21CA3179C",
   "yaw": 72.55,
   "pitch": -29.04,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_68A87C1B_7D6B_8FBD_41D9_C0CD33FAE4B0",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B, this.camera_190F6CBA_089D_FE6E_4186_73E5628B29A8); this.mainPlayList.set('selectedIndex', 50)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 8.45,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 72.55,
   "image": {
    "levels": [
     {
      "url": "media/panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB_0_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -29.04
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.13,
   "image": "this.AnimatedImageResource_61009A77_7D5E_8874_41DB_D163028EC15C",
   "yaw": -121.64,
   "pitch": -32.81,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_68A86C1B_7D6B_8FBD_41C7_5979D2735590",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4, this.camera_1911DCAA_089D_FE6F_4185_2EBD397E5088); this.mainPlayList.set('selectedIndex', 48)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 8.13,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -121.64,
   "image": {
    "levels": [
     {
      "url": "media/panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB_0_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -32.81
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7,
   "image": "this.AnimatedImageResource_5C5DCD0C_6CC4_13B7_41D9_6872EC59CE27",
   "yaw": 5.32,
   "pitch": -27.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7DA7C1B2_6CC4_12D3_41C4_4887A70DCF6A",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B, this.camera_070CBBC9_089D_FA2D_4198_728CA30CC499); this.mainPlayList.set('selectedIndex', 33)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 7,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 5.32,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327_0_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -27.76
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.79,
   "image": "this.AnimatedImageResource_6AC82F12_7CE6_898C_41DE_9DEA4D40FDA4",
   "yaw": -174.51,
   "pitch": -10.2,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6FBBDE7F_7CE6_8875_41D5_3BC38C489430",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457, this.camera_1854DC6B_089D_FEEE_418D_97A266F74363); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View"
  }
 ],
 "maps": [
  {
   "hfov": 7.79,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -174.51,
   "image": {
    "levels": [
     {
      "url": "media/panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_1_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.2
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.85,
   "image": "this.AnimatedImageResource_6AC8BF12_7CE6_898C_41DA_E2661A28A66C",
   "yaw": -87.59,
   "pitch": -7.2,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6FBBAE7F_7CE6_8875_41C4_F945894682F2",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_68C70D10_7CEA_898B_41B4_72F949ECE365, this.camera_1825AC5E_089D_FE26_419A_F9394ED5AF20); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View"
  }
 ],
 "maps": [
  {
   "hfov": 7.85,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -87.59,
   "image": {
    "levels": [
     {
      "url": "media/panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_1_HS_2_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.2
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 17.05,
   "image": "this.AnimatedImageResource_66F30BD3_7D66_888D_41DB_F7929D38F513",
   "yaw": 1.38,
   "pitch": -14.13,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6F162224_7CFB_FB8B_41D6_48E08606D0A2",
 "data": {
  "label": "Circle Arrow 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6F92A178_7CE7_987B_41DA_ED8733B68935, this.camera_18363C5E_089D_FE26_4192_ED557A7242B7); this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 17.05,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 1.38,
   "image": {
    "levels": [
     {
      "url": "media/panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.13
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.65,
   "image": "this.AnimatedImageResource_6CD70D9D_7CB8_D1C0_41C5_25668565F56C",
   "yaw": 15.89,
   "pitch": -14.69,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_308766B3_3E36_2ACA_419E_EDCBA6315D91",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45, this.camera_18C7CC3A_089D_FE6F_419E_6DE67F7C771C); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 7.65,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 15.89,
   "image": {
    "levels": [
     {
      "url": "media/panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC_0_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.69
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.64,
   "image": "this.AnimatedImageResource_2CC5B370_3E2E_6A46_41B5_57F3348D574C",
   "yaw": 176.67,
   "pitch": -15.07,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_308776B3_3E36_2ACA_41A2_63388DE002CF",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD, this.camera_18F2BC45_089D_FE25_4198_75AFE57C03C8); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 7.64,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 176.67,
   "image": {
    "levels": [
     {
      "url": "media/panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC_1_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.07
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.15,
   "image": "this.AnimatedImageResource_2442225C_3E56_6A7E_41CC_01A38544C54A",
   "yaw": 86.28,
   "pitch": -25.29,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2E04C0EC_3E3E_665E_41B5_4AE310016950",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F, this.camera_19A82C8A_089D_FE2F_4198_C36638D0A6C6); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View"
  }
 ],
 "maps": [
  {
   "hfov": 7.15,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 86.28,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF_0_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -25.29
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.68,
   "image": "this.AnimatedImageResource_2D3C1372_3E2E_6A4A_41A5_D3639C927AC0",
   "yaw": 2.62,
   "pitch": -13.73,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2FA9ED8B_3E3E_3EDA_41B2_5B89C0E8D505",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF, this.camera_1ADE0D19_089D_FE2D_41A1_263A4936602B); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View"
  }
 ],
 "maps": [
  {
   "hfov": 7.68,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 2.62,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.73
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.85,
   "image": "this.AnimatedImageResource_231AF1C2_3E2E_260E_41BC_84717EEACECC",
   "yaw": -176.13,
   "pitch": -7.25,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2FA9CD8B_3E3E_3EDA_41C5_174365D4C570",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD, this.camera_1AFCBD34_089D_FE7A_419E_B90ED08FCCCA); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View"
  }
 ],
 "maps": [
  {
   "hfov": 7.85,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -176.13,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_0_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.25
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.86,
   "image": "this.AnimatedImageResource_2D3DA372_3E2E_6A4A_41C5_E31CF6A9A48B",
   "yaw": -81.28,
   "pitch": -6.44,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2F962D8B_3E3E_3EDA_41B1_E95BC7EC6266",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8, this.camera_1ACD4D29_089D_FE6D_4166_47515FED8F8F); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View"
  }
 ],
 "maps": [
  {
   "hfov": 7.86,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -81.28,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_1_HS_2_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.44
  }
 ]
},
{
 "media": "this.album_4C459947_5F77_C2C1_41CF_68E94C9899D0",
 "begin": "this.updateMediaLabelFromPlayList(this.album_4C459947_5F77_C2C1_41CF_68E94C9899D0_AlbumPlayList, this.htmltext_1A7F5B1C_089D_FA2B_4195_8F246D356B70, this.albumitem_1A7DAB1C_089D_FA2B_4197_499091B67019); this.loopAlbum(this.playList_05204983_0894_461D_41A0_E205846F8AB1, 0)",
 "player": "this.viewer_uid1A7D8B1C_089D_FA2B_4193_C6CA02CB8454PhotoAlbumPlayer",
 "class": "PhotoAlbumPlayListItem",
 "id": "albumitem_1A7DAB1C_089D_FA2B_4197_499091B67019"
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.42,
   "image": "this.AnimatedImageResource_2DA53813_6F4C_11D1_4197_3205F4E43AE1",
   "yaw": 49.49,
   "pitch": -35.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_58B42D55_6F4C_1250_41D2_03AC18B4B73C",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_427388F5_6CCC_3250_41D3_EAFDE6541A37, this.camera_1AB1DD09_089D_FE2D_4181_8A816BAC73E6); this.mainPlayList.set('selectedIndex', 47)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 6.42,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 49.49,
   "image": {
    "levels": [
     {
      "url": "media/panorama_42757461_6CCC_3271_41DA_1F6E4C4C5553_0_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -35.71
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.58,
   "image": "this.AnimatedImageResource_5D20ED1A_44F0_90A1_41B9_AADF5C08642D",
   "yaw": -176.55,
   "pitch": -16.52,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_56396508_44D7_90A1_41CA_9B17CDE88798",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.setCameraSameSpotAsMedia(this.camera_18B80C1A_089D_FE2F_4199_E7D371DF9C47, this.panorama_49E02255_44D0_90A3_41BF_327058418A88); this.startPanoramaWithCamera(this.panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3, this.camera_18B80C1A_089D_FE2F_4199_E7D371DF9C47); this.mainPlayList.set('selectedIndex', 20)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 7.58,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -176.55,
   "image": {
    "levels": [
     {
      "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.52
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.45,
   "image": "this.AnimatedImageResource_5D207D1A_44F0_90A1_41A6_49C77A1330AB",
   "yaw": 48.04,
   "pitch": -19.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5706CF25_44D7_70E3_41BE_EC110FB1FC07",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.setCameraSameSpotAsMedia(this.camera_18B30C2A_089D_FE6F_4194_042DB2A7B00D, this.panorama_49E02255_44D0_90A3_41BF_327058418A88); this.startPanoramaWithCamera(this.panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711, this.camera_18B30C2A_089D_FE6F_4194_042DB2A7B00D); this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 7.45,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 48.04,
   "image": {
    "levels": [
     {
      "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.53
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.69,
   "image": "this.AnimatedImageResource_5D21AD1A_44F0_90A1_41CE_7C1F7AF12FFC",
   "yaw": -61.55,
   "pitch": -8.6,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_57CF4A1D_44D1_90A3_41C5_98D71672AA66",
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.setCameraSameSpotAsMedia(this.camera_18A08C2A_089D_FE6F_4187_677DA903F3C6, this.panorama_49E02255_44D0_90A3_41BF_327058418A88); this.startPanoramaWithCamera(this.panorama_96CA7F23_8732_383B_41DF_3051F30EE69B, this.camera_18A08C2A_089D_FE6F_4187_677DA903F3C6); this.mainPlayList.set('selectedIndex', 27)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 8.69,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -61.55,
   "image": {
    "levels": [
     {
      "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.6
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.76,
   "image": "this.AnimatedImageResource_5D210D1A_44F0_90A1_41A5_B3C819E82C31",
   "yaw": -10.8,
   "pitch": -4.58,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5774D5F1_44D1_9362_41C6_C9936041BCEE",
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.setCameraSameSpotAsMedia(this.camera_18DDBC37_089D_FE65_4185_08C40E626698, this.panorama_49E02255_44D0_90A3_41BF_327058418A88); this.startPanoramaWithCamera(this.panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16, this.camera_18DDBC37_089D_FE65_4185_08C40E626698); this.mainPlayList.set('selectedIndex', 28)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 8.76,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -10.8,
   "image": {
    "levels": [
     {
      "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.58
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.7,
   "image": "this.AnimatedImageResource_5D26BD1B_44F0_90A7_41CF_DA5325A4373B",
   "yaw": 126.61,
   "pitch": -8.1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_57E86EBB_44D0_91E7_41D0_5436A3DE925A",
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB, this.camera_18CAFC3A_089D_FE6F_418D_9DFEDD42E61F); this.mainPlayList.set('selectedIndex', 24)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 8.7,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 126.61,
   "image": {
    "levels": [
     {
      "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.1
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.56,
   "image": "this.AnimatedImageResource_66CDCBCC_7D66_889B_4178_B41DB0BACE90",
   "yaw": 54.13,
   "pitch": -17,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6821857A_7D6A_B87F_41B9_EE7F7FD2400E",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7, this.camera_0703FBCF_089D_FA25_4196_F61C5BB82C42); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View"
  }
 ],
 "maps": [
  {
   "hfov": 7.56,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 54.13,
   "image": {
    "levels": [
     {
      "url": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.68,
   "image": "this.AnimatedImageResource_9650353D_86F2_080E_41CE_7E8839076923",
   "yaw": -130.28,
   "pitch": -13.78,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6821957A_7D6A_B87F_41DC_BD30B5B8044C",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B, this.camera_072ABBE3_089D_FA1E_419B_4F5F6E73AE39); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View"
  }
 ],
 "maps": [
  {
   "hfov": 7.68,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -130.28,
   "image": {
    "levels": [
     {
      "url": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_0_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.78
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.56,
   "image": "this.AnimatedImageResource_64CA1635_7D6E_9BF4_41DA_125FE9E943AB",
   "yaw": 179.73,
   "pitch": -17,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6822757A_7D6A_B87F_41D4_2486089A3DA2",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0, this.camera_0724FBE5_089D_FA1A_4156_A37593854DBC); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View"
  }
 ],
 "maps": [
  {
   "hfov": 7.56,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 179.73,
   "image": {
    "levels": [
     {
      "url": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_0_HS_2_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.57,
   "image": "this.AnimatedImageResource_66CACBD1_7D66_888D_4197_366C72F20858",
   "yaw": 123.96,
   "pitch": -16.74,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6822457A_7D6A_B87F_41D4_7F2F1433F101",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE, this.camera_07301BDD_089D_FA2A_4189_C3B1C44FF320); this.mainPlayList.set('selectedIndex', 10); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View"
  }
 ],
 "maps": [
  {
   "hfov": 7.57,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 123.96,
   "image": {
    "levels": [
     {
      "url": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_1_HS_4_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.74
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.65,
   "image": "this.AnimatedImageResource_69326188_7CEB_989B_41C5_DED7823E8354",
   "yaw": 3.08,
   "pitch": -10.03,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6DEF49D0_7CEB_888B_41D9_A9910FB50BBB",
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.setCameraSameSpotAsMedia(this.camera_07793BFE_089D_F9E7_4194_E01AE406BCE2, this.panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB); this.startPanoramaWithCamera(this.panorama_4ED61615_6DCC_71D0_417C_348BC20174DA, this.camera_07793BFE_089D_F9E7_4194_E01AE406BCE2); this.mainPlayList.set('selectedIndex', 25)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 8.65,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 3.08,
   "image": {
    "levels": [
     {
      "url": "media/panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.03
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.75,
   "image": "this.AnimatedImageResource_6933E188_7CEB_989C_41D3_55E25D0C78A4",
   "yaw": -34.87,
   "pitch": -5.09,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6DE0F9D0_7CEB_888B_41B4_60D7DBFD2331",
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.setCameraSameSpotAsMedia(this.camera_07737BFE_089D_F9E7_419C_37851DD18B3A, this.panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB); this.startPanoramaWithCamera(this.panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2, this.camera_07737BFE_089D_F9E7_419C_37851DD18B3A); this.mainPlayList.set('selectedIndex', 26)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 8.75,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -34.87,
   "image": {
    "levels": [
     {
      "url": "media/panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.09
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.66,
   "image": "this.AnimatedImageResource_69335188_7CEB_989C_41CA_54845281ED9E",
   "yaw": -175.86,
   "pitch": -9.86,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6DE0D9D0_7CEB_888B_41B7_3D27F6053D1F",
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.setCameraSameSpotAsMedia(this.camera_07418BFB_089D_F9EE_418A_5ED1FA3FE3DA, this.panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB); this.startPanoramaWithCamera(this.panorama_49E02255_44D0_90A3_41BF_327058418A88, this.camera_07418BFB_089D_F9EE_418A_5ED1FA3FE3DA); this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 8.66,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -175.86,
   "image": {
    "levels": [
     {
      "url": "media/panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.86
  }
 ]
},
{
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "id": "viewer_uid1A74EB1C_089D_FA2B_419F_2524A1E0E855",
 "toolTipPaddingTop": 4,
 "paddingLeft": 0,
 "progressBorderRadius": 0,
 "toolTipPaddingLeft": 6,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "class": "ViewerArea",
 "toolTipDisplayTime": 3000,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarLeft": 0,
 "width": "100%",
 "borderRadius": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "minHeight": 50,
 "toolTipBorderRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadHeight": 15,
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "minWidth": 100,
 "playbackBarHeadOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipOpacity": 1,
 "toolTipFontSize": "1.11vmin",
 "height": "100%",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "shadow": false,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "transitionMode": "blending",
 "toolTipShadowHorizontalLength": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "paddingRight": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "borderSize": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipShadowOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2100,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "paddingTop": 0,
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "toolTipFontColor": "#606060",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "paddingBottom": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionDuration": 500,
 "progressBorderSize": 0,
 "data": {
  "name": "ViewerArea4274"
 }
},
{
 "children": [
  "this.viewer_uid1A7D8B1C_089D_FA2B_4193_C6CA02CB8454",
  {
   "children": [
    "this.htmltext_1A7F5B1C_089D_FA2B_4195_8F246D356B70"
   ],
   "left": 0,
   "backgroundOpacity": 0.3,
   "paddingLeft": 0,
   "scrollBarColor": "#FFFFFF",
   "paddingRight": 0,
   "scrollBarVisible": "rollOver",
   "right": 0,
   "scrollBarOpacity": 0.5,
   "class": "Container",
   "borderSize": 0,
   "borderRadius": 0,
   "minHeight": 20,
   "propagateClick": false,
   "backgroundColorRatios": [],
   "bottom": 0,
   "contentOpaque": true,
   "minWidth": 20,
   "verticalAlign": "bottom",
   "layout": "vertical",
   "scrollBarMargin": 2,
   "backgroundColorDirection": "vertical",
   "paddingTop": 0,
   "backgroundColor": [],
   "gap": 10,
   "shadow": false,
   "paddingBottom": 0,
   "horizontalAlign": "left",
   "data": {
    "name": "Container4270"
   },
   "overflow": "scroll",
   "scrollBarWidth": 7,
   "height": "30%"
  },
  "this.component_1A737B1C_089D_FA2B_418B_35E008A49829",
  "this.component_1A736B1C_089D_FA2B_417F_4B61D08EE5AD"
 ],
 "id": "container_1A7D6B1C_089D_FA2B_4193_306AF85E26D3",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "borderSize": 0,
 "width": "100%",
 "borderRadius": 0,
 "minHeight": 20,
 "propagateClick": false,
 "backgroundColorRatios": [],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 20,
 "verticalAlign": "top",
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "backgroundColor": [],
 "gap": 10,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "Container4269"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "height": "100%"
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.71,
   "image": "this.AnimatedImageResource_911DDF48_86FE_1876_41C3_95BA5357FEF2",
   "yaw": 12.56,
   "pitch": -7.85,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_4ED63615_6DCC_71D0_41D5_CD9E44B83FF5",
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.setCameraSameSpotAsMedia(this.camera_1A709D79_089D_FEED_419F_D82195738E64, this.panorama_4ED61615_6DCC_71D0_417C_348BC20174DA); this.startPanoramaWithCamera(this.panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB, this.camera_1A709D79_089D_FEED_419F_D82195738E64); this.mainPlayList.set('selectedIndex', 24)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 8.71,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 12.56,
   "image": {
    "levels": [
     {
      "url": "media/panorama_4ED61615_6DCC_71D0_417C_348BC20174DA_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.85
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 12.16,
   "image": "this.AnimatedImageResource_32414ADF_6FCC_1651_41DA_715F62A378B4",
   "yaw": -82.6,
   "pitch": -32.66,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7861FC38_6CC4_71D0_41CE_A04852AA4192",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF, this.camera_19768CDA_089D_FE2E_4198_6C086DD27B21); this.mainPlayList.set('selectedIndex', 36)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 12.16,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -82.6,
   "image": {
    "levels": [
     {
      "url": "media/panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26_0_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -32.66
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.73,
   "image": "this.AnimatedImageResource_6409E898_7D49_F5FA_41D0_3E15CEBA2730",
   "yaw": 164.05,
   "pitch": -6.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6E106730_7D49_FCC9_41C1_D6919803016C",
 "data": {
  "label": "Circle Generic 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 38)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 8.73,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 164.05,
   "image": {
    "levels": [
     {
      "url": "media/panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.84
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.57,
   "image": "this.AnimatedImageResource_22235185_3E36_6656_41C6_D481AE600D7C",
   "yaw": 1.05,
   "pitch": -16.81,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_22F5D476_3E32_EECE_419B_06112C9C665E",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0, this.camera_07570BEB_089D_F9ED_4198_CACF2E60C37B); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 7.57,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 1.05,
   "image": {
    "levels": [
     {
      "url": "media/panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38_0_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.81
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 14.46,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38_0_HS_2_0.png",
      "width": 328,
      "class": "ImageResourceLevel",
      "height": 460
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.76,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 178.44
  }
 ],
 "id": "overlay_25849974_3E36_E6B5_41BE_07A6C82BACA4",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.setCameraSameSpotAsMedia(this.camera_075ECBEB_089D_F9ED_4174_1D764B51AAB4, this.panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38); this.startPanoramaWithCamera(this.panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45, this.camera_075ECBEB_089D_F9ED_4174_1D764B51AAB4); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Enter Ground Floor"
  }
 ],
 "maps": [
  {
   "hfov": 14.46,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 178.44,
   "image": {
    "levels": [
     {
      "url": "media/panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 22
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.76
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 11.35,
   "image": "this.AnimatedImageResource_D92FA6D6_CAD6_6F1A_41E6_9DCA4FC01A9F",
   "yaw": -2.97,
   "pitch": -31.67,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_65603CAB_7D6D_889D_41DE_D9DE97164841",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View"
  }
 ],
 "maps": [
  {
   "hfov": 11.35,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -2.97,
   "image": {
    "levels": [
     {
      "url": "media/panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2_0_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -31.67
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.72,
   "image": "this.AnimatedImageResource_D80FD6B7_CAD6_6F1A_418E_A5CC6D5C8954",
   "yaw": 11.63,
   "pitch": -12.48,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_C4374B09_CAD1_E6F6_41E7_955B3D268A30",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View"
  }
 ],
 "maps": [
  {
   "hfov": 7.72,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 11.63,
   "image": {
    "levels": [
     {
      "url": "media/panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2_0_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.48
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.39,
   "image": "this.AnimatedImageResource_93563A15_8732_381E_41D5_79BD2CA139D2",
   "yaw": 41.91,
   "pitch": -14.23,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6964F46F_7D6B_9F94_41D3_D7CA169DB6E7",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7, this.camera_072B2E39_089D_FA6A_418C_B8DEABF7411A); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View"
  }
 ],
 "maps": [
  {
   "hfov": 6.39,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 41.91,
   "image": {
    "levels": [
     {
      "url": "media/panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_0_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.23
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.41,
   "image": "this.AnimatedImageResource_66C89BD1_7D66_888D_41CE_D4E500240488",
   "yaw": -21.74,
   "pitch": -20.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6964E46F_7D6B_9F94_41D5_5D52C36C7733",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7, this.camera_07221E43_089D_FA1D_413E_A615C69C791E); this.mainPlayList.set('selectedIndex', 10); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View"
  }
 ],
 "maps": [
  {
   "hfov": 7.41,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -21.74,
   "image": {
    "levels": [
     {
      "url": "media/panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_1_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.51
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.49,
   "image": "this.AnimatedImageResource_93575A15_8732_381E_41D7_69C6A4A3D8DC",
   "yaw": -55.57,
   "pitch": -10.21,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_89937C7F_86CE_780A_41D0_A9D771F40E68",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View"
  }
 ],
 "maps": [
  {
   "hfov": 6.49,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -55.57,
   "image": {
    "levels": [
     {
      "url": "media/panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_0_HS_3_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.21
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.88,
   "image": "this.AnimatedImageResource_66E98BE9_7D66_889D_41C1_D48D139F4844",
   "yaw": 13.16,
   "pitch": -29.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_68A0E10A_7D65_999C_41C0_82875F19B0D8",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View"
  }
 ],
 "maps": [
  {
   "hfov": 6.88,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 13.16,
   "image": {
    "levels": [
     {
      "url": "media/panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -29.54
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.51,
   "image": "this.AnimatedImageResource_DABE30C0_CAD1_A376_41D5_3DAF89CF39B5",
   "yaw": -4.3,
   "pitch": -11.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_8457FA62_8BB5_CAEA_41AC_F91A5AF44148",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View"
  }
 ],
 "maps": [
  {
   "hfov": 7.51,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -4.3,
   "image": {
    "levels": [
     {
      "url": "media/panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61_0_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.46
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.56,
   "image": "this.AnimatedImageResource_2BA4BF17_6FCC_0FD1_41CF_F266ACFA7C49",
   "yaw": -36.33,
   "pitch": -17.07,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7FF9405B_6CC4_1250_41DB_36C7A422FFA1",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D, this.camera_19486CD4_089D_FE3B_418C_02D9498B4A10); this.mainPlayList.set('selectedIndex', 35)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 7.56,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -36.33,
   "image": {
    "levels": [
     {
      "url": "media/panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_0_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.07
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.82,
   "image": "this.AnimatedImageResource_3D4F520D_6FC4_11B1_41B6_CE0D5BCF7EB8",
   "yaw": -140.46,
   "pitch": -24.23,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5DF52BB0_6F44_16D0_41CA_B591EAEBAF92",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B, this.camera_195AFCCA_089D_FE2E_419C_2A6D0FE046C7); this.mainPlayList.set('selectedIndex', 33)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 8.82,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -140.46,
   "image": {
    "levels": [
     {
      "url": "media/panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_0_HS_3_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -24.23
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.57,
   "image": "this.AnimatedImageResource_35647254_6FC4_3650_41C2_CBBF1C979FF4",
   "yaw": 35.76,
   "pitch": -16.96,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_3CD88833_6FC4_11D1_41B5_4D8D26C97D3B",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF, this.camera_1947BCDA_089D_FE2E_4191_D39EE949AB49); this.mainPlayList.set('selectedIndex', 36)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 7.57,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 35.76,
   "image": {
    "levels": [
     {
      "url": "media/panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_0_HS_4_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.96
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.51,
   "image": "this.AnimatedImageResource_61225A6E_7D5E_8B94_41B6_6BB3533C0B1A",
   "yaw": 14.38,
   "pitch": -18.21,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2E46D6A1_3E32_2AC6_41B7_F135E49D9321",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC, this.camera_1AA0CD09_089D_FE2D_4195_B8BE0554765E); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 7.51,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 14.38,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_0_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.21
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 12.78,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_0_HS_2_0.png",
      "width": 294,
      "class": "ImageResourceLevel",
      "height": 157
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 8.67,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": -108.97
  }
 ],
 "id": "overlay_9A4A110E_895E_080A_41E0_3CDFC0D2A5D8",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 12.78,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -108.97,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_0_HS_2_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 8.67
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.19,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_0_HS_3_0.png",
      "width": 165,
      "class": "ImageResourceLevel",
      "height": 136
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.59,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": -108.74
  }
 ],
 "id": "overlay_9BA81483_895E_08FA_41D1_346846E4C199",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 32)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 7.19,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -108.74,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_0_HS_3_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.59
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 9.2,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_0_HS_4_0.png",
      "width": 209,
      "class": "ImageResourceLevel",
      "height": 135
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.01,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": -108.98
  }
 ],
 "id": "overlay_9BC1DDCD_895E_180E_41D8_7AE419A16EDD",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 20)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 9.2,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -108.98,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_0_HS_4_0_0_map.gif",
      "width": 24,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.01
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.66,
   "image": "this.AnimatedImageResource_93638A1E_8732_380A_41DC_67A59CF9BFF1",
   "yaw": 163.29,
   "pitch": -9.86,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_96CBAF23_8732_383B_41E0_9FF6AFBC5DF3",
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.setCameraSameSpotAsMedia(this.camera_19D6AC9A_089D_FE2F_419C_A28EA007EE32, this.panorama_96CA7F23_8732_383B_41DF_3051F30EE69B); this.startPanoramaWithCamera(this.panorama_49E02255_44D0_90A3_41BF_327058418A88, this.camera_19D6AC9A_089D_FE2F_419C_A28EA007EE32); this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 8.66,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 163.29,
   "image": {
    "levels": [
     {
      "url": "media/panorama_96CA7F23_8732_383B_41DF_3051F30EE69B_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.86
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.77,
   "image": "this.AnimatedImageResource_44FE5F69_6DC4_0E70_41CB_1DF8BA6B444C",
   "yaw": -36.12,
   "pitch": -3.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_4F1C9613_6DC7_F1D1_41D0_542B876CD3AA",
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.setCameraSameSpotAsMedia(this.camera_1C981DEE_089D_F9E7_4176_9DF4E421DD1A, this.panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2); this.startPanoramaWithCamera(this.panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB, this.camera_1C981DEE_089D_F9E7_4176_9DF4E421DD1A); this.mainPlayList.set('selectedIndex', 24)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 8.77,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -36.12,
   "image": {
    "levels": [
     {
      "url": "media/panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.3
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.02,
   "image": "this.AnimatedImageResource_2E735E1F_6F44_31D1_41DB_8218777B9643",
   "yaw": 5.66,
   "pitch": -9.55,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_574024F4_6F7C_1250_41C6_B67CC4997B19",
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B, this.camera_1A527D69_089D_FEED_419F_393B7ACB6D22); this.mainPlayList.set('selectedIndex', 33)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 8.02,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 5.66,
   "image": {
    "levels": [
     {
      "url": "media/panorama_427426C9_6CCC_1EB0_41D3_EDA93E539BC0_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.55
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 9.25,
   "image": "this.AnimatedImageResource_2E73CE1F_6F44_31D1_41D5_23D23F5B5761",
   "yaw": 163.15,
   "pitch": -22.86,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_57E90C77_6F7C_1251_41B1_0699A0D89C26",
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5CFFE1DC_6CCC_1250_41C5_0D1AFA7842DF, this.camera_1A418D79_089D_FEED_4169_1661CFE1A756); this.mainPlayList.set('selectedIndex', 42)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Go to Next View."
  }
 ],
 "maps": [
  {
   "hfov": 9.25,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 163.15,
   "image": {
    "levels": [
     {
      "url": "media/panorama_427426C9_6CCC_1EB0_41D3_EDA93E539BC0_0_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -22.86
  }
 ]
},
{
 "maxHeight": 415,
 "id": "Image_2B2DF9ED_3967_AFD9_41A0_E462C1703BD2",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scaleMode": "fit_inside",
 "paddingRight": 0,
 "width": "54.8%",
 "class": "Image",
 "url": "skin/Image_2B2DF9ED_3967_AFD9_41A0_E462C1703BD2.png",
 "borderRadius": 0,
 "propagateClick": false,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "middle",
 "minWidth": 1,
 "click": "this.mainPlayList.set('selectedIndex', 0)",
 "paddingTop": 0,
 "height": "100%",
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "Image5617"
 },
 "maxWidth": 3331
},
{
 "maxHeight": 415,
 "id": "Image_28EA1E13_3959_A449_41C6_24AF6374E0B2",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scaleMode": "fit_inside",
 "paddingRight": 0,
 "width": "70%",
 "class": "Image",
 "url": "skin/Image_28EA1E13_3959_A449_41C6_24AF6374E0B2.png",
 "borderRadius": 0,
 "propagateClick": false,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "middle",
 "minWidth": 1,
 "click": "this.mainPlayList.set('selectedIndex', 32)",
 "paddingTop": 0,
 "height": "100%",
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "Image6391"
 },
 "maxWidth": 3331
},
{
 "maxHeight": 364,
 "id": "Image_28861083_395B_FC49_41C8_2CA278CB7B24",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scaleMode": "fit_inside",
 "paddingRight": 0,
 "width": "70%",
 "class": "Image",
 "url": "skin/Image_28861083_395B_FC49_41C8_2CA278CB7B24.png",
 "borderRadius": 0,
 "propagateClick": false,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "middle",
 "minWidth": 1,
 "click": "this.mainPlayList.set('selectedIndex', 20)",
 "paddingTop": 0,
 "height": "100%",
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "Image6451"
 },
 "maxWidth": 3331
},
{
 "maxHeight": 349,
 "id": "Image_2B0C39FD_395A_EFB9_41C4_0108835DE30F",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scaleMode": "fit_inside",
 "paddingRight": 0,
 "width": "75%",
 "class": "Image",
 "url": "skin/Image_2B0C39FD_395A_EFB9_41C4_0108835DE30F.png",
 "borderRadius": 0,
 "propagateClick": false,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "middle",
 "minWidth": 1,
 "click": "this.mainPlayList.set('selectedIndex', 5)",
 "paddingTop": 0,
 "height": "100%",
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "Image6508"
 },
 "maxWidth": 3331
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_77B97AD3_6CC4_1650_41D2_7604C0BF3E16",
 "levels": [
  {
   "url": "media/panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_0_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_3D4F820D_6FC4_11B0_41C1_3510ABE8E966",
 "levels": [
  {
   "url": "media/panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_0_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9184E6D5_8BB7_BA2F_41D1_4F0ECEE33FFD",
 "levels": [
  {
   "url": "media/panorama_6354F45E_6CFC_7253_41C5_392E5743BC4D_0_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_69359F0E_7CE6_8994_41DE_C7613A13AB64",
 "levels": [
  {
   "url": "media/panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_6935FF0F_7CE6_8995_41BE_EB018D5F79B8",
 "levels": [
  {
   "url": "media/panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_66C1FBCA_7D66_889F_41D1_1AC9500D5044",
 "levels": [
  {
   "url": "media/panorama_68C70D10_7CEA_898B_41B4_72F949ECE365_0_HS_4_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_19A34D6E_39E6_64DA_41CB_739C0940F8B3",
 "levels": [
  {
   "url": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_19A39D6E_39E6_64DB_41A8_C90929B18B85",
 "levels": [
  {
   "url": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_66F77BD2_7D66_888F_41D6_135770E88BD0",
 "levels": [
  {
   "url": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_0_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_66F7EBD2_7D66_888F_41D2_62C783E95400",
 "levels": [
  {
   "url": "media/panorama_373BFCDF_396E_A5FA_41C2_C22FA2811F46_0_HS_4_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_61627F36_44D1_F0E1_41CE_9B99E1CC970F",
 "levels": [
  {
   "url": "media/panorama_4993FEA2_44D0_91E1_41CE_6F66E1553A69_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_19AE3D6D_39E6_64D9_41BD_8844DE8B04B4",
 "levels": [
  {
   "url": "media/panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_240EDB2C_39D9_AC5F_4189_E5E07EF301C6",
 "levels": [
  {
   "url": "media/panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_737A92E6_6D44_7670_41B2_C061D8592794",
 "levels": [
  {
   "url": "media/panorama_37243B3A_396E_ACBB_41B2_389D97DC4625_0_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_66DD9A6E_7D5E_8B94_41D4_A4E2D0DD7FA9",
 "levels": [
  {
   "url": "media/panorama_71E6EA9B_7CB9_D3C0_41D5_F33AC7186D7C_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5003D8C9_44D0_F1A3_41CE_56276D6DB7CA",
 "levels": [
  {
   "url": "media/panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_500378C9_44D0_F1A3_41B9_182DE7622644",
 "levels": [
  {
   "url": "media/panorama_4928B7B8_44D1_7FE1_41C7_15B745D1F5D3_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_41D81D4B_6D44_13B0_4168_C10199432DFB",
 "levels": [
  {
   "url": "media/panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_453A845D_6D4D_F250_41D1_17532C5F205A",
 "levels": [
  {
   "url": "media/panorama_4AA20E0B_6D44_11B0_41D1_C347F59AE4C0_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_6AC76F12_7CE6_898C_41CB_73FAB63CFC34",
 "levels": [
  {
   "url": "media/panorama_6F92A178_7CE7_987B_41DA_ED8733B68935_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_66CBBBD1_7D66_888D_41C5_6522E29F93C2",
 "levels": [
  {
   "url": "media/panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_66CBDBD1_7D66_888D_41D3_A9786679D8AC",
 "levels": [
  {
   "url": "media/panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_97613ABB_86F2_180A_41D4_9DBEEA30B68C",
 "levels": [
  {
   "url": "media/panorama_697B9393_7D6B_988D_41C3_A45F2311CCC7_0_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_54BEC19E_6CC4_12D3_41B6_1643AFA29E81",
 "levels": [
  {
   "url": "media/panorama_42749FD9_6CCC_0E50_41D5_D5CD1FCEC452_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_6AC90F12_7CE6_898F_41B0_A6794FAD1FA4",
 "levels": [
  {
   "url": "media/panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_6AC95F12_7CE6_898F_41C2_3F59AC1098E2",
 "levels": [
  {
   "url": "media/panorama_6F874C52_7CE6_8F8F_41C5_C6399B245457_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5948A463_6CDD_F270_41C6_6E020FEE7862",
 "levels": [
  {
   "url": "media/panorama_41112B09_6D3C_17B0_41DB_371D557B428F_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_432FCF00_6CDC_0FB0_41D5_7A8DB1FADBE2",
 "levels": [
  {
   "url": "media/panorama_41112B09_6D3C_17B0_41DB_371D557B428F_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_432F1F00_6CDC_0FB0_41D1_56481F04FDAD",
 "levels": [
  {
   "url": "media/panorama_41112B09_6D3C_17B0_41DB_371D557B428F_0_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_6CE51DA1_7CB8_D1C0_4192_0DD15EDC3EF6",
 "levels": [
  {
   "url": "media/panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_6CE48DA1_7CB8_D1C0_41D6_3A2173A8B604",
 "levels": [
  {
   "url": "media/panorama_499DBC99_44D0_91A2_41C0_9AFE902C0711_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_19AE7D6D_39E6_64D9_41C1_E2DDCD58055D",
 "levels": [
  {
   "url": "media/panorama_3726C559_396E_E4F9_41C6_D2F3E7363AB7_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_6ACA2F12_7CE6_898F_41D8_4D430AF735B5",
 "levels": [
  {
   "url": "media/panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_6ACAAF12_7CE6_898F_41D3_7F2AC5ACA060",
 "levels": [
  {
   "url": "media/panorama_6E4AD1C3_7CE6_988D_41B3_E6E0079066A8_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_4BC97ED9_6D7C_0E50_41C9_A2680FA1B95A",
 "levels": [
  {
   "url": "media/panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16_0_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5EF6F9F4_6D44_1250_4185_E58A0C53469C",
 "levels": [
  {
   "url": "media/panorama_4CD95A7E_6D3C_3653_41A3_176A6EA63F16_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_2310B04A_6F3C_11B0_41C7_A8257E7FA90B",
 "levels": [
  {
   "url": "media/panorama_5CFFE1DC_6CCC_1250_41C5_0D1AFA7842DF_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_640ED899_7D49_F5FA_41CC_21BF89A71D01",
 "levels": [
  {
   "url": "media/panorama_635B0BD3_6CFC_3650_41D7_396302800D07_0_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_756FE117_67CB_EAF4_41D2_AE5D4466D229",
 "levels": [
  {
   "url": "media/panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_0_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_61600F35_44D1_F0E3_41C5_725DFB8E2E4E",
 "levels": [
  {
   "url": "media/panorama_49818B1A_44D0_B0A1_41A2_16EC2F873980_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_2E724E20_6F44_31EF_41D1_D45B3CEA56EE",
 "levels": [
  {
   "url": "media/panorama_4270CB46_6CCC_17B0_419B_ED875A3A3C07_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_6CF72DA7_7CB8_D1C0_41D0_D739D40CA065",
 "levels": [
  {
   "url": "media/panorama_4270CB46_6CCC_17B0_419B_ED875A3A3C07_0_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_2CC4C370_3E2E_6A46_41B0_81A0FCA84164",
 "levels": [
  {
   "url": "media/panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_2CC4A370_3E2E_6A46_41BB_54EB26FE3BDD",
 "levels": [
  {
   "url": "media/panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_2CC46370_3E2E_6A46_41A3_DA1C24435F2E",
 "levels": [
  {
   "url": "media/panorama_2ED65C4D_3E31_FE5E_41CD_5D13CA6D37DD_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_605B0BA0_7DA5_888B_417D_0C787496DDFC",
 "levels": [
  {
   "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_1_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_DE1EC1F0_CAA9_6BFF_41E0_B457845F8D50",
 "levels": [
  {
   "url": "media/panorama_64F045BB_7DA5_98FD_41DD_41E2F025B84B_0_HS_9_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_19ACED6D_39E6_64DE_41C9_AB7E016BD82C",
 "levels": [
  {
   "url": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_19AF2D6D_39E6_64D9_41C2_A2AC3BCD54FA",
 "levels": [
  {
   "url": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_19AF8D6D_39E6_64D9_41C2_A01C8D1AAA97",
 "levels": [
  {
   "url": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_0_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_7254073E_6D47_FFD0_41BD_ECB31FAEFCA3",
 "levels": [
  {
   "url": "media/panorama_3739202D_396E_BC5E_41CB_C19F3DEF93A0_0_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_2DA5A814_6F4C_11D7_41C5_4C6BA645AFD3",
 "levels": [
  {
   "url": "media/panorama_427388F5_6CCC_3250_41D3_EAFDE6541A37_0_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_2E7C0E20_6F44_31EF_41C3_E1CF3BF3DDDE",
 "levels": [
  {
   "url": "media/panorama_427388F5_6CCC_3250_41D3_EAFDE6541A37_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_6CFAEDA6_7CB8_D1C0_41DD_656BAB607F4C",
 "levels": [
  {
   "url": "media/panorama_4F636E0D_6DC4_31B0_41B4_0918A4EE2E5D_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_61635F35_44D1_F0E3_41C6_41FD132E171F",
 "levels": [
  {
   "url": "media/panorama_49E864AB_44D0_91E7_41CD_A4321F006FCF_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_64E117C7_7D6B_B895_41DB_F5ED6CCCC4DE",
 "levels": [
  {
   "url": "media/panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_64E287C7_7D6B_B895_41CC_076808C5AC94",
 "levels": [
  {
   "url": "media/panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_1_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_93587A15_8732_381E_41BE_5047B86E6264",
 "levels": [
  {
   "url": "media/panorama_6AAB9810_7D6A_778C_41D5_6CB3D40E744B_0_HS_4_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_64082898_7D49_F5FA_41BB_0845E9A4D8E4",
 "levels": [
  {
   "url": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_2341E584_6FC4_12B0_41D4_D92A084ADB3F",
 "levels": [
  {
   "url": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_392CCA98_6FC4_76DF_41D5_7C5AC601F4A6",
 "levels": [
  {
   "url": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_0_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9826FB26_8BD6_4A6D_41DE_300FF358B071",
 "levels": [
  {
   "url": "media/panorama_63589E31_6CFC_71D0_41D6_51C3758A7BAF_0_HS_4_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_630953AF_7DBE_9894_41C0_1C72E19E991D",
 "levels": [
  {
   "url": "media/panorama_689FEBBD_7D6A_88F5_41D0_F43B5E41290B_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_392FAA98_6FC4_76D0_41BC_FF8E1AFF7B35",
 "levels": [
  {
   "url": "media/panorama_635FE1E8_6CFC_3270_41C2_F8189A455420_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_61013A77_7D5E_8874_41A4_3B60CBF93BDA",
 "levels": [
  {
   "url": "media/panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_61019A77_7D5E_8874_41D5_592593616509",
 "levels": [
  {
   "url": "media/panorama_69EFC979_7D6B_887C_41BF_7AB1F4EA7FE4_0_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_61002A77_7D5E_8874_41CB_58D21CA3179C",
 "levels": [
  {
   "url": "media/panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_61009A77_7D5E_8874_41DB_D163028EC15C",
 "levels": [
  {
   "url": "media/panorama_68A8AC1B_7D6B_8FBD_41DD_D54B0F88F1BB_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5C5DCD0C_6CC4_13B7_41D9_6872EC59CE27",
 "levels": [
  {
   "url": "media/panorama_7DC2A695_6CFC_3ED1_41AE_CC553AAF4327_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_6AC82F12_7CE6_898C_41DE_9DEA4D40FDA4",
 "levels": [
  {
   "url": "media/panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_6AC8BF12_7CE6_898C_41DA_E2661A28A66C",
 "levels": [
  {
   "url": "media/panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_66F30BD3_7D66_888D_41DB_F7929D38F513",
 "levels": [
  {
   "url": "media/panorama_6FBBEE7F_7CE6_8875_4156_3973A4639D6D_0_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_6CD70D9D_7CB8_D1C0_41C5_25668565F56C",
 "levels": [
  {
   "url": "media/panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_2CC5B370_3E2E_6A46_41B5_57F3348D574C",
 "levels": [
  {
   "url": "media/panorama_308716B3_3E36_2ACA_41C1_03C2220A95FC_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_2442225C_3E56_6A7E_41CC_01A38544C54A",
 "levels": [
  {
   "url": "media/panorama_2E04D0EC_3E3E_665E_41B3_E13339ADDADF_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_2D3C1372_3E2E_6A4A_41A5_D3639C927AC0",
 "levels": [
  {
   "url": "media/panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_231AF1C2_3E2E_260E_41BC_84717EEACECC",
 "levels": [
  {
   "url": "media/panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_2D3DA372_3E2E_6A4A_41C5_E31CF6A9A48B",
 "levels": [
  {
   "url": "media/panorama_2FA99D8B_3E3E_3EDA_41CC_26D6543D525F_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "viewerArea": "this.viewer_uid1A7D8B1C_089D_FA2B_4193_C6CA02CB8454",
 "class": "PhotoAlbumPlayer",
 "id": "viewer_uid1A7D8B1C_089D_FA2B_4193_C6CA02CB8454PhotoAlbumPlayer"
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_2DA53813_6F4C_11D1_4197_3205F4E43AE1",
 "levels": [
  {
   "url": "media/panorama_42757461_6CCC_3271_41DA_1F6E4C4C5553_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5D20ED1A_44F0_90A1_41B9_AADF5C08642D",
 "levels": [
  {
   "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5D207D1A_44F0_90A1_41A6_49C77A1330AB",
 "levels": [
  {
   "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5D21AD1A_44F0_90A1_41CE_7C1F7AF12FFC",
 "levels": [
  {
   "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5D210D1A_44F0_90A1_41A5_B3C819E82C31",
 "levels": [
  {
   "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5D26BD1B_44F0_90A7_41CF_DA5325A4373B",
 "levels": [
  {
   "url": "media/panorama_49E02255_44D0_90A3_41BF_327058418A88_0_HS_4_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_66CDCBCC_7D66_889B_4178_B41DB0BACE90",
 "levels": [
  {
   "url": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9650353D_86F2_080E_41CE_7E8839076923",
 "levels": [
  {
   "url": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_64CA1635_7D6E_9BF4_41DA_125FE9E943AB",
 "levels": [
  {
   "url": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_0_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_66CACBD1_7D66_888D_4197_366C72F20858",
 "levels": [
  {
   "url": "media/panorama_6821B57A_7D6A_B87F_4198_F434C9BC8E5C_1_HS_4_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_69326188_7CEB_989B_41C5_DED7823E8354",
 "levels": [
  {
   "url": "media/panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_6933E188_7CEB_989C_41D3_55E25D0C78A4",
 "levels": [
  {
   "url": "media/panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_69335188_7CEB_989C_41CA_54845281ED9E",
 "levels": [
  {
   "url": "media/panorama_6DEF59CF_7CEB_8895_41D8_DE9629A0A9FB_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "id": "viewer_uid1A7D8B1C_089D_FA2B_4193_C6CA02CB8454",
 "toolTipPaddingTop": 4,
 "paddingLeft": 0,
 "progressBorderRadius": 0,
 "toolTipPaddingLeft": 6,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "class": "ViewerArea",
 "toolTipDisplayTime": 3000,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarLeft": 0,
 "width": "100%",
 "borderRadius": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "minHeight": 50,
 "toolTipBorderRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadHeight": 15,
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "minWidth": 100,
 "playbackBarHeadOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipOpacity": 1,
 "toolTipFontSize": "1.11vmin",
 "height": "100%",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "shadow": false,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "transitionMode": "blending",
 "toolTipShadowHorizontalLength": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "paddingRight": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "borderSize": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipShadowOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2100,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "paddingTop": 0,
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "toolTipFontColor": "#606060",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "paddingBottom": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionDuration": 500,
 "progressBorderSize": 0,
 "data": {
  "name": "ViewerArea4268"
 }
},
{
 "id": "htmltext_1A7F5B1C_089D_FA2B_4195_8F246D356B70",
 "backgroundOpacity": 0.7,
 "paddingLeft": 10,
 "scrollBarColor": "#000000",
 "paddingRight": 10,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "HTMLText",
 "borderSize": 0,
 "width": "100%",
 "borderRadius": 0,
 "minHeight": 0,
 "propagateClick": false,
 "backgroundColorRatios": [
  0
 ],
 "showEffect": {
  "duration": 250,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "hideEffect": {
  "duration": 250,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "minWidth": 0,
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "paddingTop": 5,
 "backgroundColor": [
  "#000000"
 ],
 "shadow": false,
 "paddingBottom": 5,
 "html": "",
 "visible": false,
 "data": {
  "name": "HTMLText4271"
 },
 "scrollBarWidth": 10
},
{
 "transparencyActive": false,
 "id": "component_1A737B1C_089D_FA2B_418B_35E008A49829",
 "left": 10,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 0,
 "verticalAlign": "middle",
 "top": "45%",
 "showEffect": {
  "duration": 250,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "hideEffect": {
  "duration": 250,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "mode": "push",
 "minWidth": 0,
 "click": "this.loadFromCurrentMediaPlayList(this.album_4C459947_5F77_C2C1_41CF_68E94C9899D0_AlbumPlayList, -1)",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "visible": false,
 "data": {
  "name": "IconButton4272"
 },
 "iconURL": "skin/album_left.png",
 "cursor": "hand"
},
{
 "transparencyActive": false,
 "id": "component_1A736B1C_089D_FA2B_417F_4B61D08EE5AD",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": 10,
 "class": "IconButton",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 0,
 "verticalAlign": "middle",
 "top": "45%",
 "showEffect": {
  "duration": 250,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "hideEffect": {
  "duration": 250,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "mode": "push",
 "minWidth": 0,
 "click": "this.loadFromCurrentMediaPlayList(this.album_4C459947_5F77_C2C1_41CF_68E94C9899D0_AlbumPlayList, 1)",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "visible": false,
 "data": {
  "name": "IconButton4273"
 },
 "iconURL": "skin/album_right.png",
 "cursor": "hand"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_911DDF48_86FE_1876_41C3_95BA5357FEF2",
 "levels": [
  {
   "url": "media/panorama_4ED61615_6DCC_71D0_417C_348BC20174DA_0_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_32414ADF_6FCC_1651_41DA_715F62A378B4",
 "levels": [
  {
   "url": "media/panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_6409E898_7D49_F5FA_41D0_3E15CEBA2730",
 "levels": [
  {
   "url": "media/panorama_63548829_6CFC_11F1_41D8_5A4EF57BEC26_0_HS_4_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_22235185_3E36_6656_41C6_D481AE600D7C",
 "levels": [
  {
   "url": "media/panorama_22F5A476_3E32_EECE_41A7_FBDA33892F38_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_D92FA6D6_CAD6_6F1A_41E6_9DCA4FC01A9F",
 "levels": [
  {
   "url": "media/panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_D80FD6B7_CAD6_6F1A_418E_A5CC6D5C8954",
 "levels": [
  {
   "url": "media/panorama_6EC6E4F5_7D6D_9875_41D9_7615C0B4A1E2_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_93563A15_8732_381E_41D5_79BD2CA139D2",
 "levels": [
  {
   "url": "media/panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_66C89BD1_7D66_888D_41CE_D4E500240488",
 "levels": [
  {
   "url": "media/panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_93575A15_8732_381E_41D7_69C6A4A3D8DC",
 "levels": [
  {
   "url": "media/panorama_6964846F_7D6B_9F94_41A1_DB3A9F1399EE_0_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_66E98BE9_7D66_889D_41C1_D48D139F4844",
 "levels": [
  {
   "url": "media/panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_DABE30C0_CAD1_A376_41D5_3DAF89CF39B5",
 "levels": [
  {
   "url": "media/panorama_68705C3A_7D6D_8FFF_4160_F953C69B2D61_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_2BA4BF17_6FCC_0FD1_41CF_F266ACFA7C49",
 "levels": [
  {
   "url": "media/panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_3D4F520D_6FC4_11B1_41B6_CE0D5BCF7EB8",
 "levels": [
  {
   "url": "media/panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_0_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_35647254_6FC4_3650_41C2_CBBF1C979FF4",
 "levels": [
  {
   "url": "media/panorama_63556AC1_6CFC_16B0_41D5_B4A870C12AA2_0_HS_4_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_61225A6E_7D5E_8B94_41B6_6BB3533C0B1A",
 "levels": [
  {
   "url": "media/panorama_2E4506A1_3E32_2AC6_4190_E4CE4EB59E45_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_93638A1E_8732_380A_41DC_67A59CF9BFF1",
 "levels": [
  {
   "url": "media/panorama_96CA7F23_8732_383B_41DF_3051F30EE69B_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_44FE5F69_6DC4_0E70_41CB_1DF8BA6B444C",
 "levels": [
  {
   "url": "media/panorama_4F1C8613_6DC7_F1D1_41C8_721E2BF9D0D2_0_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_2E735E1F_6F44_31D1_41DB_8218777B9643",
 "levels": [
  {
   "url": "media/panorama_427426C9_6CCC_1EB0_41D3_EDA93E539BC0_0_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_2E73CE1F_6F44_31D1_41D5_23D23F5B5761",
 "levels": [
  {
   "url": "media/panorama_427426C9_6CCC_1EB0_41D3_EDA93E539BC0_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
}],
 "height": "100%",
 "desktopMipmappingEnabled": false
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
