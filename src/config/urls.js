var BASE_URL = 'http://192.168.8.253:8080/';
var WS_BASE_URL = 'ws://192.168.8.253:8080/';

export default {
  MONITOR_MEMINFO: BASE_URL+'meminfo',
  PXE_STATUS: BASE_URL+'pxe/status',
  PXE_START_SERVE: BASE_URL+'pxe/start/',
  PXE_STOP_SERVE: BASE_URL+'pxe/stop/',
  PXE_RESTART_SERVE: BASE_URL+'pxe/restart/',
  WS_PING: WS_BASE_URL+'ws/ping'
}
