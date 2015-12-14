function init(){
	prSetupVideo('myVideo', 1);
}

var prSetupVideo = function(obj, inst){
    var _this = this;
    _this._video = document.getElementById(obj);
    _this._instance = inst;
    _this._start = true;
    _this._ended = false;
    _this._restarted = false;
    _this._q1 = false;
    _this._q2 = false;
    _this._q3 = false;
    _this._muted = _this._video.muted;
    _this._current_time;
    _this._total_time;
    _this._percent;

    _this.init = function(){
        _this._video.addEventListener('play', function(event){
            if(_this._start){
                _this._start = false;

                trk({ id: _this.videoActivity(1206) });
            } else {
                if(_this._ended){
                    _this._ended = false;
                    _this._q1 = _this._q2 = _this._q3 = false;

                    trk({ id: 1007 });
                    trk({ id: _this.videoActivity(1206) });
                } else if(_this._restarted){
                    _this._ended = false;
                    _this._restarted = false;
                    _this._q1 = _this._q2 = _this._q3 = false;

                    trk({ id: 1003 });
                } else {
                    trk({ id: 1001 });
                }
            }
        });

        _this._video.addEventListener('pause', function(event){
            if(_this._percent < 100){
                trk({ id: 1002 });
            }
        });

        _this._video.addEventListener('ended', function(event){
            _this._ended = true;

            trk({ id: _this.videoActivity(204) });
        });

        _this._video.addEventListener('timeupdate', function(event){
            _this._current_time = _this._video.currentTime;
            _this._total_time = _this._video.duration;
            _this._percent = _this._current_time / _this._total_time * 100;

            if(!_this._q1 && _this._percent > 25){
                _this._q1 = true;

                trk({ id: _this.videoActivity(201) });
            } else if(!_this._q2 && _this._percent > 50){
                _this._q1 = _this._q2 = true;

                trk({ id: _this.videoActivity(202) });
            } else if(!_this._q3 && _this._percent > 75){
                _this._q1 = _this._q2 = _this._q3 = true;

                trk({ id: _this.videoActivity(203) });
            }

            if((/IE 11/.test(navigator.userAgent) || /rv:11/.test(navigator.userAgent)) && (_this._percent < 5) && _this._ended){
                var _ie11_play_event = document.createEvent('Event');
                _ie11_play_event.initEvent('play', true, false);
                _this._video.dispatchEvent(_ie11_play_event);
            }
        });

        _this._video.addEventListener('volumechange', function(event){
            if(event.target.muted){
                if(!_this._muted){
                    _this._muted = true;

                    trk({ id: 1004 });
                }
            } else {
                if(_this._muted){
                    _this._muted = false;

                    trk({ id: 1005 });
                }
            }
        });

        _this._video.addEventListener('webkitendfullscreen', function(event){
            trk({ id: 1010 });
        });
    }

    _this.videoActivity = function(activity){
        return -1 * (activity + ((_this._instance - 1) * 10));
    }

    _this.init();
}

function trk(obj){
	switch(obj.id){
		case -201:
			console.log('25% complete');
		break;

		case -202:
			console.log('50% complete');
		break;

		case -203:
			console.log('75% complete');
		break;

		case -204:
			console.log('100% complete');
		break;

		case -1206:
			console.log('start');
		break;

		case 1001:
			console.log('play');
		break;

		case 1002:
			console.log('pause');
		break;

		case 1004:
			console.log('mute');
		break;

		case 1005:
			console.log('unmute');
		break;

		case 1007:
			console.log('replay');
		break;
	}
}